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

I care deeply about clean code, thoughtful architecture, and continuous delivery. Outside of work I run Innoverxia — a small software agency — and I'm building CVibe, a free, open-source CV maker so anyone can put their best foot forward without paying a cent.`;

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
    { name: "Kotlin", level: 65 },
  ],
  frontend: ["React.js", "React Native", "Vue.js", "TypeScript", "Tailwind CSS", "Material-UI", "DevExpress"],
  backend: [".NET Core", "Spring Boot", "Node.js", "FastAPI", "REST APIs", "Microservices", "MVC", "QuestPDF"],
  data: ["PostgreSQL", "Microsoft SQL Server", "MySQL", "Firebase / Firestore", "Supabase"],
  devops: ["Docker", "Kubernetes", "CI/CD Pipelines", "Git", "Azure DevOps", "Cloudflare Pages", "Railway"],
  concepts: [
    "Microservices Architecture",
    "Clean Architecture",
    "Agile / Scrum",
    "Data Structures & Algorithms",
    "Backend Optimisation",
    "Responsive UI Design",
    "JWT Auth & Role-Based Access",
    "PDF Generation",
    "Real-time Databases",
  ],
};

// Featured projects — shown as large hero cards
export const featuredProjects = [
  {
    id: "babina",
    title: "Babina Travel",
    subtitle: "Production · Client Project",
    description:
      "A high-traffic travel and transportation website built for a real client and serving a global audience. Running 67k monthly visits with top audiences in France, the US, the Netherlands, and the UK.",
    stats: [
      { label: "Monthly Visits", value: "67k+" },
      { label: "Monthly Requests", value: "130k+" },
      { label: "Bandwidth / Month", value: "145 MB" },
      { label: "Top Markets", value: "FR · US · NL · UK" },
    ],
    stack: ["React", "Cloudflare", "Firebase"],
    status: "live",
    type: "Client Project · Production",
    accent: "gold",
    links: {
      live: "https://babina.co.za",
      github: "https://github.com/Tylerking406/cvmaker",
    },
  },
  {
    id: "myadvisor",
    title: "MyAdvisor",
    subtitle: "Final Year Capstone · Distinction",
    description:
      "A full-stack academic platform enabling students and advisors to schedule meetings, register for courses, receive AI-powered major-change advice, and communicate via role-based dashboards. Awarded a distinction.",
    longDescription:
      "Built with Spring Boot and React, MyAdvisor supports multiple user roles — students, advisors, and administrators — each with their own dashboard and permissions. Features include real-time messaging, course registration flows, smart course advice, and a meeting scheduling system.",
    stack: ["Spring Boot", "React", "Java", "PostgreSQL", "JWT Auth", "REST APIs"],
    status: "complete",
    type: "Full Stack · Academic",
    accent: "cyan",
    links: {
      github: "https://github.com/Tylerking406/Capstone",
    },
  },
];

// All other projects — shown in a grid
export const projects = [
  {
    id: "cvmaker",
    title: "CVibe — CV Maker",
    subtitle: "In Development · Open Source",
    description:
      "A free, open-source CV builder so anyone can create a professional CV without paying. Built with React + TypeScript, a .NET Core API, QuestPDF for generation, Supabase for auth and storage, and hosted on Cloudflare Pages.",
    stack: ["React", "TypeScript", ".NET Core", "QuestPDF", "Supabase", "PostgreSQL", "Railway"],
    status: "in-progress",
    type: "Web App · Open Source",
    accent: "cyan",
    mission: "Free for everyone. Help people get jobs.",
    links: {
      live: "https://cvibe.arinao.dev",
      github: "https://github.com/Tylerking406/cvmaker",
    },
  },
  {
    id: "innoverxia",
    title: "Innoverxia",
    subtitle: "Startup · Software Agency",
    description:
      "Co-founded a software agency that designs and builds websites and systems for clients, handles system maintenance, and delivers end-to-end digital solutions for small businesses.",
    stack: ["React", "Firebase", "Web", "Client Work"],
    status: "live",
    type: "Startup · Agency",
    accent: "gold",
    links: {
      live: "https://innoverxia.web.app",
      github: "https://github.com/Tylerking406/innoverxia",
    },
  },
  {
    id: "employee-system",
    title: "Employee Management System",
    subtitle: "Backend · .NET Core",
    description:
      "A clean REST API for employee CRUD operations built with .NET Core, demonstrating clean controller architecture, data models, and backend best practices.",
    stack: [".NET Core", "C#", "REST API", "CRUD"],
    status: "complete",
    type: "Backend · API",
    accent: "cyan",
    links: {
      github: "https://github.com/Tylerking406/EmployeesSystem",
    },
  },
  {
    id: "alphabet-book",
    title: "AlphabetBook",
    subtitle: "Android · Kotlin",
    description:
      "An educational Android app built natively in Kotlin with Android Studio, designed to help young learners engage with the alphabet through an interactive mobile experience.",
    stack: ["Kotlin", "Android Studio", "Mobile"],
    status: "complete",
    type: "Mobile · Android",
    accent: "gold",
    links: {
      github: "https://github.com/Tylerking406/MDD1",
    },
  },
  {
    id: "ai-tutor",
    title: "AI Tutoring Platform",
    subtitle: "Mobile · In Development",
    description:
      "An AI-powered tutoring mobile app integrating Falcon AI with LangChain for intelligent, contextual response generation. FastAPI backend with a React Native frontend.",
    stack: ["React Native", "FastAPI", "LangChain", "Falcon AI", "Python"],
    status: "in-progress",
    type: "Mobile App · AI",
    accent: "purple",
    links: {
      github: "https://github.com/Tylerking406",
    },
  },
  {
    id: "birthday-wish",
    title: "BirthdayWish",
    subtitle: "Web · React + Firebase",
    description:
      "A personalised birthday experience website built overnight — featuring videos, photos, and a guest message board powered by Firebase Firestore with real-time updates.",
    stack: ["React", "Firebase", "Firestore", "CSS"],
    status: "live",
    type: "Web App · Creative",
    accent: "gold",
    links: {
      github: "https://github.com/Tylerking406/BirthDayWish",
    },
  },
  {
    id: "digit-cnn",
    title: "CNN Digit Recognition",
    subtitle: "Deep Learning · 98.7% Accuracy",
    description:
      "A Convolutional Neural Network trained on MNIST achieving 98.7% accuracy, with custom architecture tuning and augmentation strategies.",
    stack: ["Python", "TensorFlow", "Keras", "CNNs"],
    status: "complete",
    type: "Deep Learning · CV",
    accent: "purple",
    links: {
      github: "https://github.com/Tylerking406/Artificial-Neural-Networks",
    },
  },
  {
    id: "stm-assembly",
    title: "STM32 LED Control",
    subtitle: "Embedded · ARM Assembly",
    description:
      "Low-level LED control system for an STM32 microcontroller written in ARM Assembly, covering register manipulation, GPIO config, and hardware timing.",
    stack: ["ARM Assembly", "STM32", "Embedded Systems", "C"],
    status: "complete",
    type: "Embedded · Hardware",
    accent: "cyan",
    links: {
      github: "https://github.com/Tylerking406/Tylerking406-KRMTAK001_NDXARI004_EEE3096S",
    },
  },
];

export const achievements = [
  "Promoted to permanent Junior Software Engineer (Full Stack) at Digital Outsource Services — March 2026.",
  "Built Babina Travel — a client site serving 67k+ monthly visitors across France, US, Netherlands & UK.",
  "Distinction (77%) in Software Engineering (CSC3002F) at UCT.",
  "Co-founded Innoverxia — a software agency building digital products for clients.",
  "Tutored 50+ university students — average grade improvement of 20%.",
  "Delivered a critical production payment system ticket within days of being assigned.",
];
