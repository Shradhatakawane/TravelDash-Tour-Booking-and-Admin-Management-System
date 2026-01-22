const defaultPackages = [
  {
    id: 1,
    title: "Goa Beach Tour",
    location: "Goa",
    days: "4D / 3N",
    price: 25000,
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200",
    services: ["Hotel", "Meals", "Sightseeing", "Transfers"],
    famousSpots: ["Baga Beach", "Calangute Beach", "Fort Aguada"],
    localFood: ["Fish Curry", "Prawn Fry", "Bebinca"],
    culture: "Goa is famous for beaches, nightlife, Portuguese culture and churches.",
    highlights:
      "Perfect for couples & friends. Beaches, water sports, parties and scenic sunsets.",
  },
];

export const getPackages = () => {
  const stored = localStorage.getItem("packages");
  return stored ? JSON.parse(stored) : defaultPackages;
};

export const savePackages = (packages) => {
  localStorage.setItem("packages", JSON.stringify(packages));
};
