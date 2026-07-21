interface SectionHeadingProps {
  title: string;
  subtitle: string;
  description?: string;
}

export function SectionHeading({ title, subtitle, description }: SectionHeadingProps) {
  return (
    <div className="space-y-4">
      <p className="text-sm font-semibold uppercase tracking-[0.28em] text-violet-300">{subtitle}</p>
      <h2 className="max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">{title}</h2>
      {description ? <p className="max-w-2xl text-base leading-7 text-slate-300">{description}</p> : null}
    </div>
  );
}
