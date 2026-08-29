import { CloudSun, Shirt, Plane, MapPin, ArrowUpRight } from "lucide-react";
import { infoSection } from "@/config";
import { useReveal } from "@/hooks/useReveal";
import { SectionHeader } from "@/components/shared/SectionHeader";

const icons = {
    weather: CloudSun,
    attire: Shirt,
    travel: Plane,
    explore: MapPin,
};

const InfoCard = ({ card, delay }) => {
    const Icon = icons[card.icon];
    const body = (
        <>
            <div className="flex items-center gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#B08D3F]/45 bg-[#FAF5EC]">
                    <Icon className="h-5 w-5 text-[#B08D3F]" strokeWidth={1.5} />
                </span>
                <h3 className="font-display text-3xl text-[#2B2620]">
                    {card.title}
                </h3>
                {card.href && (
                    <ArrowUpRight className="ml-auto h-4 w-4 text-[#B08D3F]" />
                )}
            </div>
            <p className="mt-4 text-base leading-relaxed text-[#2B2620]/70">
                {card.text}
            </p>
            {card.href && (
                <span className="mt-3 inline-block text-sm font-medium tracking-[0.06em] text-[#B08D3F] underline decoration-[#B08D3F]/50 underline-offset-4 transition-colors group-hover:text-[#8A5A1E]">
                    {card.linkLabel || "Read more"}
                </span>
            )}
        </>
    );
    const cls = `reveal ${delay} group block rounded-3xl border border-[#B08D3F]/20 bg-[#F2EADA]/60 p-7 transition-[border-color,box-shadow] duration-300 hover:border-[#B08D3F]/50 hover:shadow-[0_24px_50px_-30px_rgba(43,38,32,0.35)]`;
    return card.href ? (
        <a
            data-testid={`info-card-${card.id}`}
            href={card.href}
            target="_blank"
            rel="noopener noreferrer"
            className={cls}
        >
            {body}
        </a>
    ) : (
        <div data-testid={`info-card-${card.id}`} className={cls}>
            {body}
        </div>
    );
};

export const ThingsToKnow = () => {
    const ref = useReveal();
    const delays = ["reveal-delay-1", "reveal-delay-2", "reveal-delay-1", "reveal-delay-2"];
    return (
        <section
            ref={ref}
            data-testid="things-to-know"
            aria-label="Things to know"
            className="relative px-6 py-16 md:py-24"
        >
            <div className="mx-auto max-w-4xl">
                <SectionHeader
                    eyebrow="Guest Guide"
                    title={infoSection.title}
                    testId="info-title"
                />
                <div className="mt-10 grid gap-6 sm:grid-cols-2 md:mt-12 md:gap-8">
                    {infoSection.cards.map((card, i) => (
                        <InfoCard key={card.id} card={card} delay={delays[i]} />
                    ))}
                </div>
            </div>
        </section>
    );
};
