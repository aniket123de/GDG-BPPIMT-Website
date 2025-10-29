import React, { useState, useContext, createContext } from 'react';

// --- ICONS ---
import {
  Book,
  AlertTriangle,
  FileText,
  FlaskConical,
  Gamepad2,
  Github,
  Globe,
  ChevronRight,
  PlayCircle,
  CheckCircle,
  ChevronDown,
  BookOpenCheck,
  Award,
  ClipboardList,
  Trophy,
  Home,
  Users,
  Pin
} from 'lucide-react';
import { FaWhatsapp } from "react-icons/fa"; // Using react-icons for WhatsApp

// --- DATA INTERFACES ---
interface Lab {
  title: string;
  required?: boolean;
  startLabUrl: string;
  solutionUrl?: string; // Solution URL is optional
}

interface Course {
  num: string;
  title: string;
  coursePageUrl: string;
  info?: string; // Optional info text (used for Arcade)
  isArcade?: boolean; // Flag for arcade styling
  labs: Lab[];
}

interface SyllabusCategory {
    category: string;
    icon: React.ReactElement;
    courses: Course[];
}

// --- DATA (Includes all 19 Skill Badge Courses) ---
const syllabusData: SyllabusCategory[] = [
  // --- Skill Badges ---
  {
    category: "Skill Badges",
    icon: <Award className="w-9 h-9 mr-3" style={{ color: '#DB4437' }}/>, // Red
    courses: [
       {
        num: '01',
        title: 'The Basics of Google Cloud Compute: Challenge Lab',
        coursePageUrl: 'https://www.cloudskillsboost.google/course_templates/754',
        labs: [
          { title: 'Creating a Virtual Machine', required: true, startLabUrl: 'https://www.cloudskillsboost.google/focuses/3563?parent=catalog', solutionUrl: 'https://youtu.be/oUnQLeuEDs8?si=AOBSgVRYknbJLoZi' },
          { title: 'Creating a Persistent Disk', required: true, startLabUrl: 'https://www.cloudskillsboost.google/course_templates/754/labs/584201', solutionUrl: 'https://youtu.be/oUnQLeuEDs8?si=AOBSgVRYknbJLoZi' },
          { title: 'Hosting a Web App on Google Cloud Using Compute Engine', required: true, startLabUrl: 'https://www.cloudskillsboost.google/course_templates/754/labs/584202', solutionUrl: 'https://youtu.be/um0RpF0k070?si=TN5Lybcdg7PfqX9k' },
          { title: '⚡ The Basics of Google Cloud Compute: Challenge Lab', required: true, startLabUrl: 'https://www.cloudskillsboost.google/course_templates/754/labs/584203', solutionUrl: 'https://youtu.be/1F5hAre_YOU?si=NCrAC8Rs8yKlPiET' }
        ]
      },
      {
        num: '02',
        title: 'Get Started with Cloud Storage',
        coursePageUrl: 'https://www.cloudskillsboost.google/course_templates/725',
        labs: [
           { title: 'APIs Explorer: Cloud Storage', startLabUrl: 'https://www.cloudskillsboost.google/course_templates/725/labs/589886', solutionUrl: 'https://youtu.be/E2ztBJM9ycY?si=Yc8mGVCUFpJF83Zx' },
           { title: 'Cloud Storage: Qwik Start - CLI/SDK', startLabUrl: 'https://www.cloudskillsboost.google/course_templates/725/labs/589887', solutionUrl: 'https://youtu.be/nnDHTQKhhxY?si=WcoyOOSuGfPa7ulO' },
           { title: 'Google Cloud Storage - Bucket Lock', startLabUrl: 'https://www.cloudskillsboost.google/course_templates/725/labs/589888', solutionUrl: 'https://youtu.be/ROLigBsAx3A?si=6udTPpSAJzljodL3' },
           { title: '⚡ Get Started with Cloud Storage: Challenge Lab', required: true, startLabUrl: 'https://www.cloudskillsboost.google/course_templates/725/labs/589888', solutionUrl: 'https://youtu.be/X6DNbZbzKuA?si=gKC-cVtHn_nV8HfD' }
        ]
      },
      {
        num: '03',
        title: 'Get Started with Pub/Sub',
        coursePageUrl: 'https://www.cloudskillsboost.google/course_templates/728',
        labs: [
          { title: 'Pub/Sub: Qwik Start - Console', startLabUrl: 'https://www.cloudskillsboost.google/course_templates/728/labs/594563', solutionUrl: 'https://www.youtube.com/watch?v=84tXuAKLZLY' },
          { title: 'Cloud Scheduler: Qwik Start', startLabUrl: 'https://www.cloudskillsboost.google/course_templates/728/labs/594564', solutionUrl: 'https://www.youtube.com/watch?v=7xwjJYiRzcg' },
          { title: '⚡ Get Started with Pub/Sub: Challenge Lab', required: true, startLabUrl: 'https://www.cloudskillsboost.google/course_templates/728/labs/594565', solutionUrl: 'https://www.youtube.com/watch?v=RDLyWHXnr0s' }
        ]
      },
      {
        num: '04',
        title: 'Get Started with API Gateway',
        coursePageUrl: 'https://www.cloudskillsboost.google/course_templates/662',
        labs: [
            { title: 'API Gateway: Qwik Start', startLabUrl: 'https://www.cloudskillsboost.google/course_templates/662/labs/592574', solutionUrl: 'https://youtu.be/5Ae2ftnjJfM?si=JAvxe5D1b9kTXU9k' },
            { title: 'Pub/Sub: Qwik Start - Console', startLabUrl: 'https://www.cloudskillsboost.google/course_templates/662/labs/592575', solutionUrl: 'https://youtu.be/84tXuAKLZLY?si=aEFdS-NXDZpEJgJD' },
            { title: 'Cloud Functions Qwik Start - Console', startLabUrl: 'https://www.cloudskillsboost.google/course_templates/662/labs/592576', solutionUrl: 'https://youtu.be/-8vxVRA2ruk?si=0se4gm0KCFMjCGZl' },
            { title: '⚡ Getting Started with API Gateway: Challenge Lab', required: true, startLabUrl: 'https://www.cloudskillsboost.google/course_templates/662/labs/592577', solutionUrl: 'https://youtu.be/iWRh0xCKwRQ?si=rYr6iVMdphlLo2dx' }
        ]
      },
      {
        num: '05',
        title: 'Get Started with Looker',
        coursePageUrl: 'https://www.cloudskillsboost.google/course_templates/647',
        labs: [
            { title: 'Looker Studio: Qwik Start', startLabUrl: 'https://www.cloudskillsboost.google/course_templates/647/labs/461640', solutionUrl: 'https://youtu.be/G9jNga-up70?si=rGWMNfQ4OZKtVBev' },
            { title: 'Looker Data Explorer - Qwik Start', startLabUrl: 'https://www.cloudskillsboost.google/course_templates/647/labs/461641', solutionUrl: 'https://youtu.be/_mxceD2TSMQ?si=PiZytTMrwMsOb-Ck' },
            { title: 'Looker Developer: Qwik Start', startLabUrl: 'https://www.cloudskillsboost.google/course_templates/647/labs/461642', solutionUrl: 'https://youtu.be/wNgUf8-XfLM?si=dj6YMrz8DH56puVA' },
            { title: '⚡ Get Started with Looker: Challenge Lab', required: true, startLabUrl: 'https://www.cloudskillsboost.google/course_templates/647/labs/461643', solutionUrl: 'https://youtu.be/iZPo_KTy1RE?si=fEmCBI0cdD9yj9ib' }
        ]
      },
      {
        num: '06',
        title: 'Get Started with Dataplex',
        coursePageUrl: 'https://www.cloudskillsboost.google/course_templates/726',
        labs: [
            { title: 'Dataplex: Qwik Start - Console', startLabUrl: 'https://www.cloudskillsboost.google/course_templates/726/labs/461568', solutionUrl: 'https://youtu.be/yDQfs8fNBgM?si=dxLtHaqLEAnK0cNE' },
            { title: 'Dataplex: Qwik Start - Command Line', startLabUrl: 'https://www.cloudskillsboost.google/course_templates/726/labs/461569', solutionUrl: 'https://youtu.be/GVKNYbTUDIU?si=ScRU2-zka352iq_Q' },
            { title: 'Tagging Dataplex Asset', startLabUrl: 'https://www.cloudskillsboost.google/course_templates/726/labs/461570', solutionUrl: 'https://youtu.be/s-3nNkkocdo?si=REi-XV7xT45NPWHs' },
            { title: '⚡ Get Started with Dataplex: Challenge Lab', required: true, startLabUrl: 'https://www.cloudskillsboost.google/course_templates/726/labs/461571', solutionUrl: 'https://youtu.be/NzRcltfHzu0?si=OvMVCcr_Go_vmbDp' }
        ]
      },
      {
        num: '07',
        title: 'Get Started with Google Workspace Tools: Challenge Lab',
        coursePageUrl: 'https://www.cloudskillsboost.google/course_templates/676',
        labs: [
            { title: 'Gmail: Getting Started', startLabUrl: 'https://www.cloudskillsboost.google/course_templates/676/labs/476311', solutionUrl: 'https://youtu.be/saL_ibySVx4?si=A4FOx4JEwHwLqNQG' },
            { title: 'Google Calendar: Getting Started', startLabUrl: 'https://www.cloudskillsboost.google/course_templates/676/labs/476312', solutionUrl: 'https://youtu.be/J8f2jCSZZ78?si=HKQYtFCl4rzvOP0v' },
            { title: 'Google Meet: Getting Started', startLabUrl: 'https://www.cloudskillsboost.google/course_templates/676/labs/476313', solutionUrl: 'https://youtu.be/NT4f67Qxkb4?si=LLy3kDqBRRkH6g-o' },
            { title: 'Google Drive: Getting Started', startLabUrl: 'https://www.cloudskillsboost.google/course_templates/676/labs/476314', solutionUrl: 'https://youtu.be/rDmB4_RrOXs?si=28SCSdbEB3UJHN2b' },
            { title: 'Google Sheets: Getting Started', startLabUrl: 'https://www.cloudskillsboost.google/course_templates/676/labs/476315', solutionUrl: 'https://youtu.be/VOxyLjNC_4Y?si=-Emuux7ElceB2cdR' },
            { title: 'Google AppSheet: Getting Started', startLabUrl: 'https://www.cloudskillsboost.google/course_templates/676/labs/476316', solutionUrl: 'https://youtu.be/GHrGaNce6WE?si=xz8ew-v9nv6ySnXT' },
            { title: '⚡ Get Started with Google Workspace Tools: Challenge Lab', required: true, startLabUrl: 'https://www.cloudskillsboost.google/course_templates/676/labs/476317', solutionUrl: 'https://youtu.be/t93hJjIYUWo?si=w4V2rYb1hXF_Br2r' }
        ]
      },
      {
        num: '08',
        title: 'App Building with Appsheet',
        coursePageUrl: 'https://www.cloudskillsboost.google/course_templates/635',
        labs: [
            { title: 'Google AppSheet: Getting Started', startLabUrl: 'https://www.cloudskillsboost.google/course_templates/635/labs/586897', solutionUrl: 'https://youtu.be/ZGMsodoXp-w?si=q3ZEeMk1HZjVxYxo' },
            { title: 'Connect and Configure Data for your AppSheet App', startLabUrl: 'https://www.cloudskillsboost.google/course_templates/635/labs/586898', solutionUrl: 'https://youtu.be/G9BYYBIjFfg?si=yCzudG4g6uRAfTFe' },
            { title: 'Publish your AppSheet App', startLabUrl: 'https://www.cloudskillsboost.google/course_templates/635/labs/586899', solutionUrl: 'https://youtu.be/SQXAjjBPn3A?si=NBrMALlIrSQSYqSD' },
            { title: '⚡ App Building with AppSheet: Challenge Lab', required: true, startLabUrl: 'https://www.cloudskillsboost.google/course_templates/635/labs/586900', solutionUrl: 'https://youtu.be/dDk2luM4EzI?si=Ej3wDo4-MjksHzsU' }
        ]
      },
      {
        num: '09',
        title: 'Develop with Apps Script and AppSheet',
        coursePageUrl: 'https://www.cloudskillsboost.google/course_templates/715',
        labs: [
            { title: 'Develop No-Code Chat Apps with AppSheet', startLabUrl: 'https://www.cloudskillsboost.google/course_templates/715/labs/591610', solutionUrl: 'https://youtu.be/O2IUvuWqnjs?si=c6wVmVPf3J-UtV-T' },
            { title: 'Introduction to Google Chat Bots with Apps Script', startLabUrl: 'https://www.cloudskillsboost.google/course_templates/715/labs/591611', solutionUrl: 'https://youtu.be/NuMwtkkdgPU?si=RJ5tl2DjOY6iUaBN' },
            { title: 'Google Apps Script: Access Google Sheets, Maps & Gmail in 4 Lines of Code', startLabUrl: 'https://www.cloudskillsboost.google/course_templates/715/labs/591612', solutionUrl: 'https://youtu.be/afvGRQGdDjg?si=tqjhiUUzmzESJvl9' },
            { title: '⚡ Develop with Apps Script and AppSheet: Challenge Lab', required: true, startLabUrl: 'https://www.cloudskillsboost.google/course_templates/715/labs/591613', solutionUrl: 'https://youtu.be/CUDgunty_vU?si=nZVrcLN9UOoSb8yy' }
        ]
      },
      {
        num: '10',
        title: 'Build a Website on Google Cloud',
        coursePageUrl: 'https://www.cloudskillsboost.google/course_templates/638',
        labs: [
            { title: 'Deploy Your Website on Cloud Run', startLabUrl: 'https://www.cloudskillsboost.google/course_templates/638/labs/592820', solutionUrl: 'https://youtu.be/QDK0Z_dCyDc?si=vzTSSLmZBdZCDiAG' },
            { title: 'Host a Web App on Google Cloud Using Compute Engine', startLabUrl: 'https://www.cloudskillsboost.google/course_templates/638/labs/592822', solutionUrl: 'https://youtu.be/xCN4_jEAlhQ?si=lFcd4TCG3TJSaIyx' },
            { title: 'Deploy, Scale, and Update Your Website on Google Kubernetes Engine', startLabUrl: 'https://www.cloudskillsboost.google/course_templates/638/labs/592823', solutionUrl: 'https://youtu.be/wUY1HeO4EOo?si=LGEiFaqYMjIN_QFF' },
            { title: 'Migrating a Monolithic Website to Microservices on Google Kubernetes Engine', startLabUrl: 'https://www.cloudskillsboost.google/course_templates/638/labs/592824', solutionUrl: 'https://youtu.be/36WC7jipPIo?si=HlknK9VI8024yL0f' },
            { title: '⚡ Build a Website on Google Cloud: Challenge Lab', required: true, startLabUrl: 'https://www.cloudskillsboost.google/course_templates/638/labs/592826', solutionUrl: 'https://youtu.be/3NUOcaJ_iJs?si=FpZqSEb8m8uOJRuf' }
        ]
      },
      {
        num: '11',
        title: 'Set Up a Google Cloud Network',
        coursePageUrl: 'https://www.cloudskillsboost.google/course_templates/641',
        labs: [
            { title: 'Networking 101', startLabUrl: 'https://www.cloudskillsboost.google/course_templates/641/labs/594501', solutionUrl: 'https://youtu.be/su_bKowi7o8?si=fiH4IAAh3XR66CUT' },
            { title: 'Create a Custom Network and Apply Firewall Rules', startLabUrl: 'https://www.cloudskillsboost.google/course_templates/641/labs/594502', solutionUrl: 'https://youtu.be/Lz6WptOwb68?si=pye4zBfgqnIxwfp3' },
            { title: 'Test Network Latency Between VMs', startLabUrl: 'https://www.cloudskillsboost.google/course_templates/641/labs/594503', solutionUrl: 'https://youtu.be/vIRgtWCsTfM?si=gncFppTky86nYpHz' },
            { title: '⚡ Set Up a Google Cloud Network: Challenge Lab', required: true, startLabUrl: 'https://www.cloudskillsboost.google/course_templates/641/labs/594504', solutionUrl: 'https://youtu.be/9bYV6Evyvn8?si=0trkOv7aAzNmlJaW' }
        ]
      },
      {
        num: '12',
        title: 'Store, Process, and Manage Data on Google Cloud - Console',
        coursePageUrl: 'https://www.cloudskillsboost.google/course_templates/658',
        labs: [
            { title: 'Cloud Storage: Qwik Start - Cloud Console', startLabUrl: 'https://www.cloudskillsboost.google/course_templates/658/labs/592591', solutionUrl: 'https://youtu.be/pRv0jBGJd9w?si=WXbIb4uckgxuFCvw' },
            { title: 'Cloud Run Functions: Qwik Start - Console', startLabUrl: 'https://www.cloudskillsboost.google/course_templates/658/labs/592592', solutionUrl: 'https://youtu.be/IBHFrTLcTY0?si=44ExRETevM24jXnP' },
            { title: 'Pub/Sub: Qwik Start - Console', startLabUrl: 'https://www.cloudskillsboost.google/course_templates/658/labs/592593', solutionUrl: 'https://youtu.be/r8pnC0kwt-8?si=oW3qyhCNs432GTDf' },
            { title: '⚡ Store, Process, and Manage Data on Google Cloud: Challenge Lab', required: true, startLabUrl: 'https://www.cloudskillsboost.google/course_templates/658/labs/592594', solutionUrl: 'https://youtu.be/fRMJI5ATs2s?si=NHaCEnBi8KTa6s-U' }
        ]
      },
      {
        num: '13',
        title: 'Cloud Functions: 3 Ways',
        coursePageUrl: 'https://www.cloudskillsboost.google/course_templates/696',
        labs: [
            { title: 'Cloud Functions: Qwik Start - Console', startLabUrl: 'https://www.cloudskillsboost.google/course_templates/696/labs/461616', solutionUrl: 'https://youtu.be/-8vxVRA2ruk?si=At7WArAJXY33eKQ1' },
            { title: 'Cloud Functions: Qwik Start - Command Line', startLabUrl: 'https://www.cloudskillsboost.google/course_templates/696/labs/461617', solutionUrl: 'https://youtu.be/DzQ8i7t7zyY?si=wuhdwpMdjMcx3MBQ' },
            { title: 'Cloud Functions 2nd Gen: Qwik Start', startLabUrl: 'https://www.cloudskillsboost.google/course_templates/696/labs/461618', solutionUrl: 'https://youtu.be/WWFzCrPHsCk?si=rP5fLJNRIVC2i9U8' },
            { title: '⚡ Cloud Functions: 3 Ways: Challenge Lab', required: true, startLabUrl: 'https://www.cloudskillsboost.google/course_templates/696/labs/461619', solutionUrl: 'https://youtu.be/fPVslkWDTGg?si=QoaQ75N8TWxvV2mQ' }
        ]
      },
      {
        num: '14',
        title: 'App Engine: 3 Ways: Challenge Lab',
        coursePageUrl: 'https://www.cloudskillsboost.google/course_templates/671',
        labs: [
            { title: 'App Engine: Qwik Start - Python', startLabUrl: 'https://www.cloudskillsboost.google/course_templates/671/labs/461532', solutionUrl: 'https://youtu.be/IK1FedYS4RU?si=VIzJJVJdc9LFLCNW' },
            { title: 'App Engine: Qwik Start - Go', startLabUrl: 'https://www.cloudskillsboost.google/course_templates/671/labs/461533', solutionUrl: 'https://youtu.be/3cVxYis4Hj8?si=oeIKSnsw3pSqk3J7' },
            { title: 'App Engine: Qwik Start - PHP', startLabUrl: 'https://www.cloudskillsboost.google/course_templates/671/labs/461534', solutionUrl: 'https://youtu.be/sxlXdG7sLy4?si=PMuHP9CgkafxYidt' },
            { title: '⚡ App Engine: 3 Ways: Challenge Lab', required: true, startLabUrl: 'https://www.cloudskillsboost.google/course_templates/671/labs/461535', solutionUrl: 'https://youtu.be/rZGeGBXDdfM?si=0bQ_HR0hpUimeRMi' }
        ]
      },
      {
        num: '15',
        title: 'Cloud Speech API 3 Ways: Challenge Lab',
        coursePageUrl: 'https://www.cloudskillsboost.google/course_templates/700',
        labs: [
            { title: 'It Speaks! Create Synthetic Speech Using Text-to-Speech', startLabUrl: 'https://www.cloudskillsboost.google/course_templates/700/labs/461580', solutionUrl: 'https://youtu.be/ZrC1bktIC9I?si=QwvMLUbfZ-qBbQX8' },
            { title: 'Translate Text with the Cloud Translation API', startLabUrl: 'https://www.cloudskillsboost.google/course_templates/700/labs/461581', solutionUrl: 'https://youtu.be/QIyAKsou5CM?si=oIB9qy3YYYflzYh-' },
            { title: 'Speech to Text Transcription with the Cloud Speech API', startLabUrl: 'https://www.cloudskillsboost.google/course_templates/700/labs/461582', solutionUrl: 'https://youtu.be/Hs4Gpdcb5WI?si=-IpuGOghQ0gl29yn' },
            { title: '⚡ Cloud Speech API 3 Ways: Challenge Lab', required: true, startLabUrl: 'https://www.cloudskillsboost.google/course_templates/700/labs/461583', solutionUrl: 'https://youtu.be/iLn4-TvJXno?si=JIMx7pvPNuYA-9ee' }
        ]
      },
      {
        num: '16',
        title: 'Monitoring in Google Cloud: Challenge Lab',
        coursePageUrl: 'https://www.cloudskillsboost.google/course_templates/747',
        labs: [
            { title: 'Cloud Monitoring: Qwik Start', startLabUrl: 'https://www.cloudskillsboost.google/course_templates/747/labs/461644', solutionUrl: 'https://youtu.be/TO6FqSk_Or8?si=XlYyorRaOqLWAlY6' },
            { title: 'Monitoring and Logging for Cloud Functions', startLabUrl: 'https://www.cloudskillsboost.google/course_templates/747/labs/461645', solutionUrl: 'https://youtu.be/zDM2IzpCedM?si=GRJ0yybXqrU9fbDx' },
            { title: 'Monitor an Apache Web Server using Ops Agent', startLabUrl: 'https://www.cloudskillsboost.google/course_templates/747/labs/461646', solutionUrl: 'https://youtu.be/3vNqet2BGr4?si=RFjSaWPz8xht2rBx' },
            { title: '⚡ Monitoring in Google Cloud: Challenge Lab', required: true, startLabUrl: 'https://www.cloudskillsboost.google/course_templates/747/labs/461647', solutionUrl: 'https://youtu.be/cZJn_C_Ry4w?si=tGJNf33M5Y1QJM7y' }
        ]
      },
      {
        num: '17',
        title: 'Analyze Speech and Language with Google APIs',
        coursePageUrl: 'https://www.cloudskillsboost.google/course_templates/634',
        labs: [
            { title: 'Cloud Natural Language API: Qwik Start', startLabUrl: 'https://www.cloudskillsboost.google/course_templates/634/labs/586893', solutionUrl: 'https://youtu.be/gdTxNBBTrQE?si=7Y7Q9ibQvqmuSwKT' },
            { title: 'Speech-to-Text API: Qwik Start', startLabUrl: 'https://www.cloudskillsboost.google/course_templates/634/labs/586894', solutionUrl: 'https://youtu.be/0OOpG5_lXuM?si=ue7I-i1qram7F0hZ' },
            { title: 'Entity and Sentiment Analysis with the Natural Language API', startLabUrl: 'https://www.cloudskillsboost.google/course_templates/634/labs/586895', solutionUrl: 'https://youtu.be/XsEiolKVH2U?si=TAnFhNcd9tFnafit' },
            { title: '⚡ Analyze Speech & Language with Google APIs: Challenge Lab', required: true, startLabUrl: 'https://www.cloudskillsboost.google/course_templates/634/labs/586896', solutionUrl: 'https://youtu.be/75FktGg2fSo?si=DH9do3knbGaJlgNW' }
        ]
      },
      {
        num: '18',
        title: 'Prompt Design in Vertex AI',
        coursePageUrl: 'https://www.cloudskillsboost.google/course_templates/976',
        labs: [
            { title: 'Generative AI with Vertex AI: Prompt Design', startLabUrl: 'https://www.cloudskillsboost.google/course_templates/976/labs/489805', solutionUrl: 'https://www.youtube.com/watch?v=h8wTc1lBQ7g' },
            { title: 'Get Started with Vertex AI Studio', startLabUrl: 'https://www.cloudskillsboost.google/course_templates/976/labs/489806', solutionUrl: 'https://www.youtube.com/watch?v=e4MpONRtHZw&list=PL5aOhqv5LVIpGYa_pR6PYmUk2kwd60xWC&index=4' },
            { title: 'Getting Started with the Vertex AI Gemini API and Python SDK', startLabUrl: 'https://www.cloudskillsboost.google/course_templates/976/labs/489807', solutionUrl: 'https://www.youtube.com/watch?v=6DMza4gk-AM&list=PL5aOhqv5LVIpGYa_pR6PYmUk2kwd60xWC&index=6' },
            { title: '⚡ Prompt Design in Vertex AI: Challenge Lab', required: true, startLabUrl: 'https://www.cloudskillsboost.google/course_templates/976/labs/489808', solutionUrl: 'https://www.youtube.com/watch?v=GZgFW6ZwEG4&list=PL5aOhqv5LVIpGYa_pR6PYmUk2kwd60xWC&index=3' }
        ]
      },
      {
        num: '19',
        title: 'Develop GenAI Apps with Gemini and Streamlit',
        coursePageUrl: 'https://www.cloudskillsboost.google/course_templates/978',
        labs: [
            { title: 'Getting Started with the Vertex AI Gemini API with cURL', startLabUrl: 'https://www.cloudskillsboost.google/course_templates/978/labs/592569', solutionUrl: 'https://www.youtube.com/watch?v=FE40dzAof3M&list=PLI0vR7P4HGfGakLvUkw_1YIgHgwGFSvqK' },
            { title: 'Introduction to Function Calling with Gemini', startLabUrl: 'https://www.cloudskillsboost.google/course_templates/978/labs/592570', solutionUrl: 'https://www.youtube.com/watch?v=Be5EKZS7O7c&list=PLI0vR7P4HGfGakLvUkw_1YIgHgwGFSvqK&index=66' },
            { title: 'Getting Started with the Vertex AI Gemini API and Python SDK', startLabUrl: 'https://www.cloudskillsboost.google/course_templates/978/labs/488166', solutionUrl: 'https://www.youtube.com/watch?v=6OrU5g-EVtE' },
            { title: 'Deploy a Streamlit App Integrated with Gemini Pro on Cloud Run', startLabUrl: 'https://www.cloudskillsboost.google/course_templates/978/labs/488167', solutionUrl: 'https://www.youtube.com/watch?v=7D105v1SG2U&list=PLI0vR7P4HGfGakLvUkw_1YIgHgwGFSvqK&index=7' },
            { title: '⚡ Develop GenAI Apps with Gemini and Streamlit: Challenge Lab', required: true, startLabUrl: 'https://www.cloudskillsboost.google/course_templates/978/labs/488168', solutionUrl: 'https://www.youtube.com/watch?v=XaP7NQLgCrs&list=PLI0vR7P4HGfGakLvUkw_1YIgHgwGFSvqK&index=9' }
        ]
      },
    ]
  },
  // --- Arcade Game ---
  {
    category: "Arcade Game",
    icon: <Gamepad2 className="w-9 h-9 mr-3" style={{ color: '#4285F4' }} />, // Blue
    courses: [
       {
        num: '20',
        title: 'Gen AI Arcade Game: Level 3',
        coursePageUrl: 'https://www.cloudskillsboost.google/games/6554',
        info: 'Complete this arcade game as your 20th requirement!',
        isArcade: true,
        labs: [
            { title: '🎬 Arcade Chatbot: Interactive Film-bot', required: true, startLabUrl: 'https://www.cloudskillsboost.google/games/6554/labs/41108' },
            { title: '🎵 Arcade Chatbot: Interactive Music-bot', required: true, startLabUrl: 'https://www.cloudskillsboost.google/games/6554/labs/41109' },
            { title: '🇫🇷 Arcade Chatbot: Interactive French Language-bot', required: true, startLabUrl: 'https://www.cloudskillsboost.google/games/6554/labs/41110' },
            { title: '🇪🇸 Arcade Chatbot: Interactive Spanish Language-bot', required: true, startLabUrl: 'https://www.cloudskillsboost.google/games/6554/labs/41111' },
            { title: '🇮🇳 Arcade Chatbot: Interactive Hindi Language-bot', required: true, startLabUrl: 'https://www.cloudskillsboost.google/games/6554/labs/41112' },
            { title: '🇨🇳 Arcade Chatbot: Interactive Mandarin Language-bot', required: true, startLabUrl: 'https://www.cloudskillsboost.google/games/6554/labs/41113' },
            { title: '🇵🇹 Arcade Chatbot: Interactive Portuguese Language-bot', required: true, startLabUrl: 'https://www.cloudskillsboost.google/games/6554/labs/41114' },
            { title: '🏗️ Arcade Hero: Building Blocks Cloud Run functions III', required: true, startLabUrl: 'https://www.cloudskillsboost.google/games/6554/labs/41115' },
            { title: '🏗️ Arcade Hero: Building Blocks Cloud Run functions IV', required: true, startLabUrl: 'https://www.cloudskillsboost.google/games/6554/labs/41116' },
            { title: '🌐 Arcade Hero: Enter the VPC', required: true, startLabUrl: 'https://www.cloudskillsboost.google/games/6554/labs/41117' },
            { title: '📦 Arcade Hero: Enter the Source Repository', required: true, startLabUrl: 'https://www.cloudskillsboost.google/games/6554/labs/41118' },
            { title: '🗄️ Arcade Hero: Building Blocks GCS I', required: true, startLabUrl: 'https://www.cloudskillsboost.google/games/6554/labs/41119' },
            { title: '💾 Arcade Hero: Enter the Storage', required: true, startLabUrl: 'https://www.cloudskillsboost.google/games/6554/labs/41120' },
            { title: '💎 Arcade Hero: Enter the Cloud Run functions Ruby', required: true, startLabUrl: 'https://www.cloudskillsboost.google/games/6554/labs/41121' },
            { title: '🐍 Arcade Hero: Enter the Cloud Run functions Python', required: true, startLabUrl: 'https://www.cloudskillsboost.google/games/6554/labs/41122' },
            { title: '🔌 Arcade Hero: Enter the Subnet', required: true, startLabUrl: 'https://www.cloudskillsboost.google/games/6554/labs/41123' },
        ]
      }
    ]
  }
];

// --- Resources Data (Updated WhatsApp URL) ---
const resourcesData = [
    { text: "GitHub Solutions Repo", url: "https://github.com/VinitSurve/GenAI-Study-Jams-Solutions", icon: <Github /> },
    { text: "Cloud Skills Boost", url: "https://www.cloudskillsboost.google/", icon: <Globe /> },
    // Rectified: Use the correct group invite URL
    { text: "Join WhatsApp Group", url: "https://chat.whatsapp.com/JA9clPhV4gz3bJekLY3t9a?mode=wwc", icon: <FaWhatsapp className="text-green-600"/> }
];

// --- ACCORDION COMPONENTS (No changes) ---
type AccordionContextType = { /* ... */
    openItem: string | null;
    setOpenItem: (value: string | null) => void;
};
const AccordionContext = createContext<AccordionContextType | null>(null);
const useAccordion = () => { /* ... */
    const context = useContext(AccordionContext);
    if (!context) throw new Error("useAccordion must be used within an Accordion");
    return context;
};
const Accordion: React.FC<{ children: React.ReactNode }> = ({ children }) => { /* ... */
    const [openItem, setOpenItem] = useState<string | null>(null);
    return <AccordionContext.Provider value={{ openItem, setOpenItem }}>{children}</AccordionContext.Provider>;
};
const AccordionItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="border-b border-gray-200 last:border-b-0">{children}</div>
);
const AccordionTrigger: React.FC<{ children: React.ReactNode; value: string; className?: string }> = ({ children, value, className = '' }) => { /* ... */
    const { openItem, setOpenItem } = useAccordion();
    const isOpen = openItem === value;
    return (
        <button
          className={`flex items-center justify-between w-full p-4 font-medium text-left transition-all ${className}`}
          onClick={() => setOpenItem(isOpen ? null : value)}
        >
          {children}
          <ChevronDown className={`h-5 w-5 transition-transform duration-300 text-gray-500 ${isOpen ? 'rotate-180' : ''}`} />
        </button>
    );
};
const AccordionContent: React.FC<{ children: React.ReactNode; value: string }> = ({ children, value }) => { /* ... */
    const { openItem } = useAccordion();
    const isOpen = openItem === value;
    return (
        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="p-4">{children}</div>
        </div>
    );
};

// --- COURSE CARD COMPONENT (No changes) ---
const CourseCard: React.FC<{ course: Course }> = ({ course }) => {
  const accordionValue = `course-${course.num}`;
  return (
    <div className="group bg-white rounded-xl p-6 flex flex-col h-full border border-gray-200 relative transition-all duration-300 hover:shadow-md">
      {/* Number box */}
      <div className="absolute top-4 right-4 bg-gray-100 text-gray-600 text-sm font-bold w-8 h-8 flex items-center justify-center rounded-lg z-10 transition-all">
        {course.num}
      </div>
      {/* Title */}
      <h3 className="text-lg font-semibold mb-4 pr-10 min-h-[3.5rem] text-gray-800 relative z-10 transition-colors">
        {course.title}
      </h3>
      {/* Info (for Arcade) */}
       {course.info && (
           <p className="text-sm text-gray-500 mb-4 flex-grow relative z-10 transition-colors">
               {course.info}
           </p>
       )}
      {/* Course/Game Page Button */}
      <a
        href={course.coursePageUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`flex items-center justify-center w-full px-4 py-2 mb-3 text-sm font-medium text-white rounded-lg transition-all relative z-10 group-hover:opacity-90 ${
            course.isArcade
            ? 'bg-purple-600 hover:bg-purple-700'
            : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {course.isArcade ? <Gamepad2 className="w-4 h-4 mr-2" /> : <FileText className="w-4 h-4 mr-2" />}
        {course.isArcade ? 'Game Page' : 'Course Page'}
      </a>
      {/* Accordion */}
      <Accordion>
        <AccordionItem>
          <AccordionTrigger
            value={accordionValue}
            className="bg-gray-100 text-gray-600 text-sm rounded-lg font-medium hover:bg-gray-200/70 relative z-10"
          >
            <span className="flex items-center">
              <FlaskConical className="w-4 h-4 mr-2" />
              {course.isArcade ? 'View All Game Labs' : 'View All Labs & Solutions'}
            </span>
          </AccordionTrigger>
          <AccordionContent value={accordionValue}>
            <div className="pt-3 space-y-2 relative z-10">
              {course.labs.map((lab, idx) => (
                <div key={idx} className="group/lab flex flex-col p-3 border border-gray-100 rounded-lg bg-white">
                  <div className="flex justify-between w-full items-center mb-2">
                    <span className="font-medium text-gray-700 text-sm">{lab.title}</span>
                    {/* Show REQUIRED only if title includes "Challenge" */}
                    {lab.title.includes("Challenge Lab") && (
  s                   <span className="px-2 py-0.5 text-xs font-bold text-red-700 bg-red-100 rounded-full">REQUIRED</span>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <a href={lab.startLabUrl} target="_blank" rel="noopener noreferrer" className="flex items-center px-3 py-1 text-xs font-medium text-green-700 bg-white rounded-md border border-green-300 hover:bg-green-50 transition-all">
                      <PlayCircle className="w-3 h-3 mr-1" /> Start Lab
                    </a>
                    {lab.solutionUrl && (
                      <a href={lab.solutionUrl} target="_blank" rel="noopener noreferrer" className="flex items-center px-3 py-1 text-xs font-medium text-blue-700 bg-white rounded-md border border-blue-300 hover:bg-blue-50 transition-all">
                        <CheckCircle className="w-3 h-3 mr-1" /> Solution
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

// --- NAVBAR BUTTON COMPONENT (Theme Rectified) ---
const NavButton: React.FC<{ icon: React.ReactElement; text: string; active?: boolean }> = ({ icon, text, active = false }) => (
    // Rectified: Reduced vertical padding
    <button className={`group flex flex-col items-center justify-center py-2 px-4 transition-colors relative ${active ? 'text-blue-600' : 'text-gray-500 hover:text-gray-900'}`}>
       {active && <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-blue-600 rounded-b-full"></span>}
        {React.cloneElement(icon, { className: `w-5 h-5 mb-0.5` })} {/* Reduced icon size/margin */}
      <span className={`text-[10px] font-medium relative ${active ? 'font-semibold' : ''}`}>{text}</span> {/* Smaller text */}
    </button>
);

// --- MAIN SYLLABUS PAGE COMPONENT (Theme Rectified) ---
const SyllabusPage: React.FC = () => {
    // Removed WhatsApp state

  return (
    <div className="min-h-screen bg-white text-gray-900 pb-24 bg-[linear-gradient(to_right,theme(colors.gray.200)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.gray.200)_1px,transparent_1px)] bg-[size:40px_40px]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
                 <div className="w-12 h-12 rounded-2xl flex items-center justify-center overflow-hidden bg-white p-1 border border-gray-200">
                     <svg viewBox="0 0 260 140" className="w-full h-full">
                       <path d="M50,20 L30,40 L30,100 L50,120 L30,120 L30,140 L50,140 L70,120 L70,60 L50,40 Z" fill="#EA4335"/>
                       <path d="M90,20 L70,40 L70,100 L90,120 L110,100 L110,40 Z" fill="#4285F4"/>
                       <path d="M130,20 L110,40 L110,100 L130,120 L150,100 L150,40 Z" fill="#34A853"/>
                       <path d="M170,20 L150,40 L150,100 L170,120 L190,100 L190,40 Z" fill="#FBBC04"/>
                     </svg>
                 </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Google Cloud</h1>
                  <p className="text-xs text-gray-500">Campaign 2025</p>
                </div>
            </div>
            <a
                href={resourcesData.find(r => r.text === "Join WhatsApp Group")?.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium text-sm transition-all hover:shadow-md"
            >
                <FaWhatsapp className="w-4 h-4" />
                 <span>Join Group</span>
             </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-6 relative">
        {/* Title Section */}
         <div className="bg-white rounded-xl p-6 mb-6 text-center border border-gray-100 shadow-sm relative overflow-hidden">
           <h2 className="text-3xl font-bold mb-2 flex items-center justify-center relative z-10 text-gray-800">
             Campaign Syllabus & Solutions <Book className="w-7 h-7 ml-2 text-blue-500 inline-block"/>
           </h2>
           <p className="text-gray-500 text-base relative z-10">
             Complete guide to all 20 courses with solutions and resources!
           </p>
         </div>

        {/* Alert Box */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 flex items-center text-yellow-800 font-medium text-sm">
          <AlertTriangle className="w-5 h-5 mr-3 flex-shrink-0 text-yellow-500" />
          <div>
            Labs not opening? Getting errors? <a href="https://docs.google.com/spreadsheets/d/e/2PACX-1vRB406SGkUY4Q5jRqYBSZqRGfsK6MsESzdtbHaoXnYT3isC2CcBFrloYq3gcO61Gbw58qSw9RB4FXoM/pubhtml?gid=0&single=true" target="_blank" rel="noopener noreferrer" className="text-yellow-700 underline hover:text-yellow-600 font-semibold">Open from here!</a>
          </div>
        </div>

        {/* Syllabus Google Sheet Link */}
        <a href="https://docs.google.com/spreadsheets/d/e/2PACX-1vRB406SGkUY4Q5jRqYBSZqRGfsK6MsESzdtbHaoXnYT3isC2CcBFrloYq3gcO61Gbw58qSw9RB4FXoM/pubhtml?gid=0&single=true" target="_blank" rel="noopener noreferrer" className="group/link bg-gray-50 border border-gray-200 rounded-lg p-5 mb-8 hover:border-blue-400 transition-all relative block hover:bg-white hover:shadow-sm">
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center transition-all">
                <ClipboardList className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-0.5 transition-all">📊 Complete Campaign Syllabus</h3>
                <p className="text-gray-500 text-sm transition-colors">View full syllabus with all courses, labs, and solution links in one place!</p>
              </div>
            </div>
            <ChevronRight className="w-6 h-6 text-gray-400 group-hover/link:text-blue-500 transition-all" />
          </div>
        </a>

        {/* Bottom Navigation */}
        {/* Rectified: Navbar Styling */}
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-auto max-w-[90%] bg-white border border-gray-200 z-50 shadow-lg rounded-full flex justify-center">
            {/* Adjusted max-width and centering */}
            <NavButton icon={<Home />} text="Home" />
            <NavButton icon={<BookOpenCheck />} text="Syllabus" active />
            <NavButton icon={<Trophy />} text="Leaderboard" />
            <NavButton icon={<Users />} text="Winners" />
            <NavButton icon={<FileText />} text="Completion Guide" />
        </div>

        {/* Dynamic Sections from Data */}
        {syllabusData.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-12 relative">
                <h2 className="text-2xl font-semibold mb-5 flex items-center text-gray-800">
                    {React.cloneElement(section.icon, { className: 'w-7 h-7 mr-2.5' })}
                    {section.category} ({section.courses.length} Course{section.courses.length > 1 ? 's' : ''})
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {section.courses.map(course => (
                        <CourseCard key={course.num} course={course} />
                    ))}
                </div>
            </div>
        ))}

        {/* Resources Section */}
        <div className="mb-12 relative">
          <h2 className="text-2xl font-semibold mb-5 flex items-center text-gray-800">
            <Pin className="w-7 h-7 mr-2.5 text-blue-600" />
            Important Resources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {resourcesData.map((resource, index) => (
               <a key={index} href={resource.url} target="_blank" rel="noopener noreferrer" className={`group bg-white p-5 rounded-lg flex items-center text-gray-800 font-medium border border-gray-200 hover:border-${index === 0 ? 'purple' : index === 1 ? 'blue' : 'green'}-300 transition-all relative hover:shadow-sm`}>
                {React.cloneElement(resource.icon, { className: `w-6 h-6 mr-3 text-${index === 0 ? 'purple' : index === 1 ? 'blue' : 'green'}-600 relative z-10 transition-all` })}
                <span className={`flex-1 relative z-10 group-hover:text-${index === 0 ? 'purple' : index === 1 ? 'blue' : 'green'}-700 transition-colors text-sm`}>{resource.text}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SyllabusPage;




