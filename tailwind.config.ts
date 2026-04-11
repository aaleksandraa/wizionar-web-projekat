import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const withOpacity = (cssVariable: string) => `hsla(var(${cssVariable}), <alpha-value>)`;

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['"DM Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        border: withOpacity("--border"),
        input: withOpacity("--input"),
        ring: withOpacity("--ring"),
        background: withOpacity("--background"),
        foreground: withOpacity("--foreground"),
        primary: {
          DEFAULT: withOpacity("--primary"),
          foreground: withOpacity("--primary-foreground"),
        },
        secondary: {
          DEFAULT: withOpacity("--secondary"),
          foreground: withOpacity("--secondary-foreground"),
        },
        destructive: {
          DEFAULT: withOpacity("--destructive"),
          foreground: withOpacity("--destructive-foreground"),
        },
        muted: {
          DEFAULT: withOpacity("--muted"),
          foreground: withOpacity("--muted-foreground"),
        },
        accent: {
          DEFAULT: withOpacity("--accent"),
          foreground: withOpacity("--accent-foreground"),
        },
        popover: {
          DEFAULT: withOpacity("--popover"),
          foreground: withOpacity("--popover-foreground"),
        },
        card: {
          DEFAULT: withOpacity("--card"),
          foreground: withOpacity("--card-foreground"),
        },
        sidebar: {
          DEFAULT: withOpacity("--sidebar-background"),
          foreground: withOpacity("--sidebar-foreground"),
          primary: withOpacity("--sidebar-primary"),
          "primary-foreground": withOpacity("--sidebar-primary-foreground"),
          accent: withOpacity("--sidebar-accent"),
          "accent-foreground": withOpacity("--sidebar-accent-foreground"),
          border: withOpacity("--sidebar-border"),
          ring: withOpacity("--sidebar-ring"),
        },
        orange: {
          DEFAULT: withOpacity("--orange"),
          light: withOpacity("--orange-light"),
          dark: withOpacity("--orange-dark"),
          glow: withOpacity("--orange-glow"),
        },
        emerald: {
          DEFAULT: withOpacity("--emerald"),
          glow: withOpacity("--emerald-glow"),
        },
        navy: {
          deep: withOpacity("--navy-deep"),
          light: withOpacity("--navy-light"),
        },
        cyan: {
          DEFAULT: withOpacity("--cyan"),
          glow: withOpacity("--cyan-glow"),
          light: withOpacity("--cyan-light"),
        },
        teal: {
          DEFAULT: withOpacity("--teal"),
          glow: withOpacity("--teal-glow"),
        },
        violet: {
          DEFAULT: withOpacity("--violet"),
          glow: withOpacity("--violet-glow"),
        },
        rose: {
          DEFAULT: withOpacity("--rose"),
          glow: withOpacity("--rose-glow"),
        },
        gold: withOpacity("--gold"),
        slate: {
          50: withOpacity("--slate-50"),
          100: withOpacity("--slate-100"),
          200: withOpacity("--slate-200"),
          400: withOpacity("--slate-400"),
          600: withOpacity("--slate-600"),
          800: withOpacity("--slate-800"),
          900: withOpacity("--slate-900"),
        },
        wf: {
          background: withOpacity("--wf-background"),
          foreground: withOpacity("--wf-foreground"),
          card: withOpacity("--wf-card"),
          secondary: withOpacity("--wf-secondary"),
          muted: withOpacity("--wf-muted"),
          "muted-foreground": withOpacity("--wf-muted-foreground"),
          border: withOpacity("--wf-border"),
        },
        wmr: {
          background: withOpacity("--wmr-background"),
          foreground: withOpacity("--wmr-foreground"),
          card: withOpacity("--wmr-card"),
          secondary: withOpacity("--wmr-secondary"),
          muted: withOpacity("--wmr-muted"),
          "muted-foreground": withOpacity("--wmr-muted-foreground"),
          border: withOpacity("--wmr-border"),
        },
        wm: {
          background: withOpacity("--wm-background"),
          foreground: withOpacity("--wm-foreground"),
          card: withOpacity("--wm-card"),
          secondary: withOpacity("--wm-secondary"),
          muted: withOpacity("--wm-muted"),
          "muted-foreground": withOpacity("--wm-muted-foreground"),
          border: withOpacity("--wm-border"),
        },
        ck: {
          background: withOpacity("--ck-background"),
          foreground: withOpacity("--ck-foreground"),
          card: withOpacity("--ck-card"),
          secondary: withOpacity("--ck-secondary"),
          muted: withOpacity("--ck-muted"),
          "muted-foreground": withOpacity("--ck-muted-foreground"),
          border: withOpacity("--ck-border"),
        },
        friz: {
          background: withOpacity("--friz-background"),
          foreground: withOpacity("--friz-foreground"),
          card: withOpacity("--friz-card"),
          secondary: withOpacity("--friz-secondary"),
          muted: withOpacity("--friz-muted"),
          "muted-foreground": withOpacity("--friz-muted-foreground"),
          border: withOpacity("--friz-border"),
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-slow": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.6s ease-out forwards",
        "fade-in-slow": "fade-in-slow 1s ease-out forwards",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "slide-up": "slide-up 0.5s ease-out forwards",
        "shimmer": "shimmer 2s linear infinite",
      },
      boxShadow: {
        "glow": "var(--shadow-glow)",
        "glow-emerald": "var(--shadow-emerald-glow)",
        "orange": "var(--shadow-orange)",
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
