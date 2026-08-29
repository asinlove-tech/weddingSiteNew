import { rsvp } from "@/config";
import { useReveal } from "@/hooks/useReveal";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { PrimaryButton } from "@/components/shared/PrimaryButton";

export const Rsvp = () => {
    const ref = useReveal();
    return (
        <section
            ref={ref}
            data-testid="rsvp"
            aria-label="RSVP"
            className="relative px-6 py-16 md:py-24"
        >
            <div className="mx-auto flex max-w-xl flex-col items-center gap-8 text-center">
                <SectionHeader title={rsvp.title} testId="rsvp-title" />
                <p className="reveal reveal-delay-1 text-base leading-relaxed tracking-[0.06em] text-[#2B2620]/70">
                    {rsvp.note}
                </p>
                <div className="reveal reveal-delay-2">
                    <PrimaryButton href={rsvp.url} testId="rsvp-button">
                        {rsvp.buttonLabel}
                    </PrimaryButton>
                </div>
                {rsvp.contact && (
                    <p className="reveal reveal-delay-3 text-sm tracking-[0.1em] text-[#2B2620]/55">
                        {rsvp.contact}
                    </p>
                )}
            </div>
        </section>
    );
};
