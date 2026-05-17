export const personal = {
  name: "Arinao Ndou",
  title: "Full-Stack Software Engineer",
  tagline: "Backend-first thinker. Clean architecture advocate. Building scalable systems that ship.",
  location: "Cape Town, South Africa",
  email: "tylerking406@gmail.com",
  phone: "079 440 5311",
  github: "https://github.com/Tylerking406",
  linkedin: "https://linkedin.com/in/arinao-ndou",
  website: "https://arinao.dev",
  availability: "Open to opportunities",
};

export const about = `I'm a full-stack software engineer based in Cape Town, with a BSc in Computer Science & Computer Engineering from UCT. I specialise in backend systems — C# .NET Core, microservices, and scalable APIs — while staying sharp on the frontend with React and Vue.

My career so far has taken me from fintech internships and a financial technology analyst role to production-level engineering at Digital Outsource Services, where I've shipped payment systems, containerised applications, and migrated entire component libraries across the stack.

I care deeply about clean code, thoughtful architecture, and continuous delivery. Outside of work I'm building an AI-powered tutoring app and always looking for the next interesting engineering challenge.`;

export const experience = [
  {
    id: "dos-junior",
    role: "Junior Software Engineer (Full Stack)",
    company: "Digital Outsource Services",
    location: "Cape Town",
    period: "March 2026 – Present",
    type: "Permanent · Full-time",
    highlights: [
      "Promoted from graduate to permanent engineer following exceptional performance.",
      "Delivered a critical 8-point payment run ticket within days — designed optimised stored procedures and transactional logic in Microsoft SQL Server.",
      "Migrated all Syncfusion data grids to DevExpress across the company codebase using Vue.js, improving maintainability and UI performance.",
      "Containerise applications with Docker; deploy and manage images within Kubernetes clusters.",
      "Contribute to CI/CD pipeline integration, streamlining deployment workflows and reducing manual intervention.",
      "Participate in Agile (Scrum) sprint ceremonies; collaborate with cross-functional teams to deliver features on schedule.",
    ],
    stack: ["C# .NET Core", "Vue.js", "MSSQL", "Docker", "Kubernetes", "CI/CD", "Azure DevOps"],
  },
  {
    id: "dos-grad",
    role: "Software Engineer Graduate (Full Stack)",
    company: "DigiOutsource",
    location: "Cape Town",
    period: "2025 – February 2026",
    type: "Graduate Programme",
    highlights: [
      "Initiated backend development in C# .NET Core within a microservices environment.",
      "Assisted the Product Owner across multiple modules, demonstrating ownership beyond assigned scope.",
      "Contributed to Syncfusion → DevExpress migration and Docker/Kubernetes deployment workflows.",
    ],
    stack: ["C# .NET Core", "Vue.js", "Docker", "Kubernetes", "Microservices"],
  },
  {
    id: "murex",
    role: "Murex Analyst",
    company: "Kion Consulting",
    location: "Cape Town",
    period: "2024",
    type: "Contract",
    highlights: [
      "Gained expertise in financial technology and capital markets operations.",
      "Trained in MXML, XML, XSLT, SQL, Unix, and Bash scripting.",
      "Automated operational workflows to improve efficiency across financial systems.",
    ],
    stack: ["Murex", "SQL", "XML/XSLT", "Unix", "Bash"],
  },
  {
    id: "tata",
    role: "Full-Stack Developer Intern",
    company: "Tata-iMali",
    location: "Cape Town",
    period: "2024",
    type: "Internship",
    highlights: [
      "Designed and developed reusable frontend components with React, improving development velocity.",
      "Integrated screens with React Navigation and enhanced UI responsiveness.",
      "Leveraged Firebase for real-time database and user authentication.",
      "Streamlined backend operations and optimised code for improved performance.",
    ],
    stack: ["React", "React Native", "Firebase", "React Navigation"],
  },
];

export const education = {
  degree: "Bachelor of Science — Computer Science & Computer Engineering",
  institution: "University of Cape Town",
  graduated: "November 2024",
  highlight: "Distinction (77%) in CSC3002F — Software Engineering",
  modules: [
    "Artificial Intelligence",
    "Machine Learning",
    "Dynamic Programming",
    "Theory of Computation",
    "Parallel Computing",
    "Internet of Things",
  ],
};

export const skills = {
  languages: [
    { name: "C# / .NET Core", level: 90 },
    { name: "Java", level: 85 },
    { name: "JavaScript / TypeScript", level: 82 },
    { name: "Python", level: 75 },
    { name: "SQL", level: 85 },
    { name: "C / C++", level: 65 },
  ],
  frontend: ["React.js", "React Native", "Vue.js", "Tailwind CSS", "Material-UI", "DevExpress"],
  backend: [".NET Core", "Node.js", "FastAPI", "REST APIs", "Microservices", "MVC"],
  data: ["Microsoft SQL Server", "MySQL", "Firebase", "LangChain"],
  devops: ["Docker", "Kubernetes", "CI/CD Pipelines", "Git", "Azure DevOps"],
  concepts: [
    "Microservices Architecture",
    "Clean Architecture",
    "Agile / Scrum",
    "Data Structures & Algorithms",
    "Backend Optimisation",
    "Responsive UI Design",
    "Code Refactoring",
  ],
};

export const projects = [
  {
    id: "ai-tutor",
    title: "AI Tutoring Platform",
    subtitle: "Mobile · In Development",
    description:
      "An AI-powered tutoring mobile app that delivers intelligent, personalised academic assistance. Integrates Falcon AI with LangChain for contextual response generation, with a FastAPI backend and React Native frontend for cross-device reach.",
    longDescription:
      "Built to tackle the accessibility gap in quality tutoring, this app leverages large language models through LangChain to provide step-by-step explanations, quiz generation, and adaptive learning paths. The FastAPI backend handles model orchestration, session state, and a RESTful API layer consumed by the React Native client.",
    stack: ["React Native", "FastAPI", "LangChain", "Falcon AI", "Python", "Cloud"],
    status: "in-progress",
    type: "Mobile App · AI",
    accent: "cyan",
    links: { github: "https://github.com/Tylerking406" },
  },
  {
    id: "guest-booking",
    title: "Guest Booking Application",
    subtitle: "Web · Live",
    description:
      "A feature-rich React web app with a full guest booking system, randomised quotes, voice notes synced to images, and a photo/video gallery — all powered by Firebase real-time database with instant notifications.",
    longDescription:
      "Built for seamless guest engagement, the app features real-time message storage in Firebase, instant push notifications, and a polished media gallery. Voice memos are synchronised with corresponding images for an immersive browsing experience.",
    stack: ["React", "Firebase", "JavaScript", "CSS"],
    status: "live",
    type: "Web App · Full Stack",
    accent: "gold",
    links: { github: "https://github.com/Tylerking406" },
  },
  {
    id: "basketball-ai",
    title: "Basketball Shot Predictor",
    subtitle: "ML · Research",
    description:
      "A machine learning algorithm that predicts basketball shot outcomes from real-time sensor data. Trained on motion tracking datasets using feature engineering and classification models.",
    stack: ["Python", "Machine Learning", "Sensor Data", "Scikit-learn"],
    status: "complete",
    type: "ML · Research",
    accent: "purple",
    links: { github: "https://github.com/Tylerking406" },
  },
  {
    id: "digit-recognition",
    title: "CNN Digit Recognition",
    subtitle: "Deep Learning · 98.7% Accuracy",
    description:
      "A Convolutional Neural Network achieving 98.7% accuracy classifying handwritten digits from the MNIST dataset. Built from scratch with custom architecture tuning and augmentation strategies.",
    stack: ["Python", "TensorFlow / Keras", "CNNs", "MNIST"],
    status: "complete",
    type: "Deep Learning · CV",
    accent: "cyan",
    links: { github: "https://github.com/Tylerking406" },
  },
];

export const achievements = [
  "Promoted to permanent Junior Software Engineer (Full Stack) at Digital Outsource Services — March 2026.",
  "Distinction (77%) in Software Engineering at UCT.",
  "Built scalable financial workflows during a fintech internship at Tata-iMali.",
  "Tutored 50+ university students — average grade improvement of 20%.",
  "Delivered a critical production payment system ticket within days of being assigned.",
];
