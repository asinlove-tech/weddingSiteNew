import { useRef, useEffect } from "react";
import { useRafScroll } from "@/hooks/useRafScroll";

const seg = (p, a, b) =>
    Math.min(1, Math.max(0, (p - a) / (b - a)));

// Must match `.temple-stage-img { inset: -2%; transform-origin: center top; }`
const STAGE_INSET_PCT = 0.02;

export const TempleStage = () => {
    const imgRef = useRef(null);
    const carpetRef = useRef(null);
    const containerRef = useRef(null);

    const naturalRef = useRef({
        w: 578,
        h: 2000,
    });

    useEffect(() => {
        const probe = new Image();

        probe.src = "/weddingSiteNew/images/gopuram-long.webp";

        probe.onload = () => {
            naturalRef.current.w =
                probe.naturalWidth || naturalRef.current.w;

            naturalRef.current.h =
                probe.naturalHeight || naturalRef.current.h;
        };
    }, []);

    useRafScroll(() => {
        const img = imgRef.current;
        const carpet = carpetRef.current;
        const container = containerRef.current;

        if (!img || !carpet || !container) return;

        const y = window.scrollY;
        const vw = window.innerWidth;
        const vh = window.innerHeight;

        const SRC_W = naturalRef.current.w;
        const SRC_H = naturalRef.current.h;

        // Exact Y position in the source image where the carpet begins.
        const CARPET_SRC_Y = 845;

        const boxW =
            vw * (1 + STAGE_INSET_PCT * 2);

        const boxH =
            vh * (1 + STAGE_INSET_PCT * 2);

        const boxTop =
            -STAGE_INSET_PCT * vh;

        // Same cover calculation as CSS background-size: cover.
        const scale = Math.max(
            boxW / SRC_W,
            boxH / SRC_H
        );

        const renderedH = SRC_H * scale;

        const totalRange = Math.max(1, vh * 6);
        const effective = Math.min(
            Math.max(0, y),
            totalRange
        );

        const p = effective / totalRange;

        const posY =
            p < 0.1
                ? 2 + (p / 0.1) * 6
                : p < 0.45
                    ? 8 +
                      18 *
                          Math.pow(
                              (p - 0.1) / 0.35,
                              1.1
                          )
                    : 26 +
                      (70 * (p - 0.45)) / 0.55;

        const parallaxScale = 1 + p * 0.06;

        // Gopuram movement.
        img.style.backgroundPosition =
            `center ${posY}%`;

        img.style.transform =
            `scale(${parallaxScale})`;

        img.style.opacity = String(
            1 - seg(p, 0.86, 1.0)
        );

        // Calculate where the carpet starts inside the rendered image.
        const imageTopInBox =
            (posY / 100) *
            (boxH - renderedH);

        const untransformedCarpetY =
            boxTop +
            imageTopInBox +
            CARPET_SRC_Y * scale;

        // Same transform-origin calculation as the gopuram.
        const carpetViewportY =
            boxTop +
            (untransformedCarpetY - boxTop) *
                parallaxScale;

        // Position the actual carpet SVG exactly where the carpet begins.
        carpet.style.transform =
            `translate3d(0, ${Math.round(
                carpetViewportY
            )}px, 0)`;

        carpet.style.opacity = String(
            1 - seg(p, 0.86, 1.0)
        );

        // Expose carpet position for TempleBlessing spacer calculation.
        container.dataset.carpetViewportY = String(
            Math.round(carpetViewportY)
        );

        container.dataset.carpetDocumentY = String(
            Math.round(
                window.scrollY + carpetViewportY
            )
        );

        container.style.zIndex = "0";
    });

    return (
        <div
            ref={containerRef}
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 overflow-hidden"
            style={{ zIndex: 0 }}
        >
            {/* Gopuram / sky background */}
            <div
                ref={imgRef}
                className="temple-stage-img"
                style={{
                    backgroundImage:
                        "url(/weddingSiteNew/images/gopuram-long.webp)",
                }}
            />

            {/* Actual carpet, positioned directly where the gopuram ends */}
            <img
                ref={carpetRef}
                src="/weddingSiteNew/images/carpet-1.svg"
                alt=""
                className="absolute left-0 top-0 w-full h-auto will-change-transform"
                style={{
                    transform:
                        "translate3d(0, 100vh, 0)",
                }}
            />

            {/* Warm overlay */}
            <div className="absolute inset-0 bg-[#E8A35C]/[0.05]" />
        </div>
    );
};