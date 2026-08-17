import Image from "next/image";
import Reveal from "./Reveal";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description?: string;
  image?: string;
  /** Optional background video — falls back to `image`/poster automatically
      for prefers-reduced-motion (Tailwind's motion-reduce: variant, no JS
      needed since this stays a server component). */
  video?: string;
}

export default function PageHero({ eyebrow, title, description, image, video }: PageHeroProps) {
  return (
    <section className="relative flex min-h-[52vh] items-end overflow-hidden bg-charcoal pt-32">
      {video ? (
        <>
          <video
            className="absolute inset-0 h-full w-full object-cover opacity-50 motion-reduce:hidden"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={image}
          >
            <source src={video} type="video/mp4" />
          </video>
          {image ? (
            <Image
              src={image}
              alt=""
              fill
              priority
              sizes="100vw"
              className="hidden object-cover opacity-50 motion-reduce:block"
            />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/70 to-charcoal/40" />
        </>
      ) : image ? (
        <>
          <Image src={image} alt="" fill priority sizes="100vw" className="object-cover opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/70 to-charcoal/40" />
        </>
      ) : null}
      <div className="container-edit relative z-10 pb-16 sm:pb-20">
        <Reveal>
          <p className="eyebrow mb-4 text-warm/80">{eyebrow}</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="text-balance font-display text-4xl font-semibold leading-[1.05] text-warm sm:text-5xl lg:text-6xl">
            {title}
          </h1>
        </Reveal>
        {description ? (
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-xl text-warm/75">{description}</p>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
