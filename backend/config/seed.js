import Tour from "../models/Tour.js";

const seedTours = async () => {
  try {
    // Force re-seed to apply new structure
    await Tour.deleteMany({});
    console.log("Existing tours cleared for re-seeding...");

    const initialTours = [
      {
        id: "ultimate-street-food",
        title: "The Ultimate Street Food Adventure",
        price: "$39",
        duration: "4 Hours",
        groupSize: "Max 6",
        heroImage: "https://res.cloudinary.com/dcucspcvz/image/upload/v1763297724/avatars/qsdkqej2xy2ykkctgrzy.webp",
        rating: 4.9,
        description: "Our most popular tour! Dive deep into the heart of Saigon's culinary scene. We'll take you to the places that don't have menus in English, where the recipes have been passed down for generations. You'll learn about the history of the dishes and the people who make them.",
        foodItems: ["Bánh Mì Huỳnh Hoa", "Bún Chả Hà Nội", "Cơm Tấm Ba Ghiền", "Bánh Xèo", "Chè Thái"],
        included: [
          "All food and drinks mentioned in the itinerary",
          "English-speaking local guide",
          "Hotel pick-up and drop-off (District 1)",
          "Accident insurance",
          "Raincoat (if needed)"
        ],
        notIncluded: [
          "Personal expenses",
          "Tips for the guide (optional but appreciated)",
          "Pick-up outside District 1 (extra charge applies)"
        ],
        policy: [
          "Free cancellation up to 24 hours before the tour starts.",
          "Cancellations within 24 hours are non-refundable.",
          "In case of heavy rain, we can reschedule or offer a full refund."
        ],
        notes: [
          "Please inform us of any food allergies or dietary restrictions when booking.",
          "Wear comfortable shoes and light clothing.",
          "Bring your camera to capture the vibrant street life!"
        ],
        itinerary: [
          { time: "17:30", activity: "Pick up from your hotel in District 1", desc: "Our guide will meet you at your hotel lobby with a friendly smile and a brief introduction to the tour." },
          { 
            time: "18:00", 
            activity: "First stop: Famous Bánh Mì stall", 
            image: "https://picsum.photos/seed/food1/800/600",
            desc: "A legendary stall with over 30 years of history. You'll taste the most authentic Bánh Mì in Saigon, filled with high-quality pâté, cold cuts, and fresh herbs." 
          },
          { 
            time: "18:45", 
            activity: "District 4: Seafood Paradise", 
            image: "https://picsum.photos/seed/d4food/800/600",
            desc: "Known as the 'seafood paradise' of Saigon. This narrow street is packed with local vendors serving the freshest snails, shellfish, and grilled meats." 
          },
          { 
            time: "19:30", 
            activity: "District 10: Hidden Flower Market", 
            image: "https://picsum.photos/seed/flowers/800/600",
            desc: "A 24/7 wholesale flower market tucked away in District 10. We'll walk through the fragrant aisles and stop for a unique local snack only found in this area." 
          },
          { 
            time: "20:30", 
            activity: "Dessert time: Traditional Sweet Soup", 
            image: "https://picsum.photos/seed/dessert/800/600",
            desc: "We'll end our food journey with a refreshing bowl of traditional Vietnamese sweet soup (Chè), a perfect way to balance the savory flavors of the night." 
          },
          { time: "21:30", activity: "Drop off back at your hotel", desc: "We'll safely drive you back to your accommodation, leaving you with a full stomach and unforgettable memories of Saigon." }
        ]
      },
      {
        id: "saigon-night-life",
        title: "Saigon Night Life & Food Tour",
        price: "$45",
        duration: "4.5 Hours",
        groupSize: "Max 8",
        heroImage: "https://picsum.photos/seed/night-hero/1200/600",
        rating: 5.0,
        description: "See Saigon come alive at night! This tour combines the best of local street food with the electric atmosphere of the city after dark. We'll navigate the busy streets on motorbikes, just like the locals do.",
        foodItems: ["Ốc (Snails)", "Bánh Tráng Nướng", "Bún Bò Huế", "Craft Beer", "Coconut Coffee"],
        included: [
          "Motorbike transportation with local driver",
          "Helmet and safety gear",
          "All food and drinks specified",
          "English-speaking guide",
          "Insurance coverage"
        ],
        notIncluded: [
          "Additional drinks outside the menu",
          "Personal shopping",
          "Gratuities"
        ],
        policy: [
          "Participants must be at least 12 years old for motorbike tours.",
          "Full refund for cancellations made 48 hours in advance.",
          "Safety is our priority; tours may be modified due to weather."
        ],
        notes: [
          "This is a motorbike-based tour. If you prefer walking, please let us know.",
          "Avoid wearing expensive jewelry or carrying large amounts of cash.",
          "Saigon nights can be humid, stay hydrated!"
        ],
        itinerary: [
          { time: "18:00", activity: "Motorbike pick up and safety briefing", desc: "Meet your driver and get ready for an exciting ride through the city. We'll provide helmets and a quick safety talk." },
          { 
            time: "18:30", 
            activity: "Crossing the bridge to District 4", 
            image: "https://picsum.photos/seed/bridge/800/600",
            desc: "The best spot to see the Saigon skyline light up. We'll stop here for a quick photo and to feel the cool breeze from the river." 
          },
          { 
            time: "19:30", 
            activity: "District 7: Modern Saigon", 
            image: "https://picsum.photos/seed/d7view/800/600",
            desc: "Explore the modern side of the city with its wide boulevards and beautiful riverside views, a stark contrast to the bustling city center." 
          },
          { 
            time: "20:30", 
            activity: "Hidden Rooftop Bar", 
            image: "https://picsum.photos/seed/rooftop/800/600",
            desc: "We'll end the night at a secret rooftop bar that only locals know about, offering a stunning 360-degree view of the city while we enjoy a refreshing drink." 
          },
          { time: "22:00", activity: "Safe return to your accommodation", desc: "Your driver will drop you off safely at your hotel, concluding our night adventure." }
        ]
      }
    ];
    await Tour.insertMany(initialTours);
    console.log("Database seeded with initial tours");
  } catch (err) {
    console.error("Error seeding database:", err);
  }
};

export default seedTours;
