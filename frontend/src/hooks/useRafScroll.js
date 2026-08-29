import { useEffect, useRef } from "react";

export const useRafScroll = (handler) => {
    const ref = useRef(handler);
    ref.current = handler;
    useEffect(() => {
        let ticking = false;
        const run = () => {
            ref.current();
            ticking = false;
        };
        const onScroll = () => {
            if (!ticking) {
                ticking = true;
                requestAnimationFrame(run);
            }
        };
        ref.current();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
        };
    }, []);
};
