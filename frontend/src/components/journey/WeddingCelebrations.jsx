import { events } from "@/config";
import { useReveal } from "@/hooks/useReveal";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { EventCard } from "./EventCard";

export const WeddingCelebrations = () => {
    const ref = useReveal();
    return (
        <section
            ref={ref}
            data-testid="wedding-celebrations"
            aria-label="Wedding celebrations"
            className="relative px-6 pb-16 pt-4 md:pb-24"
        >
            <div className="relative z-10 mx-auto max-w-4xl">
                <SectionHeader
                    eyebrow="The Festivities"
                    title="Wedding Celebrations"
                    testId="celebrations-title"
                />
                <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-2 md:gap-14">
                    {events.map((event, i) => (
                        <EventCard
                            key={event.id}
                            event={event}
                            delay={i === 0 ? "reveal-delay-1" : "reveal-delay-2"}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};
