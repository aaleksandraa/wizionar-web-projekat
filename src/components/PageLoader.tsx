const PageLoader = () => {
  return (
    <div className="flex min-h-[40vh] items-center justify-center px-6 py-16">
      <div className="flex flex-col items-center gap-4 text-center" role="status" aria-live="polite">
        <div
          className="h-10 w-10 animate-spin rounded-full border-2 border-primary/20 border-t-primary"
          aria-hidden="true"
        />
        <p className="text-sm font-medium text-muted-foreground">Loading page...</p>
      </div>
    </div>
  );
};

export default PageLoader;
