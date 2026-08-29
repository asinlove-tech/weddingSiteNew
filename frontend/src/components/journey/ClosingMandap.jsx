import { useRef } from "react";
import { closing, images } from "@/config";
import { useRafScroll } from "@/hooks/useRafScroll";

const seg = (p, a, b) =>
    Math.min(1, Math.max(0, (p - a) / (b - a)));

export const ClosingMandap = () => {
    const sectionRef = useRef(null);
    const duskRef = useRef(null);
    const glowRef = useRef(null);
    const imgRef = useRef(null);
    const textRef = useRef(null);
    const hashtagRef = useRef(null);

    useRafScroll(() => {
        const el = sectionRef.current;
        if (!el) return;

        const vh = window.innerHeight;
        const total = el.offsetHeight - vh;

        if (total <= 0) return;

        const rect = el.getBoundingClientRect();

        const p = Math.min(
            1,
            Math.max(0, -rect.top / total)
        );

        // --------------------------------
        // Dusk background
        // --------------------------------
        if (duskRef.current) {
            duskRef.current.style.opacity = String(
                seg(p, 0, 0.45)
            );
        }

        // --------------------------------
        // Warm glow
        // --------------------------------
        if (glowRef.current) {
            glowRef.current.style.opacity = String(
                seg(p, 0.3, 0.65) * 0.85
            );
        }

        // --------------------------------
        // Closing logo
        // --------------------------------
        if (imgRef.current) {
            const q = seg(p, 0.2, 0.62);

            imgRef.current.style.opacity = String(q);

            imgRef.current.style.transform = `
                translateY(${(1 - q) * 56}px)
                scale(${0.96 + q * 0.04})
            `;
        }

        // --------------------------------
        // Closing text
        // --------------------------------
        if (textRef.current) {
            const q = seg(p, 0.5, 0.78);

            textRef.current.style.opacity = String(q);

            textRef.current.style.transform = `
                translateY(${(1 - q) * 16}px)
            `;
        }

        // --------------------------------
        // Hashtag
        // --------------------------------
        if (hashtagRef.current) {
            const q = seg(p, 0.72, 0.92);

            hashtagRef.current.style.opacity = String(q);

            hashtagRef.current.style.transform = `
                translateY(${(1 - q) * 28}px)
                scale(${0.96 + q * 0.04})
            `;
        }
    });

    return (
        <section
            ref={sectionRef}
            data-testid="closing-mandap"
            aria-label="Closing scene — the wedding mandap"
            className="relative h-[280vh]"
        >
            <div className="sticky top-0 h-screen overflow-hidden">

                {/* --------------------------------
                    Dusk background
                -------------------------------- */}
                <div
                    ref={duskRef}
                    aria-hidden="true"
                    className="absolute inset-0 opacity-0"
                    style={{
                        background:
                            "linear-gradient(180deg,#A9BFD9 0%,#D9B8C4 30%,#F2C9A8 55%,#F8EEDC 78%,#F6F0E3 100%)",
                    }}
                />

                {/* --------------------------------
                    Warm glow
                -------------------------------- */}
                <div
                    ref={glowRef}
                    aria-hidden="true"
                    className="absolute inset-0 opacity-0"
                    style={{
                        background:
                            "radial-gradient(ellipse 75% 45% at 50% 66%, rgba(244,190,120,0.55) 0%, rgba(233,150,110,0.22) 50%, transparent 78%)",
                    }}
                />

                {/* --------------------------------
                    Closing text
                -------------------------------- */}
                <div
                    ref={textRef}
                    data-testid="closing-text"
                    className="
                        absolute
                        inset-x-0
                        top-0
                        z-20
                        flex
                        flex-col
                        items-center
                        gap-3
                        px-6
                        pt-[9vh]
                        text-center
                        opacity-0
                        will-change-transform
                    "
                >
                    <div className="flex max-w-xl flex-col gap-3">
                        {closing.lines.map((line, i) => (
                            <p
                                key={i}
                                className="
                                    font-display
                                    text-xl
                                    italic
                                    leading-relaxed
                                    text-[#16110d]
                                    [text-shadow:0_1px_16px_rgba(250,245,236,0.8)]
                                    md:text-2xl
                                "
                            >
                                {line}
                            </p>
                        ))}
                    </div>

                    <div className="mt-3 flex flex-col items-center gap-1.5">
                        <p className="font-display text-2xl italic text-[#16110d] md:text-3xl">
                            {closing.signoffPre}
                        </p>

                        <p
                            className="
                                font-display
                                text-4xl
                                font-semibold
                                tracking-[0.04em]
                                text-[#7A3410]
                                [text-shadow:0_2px_22px_rgba(250,240,220,0.9)]
                                md:text-6xl
                            "
                        >
                            {closing.signoffNames}
                        </p>

                        <p className="font-display text-2xl italic text-[#16110d] md:text-3xl">
                            {closing.signoffPost}
                        </p>
                    </div>
                </div>

                {/* --------------------------------
                    Closing logo
                -------------------------------- */}
                <div
                    className="
                        absolute
                        inset-x-0
                        top-[50vh]
                        z-10
                        flex
                        justify-center
                        pointer-events-none
                        px-4
                    "
                >
                    <img
                        ref={imgRef}
                        src={images.closingLogo || images.mandap}
                        alt="Closing illustration or monogram"
                        loading="lazy"
                        onError={(e) => {
                            if (
                                e.currentTarget.src !==
                                images.mandap
                            ) {
                                e.currentTarget.src =
                                    images.mandap;
                            }
                        }}
                        className="
                            block
                            w-auto
                            max-w-[80vw]
                            max-h-[30vh]
                            opacity-0
                            will-change-transform
                            object-contain
                            [mask-image:linear-gradient(180deg,transparent_0%,rgba(0,0,0,0.35)_18%,black_36%)]
                            md:max-w-[90vw]
                            md:max-h-[52vh]
                        "
                        style={{
                            transformOrigin: "center top",
                        }}
                    />
                </div>

                {/* --------------------------------
                    Hashtag
                -------------------------------- */}
                <div
                    ref={hashtagRef}
                    className="
                        absolute
                        inset-x-0
                        bottom-[2vh]
                        z-30
                        flex
                        justify-center
                        px-2
                        pointer-events-none
                        opacity-0
                        will-change-transform
                    "
                >
                    <img
                        src={images.hashtag}
                        alt="#ASinLove"
                        loading="lazy"
                        className="
                            block
                            w-auto
                            max-w-[120vw]
                            max-h-[26vh]
                            object-contain
                            md:max-w-[500vw]
                            md:max-h-[26vh]
                        "
                    />
                </div>
            </div>
        </section>
    );
};