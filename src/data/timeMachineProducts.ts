export type ProductChallengeType = 
  | 'food-delivery' 
  | 'ride-hailing' 
  | 'online-shopping' 
  | 'smartwatch' 
  | 'wireless-earbuds';

export interface ProductCard {
  id: string;
  type: 'USER' | 'PROBLEM' | 'NEED' | 'PRODUCT';
  title: string;
  description: string;
  tagline?: string;
}

export interface ProductChallengeConfig {
  id: ProductChallengeType;
  title: string;
  tagline: string;
  icon: string;
  interactionStyle: 'drag-slots' | 'matching' | 'evidence-discovery' | 'timeline' | 'relational-wires';
  question: string;
  description: string;
  hint: string;
  correctCards: {
    user: ProductCard;
    problem: ProductCard;
    need: ProductCard;
    product: ProductCard;
  };
  // Distractor or extra cards for matching / evidence challenges
  distractorCards?: ProductCard[];
}

export const PRODUCT_CHALLENGES: Record<ProductChallengeType, ProductChallengeConfig> = {
  'food-delivery': {
    id: 'food-delivery',
    title: 'Food Delivery App',
    tagline: 'NOVALINK Core Industry Benchmark',
    icon: '🍔',
    interactionStyle: 'drag-slots',
    question: 'Why was this product created?',
    description: 'Arrange the physical cards from the root human condition forward to the engineered product.',
    hint: 'Think about who was hungry and strapped for time, and why getting food in-person was a friction point.',
    correctCards: {
      user: {
        id: 'food-user',
        type: 'USER',
        title: 'Target Audience',
        description: 'Busy students, working people and customers',
        tagline: 'Root User Demographic',
      },
      problem: {
        id: 'food-problem',
        type: 'PROBLEM',
        title: 'The Core Friction',
        description: 'People may not be able to easily travel to restaurants or order food directly.',
        tagline: 'Physical & Logistical Barrier',
      },
      need: {
        id: 'food-need',
        type: 'NEED',
        title: 'Essential Desire',
        description: 'Convenient access to food.',
        tagline: 'Underlying Demand',
      },
      product: {
        id: 'food-product',
        type: 'PRODUCT',
        title: 'Engineered Artifact',
        description: 'Food Delivery App',
        tagline: 'Digital Solution',
      },
    },
  },

  'ride-hailing': {
    id: 'ride-hailing',
    title: 'Ride-Hailing App',
    tagline: 'On-Demand Urban Mobility',
    icon: '🚖',
    interactionStyle: 'matching',
    question: 'Why was this on-demand mobility platform engineered?',
    description: 'Match the specific commuter profile to the transportation friction they faced.',
    hint: 'Consider how rain, standing in the street, or lacking cars left commuters stranded without reliable dispatch.',
    correctCards: {
      user: {
        id: 'ride-user',
        type: 'USER',
        title: 'Urban Commuters',
        description: 'People who need convenient transportation',
        tagline: 'Mobile Citizens & Travelers',
      },
      problem: {
        id: 'ride-problem',
        type: 'PROBLEM',
        title: 'Street-Hailing Friction',
        description: 'Difficult to find available transportation quickly',
        tagline: 'Uncertain Transit Supply',
      },
      need: {
        id: 'ride-need',
        type: 'NEED',
        title: 'Mobility Requirement',
        description: 'Fast and convenient travel',
        tagline: 'On-Demand Dispatch',
      },
      product: {
        id: 'ride-product',
        type: 'PRODUCT',
        title: 'Ride-Hailing Network',
        description: 'Ride-Hailing App',
        tagline: 'GPS Matching Infrastructure',
      },
    },
    distractorCards: [
      {
        id: 'distract-ride-1',
        type: 'USER',
        title: 'Heavy Freight Shippers',
        description: 'Industrial supply chains requiring cargo shipping across oceans.',
      },
      {
        id: 'distract-ride-2',
        type: 'PROBLEM',
        title: 'High Airplane Fuel Costs',
        description: 'Commercial aviation experiencing jet fuel price surges.',
      },
    ],
  },

  'online-shopping': {
    id: 'online-shopping',
    title: 'Online Shopping App',
    tagline: 'Digital Consumer Commerce',
    icon: '🛍️',
    interactionStyle: 'evidence-discovery',
    question: 'What core friction sparked the modern e-commerce revolution?',
    description: 'Inspect the evidence dossiers on the console to extract the 4 critical building blocks.',
    hint: 'Look for notes highlighting the inconvenience of driving to brick-and-mortar stores versus buying from a sofa.',
    correctCards: {
      user: {
        id: 'shop-user',
        type: 'USER',
        title: 'At-Home Consumers',
        description: 'People who want to shop from home',
        tagline: 'Everyday Purchasers',
      },
      problem: {
        id: 'shop-problem',
        type: 'PROBLEM',
        title: 'Geographic Limitations',
        description: 'Traveling to physical stores can be inconvenient',
        tagline: 'Store Queues & Limited Hours',
      },
      need: {
        id: 'shop-need',
        type: 'NEED',
        title: 'Fulfillment Goal',
        description: 'Convenient access to products',
        tagline: 'Doorstep Delivery & Catalog Search',
      },
      product: {
        id: 'shop-product',
        type: 'PRODUCT',
        title: 'Digital Marketplace',
        description: 'Online Shopping App',
        tagline: 'Infinite Virtual Storefront',
      },
    },
    distractorCards: [
      {
        id: 'distract-shop-1',
        type: 'NEED',
        title: 'Physical Mall Socializing',
        description: 'Wanting to wander shopping malls with friends for entertainment.',
      },
    ],
  },

  'smartwatch': {
    id: 'smartwatch',
    title: 'Smartwatch',
    tagline: 'Personal Biometrics & Wearables',
    icon: '⌚',
    interactionStyle: 'timeline',
    question: 'How did wearable intelligence evolve from daily human friction?',
    description: 'Reconstruct the chronological timeline from personal health consciousness to wrist microcomputing.',
    hint: 'Start with the individual wanting to monitor their body and steps, but lacking any unobtrusive sensors.',
    correctCards: {
      user: {
        id: 'watch-user',
        type: 'USER',
        title: 'Health-Conscious Individuals',
        description: 'People who want to monitor daily health/activity',
        tagline: 'Active People & Patients',
      },
      problem: {
        id: 'watch-problem',
        type: 'PROBLEM',
        title: 'Information Invisibility',
        description: 'Important activity information is not always easily tracked',
        tagline: 'No Continuous Bio-Feedback',
      },
      need: {
        id: 'watch-need',
        type: 'NEED',
        title: 'Glanceable Telemetry',
        description: 'Quick access to personal activity information',
        tagline: 'Real-Time Health Insights',
      },
      product: {
        id: 'watch-product',
        type: 'PRODUCT',
        title: 'Wrist Sensor Platform',
        description: 'Smartwatch',
        tagline: 'All-Day Wearable Computer',
      },
    },
  },

  'wireless-earbuds': {
    id: 'wireless-earbuds',
    title: 'Wireless Earbuds',
    tagline: 'Untethered Personal Audio',
    icon: '🎧',
    interactionStyle: 'relational-wires',
    question: 'What fundamental relationship severed the audio cord?',
    description: 'Draw the connection flow across the 4 nodes to form an unbreakable causality link.',
    hint: 'Follow how active motion and snagged wires created the craving for free, cord-free listening.',
    correctCards: {
      user: {
        id: 'earbuds-user',
        type: 'USER',
        title: 'Mobile Audio Listeners',
        description: 'People who want convenient audio while moving',
        tagline: 'Commuters, Runners & Workers',
      },
      problem: {
        id: 'earbuds-problem',
        type: 'PROBLEM',
        title: 'Physical Tethering',
        description: 'Wired headphones can restrict movement',
        tagline: 'Tangled Cables & Snagging',
      },
      need: {
        id: 'earbuds-need',
        type: 'NEED',
        title: 'Acoustic Freedom',
        description: 'Convenient wireless audio',
        tagline: 'Pocketable Unrestricted Sound',
      },
      product: {
        id: 'earbuds-product',
        type: 'PRODUCT',
        title: 'Bluetooth Micro-Transducers',
        description: 'Wireless Earbuds',
        tagline: 'Independent Cordless Pods',
      },
    },
  },
};
