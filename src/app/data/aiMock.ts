export interface AIProfile {
  title: string;
  category: string;
  description: string;
  characteristics: {
    brand?: string;
    model?: string;
    condition: string;
    colour?: string;
    size?: string;
    features: string[];
  };
  priceRecommendation: {
    daily: number;
    weekly: number;
    monthly: number;
    depositSuggestion: number;
    explanation: string;
  };
  demand: "low" | "medium" | "high";
  demandExplanation: string;
  demandSuggestion: string;
}

export const aiProfiles: AIProfile[] = [
  {
    title: "Sony WH-1000XM4 Noise-Cancelling Headphones",
    category: "Electronics",
    description:
      "Premium Sony noise-cancelling wireless headphones in excellent condition. Features industry-leading active noise cancellation, up to 30 hours battery life, and multipoint Bluetooth connection. Includes original carrying case, USB-C charging cable, and 3.5mm audio cable.",
    characteristics: {
      brand: "Sony",
      model: "WH-1000XM4",
      condition: "Excellent",
      colour: "Black",
      features: ["Noise Cancellation", "30hr Battery", "Bluetooth 5.0", "Foldable Design", "Touch Controls"],
    },
    priceRecommendation: {
      daily: 8,
      weekly: 35,
      monthly: 110,
      depositSuggestion: 50,
      explanation:
        "Based on 14 similar listings in your area, RM8/day is competitive and likely to attract bookings within 24 hours.",
    },
    demand: "high",
    demandExplanation: "Headphones see 3× higher search activity during exam season.",
    demandSuggestion: "Consider raising your price slightly — demand is high right now.",
  },
  {
    title: "Formal Blazer — Navy Blue (Size M)",
    category: "Fashion",
    description:
      "Professional navy blue formal blazer in good condition. Single-breasted, two-button design with notch lapels. Suitable for job interviews, presentations, and formal campus events. Dry-cleaned and ready to wear.",
    characteristics: {
      brand: "Uniqlo",
      condition: "Good",
      colour: "Navy Blue",
      size: "M",
      features: ["Single-breasted", "Notch Lapel", "Two-button", "Dry-cleaned"],
    },
    priceRecommendation: {
      daily: 12,
      weekly: 45,
      monthly: 130,
      depositSuggestion: 40,
      explanation:
        "Formal blazers average RM10–15/day locally. RM12/day positions you well for interview and event season.",
    },
    demand: "medium",
    demandExplanation: "Demand peaks around internship application and graduation periods.",
    demandSuggestion: "Your listing is well-timed — internship season is approaching.",
  },
  {
    title: "Texas Instruments TI-84 Plus Graphing Calculator",
    category: "Tools",
    description:
      "TI-84 Plus graphing calculator in very good condition. Compatible with most engineering, maths, and science courses. Includes 4 AAA batteries and original slide cover. Screen is clear with no scratches.",
    characteristics: {
      brand: "Texas Instruments",
      model: "TI-84 Plus",
      condition: "Very Good",
      colour: "Black",
      features: ["Graphing", "MathPrint Display", "USB Connectivity", "Apps Support"],
    },
    priceRecommendation: {
      daily: 4,
      weekly: 18,
      monthly: 55,
      depositSuggestion: 25,
      explanation:
        "Calculators typically rent at RM3–5/day. RM4/day is ideal for exam-period demand.",
    },
    demand: "high",
    demandExplanation: "Calculators are always high-demand around mid-semester and final exams.",
    demandSuggestion: "List now — exam season is peak booking time for calculators.",
  },
  {
    title: "Anker PowerCore 20,000mAh Power Bank",
    category: "Electronics",
    description:
      "High-capacity Anker power bank with 20,000mAh capacity. Charges most smartphones 4–5 times. Supports 18W fast charging for compatible devices. Includes USB-A and USB-C output ports. Compact and lightweight for campus use.",
    characteristics: {
      brand: "Anker",
      model: "PowerCore 20100",
      condition: "Excellent",
      colour: "Black",
      features: ["20,000mAh", "18W Fast Charge", "USB-C Output", "Multi-device"],
    },
    priceRecommendation: {
      daily: 4,
      weekly: 18,
      monthly: 50,
      depositSuggestion: 30,
      explanation:
        "Power banks rent at RM3–5/day across campus. RM4/day matches demand with a good balance.",
    },
    demand: "medium",
    demandExplanation: "Power banks have steady demand with spikes during events and field trips.",
    demandSuggestion: "Consider bundling with a charging cable for higher weekly bookings.",
  },
  {
    title: "Lab Coat — White (Size L)",
    category: "Fashion",
    description:
      "Clean white laboratory coat in good condition. Long sleeve with two lower patch pockets and one chest pocket. Suitable for biology, chemistry, and food science lab sessions. Freshly laundered and hygienically cleaned before rental.",
    characteristics: {
      condition: "Good",
      colour: "White",
      size: "L",
      features: ["Long Sleeve", "Patch Pockets", "Freshly Laundered", "Lab-approved"],
    },
    priceRecommendation: {
      daily: 3,
      weekly: 12,
      monthly: 35,
      depositSuggestion: 15,
      explanation:
        "Lab coats typically rent at RM2–4/day. RM3/day is the sweet spot for regular lab students.",
    },
    demand: "medium",
    demandExplanation: "Lab coat demand follows the academic semester schedule.",
    demandSuggestion: "Steady bookings expected throughout the semester.",
  },
  {
    title: "Foldable Portable Study Table",
    category: "Other",
    description:
      "Lightweight foldable study table suitable for dorm room use or outdoor studying. Adjustable height, non-slip surface, and sturdy enough to hold a laptop and books. Folds flat for easy storage and transport.",
    characteristics: {
      condition: "Good",
      colour: "Beige",
      features: ["Foldable", "Adjustable Height", "Non-slip Surface", "Laptop-compatible"],
    },
    priceRecommendation: {
      daily: 5,
      weekly: 22,
      monthly: 65,
      depositSuggestion: 25,
      explanation:
        "Portable tables are a niche item; RM5/day attracts students needing temporary workspace solutions.",
    },
    demand: "low",
    demandExplanation: "Study tables have lower demand but consistent bookings for project periods.",
    demandSuggestion: "Try lowering the price slightly to increase booking rate.",
  },
  {
    title: "USB-C 65W Fast Charging Adapter",
    category: "Electronics",
    description:
      "Universal 65W USB-C fast charging adapter compatible with most laptops, tablets, and smartphones. Compact design, travel-friendly. Compatible with MacBook, Dell XPS, Lenovo ThinkPad, and most USB-C devices.",
    characteristics: {
      condition: "Excellent",
      colour: "White",
      features: ["65W Fast Charge", "USB-C", "Universal Compatible", "Compact Design"],
    },
    priceRecommendation: {
      daily: 3,
      weekly: 14,
      monthly: 40,
      depositSuggestion: 20,
      explanation:
        "USB-C chargers are popular short-term rentals; RM3/day matches the market rate.",
    },
    demand: "high",
    demandExplanation: "Charger rentals spike during campus events and presentation days.",
    demandSuggestion: "Add availability for weekends — high demand from events.",
  },
];
