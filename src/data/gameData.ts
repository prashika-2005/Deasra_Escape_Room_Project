import { 
  Chit, 
  MCQQuestion, 
  CaseFileQuestion, 
  EvidenceDocument, 
  TimeMachineCard, 
  CaseStudy, 
  EvidenceSortingCard 
} from '../types/gameTypes';

export const INITIAL_CHITS: Chit[] = [
  {
    id: 1,
    name: 'Founder File Fragment 01',
    fragmentNumber: '01/05',
    locationTitle: 'Notice Board Announcement',
    environmentalClue: 'A sticky note says: "Something important was removed from this board."',
    locationHint: 'Pinned behind an old startup announcement notice on Wall 2',
    found: false,
    position: [-4.2, 1.6, 0.7],
    excerptTitle: 'SECTION 1: RAPID GROWTH & EARLY ANOMALIES',
    excerptText: 'May-June 2024: NOVALINK was growing rapidly. Campus orders jumped by 400% after university blitz. But the kitchen dispatch pipeline was non-existent. Staff began frantically jotting tickets on scraps of paper. Nobody stopped to question if our infrastructure could survive.',
  },
  {
    id: 2,
    name: 'Founder File Fragment 02',
    fragmentNumber: '02/05',
    locationTitle: 'Information Shelf Folder',
    environmentalClue: 'A handwritten note reads: "The founder never trusted digital copies."',
    locationHint: 'Inside a slightly open manila folder on the side shelf near Wall 2',
    found: false,
    position: [-4.45, 0.85, -1.8],
    excerptTitle: 'SECTION 2: DISPATCH BREAKDOWN & MULTI-TABLET CHAOS',
    excerptText: 'July 2024: Kitchen workers are balancing 4 disparate tablets from 4 delivery partners. Order details are manually copy-pasted into a WhatsApp group to notify riders! Couriers wait 37+ minutes outside while cooked food sits cold on the pass. Total chaos.',
  },
  {
    id: 3,
    name: 'Founder File Fragment 03',
    fragmentNumber: '03/05',
    locationTitle: 'Credenza Drawer ("BACKUP NOTES")',
    environmentalClue: 'A visible yellow sticky note on the drawer handle: "BACKUP NOTES"',
    locationHint: 'Inside the credenza drawer labeled BACKUP NOTES near Wall 2',
    found: false,
    position: [-4.4, 0.55, 1.8],
    excerptTitle: 'SECTION 3: THE CUSTOMER REVOLT & COLLAPSE',
    excerptText: 'August 2024: Cancellations have spiked to 45.2%. Over $120,000 refunded in 30 days. App Store rating crashed from 4.7★ down to 1.9★. Repeat user retention has dropped by 62%. Customers feel betrayed by cold meals and missing items.',
  },
  {
    id: 4,
    name: 'Founder File Fragment 04',
    fragmentNumber: '04/05',
    locationTitle: 'Framed Team Photograph',
    environmentalClue: 'A corner of paper with a red "CONFIDENTIAL" mark protrudes from behind the frame.',
    locationHint: 'Behind the framed NOVALINK team photograph on Wall 2',
    found: false,
    position: [-4.85, 2.35, 1.4],
    excerptTitle: 'SECTION 4: THE MARKETING DELUSION',
    excerptText: 'September 2024: Instead of fixing kitchen operations, marketing launched a 50% flash discount promotion to artificially mask churn. 1,850 orders/day flooded a kitchen built for 400. Leadership scaled customer acquisition without validating operational capacity.',
  },
  {
    id: 5,
    name: 'Founder File Fragment 05',
    fragmentNumber: '05/05',
    locationTitle: 'Founder Desk & Plaque Area',
    environmentalClue: 'Next to the founder nameplate, a note says: "Start where the company began."',
    locationHint: 'Tucked beneath the founder\'s notebook near the founder nameplate on Wall 2',
    found: false,
    position: [-4.4, 0.9, -0.4],
    excerptTitle: 'SECTION 5: FOUNDER CONCLUSION & THE CRUCIAL WARNING',
    excerptText: 'Late September 2024: Late deliveries, cold food, and furious reviews are ONLY SYMPTOMS. The real disease was scaling marketing before building an automated order-coordination and dispatch pipeline. Before trying to fix anything... Understand HOW TO IDENTIFY A PROBLEM PROPERLY.',
  },
];

export const CHALLENGE_CHITS = INITIAL_CHITS;

export const FOUNDER_FILE_DOCUMENT = {
  title: "NOVALINK — FOUNDER'S INVESTIGATION FILE",
  classification: "CONFIDENTIAL // INTERNAL INVESTIGATION",
  summary: "Comprehensive diagnostic notes left by Alex Chen (Founder & CEO) before office lockdown.",
  content: [
    "Something is wrong with the way NOVALINK handles its rapid growth.",
    "Customer complaints are increasing.",
    "Delivery problems are increasing.",
    "Employees are struggling to keep up.",
    "And the startup has begun losing massive capital.",
    "BUT THESE MAY ONLY BE SYMPTOMS.",
    "The real problem is deeper.",
    "Before trying to fix anything...",
    "Understand HOW TO IDENTIFY A PROBLEM PROPERLY.",
  ],
  nextLead: {
    station: "THE KNOWLEDGE BOX",
    instruction: "Learn how to distinguish symptoms from the real problem before investigating NOVALINK further.",
  }
};

export const STARTUP_BOARD_DATA = {
  urgentInvestigationNotice: {
    title: "URGENT — INTERNAL INVESTIGATION",
    classification: "CONFIDENTIAL // EYES ONLY",
    body: [
      "NOVALINK was growing rapidly.",
      "Then something changed.",
      "Orders increased.",
      "Customers became unhappy.",
      "Employees became overwhelmed.",
      "And the startup began losing money.",
      "The founder started an internal investigation to discover what was really happening.",
      "Before leaving the office, the founder split the investigation notes into FIVE FRAGMENTS and hid them around the office.",
      "If you want to understand what happened...",
      "FIND THE FIVE FRAGMENTS.",
      "Reconstruct the Founder's Investigation File.",
    ],
    signoff: "— Founder, NOVALINK",
  },
  sections: [
    {
      id: 'history',
      title: 'COMPANY HISTORY',
      badge: 'FOUNDED MAY 2024',
      content: 'NOVALINK launched with an ambitious vision: deliver hot chef-prepared meals and campus essentials in under 15 minutes. Early word-of-mouth on campus was viral.',
      insight: 'Early success bred overconfidence before logistics software was written.',
    },
    {
      id: 'customers',
      title: 'CUSTOMERS',
      badge: 'TARGET AUDIENCE',
      content: 'Primary user base: 14,000 university students and downtown tech workers. Average cart size: $18.50. High sensitivity to delivery timing.',
      insight: 'A 15-minute delay destroys user trust for lunch and dinner hunger periods.',
    },
    {
      id: 'team',
      title: 'TEAM & OPERATIONS',
      badge: '8 COOKS • 35 COURIERS',
      content: 'Head of Ops reports 14-hour shifts. Kitchen workers are visually overwhelmed tracking orders across paper chits and personal phones.',
      insight: 'Employee note: "We cannot keep up with this volume manually."',
    },
    {
      id: 'product',
      title: 'PRODUCT & TECH STACK',
      badge: 'MOBILE APP (NO BACKEND DISPATCH)',
      content: 'The customer mobile app is sleek with instant payment. However, the kitchen dispatch system is non-existent—relying on manual WhatsApp groups.',
      insight: 'Technology built for front-end appearance, lacking back-end execution.',
    },
    {
      id: 'performance',
      title: 'RECENT PERFORMANCE',
      badge: 'Q3 COLLAPSE',
      content: 'Incoming orders spiked +300% to 1,850/day during the 50% discount blitz. Simultaneously, cancellations surged to 45.2% with $120k refunded.',
      insight: 'Orders surged, yet cash flow is negative due to refunds.',
    },
    {
      id: 'warning_signs',
      title: 'WARNING SIGNS',
      badge: 'OPERATIONAL RED ALERTS',
      content: 'Driver idle wait times average 37 minutes outside the kitchen. Food sits cold on tables while orders get mixed up.',
      insight: 'Foreshadowing: Cold food and delays are visible symptoms of dispatch failure.',
    },
    {
      id: 'founders_notes',
      title: "FOUNDER'S NOTES",
      badge: 'DIAGNOSTIC QUESTION',
      content: '"Are the late deliveries and angry reviews the real problem... or are they merely symptoms of something much deeper?"',
      insight: 'The founder recognized that superficial patches will not fix a structural flaw.',
    },
  ],
};

export const ACTIVITY_1_QUESTIONS: MCQQuestion[] = [
  {
    id: 1,
    question: 'Why is problem-solving important beyond just business?',
    options: [
      { key: 'A', text: 'To avoid any difficulties forever' },
      { key: 'B', text: 'To handle everyday challenges and grow personally' },
      { key: 'C', text: 'To prove others wrong' },
      { key: 'D', text: 'To complete tasks faster' },
    ],
    correctAnswer: 'B',
    explanation: 'Problem-solving builds resilience, adaptability, and personal growth across everyday challenges.',
  },
  {
    id: 2,
    question: 'What often happens when you fix a small problem early?',
    options: [
      { key: 'A', text: 'It becomes someone else’s problem' },
      { key: 'B', text: 'It wastes time better spent on fun' },
      { key: 'C', text: 'It opens the door to bigger chances and growth' },
      { key: 'D', text: 'It rarely makes a difference' },
    ],
    correctAnswer: 'C',
    explanation: 'Catching issues early prevents compounding bottlenecks and unlocks opportunities for proactive advancement.',
  },
  {
    id: 3,
    question: 'How does seeing problems as chances help your mindset?',
    options: [
      { key: 'A', text: 'It builds confidence and creativity' },
      { key: 'B', text: 'It makes you avoid hard work' },
      { key: 'C', text: 'It causes stress and anxiety' },
      { key: 'D', text: 'It stops you from asking for help' },
    ],
    correctAnswer: 'A',
    explanation: 'Viewing friction as an opportunity reframes stress into constructive curiosity and inventive thinking.',
  },
  {
    id: 4,
    question: 'Why should you try different solutions when solving a problem?',
    options: [
      { key: 'A', text: 'Because the first try is always wrong' },
      { key: 'B', text: 'To learn what works best and improve' },
      { key: 'C', text: 'To waste time' },
      { key: 'D', text: 'To impress others' },
    ],
    correctAnswer: 'B',
    explanation: 'Exploring multiple solutions helps you learn what works best, build agility, and continually improve.',
  },
  {
    id: 5,
    question: 'What’s the first step to solving any problem well?',
    options: [
      { key: 'A', text: 'Jumping to fix it quickly' },
      { key: 'B', text: 'Clearly understanding what the real problem is' },
      { key: 'C', text: 'Asking others to do it for you' },
      { key: 'D', text: 'Ignoring the problem' },
    ],
    correctAnswer: 'B',
    explanation: 'Without clearly scoping and understanding what the real problem is, quick action solves only superficial symptoms.',
  },
];

export const DESIGN_THINKING_STAGES = [
  {
    id: 'empathize',
    name: 'EMPATHIZE',
    tagline: 'Understand users deeply',
    description: "Understand users' feelings, needs, frustrations, and underlying context through immersion and observation.",
    keyInsight: "Don't assume what users want. Listen to what they struggle with daily.",
  },
  {
    id: 'define',
    name: 'DEFINE',
    tagline: 'Frame the right challenge',
    description: 'Frame the correct problem statement so you solve the genuine challenge rather than a misleading surface symptom.',
    keyInsight: 'A well-defined problem is half-solved. Ask what is truly failing.',
  },
  {
    id: 'ideate',
    name: 'IDEATE',
    tagline: 'Generate diverse possibilities',
    description: 'Generate many diverse, radical, and unusual ideas without premature judgment or restrictive filters.',
    keyInsight: 'Quantity leads to quality. Unconventional ideas often unlock novel solutions.',
  },
  {
    id: 'prototype',
    name: 'PROTOTYPE',
    tagline: 'Build quick, cheap experiments',
    description: 'Build rough, low-fidelity versions quickly and cheaply to make concepts tangible and testable.',
    keyInsight: 'Fail fast and cheaply before spending months on flawed assumptions.',
  },
  {
    id: 'test',
    name: 'TEST',
    tagline: 'Validate with real people',
    description: 'Get real user feedback in authentic conditions, observe unprompted behavior, and continuously refine.',
    keyInsight: 'Failure in testing is discovery: Failure = Learning.',
  },
];

export const ACTIVITY_2_QUESTIONS: MCQQuestion[] = [
  {
    id: 1,
    question: 'Why is empathy important in design thinking?',
    options: [
      { key: 'A', text: 'To finish the project faster' },
      { key: 'B', text: 'To deeply understand users’ feelings and problems' },
      { key: 'C', text: 'To copy competitor ideas' },
      { key: 'D', text: 'To avoid user input' },
    ],
    correctAnswer: 'B',
    explanation: 'Empathy provides the unfiltered human foundation required to solve genuine pain points.',
  },
  {
    id: 2,
    question: 'What’s the main goal of the “Define” step?',
    options: [
      { key: 'A', text: 'To create the final product' },
      { key: 'B', text: 'To list all project tasks' },
      { key: 'C', text: 'Frame the problem so you solve the right challenge' },
      { key: 'D', text: 'To ignore user feedback' },
    ],
    correctAnswer: 'C',
    explanation: 'Defining crystallizes insights into an actionable, user-centered problem thesis.',
  },
  {
    id: 3,
    question: 'During “Ideate,” what’s the best approach?',
    options: [
      { key: 'A', text: 'Pick one idea immediately' },
      { key: 'B', text: 'Only suggest safe ideas' },
      { key: 'C', text: 'Avoid brainstorming' },
      { key: 'D', text: 'Generate as many diverse and weird ideas as possible' },
    ],
    correctAnswer: 'D',
    explanation: 'Expansive ideation breaks conventional cognitive blinders and yields breakthrough options.',
  },
  {
    id: 4,
    question: 'What’s the purpose of prototyping?',
    options: [
      { key: 'A', text: 'To make a perfect, final product' },
      { key: 'B', text: 'To test ideas quickly and cheaply before going big' },
      { key: 'C', text: 'To impress stakeholders' },
      { key: 'D', text: 'To avoid user testing' },
    ],
    correctAnswer: 'B',
    explanation: 'Low-cost prototyping brings concepts to life without premature capital risk.',
  },
  {
    id: 5,
    question: 'Why is testing with users crucial?',
    options: [
      { key: 'A', text: 'To check if the product looks cool' },
      { key: 'B', text: 'Learn real user reactions to improve the design' },
      { key: 'C', text: 'To confirm your assumptions only' },
      { key: 'D', text: 'To finish the project early' },
    ],
    correctAnswer: 'B',
    explanation: 'Unscripted user interactions expose usability friction that creators are blind to.',
  },
];

export const ACTIVITY_3_CASES: CaseFileQuestion[] = [
  {
    code: 'CASE FILE ALPHA',
    title: 'The Educational App Launch',
    scenario: 'You want to design a fun learning app for kids but skip talking to kids themselves. After launch, few kids use it and parents complain.',
    question: 'What step did you miss?',
    options: [
      { key: 'A', text: 'Empathy — You didn’t understand kids’ real needs' },
      { key: 'B', text: 'Ideation — Not enough ideas' },
      { key: 'C', text: 'Prototyping — Didn’t build early' },
      { key: 'D', text: 'Testing — Skipped user feedback' },
    ],
    correctAnswer: 'A',
    explanation: 'Failing to consult and observe the actual target audience upfront leads to mismatched assumptions about children’s engagement.',
  },
  {
    code: 'CASE FILE BETA',
    title: 'The Premature Assembly Line',
    scenario: 'Your team builds a prototype and immediately starts mass production without user feedback. Sales flop and complaints rise.',
    question: 'What went wrong?',
    options: [
      { key: 'A', text: 'No ideation' },
      { key: 'B', text: 'Testing prototypes — getting early feedback' },
      { key: 'C', text: 'Empathy was ignored' },
      { key: 'D', text: 'Defining the problem was weak' },
    ],
    correctAnswer: 'B',
    explanation: 'Mass manufacturing without validating prototype functionality with real users caused catastrophic post-launch fallout.',
  },
  {
    code: 'CASE FILE GAMMA',
    title: 'The User Testing Backlash',
    scenario: 'Your prototype fails during user testing. How should your team respond?',
    question: 'How should your team respond to prototype failure during testing?',
    options: [
      { key: 'A', text: 'Ignore feedback and continue' },
      { key: 'B', text: 'Take feedback seriously and improve your design' },
      { key: 'C', text: 'Blame users for not understanding' },
      { key: 'D', text: 'Give up on the idea' },
    ],
    correctAnswer: 'B',
    explanation: 'User test failures are diagnostic goldmines; taking them seriously steers product iteration towards true fit.',
  },
];

export const EVIDENCE_DOCUMENTS: EvidenceDocument[] = [
  {
    id: 1,
    title: 'DOCUMENT 1: CUSTOMER COMPLAINTS LOG',
    type: 'Support Desk Aggregation',
    date: 'Q3 - Week 8 to Week 12',
    summary: 'High surge in refund requests, delayed food, and mixed up meals.',
    content: [
      '• Case #4892: "Ordered lunch at 12:15 PM. Meal arrived at 2:05 PM, ice-cold and missing drinks."',
      '• Case #5019: "Got another customer’s order. Delivery driver said he was handed 3 different bags with identical handwritten sticky notes."',
      '• Case #5221: "Late deliveries jumped from 4% in June to 38% in September. Customer support phone queue exceeds 45 minutes."',
      '• Customer sentiment analysis: Trust rating plunged from 4.7/5 to 1.8/5.'
    ],
    clueInsight: 'Symptom: High volume of late deliveries, wrong items, and cold meals indicating downstream failure.',
    inspected: false,
  },
  {
    id: 2,
    title: 'DOCUMENT 2: STAFF & RIDER INTERVIEW TRANSCRIPTS',
    type: 'Internal HR & Operations Debrief',
    date: 'October 14',
    summary: 'Kitchen staff and delivery riders describing chaos during order preparation.',
    content: [
      '• Lead Chef Marco: "The orders come in faster than we can read them. Nobody knows which order is priority. 5 different delivery guys stand in the doorway shouting ticket numbers."',
      '• Dispatcher Tanya: "We have 4 different tablets. When an order rings on Tablet A, I have to type it into a WhatsApp group for the riders, and write a paper ticket for the kitchen."',
      '• Rider Dave: "I waited 45 minutes outside the restaurant. When they finally gave me the food, they told me the address had changed in WhatsApp, but my map app didn’t update."',
      '• Rider Elena: "Manual coordination is killing our earnings. We waste half our day idling outside kitchens."'
    ],
    clueInsight: 'Operational friction: Kitchen chaos, manual order handling, and dispatch confusion between tablets and chat apps.',
    inspected: false,
  },
  {
    id: 3,
    title: 'DOCUMENT 3: Q3 FINANCIAL & SALES TRAJECTORY REPORT',
    type: 'Executive Board Briefing',
    date: 'Q3 Financial Review',
    summary: 'Aggressive marketing campaign drove huge acquisition, but cancellation rates skyrocketed.',
    content: [
      '• Marketing Spend: Scaled 400% with "First 3 Orders Free Delivery" promotion.',
      '• Top of Funnel: Total gross order volume exploded by +300% within 60 days.',
      '• Cancellation rate: Spiked from an acceptable 3.2% to an unsustainable 45.4%!',
      '• Repeat Customer Retention: Dropped from 68% in month 1 down to 11% by month 3.',
      '• Financial burn: Operating cash reserves down to 4 weeks due to chargebacks, customer credits, and lost inventory.'
    ],
    clueInsight: 'Mismatch: Orders grew 300% after aggressive promotions, but cancellations hit 45% due to operational inability to cope.',
    inspected: false,
  },
  {
    id: 4,
    title: 'DOCUMENT 4: FLEET LOGISTICS & TELEMETRY BREAKDOWN',
    type: 'Courier Telemetry & GPS Analysis',
    date: 'September Audit',
    summary: 'Riders spending excessive time waiting at pickup locations rather than in transit.',
    content: [
      '• Average Transit Time (Restaurant to Customer): 14.2 minutes (Acceptable).',
      '• Average Kitchen Dwell Time (Rider waiting for food): 36.8 minutes (Severe Anomaly).',
      '• Route optimization score: Non-existent. Riders are dispatched randomly based on who responds first in the messaging channel.',
      '• Handoff delays: 72% of delivery delays originate in the order handoff stage, not on the road.'
    ],
    clueInsight: 'The bottleneck is NOT rider transit speed—it is lack of route optimization and delayed kitchen handoffs.',
    inspected: false,
  },
  {
    id: 5,
    title: 'DOCUMENT 5: APP STORE & SOCIAL MEDIA AUDIT',
    type: 'Public Brand Sentiment Review',
    date: 'Recent 30 Days',
    summary: 'Viral customer backlash and 1-star ratings destroying brand equity.',
    content: [
      '• App Store Rating: Plunged to 1.9 Stars (Over 1,200 negative reviews in 3 weeks).',
      '• Most frequent 1-star keywords: "late", "cancelled after 1 hour", "customer service ignored me", "cold food", "never again".',
      '• Viral Tweet (14k retweets): "NOVALINK promised lunch in 30 mins. 2 hours later, they cancelled it while I was in a meeting. #BrokenStartup".',
      '• Brand equity: Marketing has brought in thousands of first-time users only to permanently alienate them.'
    ],
    clueInsight: 'Marketing promises exceeded real operational execution, burning trust and driving 1-star churn.',
    inspected: false,
  },
  {
    id: 6,
    title: 'DOCUMENT 6: ORDER DISPATCH ARCHITECTURE LOG',
    type: 'Systems & Workflow Architecture Analysis',
    date: 'Technical Investigation',
    summary: 'CRITICAL DISCOVERY: Zero backend automation between customer app and fulfillment.',
    content: [
      '• System Architecture Diagram:',
      '  [Customer Mobile App] → [Admin Dashboard Cloud DB]',
      '  (BREAK IN AUTOMATION HERE!)',
      '  [Admin Human Operator] reads screen → Manually copies order into WhatsApp Group → Types paper receipt on thermal printer → Hands paper slip to chef → Calls rider via phone.',
      '• Discovery: During the 300% flash promotion, 2 human dispatchers were attempting to copy-paste 400 orders/hour by hand across 3 tablets.',
      '• Failure Mode: Clipboard errors, dropped orders, delayed rider notifications, zero real-time kitchen status sync.'
    ],
    clueInsight: 'CRITICAL CLUE: Manual WhatsApp communication and copy-paste between tablets are being used to coordinate orders without an automated dispatch pipeline.',
    inspected: false,
  },
];

export const TIME_MACHINE_CARDS: TimeMachineCard[] = [
  {
    id: 'user',
    label: 'USER',
    title: 'Target Audience',
    description: 'Busy students / working people / customers who need quick, effortless meals.',
  },
  {
    id: 'problem',
    label: 'PROBLEM',
    title: 'The Core Obstacle',
    description: 'People may not be able to easily travel to restaurants or order food directly during tight schedules.',
  },
  {
    id: 'need',
    label: 'NEED',
    title: 'Underlying Desire',
    description: 'People want convenient, reliable, on-demand access to prepared food delivered to their door.',
  },
  {
    id: 'product',
    label: 'PRODUCT',
    title: 'Current Artifact',
    description: 'Food Delivery Mobile App & Logistics Platform connecting restaurants, riders, and eaters.',
  },
];

export const PROBLEM_SPOTTING_QUESTIONS: MCQQuestion[] = [
  {
    id: 1,
    question: 'What’s the best way to spot real problems around you?',
    options: [
      { key: 'A', text: 'Assume what’s wrong' },
      { key: 'B', text: 'Observe carefully and ask questions to understand' },
      { key: 'C', text: 'Only listen to popular opinions' },
      { key: 'D', text: 'Ignore small issues' },
    ],
    correctAnswer: 'B',
    explanation: 'Careful observation combined with open, empathetic questions uncovers true friction points.',
  },
  {
    id: 2,
    question: 'Why is digging deeper into a problem important?',
    options: [
      { key: 'A', text: 'Surface issues are usually the real cause' },
      { key: 'B', text: 'To delay action' },
      { key: 'C', text: 'Because it sounds impressive' },
      { key: 'D', text: 'Root causes reveal why problems happen and how to fix them better' },
    ],
    correctAnswer: 'D',
    explanation: 'Root causes reveal why problems happen and how to fix them permanently rather than temporarily treating symptoms.',
  },
  {
    id: 3,
    question: 'What’s a common mistake when identifying problems?',
    options: [
      { key: 'A', text: 'Jumping to solutions before understanding the problem' },
      { key: 'B', text: 'Asking users for their experience' },
      { key: 'C', text: 'Observing behavior closely' },
      { key: 'D', text: 'Testing different ideas' },
    ],
    correctAnswer: 'A',
    explanation: 'Jumping to solutions prematurely wastes resources addressing symptoms instead of the actual root breakdown.',
  },
  {
    id: 4,
    question: 'When analyzing a problem, why is it helpful to ask “why?” multiple times?',
    options: [
      { key: 'A', text: 'To annoy people' },
      { key: 'B', text: 'To confuse yourself' },
      { key: 'C', text: 'To peel back layers until you find the root cause' },
      { key: 'D', text: 'To fill time' },
    ],
    correctAnswer: 'C',
    explanation: 'Iteratively asking "why?" strips away excuses and assumptions until you reach the foundational process failure.',
  },
  {
    id: 5,
    question: 'How can comparing multiple existing solutions help in problem-solving?',
    options: [
      { key: 'A', text: 'It’s a waste of time' },
      { key: 'B', text: 'It limits creativity' },
      { key: 'C', text: 'It sparks ideas for combining the best parts into something new' },
      { key: 'D', text: 'Only one solution can be right' },
    ],
    correctAnswer: 'C',
    explanation: 'Analyzing different existing attempts sparks creative insights on how to combine strengths and avoid prior pitfalls.',
  },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 1,
    code: 'CASE FILE 01',
    title: 'LOCAL MARKET',
    context: 'In a local market, vendors complain about low sales despite strong weekend foot traffic. You observe shoppers pausing briefly and walking away without purchasing.',
    question: 'What deeper problem could be causing this?',
    options: [
      { key: 'A', text: 'Vendors’ prices are too high' },
      { key: 'B', text: 'Customers don’t find products useful or well-displayed' },
      { key: 'C', text: 'Market hours inconvenient' },
      { key: 'D', text: 'Customers prefer online shopping' },
    ],
    correctAnswer: 'B',
    explanation: 'Foot traffic proves accessibility is fine; the issue is poor product curation, merchandising, and perceived value at the stalls.',
  },
  {
    id: 2,
    code: 'CASE FILE 02',
    title: 'WATER SHORTAGE',
    context: 'A neighborhood faces severe water shortages. Some residents spend large amounts on bottled water while others struggle. Existing government tankers provide only sporadic relief.',
    question: 'How would you approach identifying the real problem?',
    options: [
      { key: 'A', text: 'Assume water scarcity is only issue' },
      { key: 'B', text: 'Only survey a few residents' },
      { key: 'C', text: 'Ignore community input' },
      { key: 'D', text: 'Observe usage patterns, water source problems, and residents’ coping methods' },
    ],
    correctAnswer: 'D',
    explanation: 'Holistic investigation maps systemic pipeline leaks, distribution inequity, and seasonal consumption patterns before jumping to conclusions.',
  },
  {
    id: 3,
    code: 'CASE FILE 03',
    title: 'LOCAL CAFÉ',
    context: 'A popular local café sees fewer repeat customers even though customer reviews praise the food and coffee quality. Existing discount loyalty stamps have failed to boost retention.',
    question: 'What could be a root cause to explore?',
    options: [
      { key: 'A', text: 'Customer experience and ambience may be lacking' },
      { key: 'B', text: 'Loyalty rewards aren’t attractive' },
      { key: 'C', text: 'Competitors have better food' },
      { key: 'D', text: 'Customers don’t like location' },
    ],
    correctAnswer: 'A',
    explanation: 'When product quality is acknowledged as great, retention deficits often trace back to noisy acoustics, slow seating, poor Wi-Fi, or harsh seating ergonomics.',
  },
  {
    id: 4,
    code: 'CASE FILE 04',
    title: 'TRAFFIC CONGESTION',
    context: 'Many commuters complain about chronic rush-hour gridlock on the main arterial highway. Adding two new road lanes last year failed to alleviate the congestion.',
    question: 'What’s a better way to identify the root problem?',
    options: [
      { key: 'A', text: 'Build more roads' },
      { key: 'B', text: 'Study travel patterns, peak hours, alternative transport options' },
      { key: 'C', text: 'Blame poor driving skills' },
      { key: 'D', text: 'Increase parking spaces' },
    ],
    correctAnswer: 'B',
    explanation: 'Induced demand proves more pavement attracts more single-passenger cars; diagnosing transit scheduling, bottleneck bottlenecks, and public transit gaps is necessary.',
  },
  {
    id: 5,
    code: 'CASE FILE 05',
    title: 'LEARNING APP ADOPTION',
    context: 'A high school introduces a newly built digital study app, but analytics show student active usage drops by 85% within a week. Feedback surveys summarize it as "boring".',
    question: 'What should you do before redesigning?',
    options: [
      { key: 'A', text: 'Add more features immediately' },
      { key: 'B', text: 'Ignore usage data' },
      { key: 'C', text: 'Observe how students study, habits, preferences' },
      { key: 'D', text: 'Blame students' },
    ],
    correctAnswer: 'C',
    explanation: 'Empathizing directly with actual homework routines and digital habits reveals why the workflow feels tedious or alienating.',
  },
];

export const EVIDENCE_SORTING_CARDS: EvidenceSortingCard[] = [
  {
    id: 'c1',
    text: 'Sales have declined.',
    correctCategory: 'EFFECT',
  },
  {
    id: 'c2',
    text: 'Customers complain about late deliveries.',
    correctCategory: 'SYMPTOM',
  },
  {
    id: 'c3',
    text: 'Repeat customers are decreasing.',
    correctCategory: 'EFFECT',
  },
  {
    id: 'c4',
    text: 'Orders are being delivered late.',
    correctCategory: 'SYMPTOM',
  },
  {
    id: 'c5',
    text: 'Employees report confusion about order handling.',
    correctCategory: 'SYMPTOM',
  },
  {
    id: 'c6',
    text: 'Customers receive incorrect orders.',
    correctCategory: 'SYMPTOM',
  },
  {
    id: 'c7',
    text: 'Customer communication is inconsistent.',
    correctCategory: 'PROBLEM',
  },
  {
    id: 'c8',
    text: 'Orders are not being coordinated properly.',
    correctCategory: 'UNDERLYING PROBLEM',
  },
];

export const FIVE_WHYS_GUIDE = [
  {
    step: 1,
    label: 'WHY #1',
    prompt: 'Why are sales declining and repeat customers churning?',
    hint: 'Look at Document 1: What is happening to orders when customers place them?',
    expectedKeywords: ['late', 'delivery', 'cold', 'wrong', 'delays', 'orders late', 'complaint'],
    referenceText: 'Orders are arriving severely delayed, cold, or with wrong items, causing 45% cancellations and high customer churn.',
  },
  {
    step: 2,
    label: 'WHY #2',
    prompt: 'Why are deliveries delayed and orders getting mixed up?',
    hint: 'Look at Document 2 & 4: What is happening inside the restaurant kitchens and dispatch?',
    expectedKeywords: ['kitchen', 'dispatch', 'rider', 'waiting', 'handoff', 'confusion', 'chaos', 'dwell'],
    referenceText: 'Kitchens are overwhelmed with chaos and riders spend 37+ minutes waiting outside with dispatch confusion.',
  },
  {
    step: 3,
    label: 'WHY #3',
    prompt: 'Why is there dispatch confusion and kitchen chaos?',
    hint: 'Look at Document 6: How are orders being communicated between systems?',
    expectedKeywords: ['manual', 'whatsapp', 'tablet', 'copy', 'paste', 'handwritten', 'notes', 'tickets', 'communication'],
    referenceText: 'Staff are manually copy-pasting order details across WhatsApp groups and paper tickets between 4 separate tablets.',
  },
  {
    step: 4,
    label: 'WHY #4',
    prompt: 'Why is the team relying on manual WhatsApp messages and copy-pasting?',
    hint: 'Look at Document 6 & technical logs: What software or automated pipeline is missing?',
    expectedKeywords: ['integrated', 'automation', 'pipeline', 'software', 'dispatch system', 'automated', 'connection', 'backend', 'sync'],
    referenceText: 'NOVALINK has no integrated, automated dispatch and kitchen pipeline connecting the mobile app to riders and cooks.',
  },
  {
    step: 5,
    label: 'WHY #5 (ROOT CAUSE)',
    prompt: 'Why did NOVALINK launch aggressive scaling without an automated dispatch pipeline?',
    hint: 'Look at Document 3: What did leadership do with marketing before testing operational capacity?',
    expectedKeywords: ['scale', 'scaling', 'marketing', 'capacity', 'operational', 'growth', 'validate', 'promotion', 'premature'],
    referenceText: 'Leadership aggressively scaled marketing and customer acquisition by 400% without first stress-testing or validating operational capacity and automated backend infrastructure.',
  },
];

export const ROOT_CAUSE_FULL_STATEMENT = 
  "Lack of an automated, integrated order-coordination and kitchen dispatch pipeline, caused by scaling marketing and customer acquisition without validating operational capacity.";

export const FIVE_WHYS_DATA = [
  {
    step: 1,
    question: "Why are sales declining and repeat customers churning?",
    options: [
      "Customers suddenly decided they don't like food delivery anymore.",
      "Orders arrive severely delayed, cold, or with incorrect items, causing 45% cancellations.",
      "Competitors are selling meals at negative prices.",
      "App store algorithms arbitrarily suppressed the application.",
    ],
    correctOption: 1,
  },
  {
    step: 2,
    question: "Why are orders arriving delayed, cold, or incorrect?",
    options: [
      "Delivery riders are intentionally driving slowly on their routes.",
      "The weather in the city has been continuously terrible for six months.",
      "Kitchen staff are overwhelmed with dispatch chaos, and drivers wait 37+ minutes outside with order confusion.",
      "Customers keep entering fake GPS destination addresses.",
    ],
    correctOption: 2,
  },
  {
    step: 3,
    question: "Why is there dispatch chaos and severe order confusion in the kitchen?",
    options: [
      "Staff are manually copy-pasting order details across WhatsApp groups and paper tickets between 4 disparate tablets.",
      "The kitchen chefs do not know how to cook meals.",
      "The printers ran out of paper.",
      "The electricity cuts out every 15 minutes.",
    ],
    correctOption: 0,
  },
  {
    step: 4,
    question: "Why is the team relying on manual WhatsApp messages and copy-pasting tickets?",
    options: [
      "WhatsApp gave them a corporate sponsorship.",
      "NOVALINK has no integrated, automated dispatch software connecting the customer app to kitchens and drivers.",
      "The engineers preferred typing manual messages.",
      "Tablets are unable to connect to the internet.",
    ],
    correctOption: 1,
  },
  {
    step: 5,
    question: "Why does NOVALINK lack an automated dispatch system despite rapid customer scaling?",
    options: [
      "The software engineers took a 6-month unpaid sabbatical.",
      "Computers cannot perform automated dispatch logic.",
      "Leadership scaled marketing and customer acquisition by 400% without first stress-testing operational capacity or building infrastructure.",
      "Investors demanded that all orders be processed manually by hand.",
    ],
    correctOption: 2,
  },
];
