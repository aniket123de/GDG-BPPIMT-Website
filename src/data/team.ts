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
    isCore: true,
  },

  // Marketing Team Lead
  {
    MemberName: "Aniket De",
    Role: "Marketing Team Lead",
    Image: AniketDePic,
    GithubLink: "https://github.com/aniket",
    LinkedinLink: "https://www.linkedin.com/in/aniket-de/",
    isCore: true,
  },

  // AI/ML Team Lead
  {
    MemberName: "Parthita Chattopadhyay",
    Role: "AI/ML Team Lead",
    Image: ParthitaPic,
    GithubLink: "https://github.com/parthita",
    LinkedinLink: "https://www.linkedin.com/in/parthita-chattopadhyay/",
    isCore: true,
  },

  // Cloud Team Lead
  {
    MemberName: "Saikat Mondal",
    Role: "Cloud Team Lead",
    Image: SaikatPic,
    GithubLink: "https://github.com/saikat",
    LinkedinLink: "https://www.linkedin.com/in/saikat-mondal/",
    isCore: true,
  },

  // Design Team Lead
  {
    MemberName: "Debopriya Mullick",
    Role: "Design Team Lead",
    Image: DebopriyaPic,
    GithubLink: "https://github.com/debopriya",
    LinkedinLink: "https://www.linkedin.com/in/debopriya-mullick/",
    isCore: true,
  },

  // Management Team Lead
  {
    MemberName: "Sneha Patra",
    Role: "Management Team Lead",
    Image: SnehaPatraPic,
    GithubLink: "https://github.com/sneha",
    LinkedinLink: "https://www.linkedin.com/in/sneha-patra/",
    isCore: true,
  },

  {
    MemberName: "Samima Nasrin",
    Role: "AI/ML Team - Core Member",
    Image: SamimaPic,
    GithubLink: "https://github.com/samima",
    LinkedinLink: "https://www.linkedin.com/in/samima-nasrin/",
    isCore: true,
  },
  {
    MemberName: "Komal Kumari",
    Role: "AI/ML Team - Core Member",
    Image: KomalPic,
    GithubLink: "https://github.com/komal",
    LinkedinLink: "https://www.linkedin.com/in/komal-kumari/",
    isCore: true,
  },
  {
    MemberName: "Sandipan Nayek",
    Role: "AI/ML Team - Core Member",
    Image: SandipanPic,
    GithubLink: "https://github.com/sandipan",
    LinkedinLink: "https://www.linkedin.com/in/sandipan-nayek/",
    isCore: true,
  },
  {
    MemberName: "Sayan Jana",
    Role: "AI/ML Team - Junior Member",
    Image: SayanPic,
    GithubLink: "https://github.com/sayan",
    LinkedinLink: "https://www.linkedin.com/in/sayan-jana/",
    isCore: false,
  },
  {
    MemberName: "Sinjini Ghosal",
    Role: "AI/ML Team - Junior Member",
    Image: SinjiniPic,
    GithubLink: "https://github.com/sinjini",
    LinkedinLink: "https://www.linkedin.com/in/sinjini-ghosal/",
    isCore: false,
  },
  {
    MemberName: "Raktik Ghosh",
    Role: "AI/ML Team - Junior Member",
    Image: RaktikPic,
    GithubLink: "https://github.com/raktik",
    LinkedinLink: "https://www.linkedin.com/in/raktik-ghosh/",
    isCore: false,
  },

  // Cloud Team - Core Members
  {
    MemberName: "Sagnik Nayek",
    Role: "Cloud Team - Core Member",
    Image: SagnikNayekPic,
    GithubLink: "https://github.com/sagniknayek",
    LinkedinLink: "https://www.linkedin.com/in/sagnik-nayek/",
    isCore: true,
  },
  {
    MemberName: "Ambrish Tiwari",
    Role: "Cloud Team - Core Member",
    Image: AmbishPic,
    GithubLink: "https://github.com/ambrish",
    LinkedinLink: "https://www.linkedin.com/in/ambrish-tiwari/",
    isCore: true,
  },
  {
    MemberName: "Pranoy Paul",
    Role: "Cloud Team - Core Member",
    Image: PranoyPic,
    GithubLink: "https://github.com/pranoy",
    LinkedinLink: "https://www.linkedin.com/in/pranoy-paul/",
    isCore: true,
  },
  {
    MemberName: "Debolina Dey",
    Role: "Cloud Team - Junior Member",
    Image: DebolinaPic,
    GithubLink: "https://github.com/debolina",
    LinkedinLink: "https://www.linkedin.com/in/debolina-dey/",
    isCore: false,
  },
  {
    MemberName: "Aaryan Kumar",
    Role: "Cloud Team - Junior Member",
    Image: AaryanPic,
    GithubLink: "https://github.com/aaryan",
    LinkedinLink: "https://www.linkedin.com/in/aaryan-kumar/",
    isCore: false,
  },
  {
    MemberName: "Kingshuk Adhikari",
    Role: "Cloud Team - Junior Member",
    Image: KingshukPic,
    GithubLink: "https://github.com/kingshuk",
    LinkedinLink: "https://www.linkedin.com/in/kingshuk-adhikari/",
    isCore: false,
  },
  {
    MemberName: "Santorshi Ghosh",
    Role: "Cloud Team - Junior Member",
    Image: SantorshiPic,
    GithubLink: "https://github.com/santorshi",
    LinkedinLink: "https://www.linkedin.com/in/santorshi-ghosh/",
    isCore: false,
  },

  // Design Team - Core Members
  {
    MemberName: "Priyasha Das",
    Role: "Design Team - Core Member",
    Image: PriyashaPic,
    GithubLink: "https://github.com/priyasha",
    LinkedinLink: "https://www.linkedin.com/in/priyasha-das/",
    isCore: true,
  },
  {
    MemberName: "Gaurav Kumar",
    Role: "Design Team - Core Member",
    Image: GauravPic,
    GithubLink: "https://github.com/gaurav",
    LinkedinLink: "https://www.linkedin.com/in/gaurav-kumar/",
    isCore: true,
  },
  {
    MemberName: "Olivia Sikder",
    Role: "Design Team - Core Member",
    Image: OliviaPic,
    GithubLink: "https://github.com/olivia",
    LinkedinLink: "https://www.linkedin.com/in/olivia-sikder/",
    isCore: true,
  },
  {
    MemberName: "Aniket Ghosh",
    Role: "Design Team - Core Member",
    Image: AniketGhoshPic,
    GithubLink: "https://github.com/aniketghosh",
    LinkedinLink: "https://www.linkedin.com/in/aniket-ghosh/",
    isCore: true,
  },
  {
    MemberName: "Shreya Jha",
    Role: "Design Team - Core Member",
    Image: ShreyaPic,
    GithubLink: "https://github.com/shreya",
    LinkedinLink: "https://www.linkedin.com/in/shreya-jha/",
    isCore: true,
  },
  {
    MemberName: "Sucheta Maity",
    Role: "Design Team - Junior Member",
    Image: SuchetaPic,
    GithubLink: "https://github.com/sucheta",
    LinkedinLink: "https://www.linkedin.com/in/sucheta-maity/",
    isCore: false,
  },

  // Management Team - Core Members
  {
    MemberName: "Pranay Chatterjee",
    Role: "Management Team - Core Member",
    Image: PranayPic,
    GithubLink: "https://github.com/pranay",
    LinkedinLink: "https://www.linkedin.com/in/pranay-chatterjee/",
    isCore: true,
  },
  {
    MemberName: "Aharna Chatterjee",
    Role: "Management Team - Core Member",
    Image: AharnaPic,
    GithubLink: "https://github.com/aharna",
    LinkedinLink: "https://www.linkedin.com/in/aharna-chatterjee/",
    isCore: true,
  },
  {
    MemberName: "Rahul Kumar",
    Role: "Management Team - Core Member",
    Image: RahulPic,
    GithubLink: "https://github.com/rahul",
    LinkedinLink: "https://www.linkedin.com/in/rahul-kumar/",
    isCore: true,
  },
  {
    MemberName: "Ankita Giri",
    Role: "Management Team - Core Member",
    Image: AnkitaGiriPic,
    GithubLink: "https://github.com/ankitagiri",
    LinkedinLink: "https://www.linkedin.com/in/ankita-giri/",
    isCore: true,
  },
  {
    MemberName: "Himobanta Dutta",
    Role: "Management Team - Core Member",
    Image: HimobantaPic,
    GithubLink: "https://github.com/himobanta",
    LinkedinLink: "https://www.linkedin.com/in/himobanta-dutta/",
    isCore: true,
  },
  {
    MemberName: "Devashi Mishra",
    Role: "Management Team - Core Member",
    Image: DevashiPic,
    GithubLink: "https://github.com/devashi",
    LinkedinLink: "https://www.linkedin.com/in/devashi-mishra/",
    isCore: true,
  },
  {
    MemberName: "Ankita Aman",
    Role: "Management Team - Core Member",
    Image: AnkitaAmanPic,
    GithubLink: "https://github.com/ankitaaman",
    LinkedinLink: "https://www.linkedin.com/in/ankita-aman/",
    isCore: true,
  },

  // Marketing Team - Core Members
  {
    MemberName: "Sushil Sharma",
    Role: "Marketing Team - Core Member",
    Image: SushilPic,
    GithubLink: "https://github.com/sushil",
    LinkedinLink: "https://www.linkedin.com/in/sushil-sharma/",
    isCore: true,
  },
  {
    MemberName: "Adrish Basak",
    Role: "Marketing Team - Core Member",
    Image: AdrishPic,
    GithubLink: "https://github.com/adrish",
    LinkedinLink: "https://www.linkedin.com/in/adrish-basak/",
    isCore: true,
  },
  {
    MemberName: "Junaid Mollah",
    Role: "Marketing Team - Core Member",
    Image: JunaidPic,
    GithubLink: "https://github.com/junaid",
    LinkedinLink: "https://www.linkedin.com/in/junaid-mollah/",
    isCore: true,
  },
  {
    MemberName: "Aadipto Ghosh",
    Role: "Marketing Team - Junior Member",
    Image: AadiptoPic,
    GithubLink: "https://github.com/aadipto",
    LinkedinLink: "https://www.linkedin.com/in/aadipto-ghosh/",
    isCore: false,
  },
  {
    MemberName: "Sneha Roy",
    Role: "Marketing Team - Junior Member",
    Image: SnehaRoyPic,
    GithubLink: "https://github.com/sneharoy",
    LinkedinLink: "https://www.linkedin.com/in/sneha-roy/",
    isCore: false,
  },

  // Tech Team - Core Members
  {
    MemberName: "Priyunshu Saha",
    Role: "Tech Team - Core Member",
    Image: PriyunshuPic,
    GithubLink: "https://github.com/priyunshu",
    LinkedinLink: "https://www.linkedin.com/in/priyunshu-saha/",
    isCore: true,
  },
  {
    MemberName: "Wasim Showan",
    Role: "Tech Team - Core Member",
    Image: WasimPic,
    GithubLink: "https://github.com/wasim",
    LinkedinLink: "https://www.linkedin.com/in/wasim-showan/",
    isCore: true,
  },
  {
    MemberName: "Ootso Dharchowdhury",
    Role: "Tech Team - Core Member",
    Image: OotsoPic,
    GithubLink: "https://github.com/ootso",
    LinkedinLink: "https://www.linkedin.com/in/ootso-dharchowdhury/",
    isCore: true,
  },
  {
    MemberName: "Md Owais Farhan Akhter",
    Role: "Tech Team - Junior Member",
    Image: OwaisPic,
    GithubLink: "https://github.com/owais",
    LinkedinLink: "https://www.linkedin.com/in/owais-farhan/",
    isCore: false,
  },
  {
    MemberName: "Sagnik Maitra",
    Role: "Tech Team - Junior Member",
    Image: SagnikMaitraPic,
    GithubLink: "https://github.com/sagnikmaitra",
    LinkedinLink: "https://www.linkedin.com/in/sagnik-maitra/",
    isCore: false,
  },
  {
    MemberName: "Subhro Maitra",
    Role: "Tech Team - Junior Member",
    Image: SubhroPic,
    GithubLink: "https://github.com/subhro",
    LinkedinLink: "https://www.linkedin.com/in/subhro-maitra/",
    isCore: false,
  },
];

export const coreTeamMembers = teamMembers.filter(member => member.isCore);
export const juniorTeamMembers = teamMembers.filter(member => !member.isCore);

// For Home Page - Only Organizer and Team Leads
export const leadsAndOrganizer = teamMembers.filter(member => 
  member.Role.includes("Lead") || member.Role.includes("Organizer")
);
