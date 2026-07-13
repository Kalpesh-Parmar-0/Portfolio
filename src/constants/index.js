const navLinks = [
  {
    id: 1,
    name: "Projects",
    type: "finder",
  },
  {
    id: 3,
    name: "Contact",
    type: "contact",
  },
  {
    id: 4,
    name: "Resume",
    type: "resume",
  },
];

const navIcons = [
  {
    id: 1,
    img: "/icons/wifi.svg",
  },
  {
    id: 2,
    img: "/icons/search.svg",
  },
  {
    id: 3,
    img: "/icons/user.svg",
  },
  {
    id: 4,
    img: "/icons/mode.svg",
  },
];

const dockApps = [
  {
    id: "finder",
    name: "Portfolio", // was "Finder"
    icon: "finder.png",
    canOpen: true,
  },
  {
    id: "safari",
    name: "Education", // was "Safari"
    icon: "safari.png",
    canOpen: true,
  },
  {
    id: "photos",
    name: "Gallery", // was "Photos"
    icon: "photos.png",
    canOpen: true,
  },
  {
    id: "contact",
    name: "Contact", // or "Get in touch"
    icon: "contact.png",
    canOpen: true,
  },
  {
    id: "terminal",
    name: "Skills", // was "Terminal"
    icon: "terminal.png",
    canOpen: true,
  },
  {
    id: "trash",
    name: "Archive", // was "Trash"
    icon: "trash.png",
    canOpen: false,
  },
];

const educationHistory = [
  {
    id: 1,
    year: "2026",
    name: "Shantilal Shah Engineering College, Bhavnagar",
    speciality: "Graduation: B.E. in IT",
    percentage: "8.05 CGPA",
  },
  {
    id: 2,
    year: "2022",
    name: "The Imperial Science School, Dhoraji",
    speciality: "HSC: Science, A group",
    percentage: "71.33 %",
  },
  {
    id: 3,
    year: "2020",
    name: "Alfa High School, Khambhalia",
    speciality: "SSC",
    percentage: "81.5 %",
  },
];

const techStack = [
  {
    category: "Languages",
    items: ["JavaScript", "Python", "C"],
  },
  {
    category: "Frontend",
    items: ["React.js", "Redux Toolkit", "Tailwind CSS", "HTML/CSS"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Express.js", "REST APIs", "JWT Auth", "Flask"],
  },
  {
    category: "Database",
    items: ["MongoDB", "PostgreSQL", "MySQL"],
  },
  {
    category: "ML & Data Science",
    items: ["NumPy", "Pandas", "TensorFlow", "Scikit-learn", "Matplotlib"],
  },
  {
    category: "Dev Tools",
    items: ["Git", "GitHub", "Postman", "Docker"],
  },
];

const socials = [
  {
    id: 1,
    text: "Github",
    icon: "/icons/github.svg",
    bg: "#f4656b",
    link: "https://github.com/Kalpesh-Parmar-0",
  },
  {
    id: 3,
    text: "Twitter/X",
    icon: "/icons/twitter.svg",
    bg: "#ff866b",
    link: "https://x.com/kalpesh_000",
  },
  {
    id: 4,
    text: "LinkedIn",
    icon: "/icons/linkedin.svg",
    bg: "#05b6f6",
    link: "https://www.linkedin.com/in/kalpesh-parmar-797b04245",
  },
];

const photosLinks = [
  {
    id: 1,
    icon: "/icons/gicon1.svg",
    title: "Library",
  },
  {
    id: 2,
    icon: "/icons/gicon2.svg",
    title: "Memories",
  },
  {
    id: 3,
    icon: "/icons/file.svg",
    title: "Places",
  },
  {
    id: 4,
    icon: "/icons/gicon4.svg",
    title: "People",
  },
  {
    id: 5,
    icon: "/icons/gicon5.svg",
    title: "Favorites",
  },
];

const gallery = [
  {
    id: 1,
    img: "/images/kalpesh.jpeg",
  },
  {
    id: 2,
    img: "/images/kalpesh-2.jpg",
  },
  // {
  //   id: 3,
  //   img: "/images/kalpesh-3.jpg",
  // },
  {
    id: 4,
    img: "/images/kalpesh-4.jpg",
  },
];

export {
  navLinks,
  navIcons,
  dockApps,
  educationHistory,
  techStack,
  socials,
  photosLinks,
  gallery,
};

const WORK_LOCATION = {
  id: 1,
  type: "work",
  name: "Work",
  icon: "/icons/work.svg",
  kind: "folder",
  children: [
    // ▶ Project 1
    {
      id: 5,
      name: "Car Rental",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-10 left-5", // icon position inside Finder
      windowPosition: "top-[5vh] left-15", // optional: Finder window position
      children: [
        {
          id: 1,
          name: "Description.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-5 left-10",
          description: [
            "A two-sided car rental marketplace connecting renters and vehicle owners, with advanced filtering by brand, fuel type, seating capacity, and availability.",
            "Implemented JWT-based authentication and role-based authorization to secure renter and owner workflows, verified with Postman across role-based test scenarios.",
            "Built an end-to-end booking workflow with availability validation and owner controls, maintaining average API response times below 200ms.",
            "Structured MongoDB schemas and indexes to support sub-120ms search queries across the full vehicle catalog.",
            "Built with React, Node.js, Express.js, MongoDB, JWT, and Tailwind CSS.",
          ],
        },
        {
          id: 2,
          name: "Live link",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://car-rental-flax-zeta.vercel.app/",
          position: "top-10 right-20",
        },
        {
          id: 4,
          name: "Home Page",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          position: "top-52 right-80",
          imageUrl: "/images/car-rental.png",
        },
        // {
        //   id: 5,
        //   name: "Design.fig",
        //   icon: "/images/plain.png",
        //   kind: "file",
        //   fileType: "fig",
        //   href: "https://google.com",
        //   position: "top-60 right-20",
        // },
      ],
    },

    // ▶ Project 2
    {
      id: 6,
      name: "VideoTube",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-52 right-80",
      windowPosition: "top-[12vh] right-10",
      children: [
        {
          id: 1,
          name: "Description.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-5 right-10",
          description: [
            "A YouTube-style video platform handling upload, playback, subscriptions, comments, likes, and watch history, with lazy loading, pagination, and infinite scrolling.",
            "Implemented secure JWT authentication with automatic refresh-token rotation, supporting 7-day login sessions without forced re-logins.",
            "Centralized application state with Redux Toolkit and client-side caching, reducing unnecessary API requests and improving UI responsiveness.",
            "Built protected-route middleware and access control covering 8 endpoints, verified with 13 Postman API requests.",
            "Built with React, Redux Toolkit, Node.js, Express.js, MongoDB, JWT, and Cloudinary.",
          ],
        },
        {
          id: 2,
          name: "github link",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://github.com/Kalpesh-Parmar-0/VideoTube",
          position: "top-20 left-20",
        },
        {
          id: 4,
          name: "videotube.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          position: "top-52 left-80",
          imageUrl: "/images/video-tube.png",
        },
        // {
        //   id: 5,
        //   name: "Design.fig",
        //   icon: "/images/plain.png",
        //   kind: "file",
        //   fileType: "fig",
        //   href: "https://google.com",
        //   position: "top-60 left-5",
        // },
      ],
    },

    // ▶ Project 3
    {
      id: 7,
      name: "Brain Tumor Detection",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-10 left-80",
      windowPosition: "top-[48vh] right-10",
      children: [
        {
          id: 1,
          name: "Brain Tumor Detection.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-5 left-10",
          description: [
            "A deep learning system that classifies brain tumor types from MRI scans, built during a 3-month AI/ML internship at ADS Foundation, Gandhinagar.",
            "Trained a TensorFlow model with a VGG16 transfer-learning backbone on 7,200 MRI images, achieving 0.90 precision, 0.89 recall, and a 0.89 F1 score.",
            "Applied image preprocessing, augmentation, and transfer learning to improve generalization and reduce overfitting during training.",
            "Deployed the trained model behind a Flask REST API to enable image classification through a web interface.",
            "Built with Python, NumPy, Pandas, TensorFlow, Keras, and Scikit-learn.",
          ],
        },
        {
          id: 2,
          name: "github link",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://github.com/Kalpesh-Parmar-0/Brain-Tumor-Detection",
          position: "top-10 right-20",
        },
        {
          id: 4,
          name: "brain tumor.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          position: "top-52 right-80",
          imageUrl: "/images/brain-tumor.png",
        },
        // {
        //   id: 5,
        //   name: "Design.fig",
        //   icon: "/images/plain.png",
        //   kind: "file",
        //   fileType: "fig",
        //   href: "https://google.com",
        //   position: "top-60 right-20",
        // },
      ],
    },
  ],
};

const ABOUT_LOCATION = {
  id: 2,
  type: "about",
  name: "About me",
  icon: "/icons/info.svg",
  kind: "folder",
  children: [
    {
      id: 1,
      name: "me.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-10 left-5",
      imageUrl: "/images/kalpesh.jpeg",
    },
    {
      id: 2,
      name: "casual-me.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-28 right-72",
      imageUrl: "/images/kalpesh-2.jpg",
    },
    {
      id: 3,
      name: "conference-me.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-52 left-80",
      imageUrl: "/images/kalpesh-3.jpg",
    },
    {
      id: 4,
      name: "about-me.txt",
      icon: "/images/txt.png",
      kind: "file",
      fileType: "txt",
      position: "top-60 left-5",
      subtitle: "Meet the Developer Behind the Code",
      image: "/images/kalpesh.jpeg",
      description: [
        "Hey! I’m Kalpesh 👋, a full-stack developer who enjoys building sleek, interactive websites that actually work well.",
        "I specialize in JavaScript, React, Express and Node.js and I love making things feel smooth, fast, and just a little bit delightful.",
        "I've also spent time on the ML/data science side - training and deploying a deep learning model during an AI internship - so I'm just as comfortable reading a confusion matrix as I am debugging an API.",
        "I’m big on clean UI, good UX, and writing code that doesn’t need a search party to debug.",
        "Outside of dev work, you'll find me working on linux, using hyprland, or watching series I absolutely convinced myself I need to watch 😅",
      ],
    },
  ],
};

const RESUME_LOCATION = {
  id: 3,
  type: "resume",
  name: "Resume",
  icon: "/icons/file.svg",
  kind: "folder",
  children: [
    {
      id: 1,
      name: "Resume - Full Stack.pdf",
      icon: "/images/pdf.png",
      kind: "file",
      fileType: "pdf",
      resumeKey: "fullstack",
      href: "/files/resume-fullstack.pdf",
    },
    {
      id: 2,
      name: "Resume - ML & Data Science.pdf",
      icon: "/images/pdf.png",
      kind: "file",
      fileType: "pdf",
      resumeKey: "ml",
      href: "/files/resume-ml.pdf",
    },
  ],
};

const TRASH_LOCATION = {
  id: 4,
  type: "trash",
  name: "Trash",
  icon: "/icons/trash.svg",
  kind: "folder",
  children: [
    {
      id: 1,
      name: "trash1.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-10 left-10",
      imageUrl: "/images/trash-1.png",
    },
    {
      id: 2,
      name: "trash2.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-40 left-80",
      imageUrl: "/images/trash-2.png",
    },
  ],
};

export const locations = {
  work: WORK_LOCATION,
  about: ABOUT_LOCATION,
  resume: RESUME_LOCATION,
  trash: TRASH_LOCATION,
};

const INITIAL_Z_INDEX = 1000;

const DEFAULT_WINDOW_STATE = {
  isOpen: false,
  isMinimized: false,
  isMaximized: false,
  zIndex: INITIAL_Z_INDEX,
  data: null,
};

const WINDOW_CONFIG = {
  finder: { ...DEFAULT_WINDOW_STATE },
  contact: { ...DEFAULT_WINDOW_STATE },
  resume: { ...DEFAULT_WINDOW_STATE },
  safari: { ...DEFAULT_WINDOW_STATE },
  photos: { ...DEFAULT_WINDOW_STATE },
  terminal: { ...DEFAULT_WINDOW_STATE },
  txtfile: { ...DEFAULT_WINDOW_STATE },
  imgfile: { ...DEFAULT_WINDOW_STATE },
};

export { INITIAL_Z_INDEX, WINDOW_CONFIG };
