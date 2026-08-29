import { venue } from "@/config";
import { useReveal } from "@/hooks/useReveal";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { PrimaryButton } from "@/components/shared/PrimaryButton";

export const Venue = () => {
    const ref = useReveal();
    return (
        <section
            ref={ref}
            data-testid="venue"
            aria-label="Venue"
            className="relative px-6 py-16 md:py-24"
        >
            <div className="mx-auto flex max-w-2xl flex-col items-center gap-8 text-center">
                <SectionHeader
                    eyebrow="Where We Celebrate"
                    title={venue.title}
                    testId="venue-title"
                />
                <img
                    src={venue.image}
                    alt={venue.imageAlt}
                    loading="lazy"
                    data-testid="venue-illustration"
                    className="reveal reveal-delay-1 h-auto w-full max-w-[18rem] object-contain sm:max-w-[22rem] md:max-w-[28rem] lg:max-w-[32rem]"
                />
                <div className="reveal reveal-delay-2">
                    <p className="font-display text-3xl italic text-[#2B2620] md:text-4xl">
                        {venue.place}
                    </p>
                    <p className="mt-3 text-base tracking-[0.06em] text-[#2B2620]/65">
                        {venue.note}
                    </p>
                </div>
                <div className="reveal reveal-delay-3">
                    <PrimaryButton href={venue.mapsUrl} testId="venue-maps-button">
                        {venue.mapsLabel}
                    </PrimaryButton>
                </div>
            </div>
        </section>
    );
};
