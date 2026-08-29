import { useEffect, useRef } from "react";

export const useReveal = () => {
    const ref = useRef(null);
    useEffect(() => {
        const root = ref.current;
        if (!root) return;
        const els = root.querySelectorAll(".reveal");
        const io = new IntersectionObserver(
            (entries) =>
                entries.forEach((e) => {
                    if (e.isIntersecting) {
                        e.target.classList.add("is-visible");
                        io.unobserve(e.target);
                    }
                }),
            { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
        );
        els.forEach((el) => io.observe(el));
        return () => io.disconnect();
    }, []);
    return ref;
};
