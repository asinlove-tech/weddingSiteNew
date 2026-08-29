import { useRef, useEffect } from "react";
import { useRafScroll } from "@/hooks/useRafScroll";

const seg = (p, a, b) => Math.min(1, Math.max(0, (p - a) / (b - a)));

export const TempleStage = () => {
    const imgRef = useRef(null);
    const containerRef = useRef(null);
    const lastLogRef = useRef(0);
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

        // background-size: cover -> scale image so it fills the viewport
        const scale = Math.max(vw / SRC_W, vh / SRC_H);
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

        // Calculate the top offset of the rendered image inside the fixed container.
        // For CSS background-position percentages: the point at `posY%` of the
        // image is aligned to `posY%` of the container. From that we derive
        // the image's top position relative to the viewport.
        const imageTop = (posY / 100) * (vh - renderedH);
        const untransformedCarpetY = imageTop + CARPET_SRC_Y * scale;
        // Account for the transform: map the untransformed Y through the
        // applied scale centered on the viewport center.
        const centerY = vh / 2;
        const carpetViewportY =
            centerY + (untransformedCarpetY - centerY) * parallaxScale;

        // Expose the computed carpet Y on the container for other components
        // to read, and keep a console debug to help verify mapping across viewports.
        try {
            const now = Date.now();
            if (now - lastLogRef.current > 300) {
                lastLogRef.current = now;
                console.debug("[TempleStage] mapping", {
                    vw,
                    vh,
                    SRC_W,
                    SRC_H,
                    scale,
                    renderedH,
                    posY,
                    imageTop,
                    carpetViewportY,
                });
            }
        } catch (e) {
            // ignore
        }

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
