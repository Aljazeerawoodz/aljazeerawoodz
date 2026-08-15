import Reveal from "./Reveal";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  align?: "start" | "center";
  size?: "md" | "lg";
  className?: string;
}

export default function SectionHeading({ eyebrow, title, align = "start", size = "lg", className }: SectionHeadingProps) {
  return (
    <div className={`${align === "center" ? "text-center" : "text-start"} ${className ?? ""}`}>
      {eyebrow ? (
        <Reveal>
          <p className="eyebrow mb-4">{eyebrow}</p>
        </Reveal>
      ) : null}
      <Reveal delay={0.08}>
        <h2
          className={`text-balance font-display font-semibold leading-[1.05] text-charcoal ${
            size === "lg" ? "text-4xl sm:text-5xl lg:text-6xl" : "text-3xl sm:text-4xl"
          }`}
        >
          {title}
        </h2>
      </Reveal>
    </div>
  );
}
