import GithubIcon from '../assets/github.svg';
import LinkedinIcon from '../assets/linkedin.svg';

const TeamMember = ({MemberName, Role, Image, GithubLink, LinkedinLink, Bio} : {MemberName: string, Role: string, Image: any, GithubLink: string, LinkedinLink: string, Bio?: string}) => {
  return (
    <div className="team-member m-6 z-10 bg-white min-h-[300px] rounded-3xl border-[1px] border-black border-solid p-6 flex flex-col-reverse md:flex-row items-center justify-between gap-4 lg:gap-8">
      {/* Info section */}
      <div className="info flex flex-col justify-between w-full md:w-[45%] h-auto text-center md:text-left">
        {/* Member Name, Role, and Bio */}
        <div className="flex-1">
          <p className="font-bold text-2xl md:text-3xl lg:text-2xl xl:text-4xl 2xl:text-6xl pb-2">
            {MemberName}
          </p>
          <p className="text-xl lg:text-lg xl:text-2xl 2xl:text-4xl">{Role}</p>
          
          {/* Bio Description */}
          {Bio && (
            <p className="text-sm lg:text-xs xl:text-sm 2xl:text-base mt-3 text-gray-700 leading-snug">
              {Bio}
            </p>
          )}
        </div>

        {/* Social Media Links - Fixed at bottom */}
        <div className="flex justify-center md:justify-start gap-4 mt-4 flex-shrink-0">
          <a className="cursor-pointer" href={GithubLink} target="_blank">
            <img
              loading="lazy"
              src={GithubIcon}
              alt="github"
              className="w-6 h-6 lg:w-8 lg:h-8 xl:w-10 xl:h-10"
            />
          </a>
          <a className="cursor-pointer" href={LinkedinLink} target="_blank">
            <img
              loading="lazy"
              src={LinkedinIcon}
              alt="linkedin"
              className="w-6 h-6 lg:w-8 lg:h-8 xl:w-10 xl:h-10"
            />
          </a>
        </div>
      </div>

      {/* Image section */}
      <img
        loading="lazy"
        className="image profile rounded-2xl w-[100%] md:w-[45%] lg:w-[40%] xl:w-[35%] 2xl:w-[30%] aspect-square object-cover"
        src={Image}
        alt="TeamMember"
      />
    </div>
  );
};

export default TeamMember;
