// Single source of truth for the portfolio.
// One combined profile: AI/ML, GenAI & Data Science first, full-stack engineering alongside.

export const profile = {
  name: 'Param Parikh',
  email: 'paramworkparikh80@gmail.com',
  phone: '+91 90992 78738',
  github: 'https://github.com/param2405',
  linkedin: 'https://www.linkedin.com/in/param-parikh-714030277/',
  leetcode: 'https://leetcode.com/u/param2412/',
  resume: '/Param-Parikh-Resume.pdf',
  role: 'AI / ML & Software Engineer',
  status: 'Open to AI/ML, GenAI, Data Science & SDE roles',
  // The hero line cycles through these.
  verbs: ['intelligent ML systems', 'GenAI & RAG pipelines', 'data-driven products', 'reliable full-stack apps'],
};

export const stats = [
  { value: '99.44%', label: 'severity-classification accuracy' },
  { value: '93%', label: 'faster incident resolution' },
  { value: '3', label: 'internships · AI/ML + software' },
  { value: '8.64', label: 'CGPA · B.Tech IT' },
];

export const about = [
  "I'm a B.Tech Information Technology student at A. D. Patel Institute of Technology (CGPA 8.64), focused on applied machine learning, generative AI and data science.",
  'I like the full arc of an ML system: data preprocessing and feature engineering, model training and evaluation, retrieval with embeddings and vector search, LLM agents with LangGraph, and wrapping it all in FastAPI, Docker and Terraform so it actually runs.',
  "Three internships across AI/ML and full-stack development taught me the other half: clean REST APIs, React front-ends and working directly with clients. I build AI that ships as a real product, not just a notebook.",
];

export const experience = [
  {
    role: 'Software Developer Intern',
    company: 'Logic Minds by Parii',
    period: 'Apr 2026 — Jun 2026',
    hash: 'f3a91c2',
    branch: 'web',
    bullets: [
      'Developed end-to-end full-stack client websites using React.js, Node.js and Express.js, integrating RESTful APIs and database operations.',
      'Owned client communication and requirements gathering, shared daily progress updates and turned feedback into shipped features.',
    ],
    tags: ['React.js', 'Node.js', 'Express.js', 'REST APIs', 'MongoDB'],
  },
  {
    role: 'AI/ML Intern',
    company: 'Infosys Springboard',
    period: 'Sep 2025 — Nov 2025',
    hash: '7be04d9',
    branch: 'ml',
    bullets: [
      'Improved meeting-review efficiency by up to 50% with a Python AI meeting summarizer using Whisper, GPT and NLP for automated transcription and summarization.',
      'Owned data preprocessing and language-model integration for a solution targeting 1,000+ potential users, working with mentors in an Agile team.',
    ],
    tags: ['Python', 'Whisper', 'GPT', 'NLP', 'pyannote', 'Streamlit'],
  },
  {
    role: 'Software Developer Intern',
    company: 'P & D Technology',
    period: 'Jan 2025 — Aug 2025',
    hash: '2c8e5a0',
    branch: 'web',
    bullets: [
      'Developed a full-stack expense-tracking application with React, Node.js and MongoDB, with interactive dashboards for monthly expense analytics.',
      'Collaborated with a remote team using Git and Agile to coordinate implementation and keep code quality high.',
    ],
    tags: ['React', 'Node.js', 'MongoDB', 'Git', 'Agile'],
  },
];

export const projects = [
  {
    id: 'opspilot',
    name: 'OpsPilot AI',
    kicker: 'Intelligent AIOps & cloud incident resolution',
    year: 'Sep — Oct 2026',
    kind: 'AI / ML',
    visual: 'pipeline',
    metrics: [
      { value: '93%', label: 'faster resolution · ~45 min → <3 min' },
      { value: '99.44%', label: 'severity-classification accuracy' },
      { value: '1.0000', label: 'ROC-AUC (reported eval)' },
    ],
    bullets: [
      'A 12-step incident-detection and root-cause-analysis pipeline built with FastAPI, XGBoost, PyTorch and LangGraph.',
      'Log-anomaly detection plus RAG-based, human-approved remediation on pgvector, deployed with AWS, Terraform and Docker.',
    ],
    tech: ['FastAPI', 'XGBoost', 'PyTorch', 'LangGraph', 'pgvector', 'AWS', 'Terraform', 'Docker'],
    github: 'https://github.com/param2405/OpsPilot---AI-Intelligent-AIOps-Cloud-Incident-Resolution-Platform',
  },
  {
    id: 'medintel',
    name: 'MedIntel',
    kicker: 'AI medical report analyzer',
    year: 'Jun 2026',
    kind: 'GenAI · RAG',
    visual: 'rag',
    metrics: [
      { value: '90%', label: 'less information-retrieval time' },
      { value: '80%', label: 'faster report processing' },
    ],
    bullets: [
      'OCR with PyTesseract and PyMuPDF, SentenceTransformers embeddings and FAISS for semantic search over medical reports.',
      'A RAG pipeline in Flask + Streamlit that retrieves the right passages and generates plain-language summaries.',
    ],
    tech: ['PyTesseract', 'SentenceTransformers', 'FAISS', 'Flask', 'PyMuPDF', 'Streamlit'],
    github: 'https://github.com/param2405/MedIntel-AI-Medical-Report-Analyzer',
  },
  {
    id: 'meeting',
    name: 'AI Live Meeting Summarizer',
    kicker: 'Speaker-aware transcripts & LLM summaries',
    year: 'Sep — Nov 2025',
    kind: 'AI / ML · NLP',
    visual: 'wave',
    metrics: [
      { value: '97%', label: 'less documentation time' },
      { value: '86%+', label: 'transcription accuracy' },
      { value: '82%+', label: 'speaker-identification accuracy' },
    ],
    bullets: [
      'Whisper + pyannote + the OpenAI API turn multi-speaker recordings into speaker-labelled transcripts and summaries.',
      'A runnable Streamlit app with one-click summary export and email integration for follow-ups.',
    ],
    tech: ['Python', 'Whisper', 'pyannote', 'OpenAI API', 'Streamlit'],
    github: 'https://github.com/Speech-Summarizer-Application-IF-SB/Param-Parikh',
  },
  {
    id: 'brandincept',
    name: 'Brandincept',
    kicker: 'Corporate leasing & franchise advisory — client site',
    year: 'Mar 2026',
    kind: 'Full-stack',
    visual: 'browser',
    metrics: [
      { value: 'Live', label: 'in production for a real client' },
      { value: 'MERN', label: 'React · Node · Express · MongoDB' },
    ],
    bullets: [
      'A corporate website showcasing company services, brand identity and business offerings, built with React.js, Node.js, Express.js and MongoDB.',
      'Responsive interface, reusable components and backend workflows tailored to the client’s requirements.',
    ],
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB'],
    live: 'https://brandincept.com/',
    shot: '/projects/brandincept.webp',
    github: 'https://github.com/DevanshPrajapati28/brandincept-backend',
  },
  {
    id: 'neno',
    name: 'Neno Pest-Control',
    kicker: 'Client website with online booking',
    year: 'Aug 2025',
    kind: 'Full-stack',
    visual: 'booking',
    metrics: [
      { value: '+40%', label: 'online inquiries in one month' },
      { value: '+30%', label: 'customer satisfaction' },
    ],
    bullets: [
      'Built the client’s website with TypeScript, JavaScript and CSS, focusing on frontend usability.',
      'Responsive interface, an online booking system and streamlined customer workflows (results as reported by the client).',
    ],
    tech: ['TypeScript', 'JavaScript', 'CSS', 'React'],
    github: 'https://github.com/param2412/nenopestcontrol',
  },
];

export const archive = [
  {
    name: 'FoodShare Connect',
    note: 'Connects surplus food from hotels & restaurants with NGOs and volunteers.',
    tech: 'React · Express · MongoDB · JWT',
    href: 'https://github.com/param2405/FoodShare-Connect',
  },
  {
    name: 'Fire Shakti',
    note: 'Online Fire NOC portal — applications, tracking and compliance, with OCR.',
    tech: 'React · Node · Python · OCR',
    href: 'https://github.com/param2405/FireDeptWebApp',
  },
  {
    name: 'AI Website Navigator',
    note: 'An AI guide that simplifies user journeys through a website.',
    tech: 'TypeScript · React · Express',
    href: 'https://github.com/param2405/ai-website-navigator-guide',
  },
];

// Periodic table of skills. `f: true` = core focus (AI/ML, GenAI, Data Science) — these glow.
export const skillGroups = [
  { key: 'lang', name: 'Languages' },
  { key: 'ml', name: 'AI / ML & Data Science' },
  { key: 'genai', name: 'Generative AI' },
  { key: 'web', name: 'Backend & Web' },
  { key: 'data', name: 'Data & Cloud' },
  { key: 'ops', name: 'DevOps & Tools' },
];

export const skills = [
  { s: 'Py', n: 'Python', g: 'lang', f: true },
  { s: 'Ts', n: 'TypeScript', g: 'lang' },
  { s: 'Js', n: 'JavaScript', g: 'lang' },
  { s: 'C+', n: 'C / C++', g: 'lang' },

  { s: 'Ml', n: 'Machine Learning', g: 'ml', f: true },
  { s: 'Dl', n: 'Deep Learning', g: 'ml', f: true },
  { s: 'Nl', n: 'NLP', g: 'ml', f: true },
  { s: 'Pt', n: 'PyTorch', g: 'ml', f: true },
  { s: 'Sk', n: 'Scikit-learn', g: 'ml', f: true },
  { s: 'Xg', n: 'XGBoost', g: 'ml', f: true },
  { s: 'Np', n: 'NumPy / Pandas', g: 'ml', f: true },
  { s: 'Fe', n: 'Feature Engineering', g: 'ml', f: true },
  { s: 'Me', n: 'Model Evaluation', g: 'ml', f: true },
  { s: 'Mp', n: 'Matplotlib / Seaborn', g: 'ml', f: true },

  { s: 'Ll', n: 'LLMs', g: 'genai', f: true },
  { s: 'Rg', n: 'RAG', g: 'genai', f: true },
  { s: 'Lg', n: 'LangGraph', g: 'genai', f: true },
  { s: 'Em', n: 'Embeddings', g: 'genai', f: true },
  { s: 'Vs', n: 'Vector / Semantic Search', g: 'genai', f: true },
  { s: 'Pe', n: 'Prompt Engineering', g: 'genai', f: true },
  { s: 'Hf', n: 'Hugging Face', g: 'genai', f: true },
  { s: 'St', n: 'Streamlit', g: 'genai', f: true },

  { s: 'Fa', n: 'FastAPI', g: 'web', f: true },
  { s: 'Fl', n: 'Flask', g: 'web' },
  { s: 'Dj', n: 'Django', g: 'web' },
  { s: 'Re', n: 'React.js', g: 'web' },
  { s: 'No', n: 'Node.js', g: 'web' },
  { s: 'Ex', n: 'Express.js', g: 'web' },
  { s: 'Ap', n: 'REST APIs', g: 'web' },

  { s: 'Pv', n: 'pgvector', g: 'data', f: true },
  { s: 'Pg', n: 'PostgreSQL', g: 'data' },
  { s: 'Mg', n: 'MongoDB', g: 'data' },
  { s: 'Sq', n: 'MySQL', g: 'data' },
  { s: 'Aw', n: 'AWS', g: 'data' },

  { s: 'Dk', n: 'Docker', g: 'ops' },
  { s: 'Tf', n: 'Terraform', g: 'ops' },
  { s: 'Gt', n: 'Git / GitHub', g: 'ops' },
  { s: 'Pm', n: 'Postman', g: 'ops' },
  { s: 'Vc', n: 'Vercel / Render', g: 'ops' },
  { s: 'N8', n: 'n8n', g: 'ops' },
  { s: 'Cu', n: 'Cursor / Claude', g: 'ops' },
];

export const core = ['Data Structures & Algorithms', 'OOP', 'DBMS', 'Team Leadership', 'Communication'];

export const achievements = [
  {
    big: '#1',
    of: 'of 100 teams',
    title: 'Smart India Hackathon 2024–25',
    note: 'Team Lead — won the internal hackathon.',
  },
  {
    big: 'Top 20',
    of: 'of 300+ teams',
    title: 'DA-IICT Hackathon 2024 & 2025',
    note: 'Ranked in the top 20 two years running.',
  },
  {
    big: 'Top 500',
    of: 'of 25,000 startups',
    title: 'Eureka 2024 · IIT Bombay',
    note: 'Selected among the top 500 startups.',
  },
];

export const education = {
  school: 'A. D. Patel Institute of Technology',
  degree: 'B.Tech in Information Technology',
  period: 'Jun 2023 — Present',
  grade: '8.64 / 10',
};
