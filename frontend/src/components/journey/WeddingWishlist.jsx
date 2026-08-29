import { wishlist } from "@/config";
import { useReveal } from "@/hooks/useReveal";
import { PrimaryButton } from "@/components/shared/PrimaryButton";
import { SectionHeader } from "@/components/shared/SectionHeader";

export const WeddingWishlist = () => {
    const ref = useReveal();
    return (
        <section
            ref={ref}
            data-testid="wedding-wishlist"
            aria-label="Wedding wishlist"
            className="relative px-6 py-16 md:py-24"
        >
            <div className="mx-auto flex max-w-2xl flex-col items-center gap-8 text-center">
                <SectionHeader title={wishlist.title} testId="wishlist-title" />
                <p
                    data-testid="wishlist-message"
                    className="reveal reveal-delay-1 font-display text-2xl italic leading-relaxed text-[#2B2620]/85 md:text-3xl"
                >
                    {wishlist.message}
                </p>
                <div className="reveal reveal-delay-2">
                    <PrimaryButton href={wishlist.url} testId="wishlist-button">
                        {wishlist.buttonLabel}
                    </PrimaryButton>
                </div>
            </div>
        </section>
    );
};
