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
        const namesContainer = namesContainerRef.current;
        const namesEl = namesRef.current;
        if (!section || !img) return;

        const vh = window.innerHeight;

        // ---- READS (all batched together — reading again after a write forces
        // a synchronous layout flush, which is what caused the stutter on fast
        // back-and-forth scrolling) ----
        const rect = section.getBoundingClientRect();
        const ncRect = namesContainer ? namesContainer.getBoundingClientRect() : null;
        // Anchor to the wrapper that directly contains the spacer, not the
        // section. The section also contains the names heading above it,
        // whose height swings from ~1.45rem on mobile to text-7xl on large
        // screens — using sectionTop silently baked that (device-dependent)
        // height into the offset and was the main cause of Ganesha landing
        // in different spots on different devices.
        const revealRect = spacer ? spacer.parentElement.getBoundingClientRect() : null;
        // Ganesha's own rendered height (not vh) — its CSS is clamped
        // (h-[38vw] with min/max on mobile, fixed 400px on desktop), so an
        // offset based on vh alone doesn't track its actual size.
        const imgHeight = img.offsetHeight;
        // `spacer.style.height` changes the total page height — it's a
        // LAYOUT write, not just a paint one, so recomputing it on every
        // scroll tick forces the browser to re-layout everything below this
        // section (Wedding Celebrations, Venue, Meet the Couple, ...) on
        // every frame, even while the user has scrolled well past this
        // section. Only recompute/write it while this section is actually
        // near the viewport; once it's safely out of view, freeze it at its
        // last value so scrolling through later sections stays untouched.
        const sectionRelevant = rect.top < vh * 1.5 && rect.bottom > -vh * 0.5;
        const templeStage = sectionRelevant ? document.querySelector(".temple-stage-img") : null;
        const carpetDocumentY = templeStage?.parentElement
            ? Number(templeStage.parentElement.dataset.carpetDocumentY)
            : NaN;

        // ---- COMPUTE ----
        const p = Math.min(1, Math.max(0, (vh * 0.9 - rect.top) / (vh * 1.15)));

        let spacerHeight = null;
        if (spacer && revealRect && sectionRelevant) {
            const MAX_SPACER = Math.round(vh * 6);
            const revealTopDocY = revealRect.top + window.scrollY;
            // Put Ganesha slightly inside the carpet, in proportion to his
            // own rendered height so the same fraction of the artwork sits
            // inside the carpet band on every device.
            const ganeshaTopOffset = imgHeight > 0 ? imgHeight * 0.30 : vh * 0.3;
            const computed = Number.isFinite(carpetDocumentY)
                ? Math.round(carpetDocumentY - revealTopDocY - ganeshaTopOffset)
                : Math.round(vh * 0.5);
            spacerHeight = Math.max(0, Math.min(MAX_SPACER, computed));
        }

        const showShrine = rect.top <= vh * 0.6; // carpet trigger point

        let namesOpacity = 1;
        let namesTranslate = 0;
        let namesBlur = 0;
        if (ncRect) {
            const range = Math.max(1, Math.round(vh * 0.45));
            const start = Math.max(0, -ncRect.top);
            const t = Math.min(1, start / range);
            namesOpacity = 1 - t;
            namesTranslate = Math.round(-t * 20);
            namesBlur = Math.round(t * 4);
        }

        // ---- WRITES (all batched together) ----
        if (spacer && spacerHeight !== null) {
            spacer.style.height = `${spacerHeight}px`;
        }

        // Let RAF own transform: scale + small translate from bottom. No transform transitions.
        img.style.transformOrigin = "center bottom";
        img.style.transform = `translateY(${-p * 40}px) scale(${1 - p * 0.35})`;
        img.style.opacity = showShrine ? "1" : "0";

        if (namesEl) {
            namesEl.style.opacity = String(namesOpacity);
            namesEl.style.transform = `translateY(${namesTranslate}px)`;
            namesEl.style.filter = `blur(${namesBlur}px)`;
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
