import { meetTheCouple } from "@/config";
import { useReveal } from "@/hooks/useReveal";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { PhotoFrame } from "./PhotoFrame";

export const MeetTheCouple = () => {
    const ref = useReveal();
    return (
        <section
            ref={ref}
            data-testid="meet-the-couple"
            aria-label="Meet the couple"
            className="relative px-6 py-16 md:py-24"
        >
            <div className="mx-auto max-w-3xl">
                <SectionHeader
                    eyebrow="The Two of Us"
                    title={meetTheCouple.title}
                    testId="couple-title"
                />
                <p className="reveal reveal-delay-1 mx-auto mt-8 max-w-2xl text-center font-display text-2xl italic leading-relaxed text-[#2B2620]/85 md:text-3xl">
                    {meetTheCouple.intro}
                </p>
                <div className="mt-12">
                    <PhotoFrame photos={meetTheCouple.photos} />
                </div>
            </div>
        </section>
    );
};
