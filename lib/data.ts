export type Language = "EN" | "BN" | "HI" | "NE";

export const languages: { code: Language; label: string; native: string }[] = [
  { code: "EN", label: "English", native: "English" },
  { code: "BN", label: "Bengali", native: "বাংলা" },
  { code: "HI", label: "Hindi", native: "हिन्दी" },
  { code: "NE", label: "Nepali", native: "नेपाली" },
];

export type CourseStatus = "completed" | "in-progress" | "not-started";

export interface CourseInfographic {
  keyFacts: { label: string; value: string }[];
  learningPoints: string[];
  steps: { title: string; detail: string }[];
}

export type CourseThumbIcon = "bone" | "heart" | "digestive" | "handwash" | "bandage" | "cpr";

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
}

export interface Course {
  slug: string;
  title: string;
  group: string;
  duration: string;
  status: CourseStatus;
  progress: number; // 0-100
  description: string;
  thumbIcon: CourseThumbIcon;
  thumbImage: string;
  infographic: CourseInfographic;
  quizQuestions: QuizQuestion[];
}

export const courseGroups = [
  "Body & Anatomy Basics",
  "First Aid Essentials",
  "Everyday Health & Hygiene",
];

export const courses: Course[] = [
  {
    slug: "bone-structure",
    title: "Bone structure of the human body",
    group: "Body & Anatomy Basics",
    duration: "4 min",
    status: "completed",
    progress: 100,
    thumbIcon: "bone",
    thumbImage: "/images/courses/bone-structure.jpg",
    description:
      "The major bones and joints, why the skeleton matters, and how to recognise a possible fracture.",
    infographic: {
      keyFacts: [
        { label: "Bones in an adult", value: "206" },
        { label: "Bones at birth", value: "~270" },
        { label: "Longest bone", value: "Femur" },
        { label: "Major joint types", value: "6" },
      ],
      learningPoints: [
        "Identify the major bones and joints in the body",
        "Understand why the skeleton matters for movement and protection",
        "Recognise the signs of a possible fracture",
        "Know when an injury needs urgent care",
      ],
      steps: [
        { title: "Spot the signs", detail: "Swelling, deformity, or inability to bear weight." },
        { title: "Keep it still", detail: "Immobilise the area — don't try to realign it." },
        { title: "Support & cushion", detail: "Pad around the injury with cloth or a splint." },
        { title: "Get help fast", detail: "Move to a clinic or call for emergency support." },
      ],
    },
    quizQuestions: [
      {
        question: "How many bones does an adult human have?",
        options: ["146", "176", "206", "236"],
        correctIndex: 2,
      },
      {
        question: "Approximately how many bones does a baby have at birth?",
        options: ["~150", "~206", "~270", "~320"],
        correctIndex: 2,
      },
      {
        question: "What is the longest bone in the human body?",
        options: ["Tibia", "Femur", "Humerus", "Fibula"],
        correctIndex: 1,
      },
      {
        question: "How many major joint types does the human body have?",
        options: ["3", "4", "6", "8"],
        correctIndex: 2,
      },
      {
        question: "What are two key functions of the skeleton?",
        options: [
          "Digestion and circulation",
          "Movement and protection",
          "Hearing and vision",
          "Breathing and filtering",
        ],
        correctIndex: 1,
      },
      {
        question: "Which of these is a sign of a possible fracture?",
        options: [
          "Mild tiredness after exercise",
          "Swelling, deformity, or inability to bear weight",
          "Feeling thirsty",
          "A small paper cut",
        ],
        correctIndex: 1,
      },
      {
        question: "What should you do first if you suspect a fracture?",
        options: ["Try to realign it", "Keep the area still", "Apply heat", "Massage the area"],
        correctIndex: 1,
      },
      {
        question: "True or false: you should try to realign a suspected fracture yourself.",
        options: ["True", "False"],
        correctIndex: 1,
      },
      {
        question: "What can you use to support and cushion an injured limb?",
        options: ["Ice water", "Cloth or a splint", "Soap", "Bandage tape only"],
        correctIndex: 1,
      },
      {
        question: "When should you get professional help for a suspected fracture?",
        options: [
          "Only if it still hurts after a week",
          "Move to a clinic or call for emergency support",
          "Never, it will heal on its own",
          "Only if there is no swelling",
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    slug: "how-the-heart-works",
    title: "How the heart works",
    group: "Body & Anatomy Basics",
    duration: "5 min",
    status: "in-progress",
    progress: 55,
    thumbIcon: "heart",
    thumbImage: "/images/courses/how-the-heart-works.jpg",
    description:
      "Heart health basics: circulation, pulse, warning signs, and everyday habits that protect it.",
    infographic: {
      keyFacts: [
        { label: "Average resting pulse", value: "60–100 bpm" },
        { label: "Heartbeats per day", value: "~100,000" },
        { label: "Blood pumped daily", value: "~7,500 L" },
        { label: "Heart chambers", value: "4" },
      ],
      learningPoints: [
        "How blood circulates through the heart and lungs",
        "How to check your own pulse",
        "Everyday habits that protect heart health",
        "Warning signs that need urgent attention",
      ],
      steps: [
        { title: "Find your pulse", detail: "Two fingers on your wrist or neck, not your thumb." },
        { title: "Count for 30 seconds", detail: "Multiply by two for beats per minute." },
        { title: "Compare to normal range", detail: "60–100 bpm at rest is typical for most adults." },
        { title: "Track changes over time", detail: "A rising resting pulse can signal stress or illness." },
      ],
    },
    quizQuestions: [
      {
        question: "What is the average resting pulse range for adults?",
        options: ["40–60 bpm", "60–100 bpm", "100–140 bpm", "140–180 bpm"],
        correctIndex: 1,
      },
      {
        question: "Approximately how many times does the heart beat per day?",
        options: ["~10,000", "~50,000", "~100,000", "~500,000"],
        correctIndex: 2,
      },
      {
        question: "About how much blood does the heart pump in a day?",
        options: ["~750 L", "~2,500 L", "~7,500 L", "~15,000 L"],
        correctIndex: 2,
      },
      {
        question: "How many chambers does the heart have?",
        options: ["2", "3", "4", "6"],
        correctIndex: 2,
      },
      {
        question: "Where can you find your pulse?",
        options: ["Elbow", "Wrist or neck", "Forehead", "Knee"],
        correctIndex: 1,
      },
      {
        question: "How long should you count your pulse before multiplying by two?",
        options: ["10 seconds", "15 seconds", "30 seconds", "60 seconds"],
        correctIndex: 2,
      },
      {
        question: "Which of these is a warning sign that needs urgent attention?",
        options: [
          "Mild tiredness after exercise",
          "Sudden chest pain and shortness of breath",
          "Feeling thirsty after a walk",
          "A small paper cut",
        ],
        correctIndex: 1,
      },
      {
        question: "True or false: using your thumb to check your pulse gives an accurate reading.",
        options: ["True", "False"],
        correctIndex: 1,
      },
      {
        question: "What can a rising resting pulse over time signal?",
        options: ["Better fitness", "Stress or illness", "Nothing significant", "Improved digestion"],
        correctIndex: 1,
      },
      {
        question: "Which of these is an everyday habit that protects heart health?",
        options: ["Skipping meals", "Regular physical activity", "Avoiding all fats", "Sleeping less"],
        correctIndex: 1,
      },
    ],
  },
  {
    slug: "digestive-system-basics",
    title: "Digestive system basics",
    group: "Body & Anatomy Basics",
    duration: "4 min",
    status: "not-started",
    progress: 0,
    thumbIcon: "digestive",
    thumbImage: "/images/courses/digestive-system-basics.jpg",
    description: "How digestion works and simple signs of common digestive problems.",
    infographic: {
      keyFacts: [
        { label: "Length of digestive tract", value: "~9 m" },
        { label: "Time to digest a meal", value: "24–72 hrs" },
        { label: "Major organs involved", value: "6" },
        { label: "Stomach acid pH", value: "~1.5–3.5" },
      ],
      learningPoints: [
        "The path food takes from mouth to exit",
        "The role of the stomach, liver and intestines",
        "Simple signs of common digestive problems",
        "Everyday habits that support healthy digestion",
      ],
      steps: [
        { title: "Chew thoroughly", detail: "Digestion starts in the mouth with saliva and chewing." },
        { title: "Stomach breaks it down", detail: "Acid and enzymes turn food into a soft mixture." },
        { title: "Small intestine absorbs", detail: "Nutrients pass into the bloodstream here." },
        { title: "Large intestine finishes up", detail: "Water is absorbed and waste is formed." },
      ],
    },
    quizQuestions: [
      {
        question: "Approximately how long is the human digestive tract?",
        options: ["~3 m", "~6 m", "~9 m", "~12 m"],
        correctIndex: 2,
      },
      {
        question: "How long does it typically take to fully digest a meal?",
        options: ["1–2 hours", "6–12 hours", "24–72 hours", "1 week"],
        correctIndex: 2,
      },
      {
        question: "How many major organs are involved in digestion?",
        options: ["3", "4", "6", "9"],
        correctIndex: 2,
      },
      {
        question: "What is the approximate pH of stomach acid?",
        options: ["~1.5–3.5", "~5–6", "~7", "~9–10"],
        correctIndex: 0,
      },
      {
        question: "Where does digestion begin?",
        options: ["Stomach", "Mouth", "Small intestine", "Large intestine"],
        correctIndex: 1,
      },
      {
        question: "Which organ absorbs nutrients into the bloodstream?",
        options: ["Liver", "Stomach", "Small intestine", "Large intestine"],
        correctIndex: 2,
      },
      {
        question: "What does the large intestine mainly do?",
        options: [
          "Breaks food down with acid",
          "Absorbs water and forms waste",
          "Produces saliva",
          "Filters blood",
        ],
        correctIndex: 1,
      },
      {
        question: "What breaks food down into a soft mixture in the stomach?",
        options: ["Saliva only", "Acid and enzymes", "Water", "Chewing alone"],
        correctIndex: 1,
      },
      {
        question: "Which of these is a common sign of a digestive problem?",
        options: ["Bloating or stomach pain", "Better sleep", "Improved eyesight", "Stronger nails"],
        correctIndex: 0,
      },
      {
        question: "Which of these is a habit that supports healthy digestion?",
        options: ["Eating very quickly", "Chewing food thoroughly", "Skipping water", "Lying down right after meals"],
        correctIndex: 1,
      },
    ],
  },
  {
    slug: "handwash-basics",
    title: "Handwash basics",
    group: "First Aid Essentials",
    duration: "4 min",
    status: "completed",
    progress: 100,
    thumbIcon: "handwash",
    thumbImage: "/images/courses/handwash-basics.jpg",
    description:
      "Correct handwashing technique and why it is the single most effective way to stop disease spread.",
    infographic: {
      keyFacts: [
        { label: "Recommended scrub time", value: "20+ sec" },
        { label: "Illness reduction", value: "Up to 50%" },
        { label: "Key moments per day", value: "5+" },
        { label: "Steps in technique", value: "6" },
      ],
      learningPoints: [
        "The correct handwashing technique, step by step",
        "Why soap works better than water alone",
        "The moments in a day when handwashing matters most",
        "How to dry hands safely after washing",
      ],
      steps: [
        { title: "Wet hands", detail: "Use clean, running water." },
        { title: "Apply soap", detail: "Cover the front, back and between fingers." },
        { title: "Scrub for 20+ seconds", detail: "Long enough to hum a short tune twice." },
        { title: "Rinse and dry", detail: "Use a clean towel or let hands air dry." },
      ],
    },
    quizQuestions: [
      {
        question: "How long should you scrub your hands with soap?",
        options: ["5 seconds", "10 seconds", "At least 20 seconds", "Only when visibly dirty"],
        correctIndex: 2,
      },
      {
        question: "Handwashing can reduce illness by up to what percentage?",
        options: ["10%", "25%", "50%", "90%"],
        correctIndex: 2,
      },
      {
        question: "How many key moments in a day is handwashing recommended, at minimum?",
        options: ["1", "2", "5+", "10+"],
        correctIndex: 2,
      },
      {
        question: "How many steps are in the recommended handwashing technique?",
        options: ["3", "4", "6", "8"],
        correctIndex: 2,
      },
      {
        question: "What is the first step in proper handwashing?",
        options: ["Apply soap", "Wet hands with clean running water", "Scrub for 20 seconds", "Dry hands"],
        correctIndex: 1,
      },
      {
        question: "Why does soap work better than water alone?",
        options: [
          "It smells nice",
          "It breaks down germs and oils on the skin",
          "It is cheaper",
          "It doesn't work better",
        ],
        correctIndex: 1,
      },
      {
        question: "What comes right after scrubbing for 20+ seconds?",
        options: ["Apply more soap", "Rinse and dry", "Wet hands again", "Skip drying"],
        correctIndex: 1,
      },
      {
        question: "What should you use to dry your hands safely?",
        options: ["A shared damp towel", "A clean towel or air dry", "Your clothes", "Nothing, leave them wet"],
        correctIndex: 1,
      },
      {
        question: "True or false: you only need to wash hands when they look visibly dirty.",
        options: ["True", "False"],
        correctIndex: 1,
      },
      {
        question: "Which of these is a key moment when handwashing matters most?",
        options: ["Before eating", "While watching TV", "Before sleeping only", "Never"],
        correctIndex: 0,
      },
    ],
  },
  {
    slug: "wound-care-bandaging",
    title: "Wound care & bandaging",
    group: "First Aid Essentials",
    duration: "5 min",
    status: "not-started",
    progress: 0,
    thumbIcon: "bandage",
    thumbImage: "/images/courses/wound-care-bandaging.jpg",
    description: "Cleaning a wound safely and applying a bandage correctly.",
    infographic: {
      keyFacts: [
        { label: "Bleeding control", value: "Direct pressure" },
        { label: "Recommended cleaning", value: "Clean water" },
        { label: "Bandage change", value: "Every 1–2 days" },
        { label: "Infection warning signs", value: "3 to watch" },
      ],
      learningPoints: [
        "How to clean a wound safely",
        "When and how to apply a bandage",
        "Signs a wound may be infected",
        "When a wound needs professional care",
      ],
      steps: [
        { title: "Stop the bleeding", detail: "Apply firm, direct pressure with a clean cloth." },
        { title: "Clean gently", detail: "Rinse with clean water; avoid harsh antiseptics on open cuts." },
        { title: "Cover the wound", detail: "Use a sterile bandage or dressing." },
        { title: "Watch for infection", detail: "Redness, warmth or pus means it needs attention." },
      ],
    },
    quizQuestions: [
      {
        question: "What is the recommended way to control bleeding?",
        options: ["Direct pressure", "Ice only", "Elevation only", "Leave it uncovered"],
        correctIndex: 0,
      },
      {
        question: "What should you use to clean a wound?",
        options: ["Alcohol", "Clean water", "Soap and hot oil", "Vinegar"],
        correctIndex: 1,
      },
      {
        question: "How often should a bandage typically be changed?",
        options: ["Every few hours", "Every 1–2 days", "Once a week", "Never"],
        correctIndex: 1,
      },
      {
        question: "How many infection warning signs should you watch for?",
        options: ["1", "2", "3", "5"],
        correctIndex: 2,
      },
      {
        question: "What is the first step in wound care?",
        options: [
          "Cover it immediately",
          "Stop the bleeding with firm, direct pressure",
          "Apply antiseptic",
          "Wait and see",
        ],
        correctIndex: 1,
      },
      {
        question: "What should you avoid using on open cuts while cleaning?",
        options: ["Clean water", "Harsh antiseptics", "A clean cloth", "Sterile dressing"],
        correctIndex: 1,
      },
      {
        question: "What should you cover the wound with?",
        options: ["Any cloth", "A sterile bandage or dressing", "Nothing", "Tape only"],
        correctIndex: 1,
      },
      {
        question: "Which of these is a sign of infection?",
        options: ["Redness, warmth, or pus", "Mild itching only", "A faded scar", "Dry skin"],
        correctIndex: 0,
      },
      {
        question: "True or false: applying firm pressure with a clean cloth helps stop bleeding.",
        options: ["True", "False"],
        correctIndex: 0,
      },
      {
        question: "When does a wound need professional care?",
        options: [
          "If it shows signs of infection or won't stop bleeding",
          "Only if it's painful",
          "Never",
          "Only after a month",
        ],
        correctIndex: 0,
      },
    ],
  },
  {
    slug: "cpr-choking-response",
    title: "CPR and choking response",
    group: "First Aid Essentials",
    duration: "5 min",
    status: "not-started",
    progress: 0,
    thumbIcon: "cpr",
    thumbImage: "/images/courses/cpr-choking-response.jpg",
    description:
      "Step-by-step response to choking and the basics of CPR, demonstrated clearly for a first-time learner.",
    infographic: {
      keyFacts: [
        { label: "Compression rate", value: "100–120/min" },
        { label: "Compression depth", value: "~5 cm" },
        { label: "Back blows for choking", value: "5" },
        { label: "Abdominal thrusts", value: "5" },
      ],
      learningPoints: [
        "How to recognise a choking emergency",
        "The back-blow and abdominal-thrust technique",
        "How to perform hands-only CPR",
        "When to call for emergency help",
      ],
      steps: [
        { title: "Check responsiveness", detail: "Tap and shout — confirm they can't speak or breathe." },
        { title: "Call for help", detail: "Get someone to call emergency services immediately." },
        { title: "5 back blows", detail: "Firm blows between the shoulder blades." },
        { title: "5 abdominal thrusts", detail: "Alternate with back blows until it clears." },
      ],
    },
    quizQuestions: [
      {
        question: "What is the recommended chest compression rate for CPR?",
        options: ["40–60 per minute", "80–100 per minute", "100–120 per minute", "150–180 per minute"],
        correctIndex: 2,
      },
      {
        question: "What is the recommended compression depth for CPR?",
        options: ["~2 cm", "~5 cm", "~10 cm", "~15 cm"],
        correctIndex: 1,
      },
      {
        question: "How many back blows should you give for choking?",
        options: ["1", "3", "5", "10"],
        correctIndex: 2,
      },
      {
        question: "How many abdominal thrusts should you alternate with back blows?",
        options: ["1", "3", "5", "10"],
        correctIndex: 2,
      },
      {
        question: "What is the first step when responding to a choking emergency?",
        options: ["Start CPR", "Check responsiveness", "Give water", "Call a friend"],
        correctIndex: 1,
      },
      {
        question: "What should you do immediately after checking responsiveness?",
        options: ["Wait a few minutes", "Call for emergency help", "Leave the person alone", "Give food"],
        correctIndex: 1,
      },
      {
        question: "Where should back blows be given?",
        options: ["On the chest", "Between the shoulder blades", "On the stomach", "On the head"],
        correctIndex: 1,
      },
      {
        question: "True or false: you should alternate back blows and abdominal thrusts until the obstruction clears.",
        options: ["True", "False"],
        correctIndex: 0,
      },
      {
        question: "What confirms someone is choking?",
        options: ["They are coughing loudly", "They can't speak or breathe", "They are talking normally", "They are sneezing"],
        correctIndex: 1,
      },
      {
        question: "Hands-only CPR mainly focuses on which action?",
        options: ["Rescue breaths only", "Chest compressions", "Checking pulse repeatedly", "Elevating the legs"],
        correctIndex: 1,
      },
    ],
  },
];

export const course = {
  slug: "health-safety-essentials",
  title: "Health & Safety Essentials",
  description:
    "One certificate for the full course: body basics, first aid, and everyday hygiene. Complete every video and pass its quiz to earn it.",
};

export function isCourseComplete(): boolean {
  return courses.every((c) => c.status === "completed");
}

export function courseCompletedCount(): number {
  return courses.filter((c) => c.status === "completed").length;
}

export type StepState = "done" | "current" | "todo";

export interface ChapterState {
  chapter: Course;
  number: number;
  video: StepState;
  quiz: StepState;
  state: CourseStatus;
}

// Every chapter is exactly: 1 video -> 1 quiz. The quiz is only "current" once the video is finished.
export function chapterStates(): ChapterState[] {
  return courses.map((c, i) => {
    const video: StepState =
      c.status === "completed" || c.progress >= 100 ? "done" : c.status === "in-progress" ? "current" : "todo";
    const quiz: StepState = c.status === "completed" ? "done" : video === "done" ? "current" : "todo";
    return { chapter: c, number: i + 1, video, quiz, state: c.status };
  });
}

/** Where a learner lands when they tap a chapter: the quiz once the video is done, otherwise the video. */
export function chapterNextHref(s: ChapterState, base = "/mobile"): string {
  return s.video === "done" && s.quiz !== "done" ? `${base}/quiz/${s.chapter.slug}` : `${base}/lesson/${s.chapter.slug}`;
}

export function chapterNumber(slug: string): number {
  return courses.findIndex((c) => c.slug === slug) + 1;
}

export function adjacentChapters(slug: string) {
  const i = courses.findIndex((c) => c.slug === slug);
  return { prev: courses[i - 1] ?? null, next: courses[i + 1] ?? null };
}

export interface AdminBatch {
  name: string;
  programme: string;
  learners: number;
  startDate: string;
  status: "Active" | "Upcoming" | "Completed";
}

export const adminBatches: AdminBatch[] = [
  { name: "Batch KOL-01", programme: "General Duty Assistant", learners: 32, startDate: "12 Aug 2026", status: "Active" },
  { name: "Batch KOL-02", programme: "Phlebotomist", learners: 18, startDate: "2 Sep 2026", status: "Active" },
  { name: "Batch SIL-01", programme: "Emergency Medical Technician - Basic", learners: 24, startDate: "20 Sep 2026", status: "Upcoming" },
  { name: "Batch PAT-01", programme: "Hospital Front Desk Coordinator", learners: 15, startDate: "5 Oct 2026", status: "Upcoming" },
  { name: "Batch KOL-00", programme: "General Duty Assistant", learners: 28, startDate: "3 Mar 2026", status: "Completed" },
];

export interface AdminCohort {
  name: string;
  type: "School" | "NGO Partner" | "Hospital Partner";
  location: string;
  learners: number;
  thumbImage: string;
}

export const adminCohorts: AdminCohort[] = [
  {
    name: "Schools for Skills, Kolkata",
    type: "School",
    location: "Kolkata, WB",
    learners: 210,
    thumbImage: "/images/cohorts/kolkata.jpg",
  },
  {
    name: "Schools for Skills, Siliguri",
    type: "School",
    location: "Siliguri, WB",
    learners: 96,
    thumbImage: "/images/cohorts/siliguri.jpg",
  },
  {
    name: "Schools for Skills, Patna",
    type: "School",
    location: "Patna, Bihar",
    learners: 64,
    thumbImage: "/images/cohorts/patna.jpg",
  },
  {
    name: "Rural Health Foundation",
    type: "NGO Partner",
    location: "Guwahati, Assam",
    learners: 145,
    thumbImage: "/images/cohorts/rural-health-foundation.jpg",
  },
  {
    name: "Apex Community Hospital",
    type: "Hospital Partner",
    location: "Ranchi, Jharkhand",
    learners: 40,
    thumbImage: "/images/cohorts/apex-community-hospital.jpg",
  },
];

export const learner = {
  name: "Rabi",
  school: "Schools for Skills, Kolkata",
  language: "English" as const,
  overallProgress: 40,
  certificatesEarned: 0,
  totalTopics: 6,
  streakDays: 4,
  points: 860,
  rank: "Top 15% this month",
};

export interface Notice {
  title: string;
  body: string;
  date: string;
  unread: boolean;
}

export const notices: Notice[] = [
  {
    title: "New batch starting: Phlebotomist certification",
    body: "Enrollments are open for the next Phlebotomist batch at the Kolkata centre. Seats are limited.",
    date: "2026-09-15",
    unread: true,
  },
  {
    title: "Scholarship applications open",
    body: "Merit and need-based scholarships are now open for Class X/XII and Graduation students. Apply before seats fill up.",
    date: "2026-09-10",
    unread: true,
  },
  {
    title: "CPR & Choking Response lesson updated",
    body: "The lesson video and quiz have been refreshed with clearer step-by-step demonstrations.",
    date: "2026-09-02",
    unread: false,
  },
  {
    title: "Certificate download now available",
    body: "Completed learners can now download their QR-verifiable certificates from the certificate page.",
    date: "2026-08-28",
    unread: false,
  },
];

export interface ScholarshipIncomeBracket {
  label: string;
}

export const scholarshipInfo = {
  title: "Schools for Skills Scholarship",
  summary:
    "Merit-based and need-based scholarships that cover tuition fees for deserving students from rural and underserved backgrounds, so you can focus on building clinical skills without financial burden.",
  mission:
    "Addressing income inequity by uplifting youth and empowering women through education and employment in the health sector.",
  eligibility: [
    "Academic performance in Class X, XII, or Graduation",
    "Verified family income documentation",
    "Occupation details of the primary earning family member",
    "Total family size and monthly household income",
  ],
  incomeBrackets: [
    "Below ₹10,000 / month",
    "₹10,000 – ₹20,000 / month",
    "₹20,000 – ₹35,000 / month",
    "₹35,000 – ₹50,000 / month",
    "Above ₹50,000 / month",
  ],
  applySteps: [
    { title: "Personal information", detail: "Name, date of birth, and contact details." },
    { title: "Academic qualifications", detail: "Institution details and Class X / XII / Graduation grades." },
    { title: "Course & centre preference", detail: "Choose from 8 healthcare courses across 6 training centres." },
    { title: "Family income details", detail: "Household income bracket and parental occupation." },
  ],
  benefit: "Covers tuition fees for the selected certificate or diploma programme.",
};

export const placementInfo = {
  title: "Placement Network",
  summary:
    "Every successfully certified student is assured an employment offer through our hospital partner network, with 70–90% of students accepting offers and securing formal-sector healthcare jobs.",
  partnerHospitals: [
    "Apollo Hospitals",
    "Narayana Hospital",
    "Cloud Nine Hospital",
    "Peerless Hospital",
    "Tata Medical Centre",
  ],
  stats: [
    { label: "Partner hospitals", value: "25+" },
    { label: "Offer acceptance rate", value: "70–90%" },
    { label: "Years of placement support", value: "12+" },
    { label: "Languages supported", value: "4" },
  ],
  roles: ["EMT", "Operation Theatre Assistant", "General Duty Assistant", "Dialysis Technician", "Hospital Front Desk Coordinator"],
  highlights: [
    "Employment offer assured for every successfully certified student",
    "Pan-India placement reach across multiple states",
    "Multilingual support: English, Hindi, Assamese, Bengali",
    "Continued post-placement hand-holding after you join",
  ],
};

export interface PlacementStory {
  name: string;
  role: string;
  employer: string;
  school: string;
}

export const placementStories: PlacementStory[] = [
  { name: "Subhajit Bagani", role: "EMT", employer: "Peerless Hospital, Kolkata", school: "SFS Sonarpur" },
  { name: "Biswarup Roy", role: "OTA", employer: "Narayana Hospital, Barasat", school: "SFS Bolpur" },
  { name: "Monika Solanki", role: "EMT", employer: "Cloud Nine Hospital, Pune", school: "SFS Indore" },
  { name: "Akansha G. Shinde", role: "EMT", employer: "Cloud Nine Hospital, Pune", school: "SFS Indore" },
  { name: "Deepshikha Tamang", role: "HFDC", employer: "Kins Hospital, Siliguri", school: "SFS Kalimpong" },
  { name: "Ananya Debnath", role: "GDA", employer: "Lion's Diagnostic, Ranaghat", school: "SFS Sonarpur" },
  { name: "Susama Mondal", role: "GDA", employer: "Tata Medical Centre, Kolkata", school: "SFS Sonarpur" },
  { name: "Koushik Mondal", role: "GDA", employer: "Cloud Nine Hospital, Bangalore", school: "SFS Sonarpur" },
  { name: "Shubhajit Mondal", role: "OTA", employer: "Narayana Hospital, Jamshedpur", school: "SFS Bolpur" },
  { name: "Samrat Sardar", role: "GDA", employer: "Mother Nursing Home, West Bengal", school: "SFS Sonarpur" },
  { name: "Pankaj Barman", role: "DT", employer: "Apollo Dialysis, Nalbari", school: "SFS Guwahati" },
  { name: "Chayanika Devi", role: "DT", employer: "Apollo Dialysis, Udalguri", school: "SFS Guwahati" },
  { name: "Pranjit Baruah", role: "DT", employer: "Apollo Dialysis, Tezpur", school: "SFS Guwahati" },
  { name: "Ghanshayam Saha", role: "DT", employer: "Kalna Super Speciality, West Bengal", school: "SFS Bolpur" },
  { name: "Anupam Saha", role: "OTA", employer: "Paramount Health, Hooghly", school: "SFS Bolpur" },
  { name: "Stella Rai", role: "GDA", employer: "Cloud Nine Hospital, Bengaluru", school: "SFS Kalimpong" },
  { name: "Sonali Bela", role: "EMT", employer: "Sancheti Hospital, Pune", school: "SFS Indore" },
  { name: "Surajit Giri", role: "EMT", employer: "Susrut Eye Hospital, Kolkata", school: "SFS Medinipur" },
];

export const adminUser = {
  name: "Surjo",
  email: "surjo@schoolforskills.in",
  role: "Platform Admin",
  org: "Schools for Skills (Allied Health Sciences)",
  verified: false,
};

export interface AdminLearner {
  name: string;
  school: string;
  language: string;
  progress: string;
  status: "Active" | "Completed" | "Invited";
}

export const adminLearners: AdminLearner[] = [
  { name: "Rabi", school: "Schools for Skills, Kolkata", language: "English", progress: "2 of 5 topics", status: "Active" },
  { name: "Arjun Thapa", school: "Schools for Skills, Siliguri", language: "Nepali", progress: "5 of 5 topics", status: "Completed" },
  { name: "Sunita Devi", school: "Schools for Skills, Patna", language: "Hindi", progress: "1 of 5 topics", status: "Active" },
  { name: "Rima Mondal", school: "Schools for Skills, Kolkata", language: "Bengali", progress: "0 of 5 topics", status: "Invited" },
];

export const adminStats = {
  activeLearners: 1284,
  certificatesIssued: 3047,
  avgCompletionRate: "68%",
  languagesLive: 4,
};

export interface AdminActivity {
  name: string;
  action: string;
  time: string;
}

export const adminActivity: AdminActivity[] = [
  { name: "Rabi", action: "completed the Bone structure quiz", time: "12 min ago" },
  { name: "Arjun Thapa", action: "downloaded a certificate for General Duty Assistant", time: "48 min ago" },
  { name: "Sunita Devi", action: "started How the heart works", time: "2 hr ago" },
  { name: "Rima Mondal", action: "signed up from Schools for Skills, Kolkata", time: "5 hr ago" },
  { name: "Koushik Mondal", action: "was placed at Cloud Nine Hospital, Bangalore", time: "1 day ago" },
];

export const weeklyActiveLearners: { day: string; count: number }[] = [
  { day: "Mon", count: 620 },
  { day: "Tue", count: 740 },
  { day: "Wed", count: 690 },
  { day: "Thu", count: 810 },
  { day: "Fri", count: 760 },
  { day: "Sat", count: 520 },
  { day: "Sun", count: 430 },
];

export const weeklyActiveLearnersLastWeek: { day: string; count: number }[] = [
  { day: "Mon", count: 540 },
  { day: "Tue", count: 610 },
  { day: "Wed", count: 655 },
  { day: "Thu", count: 700 },
  { day: "Fri", count: 690 },
  { day: "Sat", count: 470 },
  { day: "Sun", count: 390 },
];

export const monthlyEnrollment: { month: string; value: number }[] = [
  { month: "Apr", value: 640 },
  { month: "May", value: 780 },
  { month: "Jun", value: 860 },
  { month: "Jul", value: 910 },
  { month: "Aug", value: 1080 },
  { month: "Sep", value: 1284 },
];

export const monthlyEnrollment12mo: { month: string; value: number }[] = [
  { month: "Oct", value: 310 },
  { month: "Nov", value: 350 },
  { month: "Dec", value: 380 },
  { month: "Jan", value: 420 },
  { month: "Feb", value: 480 },
  { month: "Mar", value: 560 },
  ...monthlyEnrollment,
];

export interface LanguageShare {
  code: Language;
  percent: number;
}

export const languageDistribution: LanguageShare[] = [
  { code: "EN", percent: 42 },
  { code: "HI", percent: 27 },
  { code: "BN", percent: 21 },
  { code: "NE", percent: 10 },
];

export const languageDistributionNewEnrollments: LanguageShare[] = [
  { code: "EN", percent: 33 },
  { code: "HI", percent: 31 },
  { code: "BN", percent: 24 },
  { code: "NE", percent: 12 },
];

export interface EnrollmentSource {
  label: string;
  percent: number;
  note: string;
}

export const enrollmentSources: EnrollmentSource[] = [
  { label: "Partner schools", percent: 46, note: "Direct enrollment through school partners" },
  { label: "NGO & hospital referral", percent: 27, note: "Referred by partner NGOs and hospitals" },
  { label: "Word of mouth", percent: 18, note: "Alumni and community referrals" },
  { label: "Social & other", percent: 9, note: "WhatsApp, social media, and walk-ins" },
];

export const enrollmentSourcesLastMonth: EnrollmentSource[] = [
  { label: "Partner schools", percent: 51, note: "Direct enrollment through school partners" },
  { label: "NGO & hospital referral", percent: 24, note: "Referred by partner NGOs and hospitals" },
  { label: "Word of mouth", percent: 16, note: "Alumni and community referrals" },
  { label: "Social & other", percent: 9, note: "WhatsApp, social media, and walk-ins" },
];
