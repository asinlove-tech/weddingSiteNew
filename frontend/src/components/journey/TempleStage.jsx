import { useRef, useEffect } from "react";
import { useRafScroll } from "@/hooks/useRafScroll";

const seg = (p, a, b) => Math.min(1, Math.max(0, (p - a) / (b - a)));

// Must match `.temple-stage-img { inset: -2%; transform-origin: center top; }` in index.css.
const STAGE_INSET_PCT = 0.02;

export const TempleStage = () => {
    const imgRef = useRef(null);
    const containerRef = useRef(null);
    const naturalRef = useRef({ w: 578, h: 2000 });

    useEffect(() => {
        const probe = new Image();
        probe.src = "/weddingSiteNew/images/gopuram-long.webp";
        probe.onload = () => {
            naturalRef.current.w = probe.naturalWidth || naturalRef.current.w;
            naturalRef.current.h = probe.naturalHeight || naturalRef.current.h;
        };
    }, []);

    useRafScroll(() => {
        const img = imgRef.current;
        const container = containerRef.current;
        if (!img || !container) return;

        const y = window.scrollY;
        const vw = window.innerWidth;
        const vh = window.innerHeight;

        // Use the gopuram source image as the single source of truth.
        const SRC_W = naturalRef.current.w;
        const SRC_H = naturalRef.current.h;
        // Source pixel where carpet begins (measured from top of source image)
        const CARPET_SRC_Y = 845;

        // .temple-stage-img sits inset -2% inside the viewport-sized fixed
        // container, so its actual box is ~4% larger than the viewport on
        // each axis, and its top edge sits above the viewport top. The
        // "cover" scale and background-position math must use THIS box, not
        // the raw viewport, or the computed carpet position drifts.
        const boxW = vw * (1 + STAGE_INSET_PCT * 2);
        const boxH = vh * (1 + STAGE_INSET_PCT * 2);
        const boxTop = -STAGE_INSET_PCT * vh;

        // background-size: cover -> scale image so it fills the box
        const scale = Math.max(boxW / SRC_W, boxH / SRC_H);
        const renderedH = SRC_H * scale;

        // compute background-position Y percent currently applied.
        // We derive posY from the previous p-based mapping so we can continue
        // using the same motion curve for the sky while computing a precise
        // mapping of the carpet source Y to viewport Y.
        const totalRange = Math.max(1, vh * 6); // keep long range fallback
        const effective = Math.min(Math.max(0, y), totalRange);
        const p = effective / totalRange;
        const posY =
            p < 0.1
                ? 2 + (p / 0.1) * 6
                : p < 0.45
                  ? 8 + 18 * Math.pow((p - 0.1) / 0.35, 1.1)
                  : 26 + (70 * (p - 0.45)) / 0.55;

        // Apply visual transforms (parallax, scale, opacity) — RAF owns these.
        img.style.backgroundPosition = `center ${posY}%`;
        const parallaxScale = 1 + p * 0.06;
        img.style.transform = `scale(${parallaxScale})`;
        img.style.opacity = String(1 - seg(p, 0.86, 1.0));

        // Calculate the top offset of the rendered image inside its own box.
        // For CSS background-position percentages: the point at `posY%` of the
        // image is aligned to `posY%` of the box. From that we derive the
        // image's top position relative to the box, then the viewport.
        const imageTopInBox = (posY / 100) * (boxH - renderedH);
        const untransformedCarpetY = boxTop + imageTopInBox + CARPET_SRC_Y * scale;

        // CSS sets `transform-origin: center top` on this element, i.e. the
        // scale pivots around the box's own top edge (boxTop) — not the
        // viewport's vertical center. Mapping through the wrong origin was
        // the main source of the carpet-position drift across screen sizes.
        const carpetViewportY =
            boxTop + (untransformedCarpetY - boxTop) * parallaxScale;

        // Expose the computed carpet Y on the container for other components to read.
        container.dataset.carpetViewportY = String(Math.round(carpetViewportY));
        container.dataset.carpetDocumentY = String(
            Math.round(window.scrollY + carpetViewportY)
        );

        // Keep temple container at a fixed low z-index so other sections can
        // overlay it (hero names will sit above via their own z-index).
        container.style.zIndex = "0";
    });

    return (
        <div
            ref={containerRef}
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 overflow-hidden"
            style={{ zIndex: 0 }}
        >
            <div
                ref={imgRef}
                className="temple-stage-img"
                style={{ backgroundImage: "url(/weddingSiteNew/images/gopuram-long.webp)" }}
            />
            <div className="absolute inset-0 bg-[#E8A35C]/[0.05]" />
        </div>
    );
};
