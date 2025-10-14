"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";
import { teamMembers } from "../../data/team";

// Team Sidebar Components
export const Sidebar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { 
    open: boolean; 
    setOpen: (open: boolean) => void;
  }
>(({ className, children, open, setOpen, ...props }, ref) => {
  return (
    <div
      ref={ref}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className={cn(
        "relative flex h-full shrink-0 flex-col bg-white bg-opacity-40 backdrop-blur-md border border-white border-opacity-30 transition-all duration-300 ease-in-out shadow-lg rounded-r-2xl m-2 ml-0",
        open ? "w-[300px]" : "w-[70px]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

export const SidebarBody = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex h-full w-full flex-col overflow-hidden px-3 py-6",
      className
    )}
    {...props}
  >
    {children}
  </div>
));

export const SidebarLink = ({ 
  link, 
  className, 
  ...props 
}: { 
  link: { 
    label: string; 
    href?: string; 
    icon?: React.ReactNode;
    onClick?: () => void;
  };
  className?: string;
}) => {
  return (
    <button
      onClick={link.onClick}
      className={cn(
        "flex w-full items-center justify-start gap-3 rounded-lg p-3 text-sm font-medium text-gray-700 hover:bg-[#D8E2F9] hover:bg-opacity-50 transition-all duration-200",
        className
      )}
      {...props}
    >
      <div className="text-gray-800">
        {link.icon}
      </div>
      <motion.span
        animate={{
          display: "inline-block",
          opacity: 1,
        }}
        className="!m-0 inline-block whitespace-pre !p-0 text-sm font-GSD_Regular text-gray-800 transition duration-150"
      >
        {link.label}
      </motion.span>
    </button>
  );
};

// Team SVG icons with improved designs and black color matching site aesthetic
const TeamIcon = ({ team, className }: { team: string; className?: string }) => {
  const getTeamIcon = () => {
    switch (team.toLowerCase()) {
      case 'ai/ml':
        return (
          <svg className={cn("h-6 w-6 shrink-0", className)} viewBox="0 0 512 512" fill="currentColor">
            <g transform="translate(64.000000, 64.000000)">
              <path d="M320,64 L320,320 L64,320 L64,64 L320,64 Z M171.749388,128 L146.817842,128 L99.4840387,256 L121.976629,256 L130.913039,230.977 L187.575039,230.977 L196.319607,256 L220.167172,256 L171.749388,128 Z M260.093778,128 L237.691519,128 L237.691519,256 L260.093778,256 L260.093778,128 Z M159.094727,149.47526 L181.409039,213.333 L137.135039,213.333 L159.094727,149.47526 Z M341.333333,256 L384,256 L384,298.666667 L341.333333,298.666667 L341.333333,256 Z M85.3333333,341.333333 L128,341.333333 L128,384 L85.3333333,384 L85.3333333,341.333333 Z M170.666667,341.333333 L213.333333,341.333333 L213.333333,384 L170.666667,384 L170.666667,341.333333 Z M85.3333333,0 L128,0 L128,42.6666667 L85.3333333,42.6666667 L85.3333333,0 Z M256,341.333333 L298.666667,341.333333 L298.666667,384 L256,384 L256,341.333333 Z M170.666667,0 L213.333333,0 L213.333333,42.6666667 L170.666667,42.6666667 L170.666667,0 Z M256,0 L298.666667,0 L298.666667,42.6666667 L256,42.6666667 L256,0 Z M341.333333,170.666667 L384,170.666667 L384,213.333333 L341.333333,213.333333 L341.333333,170.666667 Z M0,256 L42.6666667,256 L42.6666667,298.666667 L0,298.666667 L0,256 Z M341.333333,85.3333333 L384,85.3333333 L384,128 L341.333333,128 L341.333333,85.3333333 Z M0,170.666667 L42.6666667,170.666667 L42.6666667,213.333333 L0,213.333333 L0,170.666667 Z M0,85.3333333 L42.6666667,85.3333333 L42.6666667,128 L0,128 L0,85.3333333 Z"/>
            </g>
          </svg>
        );
      case 'cloud':
        return (
          <svg className={cn("h-6 w-6 shrink-0", className)} viewBox="0 0 24 24" fill="none">
            <path d="M22 14.3529C22 17.4717 19.4416 20 16.2857 20H11M14.381 9.02721C14.9767 8.81911 15.6178 8.70588 16.2857 8.70588C16.9404 8.70588 17.5693 8.81468 18.1551 9.01498M7.11616 11.6089C6.8475 11.5567 6.56983 11.5294 6.28571 11.5294C3.91878 11.5294 2 13.4256 2 15.7647C2 18.1038 3.91878 20 6.28571 20H7M7.11616 11.6089C6.88706 10.9978 6.7619 10.3369 6.7619 9.64706C6.7619 6.52827 9.32028 4 12.4762 4C15.4159 4 17.8371 6.19371 18.1551 9.01498M7.11616 11.6089C7.68059 11.7184 8.20528 11.9374 8.66667 12.2426M18.1551 9.01498C18.8381 9.24853 19.4623 9.60648 20 10.0614" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        );
      case 'design':
        return (
          <svg className={cn("h-6 w-6 shrink-0", className)} viewBox="0 0 32 32" fill="currentColor">
            <path d="M8,9H4v3h4V9z M7,11H5v-1h2V11z M8,13H4v3h4V13z M7,15H5v-1h2V15z M6,17c-1.657,0-3,1.343-3,3 s1.343,3,3,3s3-1.343,3-3S7.657,17,6,17z M6,22c-1.103,0-2-0.897-2-2c0-1.103,0.897-2,2-2s2,0.897,2,2C8,21.103,7.103,22,6,22z M21.646,11.646l0.707,0.707l-2,2l-0.707-0.707L21.646,11.646z M31,4h-1.586l-1.707-1.707c-0.391-0.391-1.023-0.391-1.414,0 L24.586,4H1C0.448,4,0,4.448,0,5v22c0,0.552,0.448,1,1,1h30c0.552,0,1-0.448,1-1V5C32,4.448,31.552,4,31,4z M16,14v4h4l8-8v13H11V9 h10L16,14z M17,14.707L19.293,17H17V14.707z M20.146,16.439l-2.586-2.586L27,4.414L29.586,7L20.146,16.439z M2,26V6h22l-2,2H10v16 h19V9l1-1v18H2z"/>
          </svg>
        );
      case 'management':
        return (
          <svg className={cn("h-6 w-6 shrink-0", className)} fill="currentColor" viewBox="0 0 24 24">
            <path d="M16 4C18.2 4 20 5.8 20 8S18.2 12 16 12S12 10.2 12 8S13.8 4 16 4Z"/>
            <path d="M16 14C20.42 14 24 15.79 24 18V20H8V18C8 15.79 11.58 14 16 14Z"/>
            <circle cx="6" cy="10" r="4"/>
            <path d="M6 16C2.69 16 0 17.79 0 20V22H12V20C12 17.79 9.31 16 6 16Z"/>
          </svg>
        );
      case 'marketing':
        return (
          <svg className={cn("h-6 w-6 shrink-0", className)} fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.4,13.3C23,13.1,22.4,13,22,13.2l-1,0.4v-12C21,0.7,20.3,0,19.5,0h-2C16.7,0,16,0.7,16,1.5V3h-2.5C12.7,3,12,3.7,12,4.5 V8H9.5C8.7,8,8,8.7,8,9.5v5.2l-3,0.7v-0.3c0-0.6-0.3-1.1-0.8-1.3L3,13.2C2.8,12.5,2.2,12,1.5,12h-1C0.2,12,0,12.2,0,12.5v11 C0,23.8,0.2,24,0.5,24h1c0.7,0,1.3-0.5,1.5-1.2l1.2-0.6C4.6,22,4.9,21.5,5,21l4.8,2.8c0.2,0.1,0.5,0.2,0.8,0.2 c0.2,0,0.5-0.1,0.7-0.2l12-6.4c0.5-0.3,0.8-0.8,0.8-1.3v-1.5C24,14.1,23.8,13.6,23.4,13.3z M2,22.5C2,22.8,1.8,23,1.5,23H1V13h0.5 C1.8,13,2,13.2,2,13.5V22.5z M4,20.9c0,0.2-0.1,0.4-0.3,0.4L3,21.7v-7.4l0.7,0.4C3.9,14.8,4,14.9,4,15.1V20.9z M17,1.5 C17,1.2,17.2,1,17.5,1h2C19.8,1,20,1.2,20,1.5v12.4L17,15V1.5z M13,4.5C13,4.2,13.2,4,13.5,4H16v11.4l-1.4,0.5l-0.3-1.1 c-0.2-0.6-0.7-1-1.2-1.1V4.5z M9,9.5C9,9.2,9.2,9,9.5,9H12v4.8l-3,0.7V9.5z M23,16c0,0.2-0.1,0.4-0.3,0.4l-12,6.5 c-0.1,0.1-0.3,0.1-0.5,0L5,19.9v-3.5l7.7-1.7c0.3-0.1,0.5,0.1,0.6,0.4l0.5,1.6c0,0.1,0,0.3,0,0.4c-0.1,0.1-0.2,0.2-0.3,0.2l-3,0.7 c-0.3,0.1-0.4,0.3-0.4,0.6c0.1,0.2,0.3,0.4,0.5,0.4c0,0,0.1,0,0.1,0l3-0.7c0.4-0.1,0.7-0.4,0.9-0.7c0.1-0.2,0.2-0.4,0.2-0.6l7.6-2.8 c0.2-0.1,0.3,0,0.5,0.1c0.1,0.1,0.2,0.2,0.2,0.4V16z"/>
          </svg>
        );
      case 'tech':
        return (
          <svg className={cn("h-6 w-6 shrink-0", className)} fill="currentColor" viewBox="0 0 14 14">
            <path d="m 11.8,10.6 0,-7.2035638 C 11.8,2.7367083 11.264337,2.2 10.603564,2.2 l -7.2071278,0 C 2.7367083,2.2 2.2,2.7356627 2.2,3.3964362 L 2.2,10.6 1,10.6 1,11.2 c 0,0.333681 0.2664272,0.6 0.5950819,0.6 l 10.8098361,0 C 12.726816,11.8 13,11.531371 13,11.2 l 0,-0.6 -1.2,0 z m -8.4,-7.2 7.2,0 0,5.4 -7.2,0 0,-5.4 z m 2.4,6.6 2.4,0 0,0.6 -2.4,0 0,-0.6 z"/>
          </svg>
        );
      default:
        return (
          <svg className={cn("h-6 w-6 shrink-0", className)} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22S22 17.52 22 12S17.52 2 12 2Z"/>
            <path d="M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" fill="white"/>
          </svg>
        );
    }
  };

  return getTeamIcon();
};

export function TeamSidebar() {
  const [open, setOpen] = useState(false);

  // Group team members by teams and create scroll navigation
  const scrollToTeamSection = (teamName: string) => {
    const teamSection = document.getElementById(`team-section-${teamName.toLowerCase().replace('/', '-')}`);
    if (teamSection) {
      teamSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const teams = [
    { name: 'Tech', key: 'tech' },
    { name: 'Marketing', key: 'marketing' },
    { name: 'AI/ML', key: 'ai/ml' },
    { name: 'Cloud', key: 'cloud' },
    { name: 'Design', key: 'design' },
    { name: 'Management', key: 'management' }
  ];

  // Filter teams that actually have members
  const getTeamMembers = (teamName: string) => {
    return teamMembers.filter(member => 
      member.Role.toLowerCase().includes(teamName.toLowerCase())
    );
  };

  const links = teams
    .filter(team => getTeamMembers(team.name).length > 0)
    .map(team => ({
      label: team.name,
      icon: <TeamIcon team={team.key} />,
      onClick: () => scrollToTeamSection(team.name)
    }));

  return (
    <Sidebar open={open} setOpen={setOpen}>
      <SidebarBody className="justify-between gap-10">
        <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
          {open ? <Logo /> : <LogoIcon />}
          <div className="mt-6 flex flex-col gap-1">
            {links.map((link, idx) => (
              <SidebarLink key={idx} link={link} />
            ))}
          </div>
        </div>
      </SidebarBody>
    </Sidebar>
  );
}
export const Logo = () => {
  return (
    <div className="flex items-center space-x-3 py-4 px-2 text-base font-normal text-gray-800">
      <svg className="h-7 w-7 text-gray-800" fill="currentColor" viewBox="0 0 512 512">
        <g>
          <path d="M435.95,287.525c32.51,0,58.87-26.343,58.87-58.853c0-32.51-26.361-58.871-58.87-58.871 c-32.502,0-58.863,26.361-58.863,58.871C377.088,261.182,403.448,287.525,435.95,287.525z"/>
          <path d="M254.487,262.691c52.687,0,95.403-42.716,95.403-95.402c0-52.67-42.716-95.386-95.403-95.386 c-52.678,0-95.378,42.716-95.378,95.386C159.109,219.975,201.808,262.691,254.487,262.691z"/>
          <path d="M76.049,287.525c32.502,0,58.862-26.343,58.862-58.853c0-32.51-26.36-58.871-58.862-58.871 c-32.511,0-58.871,26.361-58.871,58.871C17.178,261.182,43.538,287.525,76.049,287.525z"/>
        </g>
      </svg>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-GSD_Regular font-bold whitespace-pre text-gray-800 text-lg"
      >
        Teams
      </motion.span>
    </div>
  );
};

export const LogoIcon = () => {
  return (
    <div className="flex items-center justify-center py-4">
      <svg className="h-7 w-7 text-gray-800" fill="currentColor" viewBox="0 0 512 512">
        <g>
          <path d="M435.95,287.525c32.51,0,58.87-26.343,58.87-58.853c0-32.51-26.361-58.871-58.87-58.871 c-32.502,0-58.863,26.361-58.863,58.871C377.088,261.182,403.448,287.525,435.95,287.525z"/>
          <path d="M511.327,344.251c-2.623-15.762-15.652-37.822-25.514-47.677c-1.299-1.306-7.105-1.608-8.673-0.636 c-11.99,7.374-26.074,11.714-41.19,11.714c-15.099,0-29.184-4.34-41.175-11.714c-1.575-0.972-7.373-0.67-8.672,0.636 c-2.757,2.757-5.765,6.427-8.698,10.683c7.935,14.94,14.228,30.81,16.499,44.476c2.27,13.7,1.533,26.67-2.138,38.494 c13.038,4.717,28.673,6.787,44.183,6.787C476.404,397.014,517.804,382.987,511.327,344.251z"/>
          <path d="M254.487,262.691c52.687,0,95.403-42.716,95.403-95.402c0-52.67-42.716-95.386-95.403-95.386 c-52.678,0-95.378,42.716-95.378,95.386C159.109,219.975,201.808,262.691,254.487,262.691z"/>
          <path d="M335.269,277.303c-2.07-2.061-11.471-2.588-14.027-1.006c-19.448,11.966-42.271,18.971-66.755,18.971 c-24.466,0-47.3-7.005-66.738-18.971c-2.555-1.583-11.956-1.055-14.026,1.006c-16.021,16.004-37.136,51.782-41.384,77.288 c-10.474,62.826,56.634,85.508,122.148,85.508c65.532,0,132.639-22.682,122.165-85.508 C372.404,329.085,351.289,293.307,335.269,277.303z"/>
          <path d="M76.049,287.525c32.502,0,58.862-26.343,58.862-58.853c0-32.51-26.36-58.871-58.862-58.871 c-32.511,0-58.871,26.361-58.871,58.871C17.178,261.182,43.538,287.525,76.049,287.525z"/>
          <path d="M115.094,351.733c2.414-14.353,9.225-31.253,17.764-46.88c-2.38-3.251-4.759-6.083-6.955-8.279 c-1.299-1.306-7.097-1.608-8.672-0.636c-11.991,7.374-26.076,11.714-41.182,11.714c-15.108,0-29.202-4.34-41.183-11.714 c-1.568-0.972-7.382-0.67-8.681,0.636c-9.887,9.854-22.882,31.915-25.514,47.677c-6.468,38.736,34.924,52.762,75.378,52.762 c14.437,0,29.016-1.777,41.459-5.84C113.587,379.108,112.757,365.835,115.094,351.733z"/>
        </g>
      </svg>
    </div>
  );
};
