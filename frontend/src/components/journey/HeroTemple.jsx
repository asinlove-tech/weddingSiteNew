import { useEffect, useRef } from "react";
import { couple } from "@/config";
import { useRafScroll } from "@/hooks/useRafScroll";
import { ChevronDown } from "lucide-react";

export const HeroTemple = () => {
    const namesRef = useRef(null);
    const cueRef = useRef(null);
    const sectionRef = useRef(null);
    const shownRef = useRef(false);
    const updateRef = useRef(() => {});
    updateRef.current = () => {
        const y = window.scrollY;
        const vh = window.innerHeight;
        const heroH = sectionRef.current
            ? sectionRef.current.offsetHeight
            : vh * 2.9;
        const tOut = Math.min(
            1,
            Math.max(0, (y - (heroH - vh * 0.8)) / (vh * 0.5)),
        );
        if (namesRef.current) {
            namesRef.current.style.opacity = String(
                shownRef.current ? 1 - tOut : 0,
            );
            namesRef.current.style.transform = `translateY(${shownRef.current ? -tOut * 12 : 18}px)`;
            // Ensure the hero names sit above the temple backdrop when visible
            if (shownRef.current) {
                namesRef.current.style.zIndex = "9999";
                namesRef.current.style.position = "relative";
                namesRef.current.style.opacity = String(1 - tOut);
            } else {
                namesRef.current.style.zIndex = "";
            }
        }
        if (cueRef.current)
            cueRef.current.style.opacity = String(
                shownRef.current ? Math.max(0, 1 - y / 60) : 1,
            );
    };

    useRafScroll(() => updateRef.current());

    // lightweight throttled logging to help debug reveal timing
    const lastHeroLog = useRef(0);
    useEffect(() => {
        const log = () => {
            try {
                const now = Date.now();
                if (now - lastHeroLog.current > 400) {
                    lastHeroLog.current = now;
                    const y = window.scrollY;
                    const heroTop = sectionRef.current ? sectionRef.current.offsetTop : null;
                    const heroH = sectionRef.current ? sectionRef.current.offsetHeight : null;
                    console.debug("[HeroTemple]", { y, heroTop, heroH });
                }
            } catch (e) {}
        };
        window.addEventListener("scroll", log, { passive: true });
        return () => window.removeEventListener("scroll", log);
    }, []);

    useEffect(() => {
        // show immediately (no delay) and run a subtle blur->fade animation for the names
        shownRef.current = true;
        if (namesRef.current) {
            // ensure starting state for animation
            namesRef.current.style.opacity = "0";
            namesRef.current.style.filter = "blur(6px)";
            namesRef.current.style.transform = "translateY(18px)";
            // animate to clear + visible
            try {
                namesRef.current.animate(
                    [
                        { opacity: 0, filter: "blur(6px)", transform: "translateY(18px)" },
                        { opacity: 1, filter: "blur(0px)", transform: "translateY(0)" },
                    ],
                    { duration: 700, easing: "cubic-bezier(0.2,0.8,0.2,1)", fill: "forwards" },
                );
            } catch (e) {
                // fallback: directly set final state if Web Animations API is not available
                namesRef.current.style.opacity = "1";
                namesRef.current.style.filter = "none";
                namesRef.current.style.transform = "translateY(0)";
            }
        }

        // update visual state after showing
        updateRef.current();
    }, []);

    return (
        <section
            ref={sectionRef}
            data-testid="hero-temple"
            aria-label="Wedding invitation of Amit Kumar and Sri Sakthi Maheswari"
            className="relative h-[290svh]"
        >
            <div className="sticky top-0 flex h-[100svh] flex-col items-center justify-between overflow-hidden">
                <div className="px-6 pt-[7vh] text-center relative z-50">
                <div
                    ref={namesRef}
                    className="relative opacity-0 will-change-transform"
                    style={{ position: "relative", zIndex: 9999 }}
                >
                    <h1
                        data-testid="hero-names"
                        className="hero-names relative font-display font-medium uppercase"
                    >
                    <span className="block whitespace-nowrap text-[1.45rem] tracking-[0.08em] sm:text-6xl sm:tracking-[0.18em] lg:text-7xl">
                        {couple.groom}
                    </span>
                    <span className="hero-and my-3 block text-xs tracking-[0.55em] sm:my-5 sm:text-sm">
                        {couple.and}
                    </span>
                    <span className="block whitespace-nowrap text-[1.45rem] tracking-[0.08em] sm:text-6xl sm:tracking-[0.18em] lg:text-7xl">
                        {couple.bride}
                    </span>
                    </h1>
                </div>
                </div>
                <div ref={cueRef} className="pb-10 will-change-[opacity]" aria-hidden="true">
                    <ChevronDown
                        data-testid="hero-scroll-cue"
                        className="scroll-cue h-6 w-6 text-[#FAF5EC]/85 [filter:drop-shadow(0_1px_6px_rgba(11,31,48,0.5))]"
                    />
                </div>
            </div>
        </section>
    );
};
