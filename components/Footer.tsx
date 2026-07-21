export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#070707]/95 py-12 text-slate-400">
      <div className="container grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <p className="mb-3 text-sm uppercase tracking-[0.36em] text-slate-300/80">ONBEAT</p>
          <p className="max-w-2xl text-sm leading-7 text-slate-400">
            Made for people who move. A refined playlist experience that keeps your workout in rhythm.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-6 text-sm text-slate-300">
          <a href="https://github.com" target="_blank" rel="noreferrer" className="transition hover:text-white">
            Github
          </a>
          <a href="#privacy" className="transition hover:text-white">
            Privacy
          </a>
          <a href="#contact" className="transition hover:text-white">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
