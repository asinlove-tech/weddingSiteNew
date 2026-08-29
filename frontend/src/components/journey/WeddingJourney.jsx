import { TempleStage } from "./TempleStage";
// HeroTemple removed — names now handled inside TempleBlessing to keep scroll origins aligned
import { TempleBlessing } from "./TempleBlessing";
import { WeddingCelebrations } from "./WeddingCelebrations";
import { Venue } from "./Venue";
import { MeetTheCouple } from "./MeetTheCouple";
import { ThingsToKnow } from "./ThingsToKnow";
import { Rsvp } from "./Rsvp";
import { WeddingWishlist } from "./WeddingWishlist";
import { ClosingMandap } from "./ClosingMandap";

export const WeddingJourney = () => (
    <div className="relative">
        <div
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 z-0 opacity-35"
            style={{
                backgroundImage: "url(/weddingSiteNew/images/pattern-tile.webp)",
                backgroundSize: "1300px",
                backgroundRepeat: "repeat",
            }}
        />
        <TempleStage />
        <main className="relative z-10">
            {/* HeroTemple removed — names overlay is rendered by TempleBlessing now */}
            <div className="relative overflow-hidden">
                <TempleBlessing />
                <WeddingCelebrations />
            </div>
            <Venue />
            <MeetTheCouple />
            <ThingsToKnow />
            <Rsvp />
            <WeddingWishlist />
            <ClosingMandap />
        </main>
    </div>
);
