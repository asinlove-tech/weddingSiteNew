import { useRef, useEffect } from "react";
import { blessing, couple, images } from "@/config";
import { useRafScroll } from "@/hooks/useRafScroll";
import { useReveal } from "@/hooks/useReveal";
import { Ornament } from "@/components/shared/Ornament";

export const TempleBlessing = () => {
    const sectionRef = useRef(null);
    const ganeshaWrapperRef = useRef(null);
    const shrineImgRef = useRef(null);

    const revealRef = useReveal();
    const namesRef = useRef(null);
    const namesContainerRef = useRef(null);

    // ---------------------------------------------------------
    // Ganesha positioning
    //
    // Ganesha is anchored to the Gopuram itself.
    //
    // The TOP of Ganesha sits 30px below the bottom of
    // the rendered Gopuram image.
    //
    // This calculation happens only when layout changes.
    // It does NOT happen during scroll.
    // ---------------------------------------------------------
    useEffect(() => {
        const positionGanesha = () => {
            const section = sectionRef.current;
            const wrapper = ganeshaWrapperRef.current;

            if (!section || !wrapper) return;

            const templeStage =
                document.querySelector(".temple-stage-img");

            if (!templeStage) return;

            const gopuramRect =
                templeStage.getBoundingClientRect();

            /*
             * Convert Gopuram bottom from viewport coordinates
             * to document coordinates.
             */
            const gopuramBottomDocumentY =
                gopuramRect.bottom + window.scrollY;

            /*
             * This is the visual gap between:
             *
             *     Gopuram bottom
             *           ↓
             *        30px
             *           ↓
             *     Ganesha top
             */
            const GANESHA_GOPURAM_GAP = 30;

            const ganeshaTopDocumentY =
                gopuramBottomDocumentY +
                GANESHA_GOPURAM_GAP;

            /*
             * Find where the Ganesha wrapper currently starts
             * in the document.
             */
            const wrapperTopDocumentY =
                wrapper.getBoundingClientRect().top +
                window.scrollY;

            /*
             * The spacer pushes the Ganesha down until its
             * top reaches the desired Gopuram-relative position.
             */
            const spacerHeight =
                ganeshaTopDocumentY -
                wrapperTopDocumentY;

            /*
             * Don't allow negative spacing.
             */
            const finalSpacerHeight =
                Math.max(0, spacerHeight);

            /*
             * The wrapper contains the spacer, so this pushes
             * the actual Ganesha image to the desired location.
             */
            const spacer =
                wrapper.querySelector(
                    "[data-ganesha-spacer]"
                );

            if (spacer) {
                spacer.style.height =
                    `${finalSpacerHeight}px`;
            }
        };

        /*
         * Run after the initial layout.
         */
        const frame =
            requestAnimationFrame(positionGanesha);

        /*
         * Recalculate if the viewport changes.
         */
        window.addEventListener(
            "resize",
            positionGanesha
        );

        /*
         * Also recalculate when the Gopuram image finishes
         * loading, because its rendered dimensions may not
         * exist during the first frame.
         */
        const templeStage =
            document.querySelector(".temple-stage-img");

        if (templeStage instanceof HTMLImageElement) {
            templeStage.addEventListener(
                "load",
                positionGanesha
            );
        }

        return () => {
            cancelAnimationFrame(frame);

            window.removeEventListener(
                "resize",
                positionGanesha
            );

            if (templeStage instanceof HTMLImageElement) {
                templeStage.removeEventListener(
                    "load",
                    positionGanesha
                );
            }
        };
    }, []);

    // ---------------------------------------------------------
    // Scroll
    //
    // Ganesha ONLY scales.
    //
    // No translate.
    // No position changes.
    // No opacity changes.
    // No spacer changes.
    // ---------------------------------------------------------
    useRafScroll(() => {
        const section = sectionRef.current;
        const img = shrineImgRef.current;

        if (!section || !img) return;

        const vh = window.innerHeight;
        const rect = section.getBoundingClientRect();

        /*
         * Preserve the original scale progression.
         *
         * p = 0 → scale 1
         * p = 1 → scale 0.65
         */
        const p = Math.min(
            1,
            Math.max(
                0,
                (vh * 0.9 - rect.top) /
                    (vh * 1.15)
            )
        );

        const scale =
            1 - p * 0.35;

        /*
         * IMPORTANT:
         * Bottom-center is the anchor while scaling.
         *
         * The Ganesha therefore scales upward from its
         * anchored bottom rather than moving around its center.
         */
        img.style.transformOrigin =
            "center bottom";

        img.style.transform =
            `scale(${scale})`;

        // -----------------------------------------------------
        // Names transition
        // -----------------------------------------------------
        const namesContainer =
            namesContainerRef.current;

        const namesEl =
            namesRef.current;

        if (!namesContainer || !namesEl) return;

        const ncRect =
            namesContainer.getBoundingClientRect();

        const range = Math.max(
            1,
            Math.round(vh * 0.45)
        );

        const start = Math.max(
            0,
            -ncRect.top
        );

        const t = Math.min(
            1,
            start / range
        );

        namesEl.style.opacity =
            String(1 - t);

        namesEl.style.transform =
            `translateY(${-t * 20}px)`;

        namesEl.style.filter =
            `blur(${t * 4}px)`;
    });

    // ---------------------------------------------------------
    // Initial names animation
    // ---------------------------------------------------------
    useEffect(() => {
        if (!namesRef.current) return;

        namesRef.current.style.opacity = "0";
        namesRef.current.style.filter =
            "blur(6px)";
        namesRef.current.style.transform =
            "translateY(18px)";

        try {
            namesRef.current.animate(
                [
                    {
                        opacity: 0,
                        filter: "blur(6px)",
                        transform: "translateY(18px)",
                    },
                    {
                        opacity: 1,
                        filter: "blur(0px)",
                        transform: "translateY(0)",
                    },
                ],
                {
                    duration: 700,
                    easing:
                        "cubic-bezier(0.2,0.8,0.2,1)",
                    fill: "forwards",
                }
            );
        } catch (e) {
            namesRef.current.style.opacity = "1";
            namesRef.current.style.filter = "none";
            namesRef.current.style.transform =
                "translateY(0)";
        }
    }, []);

    return (
        <section
            ref={(el) => {
                sectionRef.current = el;
                revealRef.current = el;
            }}
            data-testid="temple-blessing"
            aria-label="Blessing and invitation"
            className="relative px-6 pb-16 pt-16 md:pb-24 md:pt-20"
        >
            <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center">

                {/* -------------------------------------------------
                    Names
                ------------------------------------------------- */}
                <div
                    ref={namesContainerRef}
                    className="relative w-full"
                >
                    <div className="flex w-full justify-center items-start pointer-events-none">
                        <div
                            ref={namesRef}
                            className="relative opacity-100 will-change-transform pointer-events-auto pt-[1vh] text-center"
                            style={{ zIndex: 10 }}
                        >
                            <h1 className="hero-names relative font-display font-medium uppercase">
                                <span className="block whitespace-nowrap text-[1.45rem] tracking-[0.08em] sm:text-6xl sm:tracking-[0.18em] lg:text-7xl">
                                    {couple.groom}
                                </span>

                                <span className="hero-and my-3 block text-xs tracking-[0.55em] sm:my-5 sm:text-sm">
                                    {blessing.join}
                                </span>

                                <span className="block whitespace-nowrap text-[1.45rem] tracking-[0.08em] sm:text-6xl sm:tracking-[0.18em] lg:text-7xl">
                                    {couple.bride}
                                </span>
                            </h1>
                        </div>
                    </div>
                </div>

                {/* -------------------------------------------------
                    Ganesha
                ------------------------------------------------- */}
                <div
                    ref={ganeshaWrapperRef}
                    className="relative mt-8 md:mt-12"
                    style={{
                        isolation: "isolate",
                    }}
                >
                    {/* Green glow */}
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl md:h-[340px] md:w-[340px]"
                        style={{
                            background:
                                "radial-gradient(circle, rgba(39, 82, 65, 0.2) 0%, rgba(64, 145, 112, 0.10) 45%, transparent 72%)",
                        }}
                    />

                    {/* 
                        This is ONLY layout spacing.
                        
                        It is calculated from:
                        
                        Gopuram bottom
                              +
                            30px
                              =
                        Ganesha top
                    */}
                    <div
                        data-ganesha-spacer
                        style={{ height: 0 }}
                    />

                    <img
                        ref={shrineImgRef}
                        data-testid="ganesha-image"
                        src="/weddingSiteNew/images/ganesha.webp"
                        alt="Lord Ganesha golden line artwork"
                        className="h-[38vw] max-h-[320px] min-h-[180px] w-auto will-change-transform [filter:drop-shadow(0_8px_34px_rgba(240,226,180,0.45))] [mask-image:linear-gradient(180deg,black_92%,transparent)] md:h-[400px]"
                    />
                </div>

                {/* -------------------------------------------------
                    Blessing text
                ------------------------------------------------- */}
                <div
                    data-testid="blessing-text"
                    className="relative mt-4 flex w-full max-w-2xl flex-col items-center gap-5 px-6 py-14 text-center md:max-w-3xl md:py-16"
                >
                    <div
                        aria-hidden="true"
                        className="absolute -inset-x-10 -inset-y-8 -z-10 md:-inset-x-28 md:-inset-y-10"
                        style={{
                            background:
                                "radial-gradient(ellipse 62% 60% at 50% 50%, rgba(250,245,236,0.8) 0%, rgba(250,245,236,0.38) 55%, rgba(250,245,236,0) 85%)",
                        }}
                    />

                    <p className="reveal text-xs font-medium uppercase tracking-[0.32em] text-[#2B2620]/70">
                        {blessing.overline}
                    </p>

                    <p className="reveal reveal-delay-1 text-base leading-relaxed tracking-[0.08em] text-[#2B2620]/75">
                        {blessing.invite}
                    </p>

                    <p className="reveal reveal-delay-2 font-display text-5xl font-medium leading-tight text-[#2B2620] md:text-6xl">
                        {couple.groom}
                    </p>

                    <p className="reveal reveal-delay-2 font-display text-4xl italic text-[#B08D3F] md:text-5xl">
                        {blessing.join}
                    </p>

                    <p className="reveal reveal-delay-3 font-display text-5xl font-medium leading-tight text-[#2B2620] md:text-6xl">
                        {couple.bride}
                    </p>

                    <div className="reveal reveal-delay-3 py-1">
                        <Ornament />
                    </div>

                    <p className="reveal reveal-delay-3 font-display text-3xl text-[#2B2620] md:text-4xl">
                        {blessing.dateLine}
                    </p>

                    <p className="reveal reveal-delay-3 text-base uppercase tracking-[0.28em] text-[#B08D3F]">
                        {blessing.placeLine}
                    </p>

                    <p className="reveal reveal-delay-3 max-w-md text-base leading-relaxed tracking-[0.08em] text-[#2B2620]/75">
                        {blessing.request}
                    </p>
                </div>
            </div>
        </section>
    );
};