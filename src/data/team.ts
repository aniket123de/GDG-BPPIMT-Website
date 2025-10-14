// Organizer
import ProtyoyPic from "../assets/Profile image/Protyoy.jpeg";

// AI/ML Team
import SamimaPic from "../assets/Profile image/photo - Samima Nasrin.jpeg";
import ParthitaPic from "../assets/Profile image/IMG_20251008_191600_672_-_PARTHITA_CSE3086.jpg";
import SayanPic from "../assets/Profile image/IMG_20240620_114242 - Sayan Jana.jpg";
import SinjiniPic from "../assets/Profile image/WhatsApp Image 2025-10-08 at 8.43.33 PM - Sinjini Ghosal.jpeg";
import RaktikPic from "../assets/Profile image/photo - Raktik Ghosh.jpg";
import KomalPic from "../assets/Profile image/SAVE_20250903_224926 - Komal Team - Littlespark.jpg";
import SandipanPic from "../assets/Profile image/Screenshot 2025-10-09 233717 - SANDIPAN CSE3123.png";

// Cloud Team
import SagnikNayekPic from "../assets/Profile image/jpg_pic_-_Sagnik_Nayek.jpg";
import DebolinaPic from "../assets/Profile image/IMG_20251008_022515_130 - Debolina.webp";
import AaryanPic from "../assets/Profile image/IMG-20251008-WA0016 - Aaryan Kumar.jpg";
import SaikatPic from "../assets/Profile image/ssss_-_Saikat_Mondal.jpg";
import AmbishPic from "../assets/Profile image/Profile_pic - Ambrish Tiwari.png";
import KingshukPic from "../assets/Profile image/IMG_20251003_021557 - KINGSHUK ADHIKARI CSE4162.jpg";
import SantorshiPic from "../assets/Profile image/IMG-20250823-WA0076 - Santorshi Ghosh.jpg";
import PranoyPic from "../assets/Profile image/my_pfp_2_-_Pranoy_Paul.jpg";

// Design Team
import PriyashaPic from "../assets/Profile image/20250926_122536_1_-_PRIYASHA_CSE3095.jpg";
import DebopriyaPic from "../assets/Profile image/20250927_144618_-_DEBOPRIYA_MULLICK.jpg";
import SuchetaPic from "../assets/Profile image/IMG_20251009_220636 - Sucheta.jpg";
import GauravPic from "../assets/Profile image/IMG-20250619-WA0003(1) - Gaurav Kumar.jpg";
import OliviaPic from "../assets/Profile image/me pink - OLIVIA SIKDER.jpg";
import AniketGhoshPic from "../assets/Profile image/1000223869 - Aniket Ghosh.jpg";
import ShreyaPic from "../assets/Profile image/IMG_20241209_203810 - Shreya Jha.jpg";

// Management Team
import AharnaPic from "../assets/Profile image/PXL_20240712_083420696.MP - AHARNA CHATTERJEE.jpg";
import RahulPic from "../assets/Profile image/IMG20250619134603-1 - Rahul Kumar.jpg";
import SnehaPatraPic from "../assets/Profile image/pfp - Sneha Patra.jpg";
import AnkitaGiriPic from "../assets/Profile image/IMG-20251008-WA0016 - Ankita Giri.jpg";
import HimobantaPic from "../assets/Profile image/IMG-20251006-WA0010 - Himobanta Dutta.jpg";
import DevashiPic from "../assets/Profile image/Devashi_Photo - Devashi Mishra.jpg";
import AnkitaAmanPic from "../assets/Profile image/IMG_20241120_103411_579 - Ankita Aman.webp";
import PranayPic from "../assets/Profile image/Untitled design (7) - Pranay Chatterjee.png";

// Marketing Team
import AdrishPic from "../assets/Profile image/IMG_20251007_233205 - Adrish Basak.jpg";
import AadiptoPic from "../assets/Profile image/my pic - Aadipto Ghosh.jpg";
import SushilPic from "../assets/Profile image/IMG-20250703-WA0043 - Sushil Sharma.jpg";
import JunaidPic from "../assets/Profile image/IMG_20251008_093658 - Junaid Mollah.jpg";
import AniketDePic from "../assets/Profile image/WhatsApp_Image_2025-10-08_at_10.59.04_-_Aniket_De.jpg";
import SnehaRoyPic from "../assets/Profile image/SNEHA - Usuf Shaikh.jpg";

// Tech Team
import PriyunshuPic from "../assets/Profile image/20251006_120753 - Sunlight.jpg";
import OwaisPic from "../assets/Profile image/Screenshot_20251007_232103_Gallery - Md Owais Farhan Akhter.jpg";
import SagnikMaitraPic from "../assets/Profile image/GDG PFP - Sagnik Maitra.jpg";
import WasimPic from "../assets/Profile image/IMG_20241213_195723 - Wasim Showan.jpg";
import SubhroPic from "../assets/Profile image/IMG_20251007_232200 - Subhro Maitra.jpg";
import AnikPic from "../assets/Profile image/anik-paul.jpg";
import OotsoPic from "../assets/Profile image/IMG_20231016_091948_379 - Ootso Dhar chowdhury.jpg";

export interface TeamMemberData {
  MemberName: string;
  Role: string;
  Image: any;
  GithubLink: string;
  LinkedinLink: string;
  Bio?: string;
  isCore?: boolean;
}

export const teamMembers: TeamMemberData[] = [
  // Organizer
  {
    MemberName: "Protyoy Bhandary",
    Role: "GDG OnCampus Organizer",
    Image: ProtyoyPic,
    GithubLink: "https://github.com/protyoy",
    LinkedinLink: "https://www.linkedin.com/in/protyoy-bhandary/",
    isCore: true,
  },

  // Tech Team Lead
  {
    MemberName: "Anik Paul",
    Role: "Tech Team Lead",
    Image: AnikPic,
    GithubLink: "https://github.com/Anik-Paul-toj",
    LinkedinLink: "https://www.linkedin.com/in/anik-paul/",
    Bio: "Computer science enthusiast driven by curiosity and creativity.Building, breaking, and learning every day",
    isCore: true,
  },

  // Marketing Team Lead
  {
    MemberName: "Aniket De",
    Role: "Marketing Team Lead",
    Image: AniketDePic,
    GithubLink: "https://github.com/aniket",
    LinkedinLink: "https://www.linkedin.com/in/aniket-de/",
    Bio: "Just a CS Normie stuck between CTRL+C & CTRL+V",
    isCore: true,
  },

  // AI/ML Team Lead
  {
    MemberName: "Parthita Chattopadhyay",
    Role: "AI/ML Team Lead",
    Image: ParthitaPic,
    GithubLink: "https://github.com/parthita",
    LinkedinLink: "https://www.linkedin.com/in/parthita-chattopadhyay/",
    Bio: "Engineering student who likes building stuff that actually works. Mostly into AI, coding, and figuring out how things run behind the scenes.",
    isCore: true,
  },

  // Cloud Team Lead
  {
    MemberName: "Saikat Mondal",
    Role: "Cloud Team Lead",
    Image: SaikatPic,
    GithubLink: "https://github.com/saikat",
    LinkedinLink: "https://www.linkedin.com/in/saikat-mondal/",
    Bio: "I'm a Computer Science student passionate about Cloud Computing, AI, and modern web technologies. As the Cloud Team Lead at GDG on campus, I aim to explore scalable cloud solutions and guide peers in building real-world cloud-based applications",
    isCore: true,
  },

  // Design Team Lead
  {
    MemberName: "Debopriya Mullick",
    Role: "Design Team Lead",
    Image: DebopriyaPic,
    GithubLink: "https://github.com/debopriya",
    LinkedinLink: "https://www.linkedin.com/in/debopriya-mullick/",
    Bio: "Creative by instinct, coder by ambition, and slightly addicted to Caffeine and night coding ✨",
    isCore: true,
  },

  // Management Team Lead
  {
    MemberName: "Sneha Patra",
    Role: "Management Team Lead",
    Image: SnehaPatraPic,
    GithubLink: "https://github.com/sneha",
    LinkedinLink: "https://www.linkedin.com/in/sneha-patra/",
    Bio: "I'm Sneha Patra, a cse undergrad, part of the GDG management team, blending teamwork and communication with a dash of tech! Always up for learning, building, and creating impact together.",
    isCore: true,
  },

  {
    MemberName: "Samima Nasrin",
    Role: "AI/ML Team - Core Member",
    Image: SamimaPic,
    GithubLink: "https://github.com/samima",
    LinkedinLink: "https://www.linkedin.com/in/samima-nasrin/",
    Bio: "Passionate tech enthusiast with a deep interest in AI/ML. I enjoy building practical tech solutions and learning how intelligent systems work.",
    isCore: true,
  },
  {
    MemberName: "Komal Kumari",
    Role: "AI/ML Team - Core Member",
    Image: KomalPic,
    GithubLink: "https://github.com/komal",
    LinkedinLink: "https://www.linkedin.com/in/komal-kumari/",
    Bio: "I'm an ECE student passionate about AI, IoT, and innovation. I love creating tech solutions that make an impact and learning through collaboration.",
    isCore: true,
  },
  {
    MemberName: "Sandipan Nayek",
    Role: "AI/ML Team - Core Member",
    Image: SandipanPic,
    GithubLink: "https://github.com/sandipan",
    LinkedinLink: "https://www.linkedin.com/in/sandipan-nayek/",
    Bio: "I am currently in 3rd year of my college journey in CSE stream. Trying to make some presence in the Machine Learning domain.",
    isCore: true,
  },
  {
    MemberName: "Sayan Jana",
    Role: "AI/ML Team - Junior Member",
    Image: SayanPic,
    GithubLink: "https://github.com/sayan",
    LinkedinLink: "https://www.linkedin.com/in/sayan-jana/",
    Bio: "Focused and Professional. Driven AI/ML enthusiast and aspiring technologist passionate about building intelligent systems.",
    isCore: false,
  },
  {
    MemberName: "Sinjini Ghosal",
    Role: "AI/ML Team - Junior Member",
    Image: SinjiniPic,
    GithubLink: "https://github.com/sinjini",
    LinkedinLink: "https://www.linkedin.com/in/sinjini-ghosal/",
    Bio: "Second-year Computer Science student with a focus on Artificial Intelligence and Machine Learning. Active junior member of the AIML team at GDG, with three completed projects demonstrating applied technical expertise.",
    isCore: false,
  },
  {
    MemberName: "Raktik Ghosh",
    Role: "AI/ML Team - Junior Member",
    Image: RaktikPic,
    GithubLink: "https://github.com/raktik",
    LinkedinLink: "https://www.linkedin.com/in/raktik-ghosh/",
    Bio: "A passionate learner exploring the world of technology, innovation, and self-growth. Always curious, always building something new.",
    isCore: false,
  },

  // Cloud Team - Core Members
  {
    MemberName: "Sagnik Nayek",
    Role: "Cloud Team - Core Member",
    Image: SagnikNayekPic,
    GithubLink: "https://github.com/sagniknayek",
    LinkedinLink: "https://www.linkedin.com/in/sagnik-nayek/",
    Bio: "Everything is possible",
    isCore: true,
  },
  {
    MemberName: "Ambrish Tiwari",
    Role: "Cloud Team - Core Member",
    Image: AmbishPic,
    GithubLink: "https://github.com/ambrish",
    LinkedinLink: "https://www.linkedin.com/in/ambrish-tiwari/",
    Bio: "I'm Ambrish, a curious learner who enjoys exploring technology and solving problems through logic and creativity. I love working on projects that involve data, design, and discovery.",
    isCore: true,
  },
  {
    MemberName: "Pranoy Paul",
    Role: "Cloud Team - Core Member",
    Image: PranoyPic,
    GithubLink: "https://github.com/pranoy",
    LinkedinLink: "https://www.linkedin.com/in/pranoy-paul/",
    Bio: "Aspiring DevOps engineer exploring cloud technologies and automation.",
    isCore: true,
  },
  {
    MemberName: "Debolina Dey",
    Role: "Cloud Team - Junior Member",
    Image: DebolinaPic,
    GithubLink: "https://github.com/debolina",
    LinkedinLink: "https://www.linkedin.com/in/debolina-dey/",
    Bio: "Hi i am Debolina , excited to join the GDG Cloud Team, im looking forward towards learning, collaborating and exploring cloud technologies",
    isCore: false,
  },
  {
    MemberName: "Aaryan Kumar",
    Role: "Cloud Team - Junior Member",
    Image: AaryanPic,
    GithubLink: "https://github.com/aaryan",
    LinkedinLink: "https://www.linkedin.com/in/aaryan-kumar/",
    Bio: "I am Aaryan Kumar, a sophomore CS undergraduate student. passionate about cloud computing and machine learning. I enjoy building scalable solutions using Google Cloud and exploring data-driven technologies.",
    isCore: false,
  },
  {
    MemberName: "Kingshuk Adhikari",
    Role: "Cloud Team - Junior Member",
    Image: KingshukPic,
    GithubLink: "https://github.com/kingshuk",
    LinkedinLink: "https://www.linkedin.com/in/kingshuk-adhikari/",
    Bio: "Tech enthusiast and CSE student passionate about coding, AI, and community-driven learning.",
    isCore: false,
  },
  {
    MemberName: "Santorshi Ghosh",
    Role: "Cloud Team - Junior Member",
    Image: SantorshiPic,
    GithubLink: "https://github.com/santorshi",
    LinkedinLink: "https://www.linkedin.com/in/santorshi-ghosh/",
    Bio: "I am Santorshi Ghosh, passionate about leveraging cloud technologies to build scalable, impactful solutions, venture forward for self-improvement and empower the developer community.",
    isCore: false,
  },

  // Design Team - Core Members
  {
    MemberName: "Priyasha Das",
    Role: "Design Team - Core Member",
    Image: PriyashaPic,
    GithubLink: "https://github.com/priyasha",
    LinkedinLink: "https://www.linkedin.com/in/priyasha-das/",
    Bio: "Hey there! I'm a third-year CSE student and a core member of the Design Team. With a love for blending tech and creativity, I design engaging visuals and smooth digital experiences using Figma, Canva, and Front-end tools. I'm all about bringing ideas to life that look good and feel right to users.",
    isCore: true,
  },
  {
    MemberName: "Gaurav Kumar",
    Role: "Design Team - Core Member",
    Image: GauravPic,
    GithubLink: "https://github.com/gaurav",
    LinkedinLink: "https://www.linkedin.com/in/gaurav-kumar/",
    Bio: "A passionate designer, coder, and web developer dedicated to creating innovative and user-friendly digital experiences",
    isCore: true,
  },
  {
    MemberName: "Olivia Sikder",
    Role: "Design Team - Core Member",
    Image: OliviaPic,
    GithubLink: "https://github.com/olivia",
    LinkedinLink: "https://www.linkedin.com/in/olivia-sikder/",
    Bio: "Creative web developer with a knack for solving complex problems and crafting modern UI/UX designs in Figma and Adobe. Passionate about turning ideas into seamless, user-centered digital experiences.",
    isCore: true,
  },
  {
    MemberName: "Aniket Ghosh",
    Role: "Design Team - Core Member",
    Image: AniketGhoshPic,
    GithubLink: "https://github.com/aniketghosh",
    LinkedinLink: "https://www.linkedin.com/in/aniket-ghosh/",
    Bio: "Entry-level designer passionate about transforming complex systems into user-friendly solutions at Google Cloud.",
    isCore: true,
  },
  {
    MemberName: "Shreya Jha",
    Role: "Design Team - Core Member",
    Image: ShreyaPic,
    GithubLink: "https://github.com/shreya",
    LinkedinLink: "https://www.linkedin.com/in/shreya-jha/",
    Bio: "I'm a design-loving coder who believes pixels and parentheses can create magic together. You'll usually find me switching between Figma and VS Code — trying to make things look good and actually work.",
    isCore: true,
  },
  {
    MemberName: "Sucheta Maity",
    Role: "Design Team - Junior Member",
    Image: SuchetaPic,
    GithubLink: "https://github.com/sucheta",
    LinkedinLink: "https://www.linkedin.com/in/sucheta-maity/",
    Bio: "I'm a passionate learner with a keen interest in technology and innovation. I enjoy collaborating on creative projects and exploring how tech can make a real-world impact.",
    isCore: false,
  },

  // Management Team - Core Members
  {
    MemberName: "Pranay Chatterjee",
    Role: "Management Team - Core Member",
    Image: PranayPic,
    GithubLink: "https://github.com/pranay",
    LinkedinLink: "https://www.linkedin.com/in/pranay-chatterjee/",
    Bio: "I'm Pranay, a design-driven creator passionate about innovation, creativity, and community collaboration. I love bringing ideas to life through impactful visuals and organized execution.",
    isCore: true,
  },
  {
    MemberName: "Aharna Chatterjee",
    Role: "Management Team - Core Member",
    Image: AharnaPic,
    GithubLink: "https://github.com/aharna",
    LinkedinLink: "https://www.linkedin.com/in/aharna-chatterjee/",
    Bio: "I'm 3rd year B.Tech Computer Science student with strong technical skills and a passion for exploring new technologies. I manage tasks efficiently and show strong organizational and leadership skills in both academic and team projects.",
    isCore: true,
  },
  {
    MemberName: "Rahul Kumar",
    Role: "Management Team - Core Member",
    Image: RahulPic,
    GithubLink: "https://github.com/rahul",
    LinkedinLink: "https://www.linkedin.com/in/rahul-kumar/",
    Bio: "Hi,I am Rahul Kumar, a third-year B.Tech IT student. I am deeply passionate about learning and Coding.I enjoy organizing event,connecting developers,and creating meaningful learning experience for everyone.",
    isCore: true,
  },
  {
    MemberName: "Ankita Giri",
    Role: "Management Team - Core Member",
    Image: AnkitaGiriPic,
    GithubLink: "https://github.com/ankitagiri",
    LinkedinLink: "https://www.linkedin.com/in/ankita-giri/",
    Bio: "I'm a tech enthusiast with a passion for learning and growth. I'm eager to explore new opportunities, gain experience and always open to new learnings and challenges.",
    isCore: true,
  },
  {
    MemberName: "Himobanta Dutta",
    Role: "Management Team - Core Member",
    Image: HimobantaPic,
    GithubLink: "https://github.com/himobanta",
    LinkedinLink: "https://www.linkedin.com/in/himobanta-dutta/",
    Bio: "A purpose-driven leader, social personality, and athlete, turning action and innovation into impact",
    isCore: true,
  },
  {
    MemberName: "Devashi Mishra",
    Role: "Management Team - Core Member",
    Image: DevashiPic,
    GithubLink: "https://github.com/devashi",
    LinkedinLink: "https://www.linkedin.com/in/devashi-mishra/",
    Bio: "Myself Devashi Mishra, a B.Tech IT student with a passion for technology, web development, and leadership. I enjoy organizing events, collaborating with creative minds, and contributing to impactful community initiatives as a part of the GDG Management Team.",
    isCore: true,
  },
  {
    MemberName: "Ankita Aman",
    Role: "Management Team - Core Member",
    Image: AnkitaAmanPic,
    GithubLink: "https://github.com/ankitaaman",
    LinkedinLink: "https://www.linkedin.com/in/ankita-aman/",
    Bio: "I am an IT student and an aspiring entrepreneur who loves turning tech ideas into reality. When not coding, managing projects, giving presentations, or engaging in public speaking, you'll probably find me lost in a good book or planning my next big initiative.",
    isCore: true,
  },

  // Marketing Team - Core Members
  {
    MemberName: "Sushil Sharma",
    Role: "Marketing Team - Core Member",
    Image: SushilPic,
    GithubLink: "https://github.com/sushil",
    LinkedinLink: "https://www.linkedin.com/in/sushil-sharma/",
    Bio: "",
    isCore: true,
  },
  {
    MemberName: "Adrish Basak",
    Role: "Marketing Team - Core Member",
    Image: AdrishPic,
    GithubLink: "https://github.com/adrish",
    LinkedinLink: "https://www.linkedin.com/in/adrish-basak/",
    Bio: "With a background in web dev, I enjoy making cool things and getting people excited about them. I can't wait to collaborate with the marketting team to help our GDG chapter grow!",
    isCore: true,
  },
  {
    MemberName: "Junaid Mollah",
    Role: "Marketing Team - Core Member",
    Image: JunaidPic,
    GithubLink: "https://github.com/junaid",
    LinkedinLink: "https://www.linkedin.com/in/junaid-mollah/",
    Bio: "I believe good marketing makes people see themselves in what you showcase.",
    isCore: true,
  },
  {
    MemberName: "Aadipto Ghosh",
    Role: "Marketing Team - Junior Member",
    Image: AadiptoPic,
    GithubLink: "https://github.com/aadipto",
    LinkedinLink: "https://www.linkedin.com/in/aadipto-ghosh/",
    Bio: "Marketing mind with a coder's logic and a designer's eye, I am Aadipto Ghosh, passionate about technology and turning ideas into successful events.",
    isCore: false,
  },
  {
    MemberName: "Sneha Roy",
    Role: "Marketing Team - Junior Member",
    Image: SnehaRoyPic,
    GithubLink: "https://github.com/sneharoy",
    LinkedinLink: "https://www.linkedin.com/in/sneha-roy/",
    Bio: "Tech Enthusiast and aspiring Computer Science Engineer passionate about innovation, coding and exploring emerging technologies.",
    isCore: false,
  },

  // Tech Team - Core Members
  {
    MemberName: "Priyunshu Saha",
    Role: "Tech Team - Core Member",
    Image: PriyunshuPic,
    GithubLink: "https://github.com/priyunshu",
    LinkedinLink: "https://www.linkedin.com/in/priyunshu-saha/",
    Bio: "An enthusiastic computer science student passionate about AI, App dev and coding, blending strong academics with creativity, fitness, and travelling. Always eager to learn and collaborate on exciting new projects.",
    isCore: true,
  },
  {
    MemberName: "Wasim Showan",
    Role: "Tech Team - Core Member",
    Image: WasimPic,
    GithubLink: "https://github.com/wasim",
    LinkedinLink: "https://www.linkedin.com/in/wasim-showan/",
    Bio: "Hey, I'm Wasim Showan, a 3rd-year ECE student weaving logic with creativity. I build engaging frontend experiences, sometimes(in sems😉) stay rooted in electronics, and refine my problem-solving and communication skills to grow as a thoughtful engineer.",
    isCore: true,
  },
  {
    MemberName: "Ootso Dharchowdhury",
    Role: "Tech Team - Core Member",
    Image: OotsoPic,
    GithubLink: "https://github.com/ootso",
    LinkedinLink: "https://www.linkedin.com/in/ootso-dharchowdhury/",
    Bio: "App developer working on mobile and web projects, currently diving into cybersecurity.",
    isCore: true,
  },
  {
    MemberName: "Md Owais Farhan Akhter",
    Role: "Tech Team - Junior Member",
    Image: OwaisPic,
    GithubLink: "https://github.com/owais",
    LinkedinLink: "https://www.linkedin.com/in/owais-farhan/",
    Bio: "I am confused",
    isCore: false,
  },
  {
    MemberName: "Sagnik Maitra",
    Role: "Tech Team - Junior Member",
    Image: SagnikMaitraPic,
    GithubLink: "https://github.com/sagnikmaitra",
    LinkedinLink: "https://www.linkedin.com/in/sagnik-maitra/",
    Bio: "I'm a passionate computer science undergrad that loves coding and all things related to technology. I'm looking forward to building a prolific career in software engineering.",
    isCore: false,
  },
  {
    MemberName: "Subhro Maitra",
    Role: "Tech Team - Junior Member",
    Image: SubhroPic,
    GithubLink: "https://github.com/subhro",
    LinkedinLink: "https://www.linkedin.com/in/subhro-maitra/",
    Bio: "Just a tech enthusiast passionate about web dev, cybersecurity, and cool new tech",
    isCore: false,
  },
];

export const coreTeamMembers = teamMembers.filter(member => member.isCore);
export const juniorTeamMembers = teamMembers.filter(member => !member.isCore);

// For Home Page - Only Organizer and Team Leads
export const leadsAndOrganizer = teamMembers.filter(member => 
  member.Role.includes("Lead") || member.Role.includes("Organizer")
);
