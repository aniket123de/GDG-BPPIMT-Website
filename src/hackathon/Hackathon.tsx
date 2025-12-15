import { useState, useEffect } from 'react';

const Hackathon = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const targetDate = new Date('2025-12-31T05:30:00+05:30').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-8 md:p-12">
          <div className="flex flex-col items-center justify-center space-y-6">
            {/* Registration Deadline Banner */}
            <div className="bg-gradient-to-r from-red-500 via-orange-500 to-red-500 text-white px-6 py-3 rounded-full shadow-lg">
              <p className="text-lg font-bold flex items-center justify-center gap-2">
                 Registration Closes: <span className="text-xl">31st December 2025</span>
              </p>
            </div>

            <h2 className="text-3xl font-semibold text-gray-800">
              Participate and Win Exciting Prizes!
            </h2>

            <a 
              href="https://vision.hack2skill.com/event/gdgoc-25-techsprint-bppimt?utm_source=hack2skill&utm_medium=homepage"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-700 text-white text-xl font-semibold px-8 py-4 rounded-lg transition-all transform hover:scale-105 shadow-lg"
            >
              Register Now
            </a>
          </div>
        </div>

        {/* Team Formation Guide */}
        <div className="mt-12 bg-white rounded-lg shadow-xl p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Steps to register
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Create a Team */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border border-green-200">
              <h3 className="text-xl font-semibold text-green-800 mb-4 flex items-center gap-2">
                 Create a Team (Leader)
              </h3>
              <ol className="space-y-3 text-gray-700">
                <li className="flex gap-2">
                  <span className="font-semibold">1️⃣</span>
                  <span>Dashboard → <strong>Team Management</strong></span>
                </li>
                <li className="flex gap-2">
                  <span className="font-semibold">2️⃣</span>
                  <span><strong>Create Team</strong> → I Understand</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-semibold">3️⃣</span>
                  <span>Enter <strong>Team Name</strong> → Create</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-semibold">✅</span>
                  <span>You become <strong>Team Leader</strong></span>
                </li>
              </ol>
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                   Once created, you <strong>can't join another team</strong>
                </p>
              </div>
            </div>

            {/* Invite Members */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
              <h3 className="text-xl font-semibold text-blue-800 mb-4 flex items-center gap-2">
                 Invite Members
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>Share <strong>Team Invite Link</strong></span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-xl">OR</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>Send invite via <strong>registered email</strong></span>
                </li>
              </ul>
            </div>

            {/* Join a Team */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg border border-purple-200">
              <h3 className="text-xl font-semibold text-purple-800 mb-4 flex items-center gap-2">
                 Join a Team
              </h3>
              <ol className="space-y-3 text-gray-700">
                <li className="flex gap-2">
                  <span className="font-semibold">1️⃣</span>
                  <span>Team Management → <strong>Looking for a Team</strong></span>
                </li>
                <li className="flex gap-2">
                  <span className="font-semibold">2️⃣</span>
                  <span>Search team → <strong>Request to Join</strong></span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-xl">OR</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>Ask leader for invite link/email</span>
                </li>
              </ol>
            </div>

            {/* Note */}
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg border border-orange-200">
              <h3 className="text-xl font-semibold text-orange-800 mb-4 flex items-center gap-2">
                 Important Notes
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>1 team = 1 submission</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>Any member can submit</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>Last submission counts 🚀</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="mt-12 bg-white rounded-lg shadow-xl p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Event Timeline
          </h2>
          
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-blue-500 transform md:-translate-x-1/2"></div>
            
            <div className="space-y-8">
              {/* Registration */}
              <div className="relative flex items-center md:justify-start">
                <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-blue-500 rounded-full border-4 border-white shadow-lg transform -translate-x-2 md:-translate-x-2"></div>
                <div className="ml-20 md:ml-0 md:w-1/2 md:pr-8 md:text-right">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200 shadow-md">
                    <p className="text-sm font-semibold text-blue-600 mb-2">14 Dec 25 - 31 Dec 25</p>
                    <h3 className="text-xl font-bold text-gray-800">Registration</h3>
                  </div>
                </div>
              </div>

              {/* Team Formation */}
              <div className="relative flex items-center md:justify-end">
                <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-blue-500 rounded-full border-4 border-white shadow-lg transform -translate-x-2 md:-translate-x-2"></div>
                <div className="ml-20 md:ml-0 md:w-1/2 md:pl-8">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200 shadow-md">
                    <p className="text-sm font-semibold text-blue-600 mb-2">14 Dec 25 - 31 Dec 25</p>
                    <h3 className="text-xl font-bold text-gray-800">Team Formation</h3>
                  </div>
                </div>
              </div>

              {/* Project Submission */}
              <div className="relative flex items-center md:justify-start">
                <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-blue-500 rounded-full border-4 border-white shadow-lg transform -translate-x-2 md:-translate-x-2"></div>
                <div className="ml-20 md:ml-0 md:w-1/2 md:pr-8 md:text-right">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200 shadow-md">
                    <p className="text-sm font-semibold text-blue-600 mb-2">01 Jan 26 - 05 Jan 26</p>
                    <h3 className="text-xl font-bold text-gray-800">Project Submission</h3>
                  </div>
                </div>
              </div>

              {/* Hacking & Pitching Round */}
              <div className="relative flex items-center md:justify-end">
                <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-blue-500 rounded-full border-4 border-white shadow-lg transform -translate-x-2 md:-translate-x-2"></div>
                <div className="ml-20 md:ml-0 md:w-1/2 md:pl-8">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200 shadow-md">
                    <p className="text-sm font-semibold text-blue-600 mb-2">10 Jan 26</p>
                    <h3 className="text-xl font-bold text-gray-800">Hacking & Pitching Round</h3>
                  </div>
                </div>
              </div>

              {/* Improvement - Round 2 Evaluation */}
              <div className="relative flex items-center md:justify-start">
                <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-blue-500 rounded-full border-4 border-white shadow-lg transform -translate-x-2 md:-translate-x-2"></div>
                <div className="ml-20 md:ml-0 md:w-1/2 md:pr-8 md:text-right">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200 shadow-md">
                    <p className="text-sm font-semibold text-blue-600 mb-2">11 Jan 26 - 12 Jan 26</p>
                    <h3 className="text-xl font-bold text-gray-800">Improvement - Round 2 Evaluation</h3>
                  </div>
                </div>
              </div>

              {/* Top 3 Announcement - Final */}
              <div className="relative flex items-center md:justify-end">
                <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-blue-500 rounded-full border-4 border-white shadow-lg transform -translate-x-2 md:-translate-x-2"></div>
                <div className="ml-20 md:ml-0 md:w-1/2 md:pl-8">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200 shadow-md">
                    <p className="text-sm font-semibold text-blue-600 mb-2">13 Jan 26 - 14 Jan 26</p>
                    <h3 className="text-xl font-bold text-gray-800">Top 3 Announcement - Final</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Countdown and Register Button */}
        <div className="mt-12 bg-white rounded-lg shadow-xl p-8 md:p-12">
          <div className="flex flex-col items-center justify-center space-y-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center">
              Registration Closes In
            </h2>
            
            {/* Countdown Timer */}
            <div className="grid grid-cols-4 gap-4 md:gap-8">
              <div className="flex flex-col items-center">
                <div className="bg-gradient-to-br from-red-500 to-red-600 text-white rounded-lg p-4 md:p-6 shadow-lg min-w-[70px] md:min-w-[100px]">
                  <p className="text-3xl md:text-5xl font-bold">{timeLeft.days}</p>
                </div>
                <p className="text-sm md:text-base font-semibold text-gray-700 mt-2">Days</p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg p-4 md:p-6 shadow-lg min-w-[70px] md:min-w-[100px]">
                  <p className="text-3xl md:text-5xl font-bold">{timeLeft.hours}</p>
                </div>
                <p className="text-sm md:text-base font-semibold text-gray-700 mt-2">Hours</p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg p-4 md:p-6 shadow-lg min-w-[70px] md:min-w-[100px]">
                  <p className="text-3xl md:text-5xl font-bold">{timeLeft.minutes}</p>
                </div>
                <p className="text-sm md:text-base font-semibold text-gray-700 mt-2">Minutes</p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="bg-yellow-400 text-gray-900 rounded-lg p-4 md:p-6 shadow-lg min-w-[70px] md:min-w-[100px]">
                  <p className="text-3xl md:text-5xl font-bold">{timeLeft.seconds}</p>
                </div>
                <p className="text-sm md:text-base font-semibold text-gray-700 mt-2">Seconds</p>
              </div>
            </div>

            {/* Register Button */}
            <a 
              href="https://vision.hack2skill.com/event/gdgoc-25-techsprint-bppimt?utm_source=hack2skill&utm_medium=homepage"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-700 text-white text-xl font-semibold px-8 py-4 rounded-lg transition-all transform hover:scale-105 shadow-lg"
            >
              Register Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hackathon;
