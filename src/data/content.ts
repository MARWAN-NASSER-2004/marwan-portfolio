export const content = {
  en: {
    title1: "MARWAN //",
    title2: "SYSTEM",
    title3: "DEVELOPER",
    title3Loop: ["DEVELOPER", "DESIGNER", "ARCHITECT"],
    desc: "Programmed with deep-web skills and a zero-latency stack for those who don't just write the markup—they craft it. Shape your reality.",
    nextProj: "NEXT PROJECT",
    devSkill: "DEVELOPER SKILL",
    skills: [
      { label: "Visual", value: "React 18 NextJS-14" },
      { label: "State", value: "TS - State Manager" },
      { label: "Motion", value: "144Hz CSS-Motions" },
      { label: "Build", value: "Fullstack Vercel Web-App" },
    ],
    cardTitle: "MW-01: SYSTEM CORE",
    cardDesc1: "High-level React skill and a clean",
    cardDesc2: "stack for scaling and clarity.",
    hireBtn: "Hire Marwan",
    pillFullStack: "FULL-STACK",
    pillCloudReady: "CLOUD-READY",
    langToggle: "عربي",

    // SECTION 1
    sec1Title1: "SYSTEM",
    sec1Title2: "ARCHITECT",
    sec1Subtitle: "We build scalable, zero-latency infrastructures.",
    sec1Desc:
      "I am a senior full-stack developer focusing on crafting resilient systems for modern applications. My final results are always highly optimized. Check out my latest work.",
    sec1ReadMore: "READ MORE",
    sec1Stat1Num: "01 // ",
    sec1Stat1Text1: "RECENT PROJECTS",
    sec1Stat1Text2: "IN PRODUCTION",
    sec1Stat2Num: "02 // ",
    sec1Stat2Text1: "EFFECTIVE SYSTEM",
    sec1Stat2Text2: "ARCHITECTURE",
    sec1Insights: [
      { date: "25 MARCH 2026 | DEV BLOG", quote: "Architectures that demand attention." },
      { date: "12 APRIL 2026 | SYSTEM", quote: "Zero-latency data pipelines in Rust." },
      { date: "08 MAY 2026 | DESIGN", quote: "Micro-frontends for massive scale." }
    ],
    sec1Status: "SYS.STATUS: ONLINE",
    sec1Latency: "LATENCY: 0ms",
    sec1Uptime: "UPTIME: 99.9%",
    sec1TechLabel: "TECH STACK",
    sec1TechCategories: [
      { label: "FRONTEND", items: "React · Next.js · TypeScript" },
      { label: "BACKEND", items: "Node.js · Rust · PostgreSQL" },
      { label: "INFRA", items: "Vercel · AWS · Docker" },
    ],
    sec1ExpYears: "5+",
    sec1ExpLabel: "YEARS\nEXPERIENCE",
    sec1ProjectsNum: "40+",
    sec1ProjectsLabel: "PROJECTS\nDELIVERED",

    // SECTION 3 (VISION)
    visionQuote: "Every project starts with how you look at the problem.",
    viewWork: "VIEW MY WORK",

    // SKILLS SECTION
    skillsTitle: "TECHNICAL SKILLS",
    skillCategories: [
      {
        id: "mobile",
        title: "Mobile",
        skills: [
          { name: "Flutter", icon: "SiFlutter", level: 5, projects: ["Trevi", "BookShelves", "MovieBox"] },
          { name: "Dart", icon: "SiDart", level: 5, projects: ["Trevi", "BookShelves"] },
          { name: "Provider", icon: "FaReact", level: 4, projects: ["Trevi"] }, // using react icon as placeholder for state management if provider isn't available
          { name: "REST API", icon: "SiPostman", level: 5, projects: ["MovieBox", "Trevi"] }
        ]
      },
      {
        id: "frontend",
        title: "Frontend",
        skills: [
          { name: "React", icon: "SiReact", level: 5, projects: ["Portfolio", "Dashboard UI"] },
          { name: "Next.js", icon: "SiNextdotjs", level: 4, projects: ["Portfolio"] },
          { name: "TypeScript", icon: "SiTypescript", level: 4, projects: ["Portfolio", "Admin Panel"] },
          { name: "JavaScript", icon: "SiJavascript", level: 5, projects: ["Web Tools"] },
          { name: "HTML/CSS", icon: "SiHtml5", level: 5, projects: ["Various"] },
          { name: "Tailwind CSS", icon: "SiTailwindcss", level: 5, projects: ["Portfolio", "Dashboard UI"] },
          { name: "Bootstrap", icon: "SiBootstrap", level: 4, projects: ["Legacy Systems"] }
        ]
      },
      {
        id: "backend",
        title: "Backend",
        skills: [
          { name: ".NET Core / ASP.NET", icon: "SiDotnet", level: 4, projects: ["Enterprise API"] },
          { name: ".NET MVC", icon: "SiDotnet", level: 4, projects: ["Legacy App"] },
          { name: "C#", icon: "SiCsharp", level: 4, projects: ["Enterprise API", "WPF App"] },
          { name: "Entity Framework", icon: "SiDotnet", level: 4, projects: ["Enterprise API"] },
          { name: "WPF", icon: "SiWindows", level: 3, projects: ["Desktop Client"] }
        ]
      },
      {
        id: "database",
        title: "Database",
        skills: [
          { name: "MySQL", icon: "SiMysql", level: 5, projects: ["Trevi", "BookShelves"] },
          { name: "SQL Server", icon: "SiMicrosoftsqlserver", level: 4, projects: ["Enterprise API"] },
          { name: "Database Design", icon: "SiDatabricks", level: 5, projects: ["Trevi", "Enterprise API"] },
          { name: "EER Diagrams", icon: "SiDiagramsdotnet", level: 4, projects: ["Trevi Planning"] }
        ]
      },
      {
        id: "tools",
        title: "Tools",
        skills: [
          { name: "Git/GitHub", icon: "SiGithub", level: 5, projects: ["All Projects"] },
          { name: "Networking", icon: "SiCisco", level: 3, projects: ["Infrastructure Setup"] },
          { name: "Electronics", icon: "SiArduino", level: 3, projects: ["Hardware Prototypes"] }
        ]
      }
    ],
    // PROJECTS SECTION
    projectsHeader: "PROJECT_LOG // SYSTEM_FILES",
    projectsAccessBtn: "ACCESS_FILE →",
    projects: [
      {
        id: "0x01",
        title: "Trevi",
        tagline: "A comprehensive Flutter application with complete authentication and state management.",
        techStack: ["Flutter", "Dart", "Provider"],
        image: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?q=80&w=2070&auto=format&fit=crop", // Placeholder mobile dev image
        githubUrl: "#",
        demoUrl: "#",
      },
      {
        id: "0x02",
        title: "BulkyBook",
        tagline: ".NET Core e-commerce platform featuring DataTables admin panel and advanced search.",
        techStack: [".NET Core", "C#", "Entity Framework", "DataTables", "Bootstrap"],
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop", // Placeholder code/server image
        githubUrl: "#",
        demoUrl: "#",
      },
      {
        id: "0x03",
        title: "BookShelves",
        tagline: "Google Books API integration for shelf storage and responsive grid display.",
        techStack: ["Flutter", "Dart", "REST API Integration"],
        image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop", // Placeholder abstract tech image
        githubUrl: "#",
        demoUrl: "#",
      }
    ],
  },
  ar: {
    title1: "مروان //",
    title2: "أنظمة",
    title3: "مطور",
    title3Loop: ["مطور", "مصمم", "مهندس"],
    desc: "مبرمج بمهارات الويب العميق ومكدس خالٍ من التأخير لأولئك الذين لا يكتبون التعليمات البرمجية فحسب، بل يصنعونها. شكل واقعك.",
    nextProj: "المشروع التالي",
    devSkill: "مهارات المطور",
    skills: [
      { label: "واجهة المستخدم", value: "React 18 NextJS-14" },
      { label: "إدارة الحالة", value: "TS - State Manager" },
      { label: "الحركة", value: "144Hz CSS-Motions" },
      { label: "البناء", value: "Fullstack Vercel Web-App" },
    ],
    cardTitle: "MW-01: جوهر النظام",
    cardDesc1: "مهارات عالية في React وتقنيات",
    cardDesc2: "نظيفة للتوسع والوضوح.",
    hireBtn: "وظف مروان",
    pillFullStack: "تطوير متكامل",
    pillCloudReady: "جاهز للسحابة",
    langToggle: "EN",

    // SECTION 1
    sec1Title1: "مهندس",
    sec1Title2: "أنظمة",
    sec1Subtitle: "نبني بنى تحتية قابلة للتوسع وبدون تأخير.",
    sec1Desc:
      "أنا مطور شامل ذو خبرة، أركز على صياغة أنظمة مرنة للتطبيقات الحديثة. نتائجي النهائية محسنة دائمًا. تحقق من أحدث أعمالي.",
    sec1ReadMore: "اقرأ المزيد",
    sec1Stat1Num: "01 // ",
    sec1Stat1Text1: "أحدث المشاريع",
    sec1Stat1Text2: "في الإنتاج",
    sec1Stat2Num: "02 // ",
    sec1Stat2Text1: "هندسة أنظمة",
    sec1Stat2Text2: "فعالة",
    sec1Insights: [
      { date: "25 مارس 2026 | مدونة التطوير", quote: "بنى تحتية تلفت الانتباه." },
      { date: "12 أبريل 2026 | النظام", quote: "مسارات بيانات خالية من التأخير في Rust." },
      { date: "08 مايو 2026 | التصميم", quote: "واجهات أمامية مصغرة لنطاق هائل." }
    ],
    sec1Status: "حالة النظام: متصل",
    sec1Latency: "التأخير: 0مل.ث",
    sec1Uptime: "وقت التشغيل: 99.9%",
    sec1TechLabel: "التقنيات",
    sec1TechCategories: [
      { label: "الواجهة", items: "React · Next.js · TypeScript" },
      { label: "الخادم", items: "Node.js · Rust · PostgreSQL" },
      { label: "البنية", items: "Vercel · AWS · Docker" },
    ],
    sec1ExpYears: "+5",
    sec1ExpLabel: "سنوات\nخبرة",
    sec1ProjectsNum: "+40",
    sec1ProjectsLabel: "مشروع\nمُنجز",

    // SECTION 3 (VISION)
    visionQuote: "كل مشروع يبدأ من زاوية نظرتك للمشكلة.",
    viewWork: "شاهد أعمالي",

    // SKILLS SECTION
    skillsTitle: "المهارات التقنية",
    skillCategories: [
      {
        id: "mobile",
        title: "تطبيقات الجوال",
        skills: [
          { name: "Flutter", icon: "SiFlutter", level: 5, projects: ["Trevi", "BookShelves", "MovieBox"] },
          { name: "Dart", icon: "SiDart", level: 5, projects: ["Trevi", "BookShelves"] },
          { name: "Provider", icon: "FaReact", level: 4, projects: ["Trevi"] },
          { name: "REST API", icon: "SiPostman", level: 5, projects: ["MovieBox", "Trevi"] }
        ]
      },
      {
        id: "frontend",
        title: "تطوير الواجهات",
        skills: [
          { name: "React", icon: "SiReact", level: 5, projects: ["Portfolio", "Dashboard UI"] },
          { name: "Next.js", icon: "SiNextdotjs", level: 4, projects: ["Portfolio"] },
          { name: "TypeScript", icon: "SiTypescript", level: 4, projects: ["Portfolio", "Admin Panel"] },
          { name: "JavaScript", icon: "SiJavascript", level: 5, projects: ["Web Tools"] },
          { name: "HTML/CSS", icon: "SiHtml5", level: 5, projects: ["Various"] },
          { name: "Tailwind CSS", icon: "SiTailwindcss", level: 5, projects: ["Portfolio", "Dashboard UI"] },
          { name: "Bootstrap", icon: "SiBootstrap", level: 4, projects: ["Legacy Systems"] }
        ]
      },
      {
        id: "backend",
        title: "تطوير الخوادم",
        skills: [
          { name: ".NET Core / ASP.NET", icon: "SiDotnet", level: 4, projects: ["Enterprise API"] },
          { name: ".NET MVC", icon: "SiDotnet", level: 4, projects: ["Legacy App"] },
          { name: "C#", icon: "SiCsharp", level: 4, projects: ["Enterprise API", "WPF App"] },
          { name: "Entity Framework", icon: "SiDotnet", level: 4, projects: ["Enterprise API"] },
          { name: "WPF", icon: "SiWindows", level: 3, projects: ["Desktop Client"] }
        ]
      },
      {
        id: "database",
        title: "قواعد البيانات",
        skills: [
          { name: "MySQL", icon: "SiMysql", level: 5, projects: ["Trevi", "BookShelves"] },
          { name: "SQL Server", icon: "SiMicrosoftsqlserver", level: 4, projects: ["Enterprise API"] },
          { name: "Database Design", icon: "SiDatabricks", level: 5, projects: ["Trevi", "Enterprise API"] },
          { name: "EER Diagrams", icon: "SiDiagramsdotnet", level: 4, projects: ["Trevi Planning"] }
        ]
      },
      {
        id: "tools",
        title: "أدوات وأساسيات",
        skills: [
          { name: "Git / GitHub", icon: "SiGithub", level: 5, projects: ["All Projects"] },
          { name: "Networking", icon: "SiCisco", level: 3, projects: ["Infrastructure Setup"] },
          { name: "Electronics", icon: "SiArduino", level: 3, projects: ["Hardware Prototypes"] }
        ]
      }
    ],
    // PROJECTS SECTION
    projectsHeader: "سجل_المشاريع // ملفات_النظام",
    projectsAccessBtn: "الوصول_للملف ←",
    projects: [
      {
        id: "0x01",
        title: "Trevi",
        tagline: "تطبيق Flutter شامل مع مصادقة كاملة وإدارة حالة متقدمة.",
        techStack: ["Flutter", "Dart", "Provider"],
        image: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?q=80&w=2070&auto=format&fit=crop", // Placeholder mobile dev image
        githubUrl: "#",
        demoUrl: "#",
      },
      {
        id: "0x02",
        title: "BulkyBook",
        tagline: "منصة تجارة إلكترونية .NET Core تتميز بلوحة تحكم DataTables وبحث متقدم.",
        techStack: [".NET Core", "C#", "Entity Framework", "DataTables", "Bootstrap"],
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop", // Placeholder code/server image
        githubUrl: "#",
        demoUrl: "#",
      },
      {
        id: "0x03",
        title: "BookShelves",
        tagline: "تكامل مع Google Books API لتخزين الكتب وعرض شبكي متجاوب.",
        techStack: ["Flutter", "Dart", "REST API Integration"],
        image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop", // Placeholder abstract tech image
        githubUrl: "#",
        demoUrl: "#",
      }
    ],
  },
};
