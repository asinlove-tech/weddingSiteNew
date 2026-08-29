// ------------------------------------------------------------------
// Central content & configuration for the invitation.
// Replace the PLACEHOLDER urls below with the real links when ready.
// ------------------------------------------------------------------

export const images = {
    temple: "/weddingSiteNew/images/gopuram.webp",
    ganesha: "/weddingSiteNew/images/ganesha-clean.png",
    ganeshaFramed: "/weddingSiteNew/images/ganesha-framed.png",
    closingLogo: "/weddingSiteNew/images/closing-logo.png",
    hashtag: "/weddingSiteNew/images/hashtag-new.png",
    cocktail: "/weddingSiteNew/images/cocktail.webp",
    mandap: "/weddingSiteNew/images/FestivitiesMandap.png",
    venue: "/weddingSiteNew/images/venue-car.png",
    pattern: "/weddingSiteNew/images/pattern.webp",
};

export const couple = {
    groom: "Amit Kumar",
    bride: "Sri Sakthi Maheswari",
    and: "Weds",
};

export const blessing = {
    overline: "With the blessings of our parents and elders,",
    invite: "we joyfully invite you to celebrate the wedding of",
    join: "&",
    dateLine: "On 25th October 2026",
    placeLine: "in Coimbatore",
    request: "and request the pleasure of your presence as we celebrate this beautiful beginning together.",
};

export const events = [
    {
        id: "cocktail",
        title: "Evening Soiree",
        date: "24 October",
        time: "6 PM onwards",
        image: images.cocktail,
        alt: "Illustration of the couple dancing at their cocktail evening",
    },
    {
        id: "muhurtham",
        title: "Muhurtham",
        date: "25 October",
        time: "6 AM onwards",
        image: images.mandap,
        alt: "Illustration of the couple seated in the wedding mandap",
    },
];

export const venue = {
    title: "Venue",
    place: "Bellezza Event Venue",
    note: "Coimbatore, Tamil Nadu",
    image: images.venue,
    imageAlt: "Illustration of a little vintage car decorated with wedding garlands",
    mapsLabel: "View on Google Maps",
    mapsUrl: "https://maps.app.goo.gl/sFnxQgQYNtkiukdM6",
};

export const meetTheCouple = {
    title: "Meet the Couple",
    intro: "A little bit of chaos, a lot of laughter, plenty of food, and one very long list of things we've decided to do together. Here's to many more stories, detours, and meals along the way.",
    photos: [
        { src: "/weddingSiteNew/images/meetTheCouple/0N7A3214.JPG", alt: "Couple portrait 1", pos: "center" },
        { src: "/weddingSiteNew/images/meetTheCouple/0N7A3828.JPG", alt: "Couple portrait 2", pos: "center" },
        { src: "/weddingSiteNew/images/meetTheCouple/0N7A4008.JPG", alt: "Couple portrait 3", pos: "center" },
        { src: "/weddingSiteNew/images/meetTheCouple/0N7A4446.JPG", alt: "Couple portrait 4", pos: "center" },
        { src: "/weddingSiteNew/images/meetTheCouple/0N7A4513.JPG", alt: "Couple portrait 5", pos: "center" },
        { src: "/weddingSiteNew/images/meetTheCouple/0N7A5056.JPG", alt: "Couple portrait 6", pos: "center" },
    ],
};

export const infoSection = {
    title: "Things to Know",
    cards: [
        {
            id: "weather",
            icon: "weather",
            title: "Weather",
            text: "Warm days, pleasant evenings, and a chance of a passing shower or two. Come prepared for sunshine, a little rain, and plenty of celebration.",
        },
        {
            id: "attire",
            icon: "attire",
            title: "Traditional Attire",
            text: "We would love to see you in your festive best — silk sarees, veshtis, kurta sets and everything in between.",
        },
        {
            id: "travel",
            icon: "travel",
            title: "Travel Tips",
            text: "Coimbatore is well connected by air, rail and road. We recommend arriving a day early to settle in and celebrate with us.",
        },
        {
            id: "explore",
            icon: "explore",
            title: "While You're in Coimbatore",
            text: "Temples, hills, good food and filter coffee — a few of our favourites for a little adventure beyond the wedding.",
            linkLabel: "Read our recommendations",
            href: "https://canva.link/asinlovecbe",
        },
    ],
};

export const rsvp = {
    title: "RSVP",
    note: "We're excited to hear from you! Kindly let us know if you can join us — please RSVP by September 25th.",
    buttonLabel: "RSVP",
    // WhatsApp RSVP link. Replace the phone number below with the final RSVP number.
    url: "https://wa.me/8838197753?text=Hi%20Amit%20and%20Sakthi!%20Count%20us%20in%20for%20the%20celebration!%20Name%3A%20%5BYour%20Name%5D%20%7C%20Attending%3A%20Yes%2FNo%20%7C%20Guests%3A%20%5BNumber%5D",
    contact: "",
};

export const wishlist = {
    title: "Wedding Wishlist",
    message:
        "Your presence is the best gift ❤️ But if you'd like to spoil us a little, feel free to gift us anything you fancy! We've also put together a wishlist if you need some inspiration — claim a gift, or chip in towards one with the gang. Solo mission or group project, totally up to you!",
    buttonLabel: "View Wishlist",
    url: "https://hazlnut.in/wishlist/asinlove",
};

export const closing = {
    lines: [
        "Thank you for being part of our story.",
        "Having you with us as we begin this new chapter will make it all the more special.",
        "We can't wait to celebrate together in Coimbatore.",
    ],
    signoffPre: "With love,",
    signoffNames: "Amit | Sakthi",
    signoffPost: "and our families",
};
