export default function Loading() {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#e4e6ef] dark:bg-[#030711] transition-colors duration-500 px-4"
      role="status"
      aria-live="polite"
    >
      <div className="flex flex-col items-center gap-8">
        <div className="relative h-28 w-28">
          <div className="absolute inset-0 rounded-full bg-white/40 dark:bg-white/10 blur-lg"></div>
          <div className="absolute inset-2 rounded-full border border-white/40 dark:border-white/10"></div>
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary border-l-primary animate-spin duration-1000"></div>
          <div className="absolute inset-6 rounded-full bg-white dark:bg-[#111f3c] shadow-inner"></div>
          <div className="absolute inset-8 rounded-full bg-primary/10 animate-pulse"></div>
        </div>

        <div className="text-center space-y-2">
          <p className="text-xs uppercase tracking-[0.4em] text-dark/50 dark:text-white/60">
            Loading
          </p>
          <p className="text-2xl font-semibold text-dark dark:text-white">
            Preparing project details
          </p>
          <p className="text-sm text-dark/60 dark:text-gray-300">
            Optimizing view and fetching assets
          </p>
        </div>
      </div>
    </div>
  );
}
