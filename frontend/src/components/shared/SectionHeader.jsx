import { Ornament } from "./Ornament";

export const SectionHeader = ({ eyebrow, title, testId, light = false }) => (
    <div className="reveal flex flex-col items-center gap-4 text-center">
        {eyebrow && (
            <span
                className={`text-xs font-medium uppercase tracking-[0.35em] ${
                    light ? "text-[#E9D9B8]" : "text-[#B08D3F]"
                }`}
            >
                {eyebrow}
            </span>
        )}
        <h2
            data-testid={testId}
            className={`font-display text-5xl sm:text-6xl ${
                light
                    ? "text-[#FAF5EC] [text-shadow:0_2px_28px_rgba(11,31,48,0.4)]"
                    : "text-[#2B2620]"
            }`}
        >
            {title}
        </h2>
        <Ornament light={light} />
    </div>
);
