import { useRef, useEffect } from "react";
import { blessing, couple, images } from "@/config";
import { useRafScroll } from "@/hooks/useRafScroll";
import { useReveal } from "@/hooks/useReveal";
import { Ornament } from "@/components/shared/Ornament";

export const TempleBlessing = () => {
    const sectionRef = useRef(null);
    const shrineImgRef = useRef(null);
    const spacerRef = useRef(null);
    const revealRef = useReveal();

    const namesRef = useRef(null);
    const namesContainerRef = useRef(null);

    const layoutRef = useRef({
        lastSpacerHeight: null,
    });

    useRafScroll(() => {
        const section = sectionRef.current;
        const img = shrineImgRef.current;
        const spacer = spacerRef.current;
        const namesContainer =
            namesContainerRef.current;
        const namesEl = namesRef.current;

        if (!section || !img) return;

        const vh = window.innerHeight;

        const rect =
            section.getBoundingClientRect();

        const ncRect = namesContainer
            ? namesContainer.getBoundingClientRect()
            : null;

        const revealRect = spacer
            ? spacer.parentElement.getBoundingClientRect()
            : null;

        const imgHeight = img.offsetHeight;

        const sectionRelevant =
            rect.top < vh * 1.5 &&
            rect.bottom > -vh * 0.5;

        const templeStage = sectionRelevant
            ? document.querySelector(
                  ".temple-stage-img"
              )
            : null;

        const carpetDocumentY =
            templeStage?.parentElement
                ? Number(
                      templeStage.parentElement
                          .dataset
                          .carpetDocumentY
                  )
                : NaN;

        let spacerHeight = null;

        if (
            spacer &&
            revealRect &&
            sectionRelevant
        ) {
            const MAX_SPACER =
                Math.round(vh * 6);

            const revealTopDocY =
                revealRect.top + window.scrollY;

            const ganeshaTopOffset =
                imgHeight > 0
                    ? imgHeight * 0.3
                    : vh * 0.3;

            const computed =
                Number.isFinite(carpetDocumentY)
                    ? Math.round(
                          carpetDocumentY -
                              revealTopDocY -
                              ganeshaTopOffset
                      )
                    : Math.round(vh * 0.5);

            spacerHeight = Math.max(
                0,
                Math.min(
                    MAX_SPACER,
                    computed
                )
            );
        }

        // Names animation.
        let namesOpacity = 1;
        let namesTranslate = 0;
        let namesBlur = 0;

        if (ncRect) {
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

            namesOpacity = 1 - t;
            namesTranslate =
                Math.round(-t * 20);

            namesBlur =
                Math.round(t * 4);
        }
if (spacer && spacerHeight !== null) {
    spacer.style.height = `${spacerHeight}px`;
}

        if (namesEl) {
            namesEl.style.opacity =
                String(namesOpacity);

            namesEl.style.transform =
                `translate3d(0, ${namesTranslate}px, 0)`;

            namesEl.style.filter =
                `blur(${namesBlur}px)`;
        }
    });

    useEffect(() => {
        // Names entrance animation.
        if (namesRef.current) {
            const names = namesRef.current;

            names.style.opacity = "0";
            names.style.filter =
                "blur(6px)";

            names.style.transform =
                "translateY(18px)";

            try {
                names.animate(
                    [
                        {
                            opacity: 0,
                            filter: "blur(6px)",
                            transform:
                                "translateY(18px)",
                        },
                        {
                            opacity: 1,
                            filter: "blur(0px)",
                            transform:
                                "translateY(0)",
                        },
                    ],
                    {
                        duration: 700,
                        easing:
                            "cubic-bezier(0.2,0.8,0.2,1)",
                        fill: "forwards",
                    }
                );
            } catch {
                names.style.opacity = "1";
                names.style.filter = "none";
                names.style.transform =
                    "translateY(0)";
            }
        }

        // Ganesha remains static.
        if (shrineImgRef.current) {
            const ganesha =
                shrineImgRef.current;

            ganesha.style.opacity = "1";
            ganesha.style.transform =
                "none";
            ganesha.style.transition =
                "none";
        }
    }, []);

    return (
        <section
            ref={(el) => {
                sectionRef.current = el;
                revealRef.current = el;
            }}
            data-testid="temple-blessing"
            data-carpet-region
            aria-label="Blessing and invitation"
            className="relative px-6 pb-16 pt-16 md:pb-24 md:pt-20"
        >
            {/* NAMES — overlay the gopuram, no layout space */}
            <div
                ref={namesContainerRef}
                className="absolute left-0 top-[10vh] z-20 flex w-full justify-center pointer-events-none"
            >
                <div
                    ref={namesRef}
                    className="relative will-change-transform text-center"
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

            <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center">
                {/* Ganesha area */}
                <div
                    className="reveal relative mt-6"
                    style={{
                        isolation: "isolate",
                    }}
                >
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl md:h-[340px] md:w-[340px]"
                        style={{
                            background:
                                "radial-gradient(circle, rgba(39, 82, 65, 0.2) 0%, rgba(64, 145, 112, 0.10) 45%, transparent 72%)",
                        }}
                    />

                    {/* Spacer positions Ganesha at carpet */}
                    <div
                        ref={spacerRef}
                        style={{ height: 0 }}
                    />

                    <img
                        ref={shrineImgRef}
                        data-testid="ganesha-image"
                        src={images.ganesha}
                        alt="Lord Ganesha golden line artwork"
                        className="h-[38vw] max-h-[320px] min-h-[180px] w-auto [filter:drop-shadow(0_8px_34px_rgba(240,226,180,0.45))] [mask-image:linear-gradient(180deg,black_92%,transparent)] md:h-[400px]"
                    />
                </div>

                {/* Blessing content */}
                <div
                    data-testid="blessing-text"
                    className="relative mt-2 flex w-full max-w-2xl flex-col items-center gap-5 px-6 py-14 text-center md:max-w-3xl md:py-16"
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