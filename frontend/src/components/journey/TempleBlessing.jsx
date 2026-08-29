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

    useRafScroll(() => {

        const section = sectionRef.current;
        const img = shrineImgRef.current;
        const spacer = spacerRef.current;
        if (!section || !img) return;
        const rect = section.getBoundingClientRect();
        const vh = window.innerHeight;
        const p = Math.min(1, Math.max(0, (vh * 0.9 - rect.top) / (vh * 1.15)));

        // Spacer calculation: use TempleStage's computed carpetDocumentY when available.
        if (spacer) {
            const MAX_SPACER = Math.round(vh * 6);

            const templeStage = document.querySelector(".temple-stage-img");
            const sectionTop = section.getBoundingClientRect().top + window.scrollY;

            let computed = null;

            if (templeStage?.parentElement) {
                const carpetDocumentY = Number(
                    templeStage.parentElement.dataset.carpetDocumentY
                );

                if (Number.isFinite(carpetDocumentY)) {
                    // Put the Ganesha slightly inside the carpet.
                    const ganeshaTopOffset = vh * 0.3;

                    computed = Math.round(
                        carpetDocumentY - sectionTop - ganeshaTopOffset
                    );
                }
            }

            if (computed === null) {
                computed = Math.round(vh * 0.5);
            }

            spacer.style.height = `${Math.max(0, Math.min(MAX_SPACER, computed))}px`;
        }

        // Let RAF own transform: scale + small translate from bottom. No transform transitions.
        img.style.transformOrigin = "center bottom";
        img.style.transform = `translateY(${ -p * 40 }px) scale(${1 - p * 0.35})`;
        // Carpet trigger only controls opacity now (no transform changes)
        const region = section; // TempleBlessing is the carpet region
        if (region) {
            const rRect = region.getBoundingClientRect();
            const triggerPoint = vh * 0.6; // when region top is at 60% viewport
            const shrine = shrineImgRef.current;
            const namesEl = namesRef.current;
            if (rRect.top <= triggerPoint) {
                if (shrine) shrine.style.opacity = "1";
                if (namesEl) {
                    namesEl.style.opacity = "1";
                }
            } else {
                if (shrine) shrine.style.opacity = "0";
            }
        }

        // Smooth sticky names transition: fade/translate out as container scrolls
        const namesContainer = namesContainerRef.current;
        const namesEl = namesRef.current;
        if (namesContainer && namesEl) {
            const ncRect = namesContainer.getBoundingClientRect();
            const range = Math.max(1, Math.round(vh * 0.45));
            const start = Math.max(0, -ncRect.top);
            const t = Math.min(1, start / range);
            namesEl.style.opacity = String(1 - t);
            namesEl.style.transform = `translateY(${Math.round(-t * 20)}px)`;
            namesEl.style.filter = `blur(${Math.round(t * 4)}px)`;
        }
    });

    useEffect(() => {
        // show names overlay immediately with a blur->fade animation
        if (namesRef.current) {
            namesRef.current.style.opacity = "0";
            namesRef.current.style.filter = "blur(6px)";
            namesRef.current.style.transform = "translateY(18px)";
            try {
                namesRef.current.animate(
                    [
                        { opacity: 0, filter: "blur(6px)", transform: "translateY(18px)" },
                        { opacity: 1, filter: "blur(0px)", transform: "translateY(0)" },
                    ],
                    { duration: 700, easing: "cubic-bezier(0.2,0.8,0.2,1)", fill: "forwards" },
                );
            } catch (e) {
                namesRef.current.style.opacity = "1";
                namesRef.current.style.filter = "none";
                namesRef.current.style.transform = "translateY(0)";
            }
        }
        // initialize shrine (hidden) so it animates in when carpet trigger hits
        if (shrineImgRef.current) {
            const s = shrineImgRef.current;
            s.style.opacity = "0";
            s.style.transform = "translateY(40px) scale(0.95)";
            // Only transition opacity; RAF owns transform for smooth scroll.
            s.style.transition = "opacity 420ms ease";
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
            <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center">
                {/* Names overlay constrained to the carpet region — absolutely positioned */}
                <div ref={namesContainerRef} className="relative w-full">
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
<div
    className="reveal relative mt-6"
    style={{ isolation: "isolate" }}
>
    <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl md:h-[340px] md:w-[340px]"
        style={{
            background:
                "radial-gradient(circle, rgba(39, 82, 65, 0.2) 0%, rgba(64, 145, 112, 0.10) 45%, transparent 72%)",
        }}
    />

    <div ref={spacerRef} style={{ height: 0 }} />

    <img
        ref={shrineImgRef}
        data-testid="ganesha-image"
        src={images.ganesha}
        alt="Lord Ganesha golden line artwork"
        className="h-[38vw] max-h-[320px] min-h-[180px] w-auto will-change-transform [filter:drop-shadow(0_8px_34px_rgba(240,226,180,0.45))] [mask-image:linear-gradient(180deg,black_92%,transparent)] md:h-[400px]"
    />
</div>

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
