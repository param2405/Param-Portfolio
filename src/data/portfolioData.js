export const devData = {
  name: "Param Parikh",
  title: "Full Stack & AI-ML Developer",
  subtitle: "Crafting elegant solutions with modern web technologies",
  tagline: "Code. Create. Innovate.",
  email: "paramworkparikh80@email.com",
  phone: "+91 90992 78738",
  // location: "Surat, Gujarat, India",
  github: "https://github.com/param2412",
  linkedin: "https://www.linkedin.com/in/param-parikh-714030277/",
  leetcode: "https://leetcode.com/u/param2412/",
  // twitter: "https://twitter.com/paramparikh",
  about: `I'm a passionate Full Stack & AI-ML Developer with 3+ years of experience building scalable, 
  high-performance web applications. I love turning complex problems into simple, beautiful, and intuitive 
  designs. My expertise spans from crafting pixel-perfect UIs to designing robust backend architectures.`,

  skills: {
    frontend: ["React.js", "TypeScript", "JavaScript ES6+", "HTML5/CSS3", "Tailwind CSS", "Redux"],
    backend: ["Node.js", "Express.js", "Python", "FastAPI", "Django", "REST APIs", "WebSockets", "Microservices"],
    MachineLearning: ["Machine Learning", "AI", "Scikit-Learn", "NLP", "NumPy", "Pandas", "Matplotlib", "Seaborn", "LLMs"],
    database: ["MongoDB", "PostgreSQL", "MySQL", "Firebase", "Prisma ORM"],
    // "Docker", "Kubernetes", "AWS", 
    devops: ["CI/CD", "Linux", "Git/GitHub Actions"],
    tools: ["Github", "Git", "Vercel", "VS Code", "Figma", "Postman", "Webpack", "Vite"]
  },

  experience: [
    {
      company: "Logic Minds By Pari",
      role: "Full Stack - AI Developer Intern",
      period: "March 2026 – Present",
      location: "Surat, India",
      description: "Developing scalable backend and web application features as part of a software development team. Building and integrating APIs while improving application performance and maintainability. Collaborating with developers using Git-based workflows and contributing to production-ready features.",
      tech: ["React", "Node.js", "Express.js", "GSAP", "Animation", "Lottifies", "MongoDB", "AI", "AWS"]
    },
    {
      company: "Infosys Springboard",
      role: "AI-ML Engineer Intern",
      period: "Sep 2025 – Nov 2025",
      location: "Bangalore, India",
      description: "Developing an AI-powered live meeting summarizer using Python, OpenAI Whisper/GPT, and NLP to automate transcription and generate concise summaries that improve meeting review efficiency by up to 50%. Collaborating with mentors in an agile team, handling data preprocessing and language model tuning, contributing to a project expected to reduce meeting minutes review time for 1000+ users upon deployment.",
      tech: ["Python", "Streamlit", "Numpy", "Pandas", "Scikit-Learn", "Whisper", "Pyannote", "OpenAI", "Machine Learning", "LLMs", "Model Training"]
    },
    {
      company: "P & D Technology",
      role: "Software Developer Intern",
      period: "Jan 2025 – Aug 2025",
      location: "Remote",
      description: "Developed a Full-stack web application using React and Node.js for monthly expense tracking and analytics. Integrated MongoDB for data storage and implemented interactive dashboards for expense visualization. Utilized Git for version control and collaborated with a remote team using Agile methodologies.",
      tech: ["React", "Python", "Firebase", "Node.js", "MongoDB"]
    },
    {
      company: "Freelance",
      role: "Freelance Developer",
      period: "Sep 2023 – Present",
      location: "Remote",
      description:
        "Building and shipping client projects across web stacks: UI implementation, APIs, integrations, and deployment. Collaborating directly with teams to scope features, iterate quickly, and deliver maintainable code.",
      tech: ["React", "Node.js", "TypeScript", "JavaScript", "Python", "REST APIs", "MongoDB", "Git"]
    }
  ],

  projects: [
    {
      name: "NenoPest-Control",
      description: "Developed nenopestcontrol.in using TypeScript, CSS, and JavaScript, increasing online inquiries by 40% within one month through targeted frontend improvements and streamlined customer service workflows. Implemented a user-centric interface and online booking system, raising customer satisfaction by 30% through responsive frontend features and automated backend processes.",
      tech: ["React.js", "Node.js", "TypeScript", "CSS", "AWS S3"],
      github: "https://github.com/param2412/nenopestcontrol",
      live: "https://www.nenopestcontrol.in",
      image: "📚",
      featured: false
    },
    {
      name: "AI Live Meeting Summarizer",
      description: "Built a real-time AI Meeting Assistant with Whisper, pyannote, and OpenAI API, achieving 86%+ transcription accuracy and 82%+ speaker accuracy on live multi-person meetings. Reduced meeting documentation time by 97% through instant speaker-tagged LLM summaries. Shipped a production Streamlit app with one-click export and email, saving teams 20+ hours per week and becoming the default for standups and client calls.",
      tech: ["Python", "Streamlit", "Numpy", "Pandas", "Scikit-Learn", "Whisper", "Pyannote", "OpenAI", "Machine Learning", "LLMs", "Model Training"],
      github: "https://github.com/Speech-Summarizer-Application-IF-SB/Param-Parikh",
      liveDemo: false,
      image: "🏙️",
      featured: true
    },
    {
      name: "Food_share",
      description: "The project aims to bridge the gap between surplus food providers, such as hotels and restaurants, and NGOs or volunteers who distribute food to those in need. It focuses on reducing food waste while addressing hunger in communities.",
      tech: ["React.js", "TailwindCSS", "JavaScript", "Express.js", "Node.js", "MongoDB", "JWT"],
      github: "https://github.com/param2412/FoodShare-Connect",
      live: "#",
      liveDemo: false,
      image: "💻",
      featured: true
    },
    {
      name: "fire_shakti",
      description: "The Fire NOC Online Portal simplifies the process of obtaining fire safety No Objection Certificates (NOCs). Designed with user-friendly features, it streamlines applications, tracking, and compliance for both individuals and organizations. This efficient platform enhances safety standards while ensuring transparency and convenience in fire safety management.",
      tech: ["React.js", "Node.js", "Express.js", "Python", "OCR", "Machine Learning", "JWT", "Cloudinary", "NodeMailer"],
      github: "https://github.com/param2412/FireDeptWebApp",
      live: "#",
      liveDemo: false,
      image: "💳",
      featured: true
    },
    {
      name: "AI-Website-Navigator-Guide",
      description: "Designed and deployed a website navigation tool (TypeScript.js, Next.js, Express.js, APIs) that leverages AI to simplify user journeys and enhance overall site usability.",
      tech: ["Typescript.js", "React.js", "Express.js", "APIs", "MongoDB"],
      github: "https://github.com/param2412/ai-website-navigator-guide",
      live: "https://ai-website-navigator-guide.vercel.app/",
      image: "☁️",
      featured: false
    },
    // {
    //   name: "TaskFlow Pro",
    //   description: "Project management app with Kanban boards, time tracking, and team analytics. Used by 500+ teams worldwide.",
    //   tech: ["React", "Express", "MongoDB", "Chart.js", "PWA"],
    //   github: "#",
    //   live: "#",
    //   image: "📋",
    //   featured: false
    // }
  ],

  education: [
    {
      degree: "B.Tech in Information Technology",
      institution: "A. D. Patel Institute Of Technology",
      period: "2023 – 2027",
      grade: "8.5 CGPA",
      description: "Data Structure and Algorithm, Computer Networks, Operating System, Database Management System, Software Engineering, Web Technology, Machine Learning etc."
    }
  ],

  // certifications: [
  //   "Smart India Hackathon - Internal Winner - 2024, 2025",
  //   "Google Cloud Professional Developer",
  //   "MongoDB Certified Developer",
  //   "Docker Certified Associate"
  // ],

  stats: [
    { label: "Projects Completed", value: "20+", icon: "🚀" },
    { label: "Years Experience", value: "3+", icon: "⚡" },
    { label: "Happy Clients", value: "10+", icon: "😊" },
    // { label: "GitHub Stars", value: "1.2K+", icon: "⭐" }
  ]
};
