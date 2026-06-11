export interface IncomePath {
  id: string;
  title: string;
  description: string;
  image: string;
  minAge: number;
  requiredSkills: string[];
  minHoursPerWeek: number;
  incomePotential: "Low" | "Medium" | "High";
  learningCurve: "Easy" | "Moderate" | "Steep";
  steps: string[];
  platforms: { name: string; url: string }[];
  category: "freelancing" | "content-creation" | "coding" | "ecommerce";
}

export const incomePaths: IncomePath[] = [
  {
    id: "freelancing-writing",
    title: "Freelance Writing",
    description: "Write articles, blog posts, and copy for businesses and publications.",
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/aacbdcdc-bb90-4cc4-96b0-8a4b25b4ae41/freelancing-path-4ed4dc84-1781129608468.webp",
    minAge: 16,
    requiredSkills: ["Writing", "Research", "SEO Basics"],
    minHoursPerWeek: 10,
    incomePotential: "Medium",
    learningCurve: "Moderate",
    category: "freelancing",
    steps: [
      "Create a portfolio of sample articles",
      "Sign up on platforms like Upwork or ProBlogger",
      "Pitch to niche blogs and websites",
      "Build long-term relationships with clients"
    ],
    platforms: [
      { name: "Upwork", url: "https://upwork.com" },
      { name: "ProBlogger", url: "https://problogger.com/jobs" }
    ]
  },
  {
    id: "coding-web-dev",
    title: "Web Development",
    description: "Build and maintain websites and web applications for clients.",
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/aacbdcdc-bb90-4cc4-96b0-8a4b25b4ae41/coding-path-dd2c33b6-1781129607975.webp",
    minAge: 13,
    requiredSkills: ["HTML", "CSS", "JavaScript", "Problem Solving"],
    minHoursPerWeek: 15,
    incomePotential: "High",
    learningCurve: "Steep",
    category: "coding",
    steps: [
      "Learn HTML, CSS, and JavaScript fundamentals",
      "Build personal projects to showcase your skills",
      "Learn a framework like React or Vue",
      "Start taking on small freelance projects"
    ],
    platforms: [
      { name: "freeCodeCamp", url: "https://freecodecamp.org" },
      { name: "Toptal", url: "https://toptal.com" }
    ]
  },
  {
    id: "content-youtube",
    title: "YouTube Content Creation",
    description: "Create video content and monetize through ads, sponsorships, and merchandise.",
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/aacbdcdc-bb90-4cc4-96b0-8a4b25b4ae41/content-creation-path-07deb0b6-1781129608470.webp",
    minAge: 13,
    requiredSkills: ["Video Editing", "Storytelling", "Niche Expertise"],
    minHoursPerWeek: 20,
    incomePotential: "High",
    learningCurve: "Steep",
    category: "content-creation",
    steps: [
      "Choose a niche you are passionate about",
      "Get basic filming and editing equipment",
      "Upload consistently and optimize for SEO",
      "Apply for the YouTube Partner Program"
    ],
    platforms: [
      { name: "YouTube", url: "https://youtube.com" },
      { name: "Canva", url: "https://canva.com" }
    ]
  },
  {
    id: "ecommerce-dropshipping",
    title: "Dropshipping",
    description: "Sell products online without keeping them in stock. The supplier ships directly to the customer.",
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/aacbdcdc-bb90-4cc4-96b0-8a4b25b4ae41/ecommerce-path-57d3ed7c-1781129609046.webp",
    minAge: 18,
    requiredSkills: ["Marketing", "Customer Service", "Product Research"],
    minHoursPerWeek: 15,
    incomePotential: "Medium",
    learningCurve: "Moderate",
    category: "ecommerce",
    steps: [
      "Research trending products and reliable suppliers",
      "Set up an online store using Shopify or WooCommerce",
      "Market your products using social media ads",
      "Manage customer orders and inquiries"
    ],
    platforms: [
      { name: "Shopify", url: "https://shopify.com" },
      { name: "AliExpress", url: "https://aliexpress.com" }
    ]
  },
  {
    id: "freelancing-design",
    title: "Graphic Design",
    description: "Create visual concepts for branding, logos, and marketing materials.",
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/aacbdcdc-bb90-4cc4-96b0-8a4b25b4ae41/hero-banner-690c5b13-1781129607735.webp",
    minAge: 16,
    requiredSkills: ["Creativity", "Photoshop/Illustrator", "Branding"],
    minHoursPerWeek: 10,
    incomePotential: "Medium",
    learningCurve: "Moderate",
    category: "freelancing",
    steps: [
      "Learn design principles and software",
      "Create a portfolio on Behance or Dribbble",
      "Join freelance platforms like 99designs or Fiverr",
      "Networking and cold-emailing potential clients"
    ],
    platforms: [
      { name: "99designs", url: "https://99designs.com" },
      { name: "Fiverr", url: "https://fiverr.com" }
    ]
  }
];
