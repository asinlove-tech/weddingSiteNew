import { ArrowUpRight } from "lucide-react";

export const PrimaryButton = ({ href, children, testId, dark = false }) => (
    <a
        data-testid={testId}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`group inline-flex items-center gap-2.5 rounded-full border px-8 py-3.5 text-[12px] font-medium uppercase tracking-[0.24em] transition-[background-color,color,border-color] duration-300 ${
            dark
                ? "border-[#C9A961]/70 text-[#FAF5EC] hover:bg-[#C9A961] hover:text-[#0B1F30]"
                : "border-[#B08D3F]/70 text-[#2B2620] hover:bg-[#B08D3F] hover:text-[#FAF5EC]"
        }`}
    >
        {children}
        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </a>
);
