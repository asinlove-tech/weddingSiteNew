export const Ornament = ({ light = false }) => (
    <div className="flex items-center justify-center gap-3" aria-hidden="true">
        <span
            className={`h-px w-12 ${light ? "bg-[#C9A961]/60" : "bg-[#B08D3F]/50"}`}
        />
        <span
            className={`block h-1.5 w-1.5 rotate-45 ${light ? "bg-[#C9A961]" : "bg-[#B08D3F]"}`}
        />
        <span
            className={`h-px w-12 ${light ? "bg-[#C9A961]/60" : "bg-[#B08D3F]/50"}`}
        />
    </div>
);
