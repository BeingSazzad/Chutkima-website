import Logo from "@/components/ui/Logo";

export interface LegalSection {
  heading: string;
  body: string | string[];
}

export default function LegalDoc({
  title,
  updated,
  intro,
  sections,
}: {
  title: string;
  updated: string;
  intro?: string;
  sections: LegalSection[];
}) {
  return (
    <div className="shell py-10">
      <div className="mx-auto max-w-3xl">
        <div className="card overflow-hidden">
          <div className="flex items-center gap-3 bg-gradient-to-br from-brand-600 to-brand-800 px-6 py-7 text-white">
            <Logo variant="light" href={null} withText={false} />
            <div>
              <h1 className="text-xl font-extrabold tracking-tight">{title}</h1>
              <p className="text-xs text-white/70">Last updated: {updated}</p>
            </div>
          </div>

          <div className="space-y-6 px-6 py-7">
            {intro && <p className="text-sm leading-relaxed text-ink-soft">{intro}</p>}
            {sections.map((s, i) => (
              <section key={i}>
                <h2 className="text-base font-bold text-ink">{s.heading}</h2>
                {Array.isArray(s.body) ? (
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed text-ink-soft">
                    {s.body.map((b, j) => (
                      <li key={j}>{b}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{s.body}</p>
                )}
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
