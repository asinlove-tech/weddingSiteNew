import { useEffect, useRef, useState } from "react";

export const PhotoFrame = ({ photos }) => {
    const [idx, setIdx] = useState(0);
    const [dimensions, setDimensions] = useState({
        width: 2,
        height: 3,
    });

    const pointerStart = useRef(null);
    const timerRef = useRef(null);

    const current = photos[idx];

    if (!photos?.length) return null;

    const goToNext = () => {
        setIdx((i) => (i + 1) % photos.length);
    };

    const goToPrevious = () => {
        setIdx((i) => (i - 1 + photos.length) % photos.length);
    };

    /*
     * Reset autoplay after manual interaction.
     */
    const resetTimer = () => {
        if (
            photos.length <= 1 ||
            window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ) {
            return;
        }

        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }

        timerRef.current = setTimeout(() => {
            goToNext();
        }, 5500);
    };

    /*
     * Automatic slideshow.
     */
    useEffect(() => {
        if (
            photos.length <= 1 ||
            window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ) {
            return;
        }

        timerRef.current = setTimeout(() => {
            goToNext();
        }, 5500);

        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, [idx, photos.length]);

    /*
     * Load dimensions of the current photo so the foreground
     * image always preserves its original aspect ratio.
     */
    useEffect(() => {
        if (!current?.src) return;

        const img = new Image();

        img.onload = () => {
            setDimensions({
                width: img.naturalWidth || 2,
                height: img.naturalHeight || 3,
            });
        };

        img.src = current.src;
    }, [current?.src]);

    /*
     * Pointer interaction.
     *
     * Tap:
     *   → next
     *
     * Swipe left:
     *   → next
     *
     * Swipe right:
     *   → previous
     */
    const handlePointerDown = (event) => {
        pointerStart.current = {
            x: event.clientX,
            y: event.clientY,
        };
    };

    const handlePointerUp = (event) => {
        if (!pointerStart.current) return;

        const startX = pointerStart.current.x;
        const startY = pointerStart.current.y;

        const deltaX = event.clientX - startX;
        const deltaY = event.clientY - startY;

        pointerStart.current = null;

        const swipeThreshold = 50;

        /*
         * Primarily vertical movement means the user is scrolling
         * the page. Don't change the photo.
         */
        if (Math.abs(deltaY) > Math.abs(deltaX)) {
            return;
        }

        /*
         * Horizontal swipe.
         */
        if (Math.abs(deltaX) >= swipeThreshold) {
            if (deltaX < 0) {
                goToNext();
            } else {
                goToPrevious();
            }

            resetTimer();
            return;
        }

        /*
         * Tap → next photo.
         */
        goToNext();
        resetTimer();
    };

    const handlePointerCancel = () => {
        pointerStart.current = null;
    };

    const aspectRatio = dimensions.width / dimensions.height;

    return (
        <section
            data-testid="photo-frame"
            className="
                reveal
                reveal-delay-2
                relative
                flex
                min-h-[100svh]
                w-full
                items-center
                justify-center
                overflow-hidden
                bg-[#211d19]
            "
        >
            {/* =====================================================
                FULL-WIDTH CINEMATIC BACKGROUND
            ====================================================== */}

            <div className="absolute inset-0 overflow-hidden">
                {photos.map((photo, i) => (
                    <img
                        key={`background-${photo.src}-${i}`}
                        src={photo.src}
                        alt=""
                        aria-hidden="true"
                        className={`
                            absolute
                            inset-0
                            h-full
                            w-full
                            object-cover
                            transition-all
                            duration-[2400ms]
                            ease-out
                            ${
                                i === idx
                                    ? "scale-[1.08] opacity-100"
                                    : "scale-[1.14] opacity-0"
                            }
                        `}
                        style={{
                            filter: "blur(32px)",
                            objectPosition: photo.pos || "center",
                        }}
                    />
                ))}

                {/* Warm atmospheric overlay */}
                <div
                    className="
                        absolute
                        inset-0
                        bg-[#332a23]/35
                    "
                />

                {/* Subtle vignette */}
                <div
                    className="
                        absolute
                        inset-0
                        bg-[radial-gradient(
                            ellipse_at_center,
                            transparent_30%,
                            rgba(20,16,13,0.3)_100%
                        )]
                    "
                />
            </div>

            {/* =====================================================
                ORIGINAL PHOTOGRAPH
            ====================================================== */}

            <div
                className="
                    relative
                    z-10
                    flex
                    cursor-pointer
                    touch-pan-y
                    select-none
                    items-center
                    justify-center
                "
                style={{
                    width: `min(88vw, calc(86svh * ${aspectRatio}))`,
                    aspectRatio: `${dimensions.width} / ${dimensions.height}`,
                }}
                onPointerDown={handlePointerDown}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerCancel}
            >
                {photos.map((photo, i) => (
                    <img
                        key={`foreground-${photo.src}-${i}`}
                        src={photo.src}
                        alt={photo.alt || ""}
                        loading={i === idx ? "eager" : "lazy"}
                        aria-hidden={i !== idx}
                        draggable={false}
                        style={{
                            objectPosition: photo.pos || "center",
                        }}
                        className={`
                            pointer-events-none
                            absolute
                            inset-0
                            h-full
                            w-full
                            object-contain
                            transition-all
                            duration-[2000ms]
                            ease-out
                            ${
                                i === idx
                                    ? "scale-100 opacity-100"
                                    : "scale-[1.015] opacity-0"
                            }
                        `}
                    />
                ))}

                {/* Very subtle depth */}
                <div
                    className="
                        pointer-events-none
                        absolute
                        inset-0
                        shadow-[0_30px_100px_-25px_rgba(0,0,0,0.7)]
                    "
                />
            </div>

            {/* =====================================================
                PHOTO NAVIGATION INDICATOR
            ====================================================== */}

            {photos.length > 1 && (
                <div
                    className="
                        pointer-events-none
                        absolute
                        bottom-7
                        left-1/2
                        z-20
                        flex
                        -translate-x-1/2
                        items-center
                        gap-1.5
                    "
                    aria-hidden="true"
                >
                    {photos.map((_, i) => (
                        <span
                            key={i}
                            className={`
                                h-[2px]
                                rounded-full
                                transition-all
                                duration-700
                                ${
                                    i === idx
                                        ? "w-8 bg-white/80"
                                        : "w-2 bg-white/30"
                                }
                            `}
                        />
                    ))}
                </div>
            )}
        </section>
    );
};