const defaultPackages = [
  {
    id: 1,
    title: "Goa Beach Tour",
    location: "Goa, India",
    days: "4D / 3N",
    price: 25000,
    image:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200",

    bestTime: "Nov - Feb",
    bestFor: ["Couples", "Friends", "Family"],

    services: ["Hotel", "Meals", "Sightseeing", "Transfers"],
    whyFamous: ["Beaches", "Nightlife", "Water Sports", "Portuguese Culture"],
    famousSpots: ["Baga Beach", "Calangute Beach", "Fort Aguada", "Anjuna Beach"],
    localFood: ["Fish Curry", "Prawn Fry", "Bebinca", "Goan Vindaloo"],
    culture:
      "Goa is famous for beaches, nightlife, Portuguese heritage, churches, and a vibrant party culture.",
    travelTips: [
      "Carry sunscreen and sunglasses",
      "Avoid peak weekend crowds",
      "Keep cash for beach shacks",
      "Try water sports early morning",
    ],
  },

  {
    id: 2,
    title: "Manali Snow Adventure",
    location: "Manali, Himachal Pradesh",
    days: "5D / 4N",
    price: 32000,
    image:"https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=1200",

    bestTime: "Dec - Feb",
    bestFor: ["Adventure", "Couples", "Friends"],

    services: ["Hotel", "Breakfast", "Cab", "Sightseeing"],
    whyFamous: ["Snowfall", "Mountains", "Adventure Sports", "Scenic Valleys"],
    famousSpots: ["Solang Valley", "Rohtang Pass", "Hadimba Temple", "Mall Road"],
    localFood: ["Siddu", "Thukpa", "Momos", "Trout Fish"],
    culture:
      "Manali is known for Himalayan beauty, snowfall, local Himachali culture, and adventure activities.",
    travelTips: [
      "Carry warm clothes and gloves",
      "Check Rohtang Pass weather before planning",
      "Keep medicines for cold & headache",
      "Wear snow shoes for safety",
    ],
  },

  {
    id: 3,
    title: "Kashmir Paradise Tour",
    location: "Srinagar, Kashmir",
    days: "6D / 5N",
    price: 45000,
    image:
      "https://images.unsplash.com/photo-1582550945154-66ea8fff25e1?w=1200",

    bestTime: "Mar - Oct",
    bestFor: ["Family", "Couples", "Nature Lovers"],

    services: ["Houseboat", "Meals", "Sightseeing", "Transfers"],
    whyFamous: ["Dal Lake", "Snow Mountains", "Gardens", "Romantic Views"],
    famousSpots: ["Dal Lake", "Gulmarg", "Pahalgam", "Mughal Gardens"],
    localFood: ["Rogan Josh", "Kahwa Tea", "Dum Aloo", "Yakhni"],
    culture:
      "Kashmir is famous for houseboats, traditional handicrafts, snow mountains, and warm hospitality.",
    travelTips: [
      "Carry a light jacket even in summer",
      "Book Shikara ride in advance",
      "Shop for Kashmiri dry fruits",
      "Keep ID proof for hotel check-in",
    ],
  },

  {
    id: 4,
    title: "Kerala Backwater Trip",
    location: "Alleppey, Kerala",
    days: "4D / 3N",
    price: 38000,
    image:
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1200",

    bestTime: "Sep - Mar",
    bestFor: ["Family", "Couples", "Relaxation"],

    services: ["Houseboat", "Meals", "Sightseeing", "Pickup & Drop"],
    whyFamous: ["Backwaters", "Houseboats", "Greenery", "Ayurveda"],
    famousSpots: ["Alleppey Backwaters", "Kumarakom", "Vembanad Lake", "Beach Walk"],
    localFood: ["Appam", "Kerala Sadya", "Fish Curry", "Payasam"],
    culture:
      "Kerala is known for backwaters, coconut trees, traditional dance, Ayurveda, and peaceful lifestyle.",
    travelTips: [
      "Carry mosquito repellent",
      "Prefer houseboat stay for best experience",
      "Wear comfortable cotton clothes",
      "Try local coconut water",
    ],
  },

  {
    id: 5,
    title: "Jaipur Royal Heritage Tour",
    location: "Jaipur, Rajasthan",
    days: "3D / 2N",
    price: 28000,
    image:
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=1200",

    bestTime: "Oct - Mar",
    bestFor: ["Family", "History Lovers", "Friends"],

    services: ["Hotel", "Breakfast", "Sightseeing", "Transfers"],
    whyFamous: ["Forts", "Palaces", "Royal Culture", "Shopping Markets"],
    famousSpots: ["Amber Fort", "Hawa Mahal", "City Palace", "Jantar Mantar"],
    localFood: ["Dal Baati Churma", "Ghewar", "Kachori", "Lassi"],
    culture:
      "Jaipur is famous for royal heritage, forts, palaces, colorful bazaars, and traditional Rajasthani culture.",
    travelTips: [
      "Carry sunscreen and water bottle",
      "Visit forts early to avoid heat",
      "Shop from local bazaars for best prices",
      "Wear comfortable walking shoes",
    ],
  },

  {
    id: 6,
    title: "Ladakh Road Trip Adventure",
    location: "Leh-Ladakh, India",
    days: "7D / 6N",
    price: 65000,
    image:
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1200",

    bestTime: "May - Sep",
    bestFor: ["Adventure", "Bike Riders", "Friends"],

    services: ["Hotel", "Breakfast", "Permits", "Local Travel"],
    whyFamous: ["High Passes", "Lakes", "Monasteries", "Road Trips"],
    famousSpots: ["Pangong Lake", "Nubra Valley", "Khardung La", "Magnetic Hill"],
    localFood: ["Momos", "Thukpa", "Butter Tea", "Skyu"],
    culture:
      "Ladakh is known for Buddhist monasteries, high-altitude landscapes, and unique mountain lifestyle.",
    travelTips: [
      "Acclimatize for 1 day in Leh",
      "Carry oxygen support or consult doctor",
      "Drink plenty of water",
      "Avoid heavy workout on first day",
    ],
  },

  {
    id: 7,
    title: "Dubai Luxury City Tour",
    location: "Dubai, UAE",
    days: "5D / 4N",
    price: 120000,
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200",

    bestTime: "Nov - Mar",
    bestFor: ["Luxury", "Family", "Couples"],

    services: ["Hotel", "Breakfast", "City Tour", "Airport Transfers"],
    whyFamous: ["Skyscrapers", "Luxury Shopping", "Desert Safari", "Modern City"],
    famousSpots: ["Burj Khalifa", "Dubai Mall", "Desert Safari", "Dubai Marina"],
    localFood: ["Shawarma", "Falafel", "Kunafa", "Arabic Coffee"],
    culture:
      "Dubai is known for luxury lifestyle, futuristic architecture, desert experiences, and world-class shopping.",
    travelTips: [
      "Carry passport copy everywhere",
      "Respect local rules and dress code",
      "Book Burj Khalifa tickets early",
      "Best time for desert safari is evening",
    ],
  },

  {
    id: 8,
    title: "Singapore Family Fun Tour",
    location: "Singapore",
    days: "4D / 3N",
    price: 150000,
    image:
      "https://images.unsplash.com/photo-1508964942454-1a56651d54ac?w=1200",

    bestTime: "Feb - Apr",
    bestFor: ["Family", "Kids", "Friends"],

    services: ["Hotel", "Breakfast", "Attraction Tickets", "Transfers"],
    whyFamous: ["Universal Studios", "Clean City", "Night Safari", "Sentosa"],
    famousSpots: ["Universal Studios", "Sentosa Island", "Marina Bay Sands", "Gardens by the Bay"],
    localFood: ["Chicken Rice", "Laksa", "Chilli Crab", "Satay"],
    culture:
      "Singapore is known for cleanliness, multicultural environment, modern attractions, and amazing street food.",
    travelTips: [
      "Carry a reusable water bottle",
      "Use MRT for easy travel",
      "Book Universal Studios tickets online",
      "Keep raincoat for sudden showers",
    ],
  },

  {
    id: 9,
    title: "Maldives Honeymoon Special",
    location: "Maldives",
    days: "5D / 4N",
    price: 220000,
    image:
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=1200",

    bestTime: "Nov - Apr",
    bestFor: ["Honeymoon", "Couples", "Luxury"],

    services: ["Resort", "Breakfast", "Airport Transfers", "Water Activities"],
    whyFamous: ["Overwater Villas", "Crystal Water", "Snorkeling", "Romantic Stay"],
    famousSpots: ["Overwater Villas", "Private Beaches", "Coral Reefs", "Island Resorts"],
    localFood: ["Mas Huni", "Garudhiya", "Seafood BBQ", "Tropical Fruits"],
    culture:
      "Maldives is famous for luxury resorts, clear blue water, marine life, and romantic island experiences.",
    travelTips: [
      "Carry swimwear and sunscreen",
      "Book water villa in advance",
      "Try snorkeling with guide",
      "Carry international adapter",
    ],
  },

  {
    id: 10,
    title: "Andaman Island Explorer",
    location: "Andaman & Nicobar Islands",
    days: "5D / 4N",
    price: 55000,
    image:
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1200",

    bestTime: "Oct - May",
    bestFor: ["Beach Lovers", "Family", "Adventure"],

    services: ["Hotel", "Breakfast", "Ferry Tickets", "Sightseeing"],
    whyFamous: ["Island Hopping", "Scuba Diving", "Beaches", "Marine Life"],
    famousSpots: ["Havelock Island", "Radhanagar Beach", "Neil Island", "Cellular Jail"],
    localFood: ["Seafood Platter", "Fish Tikka", "Coconut Curry", "Prawn Masala"],
    culture:
      "Andaman is known for stunning beaches, island life, historic places, and underwater marine beauty.",
    travelTips: [
      "Carry valid ID for ferry travel",
      "Book ferry tickets early",
      "Avoid plastic on beaches",
      "Try scuba diving with certified trainers",
    ],
  },
];

export const getPackages = () => {
  const stored = localStorage.getItem("packages");
  return stored ? JSON.parse(stored) : defaultPackages;
};

export const savePackages = (packages) => {
  localStorage.setItem("packages", JSON.stringify(packages));
};
