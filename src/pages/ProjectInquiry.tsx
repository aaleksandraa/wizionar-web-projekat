import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  ClipboardList,
  Loader2,
  Mail,
} from "lucide-react";
import WizionarHeader from "@/components/wizionar/WizionarHeader";
import WizionarFooter from "@/components/wizionar/WizionarFooter";
import SEOHead from "@/components/wizionar/SEOHead";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  PROJECT_INQUIRY_PATH,
  calculateBudgetScore,
  calculateComplexityScore,
  getAllVisibleFields,
  getProjectInquirySteps,
  getVisibleFields,
  getVisibleSteps,
  projectInquiryCopy,
  type InquiryAnswers,
  type InquiryField,
  type InquiryOption,
  type InquiryStep,
  type InquiryValue,
} from "@/lib/project-inquiry-schema";
import { createBreadcrumbSchema, createWebPageSchema, getSeoLabel } from "@/lib/seo";
import { cn } from "@/lib/utils";

type Challenge = {
  first: number;
  second: number;
  operator: "+" | "-";
  expected: number;
};

type SubmitState = "idle" | "submitting" | "success" | "error";

const STORAGE_KEY = "wizionar-project-inquiry-draft";
const LAST_SUBMIT_KEY = "wizionar-project-inquiry-last-submit";
const ADMIN_EMAIL = "info@wizionar.com";

const formatDate = (date = new Date()) =>
  new Intl.DateTimeFormat("bs-BA", {
    timeZone: "Europe/Sarajevo",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);

const formatDateTime = (date = new Date()) =>
  new Intl.DateTimeFormat("bs-BA", {
    timeZone: "Europe/Sarajevo",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);

const createChallenge = (): Challenge => {
  const first = Math.floor(Math.random() * 7) + 3;
  const second = Math.floor(Math.random() * 5) + 1;
  const useMinus = first > second + 2 && Math.random() > 0.5;

  return {
    first,
    second,
    operator: useMinus ? "-" : "+",
    expected: useMinus ? first - second : first + second,
  };
};

const isEmptyValue = (value: InquiryValue) => {
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === "boolean") return !value;
  return value === null || value === undefined || String(value).trim() === "";
};

const sanitizeText = (value: InquiryValue): InquiryValue => {
  if (Array.isArray(value)) return value.map((item) => String(item).replace(/[<>]/g, "").trim()).filter(Boolean);
  if (typeof value === "boolean") return value;
  if (value === null || value === undefined) return "";
  return String(value).replace(/[<>]/g, "").trim().slice(0, 5000);
};

const getOptionLabel = (field: InquiryField, value: string) =>
  field.options?.find((option) => option.value === value)?.label || value;

const formatValue = (field: InquiryField, value: InquiryValue) => {
  if (Array.isArray(value)) {
    return value.map((item) => getOptionLabel(field, item)).join(", ");
  }

  if (typeof value === "boolean") {
    return value ? "Da" : "Ne";
  }

  return getOptionLabel(field, String(value || ""));
};

const buildStructuredAnswers = (answers: InquiryAnswers, steps: InquiryStep[]) =>
  getVisibleSteps(answers, steps)
    .flatMap((step) =>
      getVisibleFields(step, answers).map((field) => {
        const value = sanitizeText(answers[field.key]);
        return {
          stepKey: step.key,
          stepTitle: step.title,
          key: field.key,
          label: field.label,
          value,
          displayValue: formatValue(field, value),
        };
      }),
    )
    .filter((item) => !isEmptyValue(item.value));

const buildEmailBody = (
  answers: InquiryAnswers,
  language: string,
  steps: InquiryStep[],
  intro?: string,
) => {
  const complexityScore = calculateComplexityScore(answers);
  const budgetScore = calculateBudgetScore(answers.budget_range);
  const lines = [
    intro || "Novi projektni upitnik - Wizionar",
    "",
    `Jezik: ${language}`,
    `Complexity score: ${complexityScore}`,
    `Budget score: ${budgetScore}`,
    `Datum: ${formatDateTime()}`,
    "",
    "Odgovori:",
    ...buildStructuredAnswers(answers, steps).flatMap((item) => [``, `${item.label}:`, String(item.displayValue || "-")]),
  ];

  return lines.join("\n");
};

const submitInquiry = async (
  answers: InquiryAnswers,
  language: string,
  steps: InquiryStep[],
  copy: (typeof projectInquiryCopy)[keyof typeof projectInquiryCopy],
  protection: { honeypot: string; startedAt: number },
) => {
  const complexityScore = calculateComplexityScore(answers);
  const budgetScore = calculateBudgetScore(answers.budget_range);
  const endpoint = import.meta.env.VITE_PROJECT_INQUIRY_ENDPOINT?.trim();
  const structuredAnswers = buildStructuredAnswers(answers, steps);
  const clientEmail = String(sanitizeText(answers.email) || "");
  const adminBody = buildEmailBody(answers, language, steps, copy.adminSubject);
  const clientBody = buildEmailBody(answers, language, steps, copy.confirmationIntro);
  const payload = {
    source: "wizionar-project-inquiry",
    submittedAt: new Date().toISOString(),
    submittedDate: formatDate(),
    submittedDateTime: formatDateTime(),
    language,
    protection: {
      websiteUrl: protection.honeypot,
      elapsedSeconds: Math.round((Date.now() - protection.startedAt) / 1000),
    },
    complexityScore,
    budgetScore,
    emailDelivery: {
      admin: {
        to: ADMIN_EMAIL,
        subject: `${copy.adminSubject} - ${String(answers.full_name || "")}`.trim(),
        body: adminBody,
      },
      client: {
        to: clientEmail,
        subject: copy.confirmationSubject,
        body: clientBody,
      },
    },
    contact: {
      fullName: sanitizeText(answers.full_name),
      companyName: sanitizeText(answers.company_name),
      email: sanitizeText(answers.email),
      phone: sanitizeText(answers.phone),
      location: sanitizeText(answers.location),
    },
    projectType: sanitizeText(answers.project_type),
    budgetRange: sanitizeText(answers.budget_range),
    desiredStart: sanitizeText(answers.desired_start),
    nextStep: sanitizeText(answers.next_step),
    answers: structuredAnswers,
  };

  if (!endpoint) {
    const subject = encodeURIComponent(`Projektni upitnik - ${String(answers.full_name || "novi klijent")}`);
    const body = encodeURIComponent(adminBody);
    const cc = clientEmail ? `&cc=${encodeURIComponent(clientEmail)}` : "";
    window.location.href = `mailto:${ADMIN_EMAIL}?subject=${subject}${cc}&body=${body}`;
    return { fallbackMailto: true };
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Endpoint returned ${response.status}`);
  }

  return { fallbackMailto: false };
};

const getInputType = (type: InquiryField["type"]) => {
  if (type === "email") return "email";
  if (type === "phone") return "tel";
  if (type === "url") return "url";
  return "text";
};

const SecurityChallenge = ({
  challenge,
  value,
  onChange,
  error,
  title,
  placeholder,
}: {
  challenge: Challenge;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  title: string;
  placeholder: string;
}) => (
  <div className="rounded-xl border border-border bg-secondary/30 p-4">
    <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
      <CheckCircle2 className="h-4 w-4 text-primary" />
      {title}
    </div>
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div
        className="inline-flex h-14 min-w-36 select-none items-center justify-center gap-3 rounded-lg border border-dashed border-primary/40 bg-background px-5 font-bold text-2xl tracking-normal text-foreground"
        aria-label={`Matematički zadatak ${challenge.first} ${challenge.operator} ${challenge.second}`}
      >
        <span className="-rotate-3">{challenge.first}</span>
        <span className="text-primary">{challenge.operator}</span>
        <span className="rotate-2">{challenge.second}</span>
        <span>=</span>
        <span>?</span>
      </div>
      <Input
        value={value}
        inputMode="numeric"
        pattern="[0-9]*"
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="h-12 max-w-48 rounded-lg"
      />
    </div>
    {error ? <p className="mt-2 text-sm text-destructive">{error}</p> : null}
  </div>
);

const OptionButton = ({
  option,
  selected,
  multiple,
  onClick,
}: {
  option: InquiryOption;
  selected: boolean;
  multiple?: boolean;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={cn(
      "flex min-h-14 w-full items-start gap-3 rounded-xl border p-4 text-left transition-all hover:border-primary/50 hover:bg-primary/5",
      selected ? "border-primary bg-primary/5 shadow-sm" : "border-border bg-background",
    )}
  >
    <span
      className={cn(
        "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border",
        multiple ? "rounded" : "rounded-full",
        selected ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground/35",
      )}
    >
      {selected ? <Check className="h-3.5 w-3.5" /> : null}
    </span>
    <span className="min-w-0">
      <span className="block text-sm font-semibold leading-5">{option.label}</span>
      {option.description ? (
        <span className="mt-1 block text-sm leading-5 text-muted-foreground">{option.description}</span>
      ) : null}
    </span>
  </button>
);

const QuestionRenderer = ({
  field,
  value,
  error,
  onChange,
}: {
  field: InquiryField;
  value: InquiryValue;
  error?: string;
  onChange: (key: string, value: InquiryValue) => void;
}) => {
  const fieldId = `inquiry-${field.key}`;

  if (field.type === "single_choice") {
    return (
      <div className="space-y-3">
        <QuestionLabel field={field} htmlFor={fieldId} />
        <div className="grid gap-3 md:grid-cols-2">
          {field.options?.map((option) => (
            <OptionButton
              key={option.value}
              option={option}
              selected={value === option.value}
              onClick={() => onChange(field.key, option.value)}
            />
          ))}
        </div>
        <QuestionError error={error} />
      </div>
    );
  }

  if (field.type === "multiple_choice") {
    const selectedValues = Array.isArray(value) ? value : [];

    return (
      <div className="space-y-3">
        <QuestionLabel field={field} htmlFor={fieldId} />
        <div className="grid gap-3 md:grid-cols-2">
          {field.options?.map((option) => {
            const selected = selectedValues.includes(option.value);
            return (
              <OptionButton
                key={option.value}
                option={option}
                multiple
                selected={selected}
                onClick={() =>
                  onChange(
                    field.key,
                    selected
                      ? selectedValues.filter((item) => item !== option.value)
                      : [...selectedValues, option.value],
                  )
                }
              />
            );
          })}
        </div>
        <QuestionError error={error} />
      </div>
    );
  }

  if (field.type === "ranking") {
    const selectedValues = Array.isArray(value) ? value : [];

    return (
      <div className="space-y-3">
        <QuestionLabel field={field} htmlFor={fieldId} />
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {field.options?.map((option) => {
            const rank = selectedValues.indexOf(option.value) + 1;
            return (
              <button
                type="button"
                key={option.value}
                onClick={() =>
                  onChange(
                    field.key,
                    rank ? selectedValues.filter((item) => item !== option.value) : [...selectedValues, option.value],
                  )
                }
                className={cn(
                  "flex h-12 items-center justify-between rounded-lg border px-3 text-sm font-medium transition-colors",
                  rank ? "border-primary bg-primary/5 text-foreground" : "border-border bg-background hover:bg-secondary/50",
                )}
              >
                <span>{option.label}</span>
                {rank ? (
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                    {rank}
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
        <QuestionError error={error} />
      </div>
    );
  }

  if (field.type === "textarea") {
    return (
      <div className="space-y-2">
        <QuestionLabel field={field} htmlFor={fieldId} />
        <Textarea
          id={fieldId}
          value={String(value || "")}
          onChange={(event) => onChange(field.key, event.target.value)}
          placeholder={field.placeholder}
          className="min-h-32 rounded-xl"
        />
        <QuestionError error={error} />
      </div>
    );
  }

  if (field.type === "consent") {
    return (
      <div className="space-y-2">
        <label className="flex items-start gap-3 rounded-xl border border-border bg-secondary/20 p-4 text-sm">
          <Checkbox
            checked={Boolean(value)}
            onCheckedChange={(checked) => onChange(field.key, Boolean(checked))}
            className="mt-0.5"
          />
          <span>
            <span className="font-medium">{field.label}</span>
            {field.required ? <span className="text-primary"> *</span> : null}
          </span>
        </label>
        <QuestionError error={error} />
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <QuestionLabel field={field} htmlFor={fieldId} />
      <Input
        id={fieldId}
        type={getInputType(field.type)}
        value={String(value || "")}
        onChange={(event) => onChange(field.key, event.target.value)}
        placeholder={field.type === "date" ? field.placeholder || "dd.mm.gggg" : field.placeholder}
        inputMode={field.type === "date" ? "numeric" : undefined}
        className="h-12 rounded-xl"
      />
      <QuestionError error={error} />
    </div>
  );
};

const QuestionLabel = ({ field, htmlFor }: { field: InquiryField; htmlFor: string }) => (
  <label htmlFor={htmlFor} className="block">
    <span className="text-sm font-semibold">
      {field.label}
      {field.required ? <span className="text-primary"> *</span> : null}
    </span>
    {field.description ? <span className="mt-1 block text-sm leading-5 text-muted-foreground">{field.description}</span> : null}
  </label>
);

const QuestionError = ({ error }: { error?: string }) =>
  error ? <p className="text-sm font-medium text-destructive">{error}</p> : null;

const ProjectInquiry = () => {
  const { language } = useLanguage();
  const copy = projectInquiryCopy[language];
  const [answers, setAnswers] = useState<InquiryAnswers>({});
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [submitMessage, setSubmitMessage] = useState("");
  const [challenge, setChallenge] = useState<Challenge>(() => createChallenge());
  const [challengeAnswer, setChallengeAnswer] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [startedAt] = useState(() => Date.now());

  const inquirySteps = useMemo(() => getProjectInquirySteps(language), [language]);
  const visibleSteps = useMemo(() => getVisibleSteps(answers, inquirySteps), [answers, inquirySteps]);
  const currentStep = visibleSteps[currentStepIndex] || visibleSteps[0];
  const currentFields = useMemo(
    () => (currentStep ? getVisibleFields(currentStep, answers) : []),
    [answers, currentStep],
  );
  const progress = Math.round(((currentStepIndex + 1) / visibleSteps.length) * 100);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return;

    try {
      setAnswers(JSON.parse(stored) as InquiryAnswers);
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
  }, [answers]);

  useEffect(() => {
    if (currentStepIndex > visibleSteps.length - 1) {
      setCurrentStepIndex(Math.max(visibleSteps.length - 1, 0));
    }
  }, [currentStepIndex, visibleSteps.length]);

  const updateAnswer = (key: string, value: InquiryValue) => {
    setAnswers((previous) => ({ ...previous, [key]: value }));
    setErrors((previous) => {
      const next = { ...previous };
      delete next[key];
      return next;
    });
  };

  const validateFields = (fields: InquiryField[]) => {
    const nextErrors: Record<string, string> = {};

    fields.forEach((field) => {
      const value = answers[field.key];

      if (field.required && isEmptyValue(value)) {
        nextErrors[field.key] = copy.required;
        return;
      }

      if (!isEmptyValue(value) && field.type === "email") {
        const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value));
        if (!validEmail) nextErrors[field.key] = copy.invalidEmail;
      }

      if (!isEmptyValue(value) && field.type === "url") {
        try {
          const url = new URL(String(value));
          if (!["http:", "https:"].includes(url.protocol)) {
            nextErrors[field.key] = copy.invalidProtocol;
          }
        } catch {
          nextErrors[field.key] = copy.invalidUrl;
        }
      }

      if (!isEmptyValue(value) && field.type === "date") {
        const validDate = /^(0[1-9]|[12]\d|3[01])\.(0[1-9]|1[0-2])\.(19|20)\d{2}$/.test(String(value));
        if (!validDate) nextErrors[field.key] = copy.invalidDate;
      }
    });

    setErrors((previous) => ({ ...previous, ...nextErrors }));
    return Object.keys(nextErrors).length === 0;
  };

  const goNext = () => {
    if (!validateFields(currentFields)) return;
    setCurrentStepIndex((index) => Math.min(index + 1, visibleSteps.length - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goBack = () => {
    setCurrentStepIndex((index) => Math.max(index - 1, 0));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const validateProtection = () => {
    const nextErrors: Record<string, string> = {};
    const lastSubmitAt = Number(window.localStorage.getItem(LAST_SUBMIT_KEY) || 0);
    const secondsSinceLastSubmit = (Date.now() - lastSubmitAt) / 1000;
    const secondsSinceStart = (Date.now() - startedAt) / 1000;

    if (honeypot.trim()) {
      nextErrors.protection = copy.protectionFailed;
    }

    if (secondsSinceStart < 8) {
      nextErrors.protection = copy.tooFast;
    }

    if (secondsSinceLastSubmit < 60) {
      nextErrors.protection = copy.rateLimited;
    }

    if (Number(challengeAnswer) !== challenge.expected) {
      nextErrors.challenge = copy.wrongChallenge;
    }

    setErrors((previous) => ({ ...previous, ...nextErrors }));
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async () => {
    const allFieldsValid = validateFields(getAllVisibleFields(answers, inquirySteps));
    if (!allFieldsValid || !validateProtection()) return;

    setSubmitState("submitting");
    setSubmitMessage("");

    try {
      const result = await submitInquiry(answers, language, inquirySteps, copy, { honeypot, startedAt });
      window.localStorage.setItem(LAST_SUBMIT_KEY, String(Date.now()));
      window.localStorage.removeItem(STORAGE_KEY);
      setSubmitMessage(result.fallbackMailto ? copy.noEndpoint : "");
      setSubmitState("success");
    } catch (error) {
      setSubmitState("error");
      setSubmitMessage(`${copy.errorTitle} Provjerite vezu ili pokušajte ponovo.`);
      setChallenge(createChallenge());
      setChallengeAnswer("");
    }
  };

  if (submitState === "success") {
    return (
      <div className="min-h-screen bg-background">
        <SEOHead title={copy.seoTitle} description={copy.seoDescription} noIndex />
        <WizionarHeader />
        <main className="pt-32">
          <section className="container mx-auto px-6 py-20">
            <div className="mx-auto max-w-2xl rounded-2xl border border-border bg-background p-8 text-center shadow-lg">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                <CheckCircle2 className="h-7 w-7" />
              </div>
              <h1 className="mb-3 text-3xl font-bold">{copy.successTitle}</h1>
              <p className="text-muted-foreground">{copy.successText}</p>
              {submitMessage ? (
                <p className="mt-5 rounded-xl bg-secondary p-4 text-sm text-muted-foreground">{submitMessage}</p>
              ) : null}
            </div>
          </section>
        </main>
        <WizionarFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      <SEOHead
        title={copy.seoTitle}
        description={copy.seoDescription}
        keywords={["projektni upitnik", "izrada web stranica", "web shop", "web aplikacija", "booking sistem"]}
        schema={[
          createWebPageSchema({
            language,
            path: PROJECT_INQUIRY_PATH,
            title: copy.seoTitle,
            description: copy.seoDescription,
          }),
          createBreadcrumbSchema(language, [
            { name: getSeoLabel(language, "home"), path: "/" },
            { name: "Projektni upitnik", path: PROJECT_INQUIRY_PATH },
          ]),
        ]}
      />
      <WizionarHeader />
      <main className="pt-28">
        <section className="container mx-auto px-6 pb-8 pt-10">
          <div className="mx-auto max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="mb-8"
            >
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
                <ClipboardList className="h-4 w-4" />
                {copy.badge}
              </div>
              <h1 className="max-w-3xl text-4xl font-bold tracking-tight md:text-5xl">{copy.title}</h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">{copy.subtitle}</p>
            </motion.div>

            <div className="mx-auto max-w-4xl">
              <motion.form
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.08 }}
                className="rounded-2xl border border-border bg-background p-5 shadow-lg md:p-8"
                onSubmit={(event) => {
                  event.preventDefault();
                  if (currentStepIndex === visibleSteps.length - 1) {
                    void handleSubmit();
                  } else {
                    goNext();
                  }
                }}
              >
                <input
                  type="text"
                  value={honeypot}
                  onChange={(event) => setHoneypot(event.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  name="website_url"
                  aria-hidden="true"
                />

                <div className="mb-8">
                  <div className="mb-3 flex items-center justify-between gap-4 text-sm text-muted-foreground">
                    <span>
                      {copy.step} {currentStepIndex + 1}/{visibleSteps.length}
                    </span>
                    <span>
                      {copy.progress} {progress}%
                    </span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>

                {currentStepIndex === 0 ? (
                  <div className="mb-8 rounded-xl border border-primary/15 bg-primary/5 p-4">
                    <h2 className="mb-2 text-lg font-bold">{copy.introTitle}</h2>
                    <p className="text-sm leading-6 text-muted-foreground">{copy.introText}</p>
                  </div>
                ) : null}

                <div className="mb-8">
                  <p className="mb-2 text-sm font-semibold text-primary">{currentStep.eyebrow}</p>
                  <h2 className="text-2xl font-bold">{currentStep.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{currentStep.description}</p>
                </div>

                <div className="space-y-7">
                  {currentFields.map((field) => (
                    <QuestionRenderer
                      key={field.key}
                      field={field}
                      value={answers[field.key]}
                      error={errors[field.key]}
                      onChange={updateAnswer}
                    />
                  ))}

                  {currentStepIndex === visibleSteps.length - 1 ? (
                    <div className="space-y-4">
                      <SecurityChallenge
                        challenge={challenge}
                        value={challengeAnswer}
                        title={copy.challengeTitle}
                        placeholder={copy.challengePlaceholder}
                        onChange={(value) => {
                          setChallengeAnswer(value);
                          setErrors((previous) => {
                            const next = { ...previous };
                            delete next.challenge;
                            return next;
                          });
                        }}
                        error={errors.challenge}
                      />
                      {errors.protection ? <p className="text-sm font-medium text-destructive">{errors.protection}</p> : null}
                    </div>
                  ) : null}
                </div>

                {submitState === "error" ? (
                  <div className="mt-6 rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
                    {submitMessage}
                  </div>
                ) : null}

                <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={goBack}
                    disabled={currentStepIndex === 0 || submitState === "submitting"}
                    className="h-12 rounded-xl gap-2"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    {copy.back}
                  </Button>
                  <Button type="submit" disabled={submitState === "submitting"} className="h-12 rounded-xl gap-2 shadow-orange">
                    {submitState === "submitting" ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        {copy.sending}
                      </>
                    ) : currentStepIndex === visibleSteps.length - 1 ? (
                      <>
                        <Mail className="h-4 w-4" />
                        {copy.submit}
                      </>
                    ) : (
                      <>
                        {currentStepIndex === 0 ? copy.start : copy.next}
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </motion.form>
            </div>
          </div>
        </section>
      </main>
      <WizionarFooter />
    </div>
  );
};

export default ProjectInquiry;
