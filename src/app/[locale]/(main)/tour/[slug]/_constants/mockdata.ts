import { AccommodationOption, Tour, TourData, TourDay } from "../_types"
import { City } from "../_types/payment"

export const tour: Tour = {
    id: "altai-5-day-tour",
    title: "All-inclusive Altai experience in 5 days (sauna, horseback riding, off-road vehicle)",
    rating: 4.9,
    reviewCount: 10,
    country: "Russia",
    type: "Excursion",
    discount: 19,
    images: {
        main: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=800&q=80",
        gallery: [
            "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=800&q=80",
        ],
    },
}

export const MOCK_TOUR: TourData = {
    slug: "caucasus-mountains-5-days",
    title: "Caucasus Mountains Explorer",
    description:
        "Embark on an unforgettable 5-day journey through the majestic Caucasus Mountains. This all-inclusive tour offers a perfect blend of adventure, culture, and relaxation. Explore breathtaking landscapes, visit remote villages, and immerse yourself in the rich traditions of the region. Highlights include scenic hikes, horseback riding, and a traditional Russian banya experience. Perfect for nature lovers and adventure seekers looking for a memorable getaway.",
    pricing: {
        currentPrice: 76000,
        originalPrice: 94000,
        discountPercent: 19,
        pricePerDay: 15200,
        totalDays: 5,
        prepayment: 20000,
    },
    dateRange: { start: "June 30", end: "July 4, 2026" },
    availableSpots: 6,
    totalSpots: 6,
    details: {
        days: 5,
        type: "Excursion",
        language: "English",
        comfort: "High",
        activity: "For everyone",
        ageGroup: "7–55",
    },
    tags: [
        "Photo tour",
        "Excursion",
        "Family",
        "Ethnographic",
        "Mountain tour",
    ],
    instantBooking: true,
    organizer: {
        id: "ekaterina-ivanova",
        name: "Ekaterina",
        avatar: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=800&q=80",
        rating: 4.9,
        reviewCount: 172,
        toursCount: 227,
        memberSince: "April 2022",
        isVerified: true,
        description:
            "Hi, I'm Katya!) We haven't met yet, but we already have at least one thing in common - a passion for travel! I've visited 30 countries in the last 6 years, and I know exactly how to turn any trip into a rich and unforgettable adventure. I've been organizing author's tours for over 4 years and during this time I've taken more than 2000 people on tours! Just imagine how many that is) What can I be proud of? I can definitely say - my wonderful team of guides! Every guide I work with is a true professional in their field, a dedicated and responsible person. And they are also very cheerful, caring and dedicated to their work. I have my own travel club, which everyone who has been on one of our tours joins. The motto of our club is \"Celebrate life and travel\"! We meet our travelers in different cities, meet in new trips and continue our friendly communication. I organize tours in the following areas: Dagestan Altai Kamchatka Baikal Turkey Georgia Bali Teriberka Which trip do you want to go on with our team?",
    },
}

export const MOCK_TOUR_DAYS: TourDay[] = [
    {
        id: "day-1",
        dayNumber: 1,
        title: "Chemal, Oroktoy Bridge, Kuyus Grotto",
        images: [
            {
                src: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=800&q=80",
                alt: "Altai mountain pasture",
            },
            {
                src: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=80",
                alt: "Mountain lake in autumn",
            },
        ],
        description:
            "We meet at **Gorno-Altaysk Airport** (arrival before 11:00), grab a quick bite after the journey, and head straight away from civilization. **First stop — the Devil’s Finger viewpoint** (weather permitting), offering breathtaking views over the Katun River valley and surrounding landscapes. Then we travel to Chemal — a small resort village by the Katun River. Here we visit the famous Oroktoy Bridge and explore the mysterious Kuyus Grotto with ancient rock carvings.",
    },
    {
        id: "day-2",
        dayNumber: 2,
        title: "Chuysky Tract, Seminsky Pass, Transfer to Aktash",
        images: [
            {
                src: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=800&q=80",
                alt: "Chuysky Tract road",
            },
            {
                src: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=80",
                alt: "Seminsky Pass",
            },
        ],
        description:
            "We set off along the legendary **Chuysky Tract**, one of the most scenic roads in the world. We climb up to the **Seminsky Pass** (1717 m), the highest point of the route. Here you’ll find ancient cedar forests and stunning panoramic views. After lunch, we continue our journey to Aktash — our base for the next few nights.",
    },
    {
        id: "day-3",
        dayNumber: 3,
        title: "Mars Valley, Geyser Lake, Chuya Ridge",
        images: [
            {
                src: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=800&q=80",
                alt: "Altai Mars landscape",
            },
            {
                src: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=80",
                alt: "Geyser Lake",
            },
        ],
        description:
            "Today we visit the most photogenic locations of Altai. **Kyzyl-Chin Valley (Mars)** features surreal landscapes with red, orange, and purple clay hills. Then we head to the **Geyser Lake**, known for its unique turquoise color and circular patterns on the bottom. We end the day with views of the **North Chuya Ridge**, covered with snow-capped peaks.",
    },
    {
        id: "day-4",
        dayNumber: 4,
        title: "Katu-Yaryk Pass, Pazyryk Burial Mounds",
        images: [
            {
                src: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=800&q=80",
                alt: "Katu-Yaryk Pass",
            },
            {
                src: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=80",
                alt: "Chulyshman Valley",
            },
        ],
        description:
            "We travel to the legendary **Katu-Yaryk Pass** — a dramatic serpentine road with 9 turns descending into the Chulyshman River valley. The views are truly breathtaking. Below lies untouched nature and waterfalls. On the way back, we visit the **Pazyryk burial mounds** — ancient Scythian tombs dating back to the 5th–3rd centuries BC, a UNESCO heritage site.",
    },
    {
        id: "day-5",
        dayNumber: 5,
        title: "Horseback Riding, Scenic Viewpoint",
        images: [
            {
                src: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=800&q=80",
                alt: "Horseback riding in Altai",
            },
            {
                src: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=80",
                alt: "Scenic viewpoint",
            },
        ],
        description:
            "We start the final day with a **horseback riding experience** through scenic Altai meadows — an unforgettable adventure for all participants. After lunch, we head to a **panoramic viewpoint** overlooking the mountain range. In the evening, we gather for a farewell dinner, share impressions, and prepare for departure.",
    },
]

export const INCLUSIONS = [
    {
        id: 1,
        label: "Transportation throughout the trip (SUV or comfortable minibus)",
    },
    {
        id: 2,
        label: "Accommodation in comfortable guesthouses with amenities",
    },
    {
        id: 3,
        label: "Double/triple occupancy rooms with amenities",
    },
    {
        id: 4,
        label: "Breakfasts included",
    },
    {
        id: 5,
        label: "Experienced English-speaking guide",
    },
    {
        id: 6,
        label: "Local guides for specialized excursions",
    },
    {
        id: 7,
        label: "Certified first aid guide",
    },
    {
        id: 8,
        label: "Horseback riding (2 hours)",
    },
    {
        id: 9,
        label: "Entrance fees to all attractions",
    },
    {
        id: 10,
        label: "Hiking tours",
    },
    {
        id: 11,
        label: "Bathhouse/sauna",
    },
    {
        id: 12,
        label: "First aid kit",
    },
    {
        id: 13,
        label: "Emergency communication equipment",
    },
    {
        id: 14,
        label: "Raincoats (if needed)",
    },
]

export const EXCLUSIONS = [
    {
        id: 1,
        label: "Transportation throughout the trip (SUV or comfortable minibus)",
    },
    {
        id: 2,
        label: "Accommodation in comfortable guesthouses with amenities",
    },
    {
        id: 3,
        label: "Double/triple occupancy rooms with amenities",
    },
    {
        id: 4,
        label: "Breakfasts included",
    },
    {
        id: 5,
        label: "Experienced English-speaking guide",
    },
]

export const ACCOMODATION_OPTIONS: AccommodationOption[] = [
    {
        id: "khan-altai",
        location: "Khan Altai, Nayman, Guest houses, Cottages",
        comfortLevel: "Comfort",
        comfortRating: 4,
        maxRating: 5,
        description:
            "Accommodation in 3* hotels or houses/apartments. For those who value comfort during the trip",
        images: [
            {
                src: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=300&fit=crop",
                alt: "Cozy room with a view of nature",
            },
            {
                src: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop",
                alt: "Деревянный интерьер коттеджа",
            },
            {
                src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
                alt: "Вид на горный пейзаж",
            },
            {
                src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&h=300&fit=crop",
                alt: "Горная долина",
            },
            {
                src: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=400&h=300&fit=crop",
                alt: "Горное озеро",
            },
            {
                src: "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?w=400&h=300&fit=crop",
                alt: "Лесной домик",
            },
            {
                src: "https://images.unsplash.com/photo-1561501900-3701fa6a0864?w=400&h=300&fit=crop",
                alt: "Гостевой домик",
            },
            {
                src: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=300&fit=crop",
                alt: "Просторный номер",
            },
            {
                src: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400&h=300&fit=crop",
                alt: "Современный интерьер",
            },
        ],
    },
]

export const ACCOMODATION_OPTIONS_LIST = [
    {
        id: 1,
        label: "2-bed room",
        tooltip:
            "If you're traveling with friends or family, we'll accommodate you together. If you're traveling alone, you have two options: sharing with someone of your gender or sharing a single room, which may require an additional fee on some tours. Please check with a travel expert before booking.",
    },
    {
        id: 2,
        label: "3-bed room",
        tooltip:
            "If you're traveling with friends or family, we'll place you together. If you're traveling alone, we'll place you with other travelers of your gender.",
    },
]

export const REVIEWS = [
    {
        id: "1",
        reviewer: {
            name: "Victoria",
            rating: 5.0,
            date: "August 3, 2025",
        },
        text: "The tour was maximally comfortable, well-organized, and exceeded all expectations. Everything was thoughtfully planned, and the experience felt smooth from start to finish.",
        images: [
            {
                src: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=300&fit=crop",
                alt: "Mountains",
            },
            {
                src: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop",
                alt: "Nature",
            },
            {
                src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
                alt: "Resort",
            },
            {
                src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&h=300&fit=crop",
                alt: "Landscape",
            },
            {
                src: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=400&h=300&fit=crop",
                alt: "Route",
            },
            {
                src: "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?w=400&h=300&fit=crop",
                alt: "View",
            },
            {
                src: "https://images.unsplash.com/photo-1561501900-3701fa6a0864?w=400&h=300&fit=crop",
                alt: "Mountain view",
            },
        ],
    },
    {
        id: "2",
        reviewer: {
            name: "Alex",
            rating: 5.0,
            date: "August 3, 2025",
        },
        text: "The tour was maximally comfortable, well-organized, and exceeded all expectations. Everything was thoughtfully planned, and the experience felt smooth from start to finish.",
        images: [
            {
                src: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=300&fit=crop",
                alt: "Mountains",
            },
            {
                src: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop",
                alt: "Nature",
            },
            {
                src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
                alt: "Resort",
            },
            {
                src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&h=300&fit=crop",
                alt: "Landscape",
            },
            {
                src: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=400&h=300&fit=crop",
                alt: "Route",
            },
            {
                src: "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?w=400&h=300&fit=crop",
                alt: "View",
            },
            {
                src: "https://images.unsplash.com/photo-1561501900-3701fa6a0864?w=400&h=300&fit=crop",
                alt: "Mountain view",
            },
        ],
    },
]

export const CITIES: City[] = [
    { name: "Москва", country: "Россия", code: "MOW", sub: "Все аэропорты" },
    {
        name: "Стамбул",
        country: "Турция",
        code: "IST",
        sub: "Ататюрк / Сабиха",
    },
    { name: "Дубай", country: "ОАЭ", code: "DXB", sub: "Международный" },
    { name: "Алматы", country: "Казахстан", code: "ALA", sub: "Международный" },
    {
        name: "Лондон",
        country: "Великобритания",
        code: "LON",
        sub: "Heathrow / Gatwick",
    },
    {
        name: "Париж",
        country: "Франция",
        code: "PAR",
        sub: "Charles de Gaulle",
    },
    { name: "Берлин", country: "Германия", code: "BER", sub: "Бранденбург" },
    { name: "Бангкок", country: "Таиланд", code: "BKK", sub: "Суварнабхуми" },
    { name: "Сеул", country: "Корея", code: "ICN", sub: "Инчхон" },
    { name: "Нью-Йорк", country: "США", code: "NYC", sub: "JFK / EWR / LGA" },
    { name: "Амстердам", country: "Нидерланды", code: "AMS", sub: "Схипхол" },
    { name: "Рим", country: "Италия", code: "ROM", sub: "Фьюмичино" },
    { name: "Барселона", country: "Испания", code: "BCN", sub: "Эль-Прат" },
    { name: "Тбилиси", country: "Грузия", code: "TBS", sub: "Международный" },
    { name: "Бишкек", country: "Кыргызстан", code: "FRU", sub: "Манас" },
    {
        name: "Самарканд",
        country: "Узбекистан",
        code: "SKD",
        sub: "Международный",
    },
    { name: "Токио", country: "Япония", code: "TYO", sub: "Нарита / Ханэда" },
    { name: "Сингапур", country: "Сингапур", code: "SIN", sub: "Чанги" },
    { name: "Франкфурт", country: "Германия", code: "FRA", sub: "Рейн-Майн" },
    { name: "Вена", country: "Австрия", code: "VIE", sub: "Швехат" },
]

export const DEFAULT_ORIGIN: City = {
    name: "Ташкент",
    country: "Узбекистан",
    code: "TAS",
    sub: "Международный",
}

export const MONTHS_RU = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
]

export const MONTHS_GENITIVE = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
]

export const DAYS_SHORT = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"]

export const MAX_ADULTS = 9
export const MAX_CHILDREN_UNDER_12 = 6
export const MAX_CHILDREN_UNDER_2 = 4
