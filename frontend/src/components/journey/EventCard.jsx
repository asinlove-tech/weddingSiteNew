export const EventCard = ({ event, delay }) => (
    <article
        data-testid={`event-card-${event.id}`}
        className={`reveal ${delay} group flex flex-col items-center gap-7 rounded-[2.5rem] border border-[#B08D3F]/35 bg-[#F5EDDC] px-8 py-11 shadow-[0_45px_80px_-40px_rgba(43,38,32,0.5)]`}
    >
        <div className="relative h-56 w-44 overflow-hidden rounded-[50%] border border-[#B08D3F]/60 md:h-64 md:w-52">
            <img
                src={event.image}
                alt={event.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
            />
            <div className="pointer-events-none absolute inset-0 rounded-[50%] shadow-[inset_0_0_0_6px_rgba(250,245,236,0.5),inset_0_0_0_7px_rgba(176,141,63,0.45)]" />
        </div>
        <div className="text-center">
            <h3 className="font-display text-4xl text-[#2B2620]">
                {event.title}
            </h3>
            <div className="mx-auto my-4 h-px w-10 bg-[#B08D3F]/60" />
            <p className="text-base uppercase tracking-[0.22em] text-[#2B2620]/85">
                {event.date}
            </p>
            <p className="mt-1.5 text-xs uppercase tracking-[0.18em] text-[#2B2620]/60">
                {event.time}
            </p>
        </div>
    </article>
);
