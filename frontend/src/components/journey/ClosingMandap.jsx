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
        // Closing text
        // --------------------------------
        if (textRef.current) {
            const q = seg(p, 0.25, 0.45);

            textRef.current.style.opacity = String(q);

            textRef.current.style.transform = `
                translateY(${(1 - q) * 16}px)
            `;
        }

        // --------------------------------
        // Closing logo
        // --------------------------------
        if (imgRef.current) {
            const q = seg(p, 0.48, 0.68);

            imgRef.current.style.opacity = String(q);

            imgRef.current.style.transform = `
                translateY(${(1 - q) * 40}px)
                scale(${0.96 + q * 0.04})
            `;
        }

        // --------------------------------
        // Hashtag
        // --------------------------------
        if (hashtagRef.current) {
            const q = seg(p, 0.72, 0.90);

            hashtagRef.current.style.opacity = String(q);

            hashtagRef.current.style.transform = `
                translateY(${(1 - q) * 24}px)
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
                        top-[8vh]
                        z-20
                        flex
                        flex-col
                        items-center
                        gap-3
                        px-6
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
                        z-10
                        flex
                        justify-center
                        pointer-events-none
                        px-4

                        top-[clamp(48vh,50vh,52vh)]
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
                            max-w-[clamp(65vw,70vw,78vw)]
                            max-h-[clamp(22vh,26vh,32vh)]
                            opacity-0
                            will-change-transform
                            object-contain
                            [mask-image:linear-gradient(180deg,transparent_0%,rgba(0,0,0,0.35)_18%,black_36%)]
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
                        z-30
                        flex
                        justify-center
                        pointer-events-none
                        px-2
                        opacity-0
                        will-change-transform

                        top-[clamp(74vh,76vh,79vh)]
                    "
                >
                    <img
                        src={images.hashtag}
                        alt="#ASinLove"
                        loading="lazy"
                        className="
                            block
                            w-auto
                            max-w-[clamp(75vw,85vw,100vw)]
                            max-h-[clamp(14vh,18vh,22vh)]
                            object-contain
                        "
                    />
                </div>
            </div>
        </section>
    );
};