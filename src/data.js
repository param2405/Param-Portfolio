// Single source of truth for the portfolio.
// Content is drawn from two resumes: Software (sde) and AI/ML (ai).
// Anything with { sde, ai } changes when the visitor flips the mode switch.

export const profile = {
  name: 'Param Parikh',
  first: 'Param',
  last: 'Parikh',
  email: 'paramworkparikh80@gmail.com',
  phone: '+91 90992 78738',
  location: 'Gujarat, India',
  github: 'https://github.com/param2405',
  linkedin: 'https://www.linkedin.com/in/param-parikh-714030277/',
  leetcode: 'https://leetcode.com/u/param2412/',
  resume: {
    sde: '/Param-Parikh-SDE-Resume.pdf',
    ai: '/Param-Parikh-AIML-Resume.pdf',
  },
};

export const modes = {
  sde: {
    key: 'sde',
    label: 'Software',
    role: 'Software Engineer',
    verb: 'reliable full-stack products',
    status: 'Open to SDE internships & full-time roles',
    blurb:
      'I build end-to-end web products with React, Node.js and Express — from the API and the database to the pixel on the screen — and I work directly with clients to ship what they actually need.',
  },
  ai: {
    key: 'ai',
    label: 'AI / ML',
    role: 'AI / ML Engineer',
    verb: 'intelligent ML systems',
    status: 'Open to AI/ML internships & full-time roles',
    blurb:
      'I build applied AI systems — RAG pipelines, LLM agents with LangGraph, anomaly detection and speech models — and take them all the way to something people can run, not just a notebook.',
  },
};

export const stats = {
  sde: [
    { value: '3', label: 'internships shipped' },
    { value: '40%', label: 'more client inquiries (Neno)' },
    { value: '8.64', label: 'CGPA · B.Tech IT' },
    { value: 'Top 20', label: 'of 300+ teams · DA-IICT' },
  ],
  ai: [
    { value: '99.44%', label: 'severity-classification accuracy' },
    { value: '93%', label: 'faster incident resolution' },
    { value: '97%', label: 'less meeting-documentation time' },
    { value: '8.64', label: 'CGPA · B.Tech IT' },
  ],
};

export const about = {
  sde: [
    "I'm a B.Tech Information Technology student at A. D. Patel Institute of Technology (CGPA 8.64) who likes shipping real things for real users.",
    "Across three internships I've built full-stack client websites, an expense-tracking app with analytics dashboards, and an AI meeting summarizer — handling requirements, daily client updates and the feedback loop myself.",
    'I care about clean REST APIs, reusable components and interfaces that work on every screen size.',
  ],
  ai: [
    "I'm a B.Tech Information Technology student at A. D. Patel Institute of Technology (CGPA 8.64) focused on applied machine learning and generative AI.",
    'I like the full arc of an ML system: preprocessing and feature engineering, model evaluation, retrieval with embeddings and vector search, and wrapping it in FastAPI, Docker and Terraform so it actually runs.',
    'Recent work: an AIOps platform that cut incident resolution from ~45 min to under 3, and a RAG-based medical report analyzer.',
  ],
};

export const experience = [
  {
    role: 'Software Developer Intern',
    company: 'Logic Minds by Parii',
    period: 'Apr 2026 — Jun 2026',
    hash: 'f3a91c2',
    branch: 'main',
    focus: ['sde'],
    bullets: {
      sde: [
        'Developed end-to-end full-stack client websites using React.js, Node.js and Express.js, integrating RESTful APIs and database operations.',
        'Owned client communication and requirements gathering, shared daily progress updates and turned feedback into shipped features.',
      ],
      ai: [
        'Improved web application functionality by developing and integrating RESTful APIs and implementing backend features.',
        'Supported code maintainability through modular implementation and Git-based collaboration.',
      ],
    },
    tags: ['React.js', 'Node.js', 'Express.js', 'REST APIs', 'MongoDB'],
  },
  {
    role: 'AI/ML Intern',
    company: 'Infosys Springboard',
    period: 'Sep 2025 — Nov 2025',
    hash: '7be04d9',
    branch: 'ml',
    focus: ['ai'],
    bullets: {
      sde: [
        'Improved meeting-review efficiency by up to 50% by building an AI-powered meeting summarizer with Python, Whisper, GPT and NLP.',
        'Handled data preprocessing and language-model integration for a solution targeting 1,000+ potential users, in an Agile team.',
      ],
      ai: [
        'Improved meeting-review efficiency by up to 50% with a Python AI meeting summarizer using Whisper, GPT and NLP for transcription and summarization.',
        'Owned data preprocessing and language-model integration for a solution targeting 1,000+ potential users, working with mentors in an Agile team.',
      ],
    },
    tags: ['Python', 'Whisper', 'GPT', 'NLP', 'pyannote', 'Streamlit'],
  },
  {
    role: 'Software Developer Intern',
    company: 'P & D Technology',
    period: 'Jan 2025 — Aug 2025',
    hash: '2c8e5a0',
    branch: 'main',
    focus: ['sde'],
    bullets: {
      sde: [
        'Developed a full-stack expense-tracking application with React, Node.js and MongoDB, with interactive dashboards for monthly analytics.',
        'Collaborated with a remote team using Git and Agile to coordinate implementation and keep code quality high.',
      ],
      ai: [
        'Developed a full-stack expense-tracking application using React, Node.js and MongoDB.',
        'Enabled monthly expense tracking and analytics through interactive dashboards backed by application data.',
      ],
    },
    tags: ['React', 'Node.js', 'MongoDB', 'Git', 'Agile'],
  },
];

export const projects = [
  {
    id: 'opspilot',
    name: 'OpsPilot AI',
    kicker: 'Intelligent AIOps & cloud incident resolution',
    year: 'Sep — Oct 2026',
    kind: ['ai'],
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
    id: 'brandincept',
    name: 'Brandincept',
    kicker: 'Corporate leasing & franchise advisory — client site',
    year: 'Mar 2026',
    kind: ['sde'],
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
    live: 'https://brandincept-frontend.vercel.app',
    github: 'https://github.com/param2405/brandincept-frontend',
  },
  {
    id: 'medintel',
    name: 'MedIntel',
    kicker: 'AI medical report analyzer',
    year: 'Jun 2026',
    kind: ['ai'],
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
    kind: ['ai', 'sde'],
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
    id: 'neno',
    name: 'Neno Pest-Control',
    kicker: 'Client website with online booking',
    year: 'Aug 2025',
    kind: ['sde'],
    visual: 'browser',
    metrics: [
      { value: '+40%', label: 'online inquiries in one month' },
      { value: '+30%', label: 'customer satisfaction' },
    ],
    bullets: [
      'Built the client’s website with TypeScript, JavaScript and CSS, focusing on frontend usability.',
      'Responsive interface, an online booking system and streamlined customer workflows (results as reported by the client).',
    ],
    tech: ['TypeScript', 'JavaScript', 'CSS', 'React'],
    live: 'https://nenopestcontrol.in',
    github: 'https://github.com/param2405/nenopestcontrol',
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

// Periodic table of skills. `m` = which mode(s) it's most relevant to.
export const skillGroups = [
  { key: 'lang', name: 'Languages' },
  { key: 'web', name: 'Web' },
  { key: 'ml', name: 'AI / ML' },
  { key: 'genai', name: 'Generative AI' },
  { key: 'data', name: 'Data & Cloud' },
  { key: 'ops', name: 'DevOps & Tools' },
];

export const skills = [
  { s: 'Py', n: 'Python', g: 'lang', m: ['ai', 'sde'] },
  { s: 'Js', n: 'JavaScript', g: 'lang', m: ['sde', 'ai'] },
  { s: 'Ts', n: 'TypeScript', g: 'lang', m: ['sde', 'ai'] },
  { s: 'C', n: 'C', g: 'lang', m: ['sde'] },
  { s: 'C+', n: 'C++', g: 'lang', m: ['sde'] },

  { s: 'Re', n: 'React.js', g: 'web', m: ['sde'] },
  { s: 'No', n: 'Node.js', g: 'web', m: ['sde'] },
  { s: 'Ex', n: 'Express.js', g: 'web', m: ['sde'] },
  { s: 'Ht', n: 'HTML / CSS', g: 'web', m: ['sde'] },
  { s: 'Fa', n: 'FastAPI', g: 'web', m: ['ai'] },
  { s: 'Fl', n: 'Flask', g: 'web', m: ['ai', 'sde'] },
  { s: 'Dj', n: 'Django', g: 'web', m: ['ai', 'sde'] },
  { s: 'Ap', n: 'REST APIs', g: 'web', m: ['sde', 'ai'] },

  { s: 'Ml', n: 'Machine Learning', g: 'ml', m: ['ai'] },
  { s: 'Dl', n: 'Deep Learning', g: 'ml', m: ['ai'] },
  { s: 'Nl', n: 'NLP', g: 'ml', m: ['ai', 'sde'] },
  { s: 'Pt', n: 'PyTorch', g: 'ml', m: ['ai'] },
  { s: 'Sk', n: 'Scikit-learn', g: 'ml', m: ['ai', 'sde'] },
  { s: 'Xg', n: 'XGBoost', g: 'ml', m: ['ai'] },
  { s: 'Np', n: 'NumPy / Pandas', g: 'ml', m: ['ai', 'sde'] },
  { s: 'Fe', n: 'Feature Engineering', g: 'ml', m: ['ai'] },

  { s: 'Ll', n: 'LLMs', g: 'genai', m: ['ai'] },
  { s: 'Rg', n: 'RAG', g: 'genai', m: ['ai'] },
  { s: 'Lg', n: 'LangGraph', g: 'genai', m: ['ai'] },
  { s: 'Em', n: 'Embeddings', g: 'genai', m: ['ai'] },
  { s: 'Vs', n: 'Vector Search', g: 'genai', m: ['ai'] },
  { s: 'Pe', n: 'Prompt Engineering', g: 'genai', m: ['ai', 'sde'] },
  { s: 'Hf', n: 'Hugging Face', g: 'genai', m: ['ai', 'sde'] },
  { s: 'St', n: 'Streamlit', g: 'genai', m: ['ai'] },

  { s: 'Mg', n: 'MongoDB', g: 'data', m: ['sde', 'ai'] },
  { s: 'Pg', n: 'PostgreSQL', g: 'data', m: ['sde', 'ai'] },
  { s: 'Pv', n: 'pgvector', g: 'data', m: ['ai'] },
  { s: 'Sq', n: 'MySQL', g: 'data', m: ['sde', 'ai'] },
  { s: 'Aw', n: 'AWS', g: 'data', m: ['sde', 'ai'] },

  { s: 'Dk', n: 'Docker', g: 'ops', m: ['sde', 'ai'] },
  { s: 'Tf', n: 'Terraform', g: 'ops', m: ['ai'] },
  { s: 'Gt', n: 'Git / GitHub', g: 'ops', m: ['sde', 'ai'] },
  { s: 'Pm', n: 'Postman', g: 'ops', m: ['sde'] },
  { s: 'Vc', n: 'Vercel / Render', g: 'ops', m: ['sde', 'ai'] },
  { s: 'N8', n: 'n8n', g: 'ops', m: ['sde', 'ai'] },
  { s: 'Cu', n: 'Cursor / Claude', g: 'ops', m: ['sde', 'ai'] },
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
