import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Papa from 'papaparse';

interface Winner {
  id: number;
  name: string;
  avatar: string;
  rank: number;
  badge?: string;
  proofSent?: boolean;
}

const Winners = () => {
  const [winners, setWinners] = useState<Winner[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  // Google Sheets CSV URL
  const SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRpmW5aXF3MXdxw-tvh7C7L8lYBWCs23jFwBztWGMzqxhf_syNYLf7fkKWgg3wnw1jkEeSKHpIEDpDo/pub?output=csv";

  useEffect(() => {
    const fetchWinners = async () => {
      try {
        setLoading(true);
        const response = await fetch(SHEET_CSV_URL);
        const csv = await response.text();
        
        Papa.parse(csv, {
          header: true,
          complete: (results) => {
            const participants = results.data.map((row: any) => {
              const name = row['User Name'] || row['Name'] || row['Student Name'] || '';
              const badges = parseInt(row['# of Skill Badges Completed'] || row['Badges'] || '0');
              const arcadeGames = parseInt(row['# of Arcade Games Completed'] || '0');
              const totalScore = badges + arcadeGames;
              
              // Check if marked as completed in the sheet OR if they actually have 20/20
              const allLabsDone = row['All Skill Badges & Games Completed']?.toLowerCase() === 'yes';
              const completed = allLabsDone || totalScore >= 20;
              
              const proofSent = row['Access Code Redemption Status'] === 'Redeemed' || 
                              row['Profile URL Status'] === 'Valid';
              
              return {
                name,
                badges,
                arcadeGames,
                totalScore: allLabsDone ? 20 : totalScore, // Show 20 if marked as completed
                completed,
                proofSent
              };
            });

            // Log for debugging
            console.log('Total participants:', participants.length);
            console.log('Completed 20/20:', participants.filter((p: any) => p.completed).length);
            console.log('Proof sent:', participants.filter((p: any) => p.proofSent).length);
            console.log('Both completed AND proof sent:', participants.filter((p: any) => p.completed && p.proofSent).length);

            // Show ALL participants who completed 20/20 courses
            const qualifiedWinners = participants
              .filter((p: any) => p.completed && p.name) // Only require completion, not proof
              .map((p: any, index: number) => ({
                id: index + 1,
                name: p.name,
                avatar: '',
                rank: index + 1,
                badge: index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : undefined,
                proofSent: p.proofSent
              }));

            console.log('Qualified winners:', qualifiedWinners.length);

            setWinners(qualifiedWinners);
            setLastUpdated(new Date().toLocaleString());
            setLoading(false);
          },
          error: (error: any) => {
            console.error('Error parsing CSV:', error);
            // Fallback to empty array
            setWinners([]);
            setLastUpdated(new Date().toLocaleString());
            setLoading(false);
          }
        });
      } catch (error) {
        console.error('Error fetching data:', error);
        setWinners([]);
        setLastUpdated(new Date().toLocaleString());
        setLoading(false);
      }
    };

    fetchWinners();
    
    // Auto-refresh every 60 seconds
    const interval = setInterval(fetchWinners, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Header Section */}
      <div className="relative px-4 py-8 md:py-12">
        {/* Navigation Icons */}
        <div className="absolute top-4 left-4">
          <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center border border-gray-200">
          </div>
        </div>
        
        <div className="absolute top-4 right-4">
          <Button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-semibold">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
            </svg>
            Join Group
          </Button>
        </div>

        {/* Main Header */}
        <div className="text-center mt-8 mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            🎁 Winners Hall of Fame
          </h1>
          <p className="text-gray-700 text-lg md:text-xl mb-6">
            Celebrating our champions who completed all 20 courses! 🎉
          </p>
        </div>

        {/* Winners Badge */}
        <div className="flex justify-center mb-8">
          <div className="bg-yellow-400 text-black px-6 py-3 rounded-full font-bold text-lg animate-pulse">
            🏆 WINNERS
          </div>
        </div>

        {/* Main Title */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            These Students Are Getting Swags! 🎉
          </h2>
          <p className="text-gray-600 text-lg">
            Want to be here? Complete all 20 courses + Send screenshot in WhatsApp group!
          </p>
          <p className="text-yellow-600 font-semibold mt-2">
            👇 Check who made it 👇
          </p>
        </div>

        {/* Last Updated */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-100 border border-gray-300 rounded-full px-6 py-3 text-gray-700">
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                Loading winners...
              </div>
            ) : lastUpdated ? (
              `Last updated: ${lastUpdated}`
            ) : (
              'Winners will be updated soon'
            )}
          </div>
        </div>
      </div>

      {/* Winners Grid */}
      <div className="px-4 pb-24">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500 mb-4"></div>
              <p className="text-gray-600 text-lg">Loading winners...</p>
            </div>
          ) : winners.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="text-6xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">No Winners Yet!</h3>
              <p className="text-gray-600 text-lg mb-6">Be the first to complete all 20 courses and send proof!</p>
              <Link to="/leaderboard/table">
                <Button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full font-semibold">
                  View Leaderboard
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-4 md:gap-6">
              {winners.map((winner) => (
                <div
                  key={winner.id}
                  className="relative bg-gray-50 border-2 border-gray-300 rounded-3xl p-6 text-center transition-all duration-300 hover:shadow-xl aspect-[3/4] flex flex-col justify-between"
                >
                  <div className="flex-1 flex flex-col justify-center items-center">
                    {/* Avatar with Initials */}
                    <div className="mb-4">
                      <div className={`w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-2xl border-4 ${
                        winner.rank === 1 
                          ? 'bg-gradient-to-br from-yellow-400 to-orange-500 border-yellow-400' 
                          : winner.rank === 2 
                          ? 'bg-gradient-to-br from-gray-400 to-gray-600 border-gray-400'
                          : winner.rank === 3
                          ? 'bg-gradient-to-br from-orange-400 to-red-500 border-orange-400'
                          : 'bg-gradient-to-br from-blue-400 to-purple-500 border-blue-400'
                      }`}>
                        {winner.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </div>
                    </div>

                    {/* Name */}
                    <h3 className="font-bold text-lg text-gray-800 mb-4 leading-tight">
                      {winner.name}
                    </h3>
                  </div>

                  {/* Status Buttons */}
                  <div className="space-y-2">
                    <div className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      ✓ All Labs Completed
                    </div>
                    {winner.proofSent ? (
                      <>
                        <div className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                          ✓ Proof Sent
                        </div>
                        <div className="bg-yellow-400 text-black px-4 py-2 rounded-full text-sm font-bold">
                          SWAG CONFIRMED ✓
                        </div>
                      </>
                    ) : (
                      <div className="bg-yellow-400 text-black px-4 py-2 rounded-full text-sm font-bold">
                        SWAG CONFIRMED ✓
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* How to Get Swags Instructions */}
      <div className="relative bg-white p-6 shadow-lg mb-32 rounded-lg mx-16 overflow-hidden">
        {/* Moving Border Animation */}
        <div className="absolute inset-0 rounded-lg">
          <div 
            className="absolute inset-0 rounded-lg border-4 border-transparent"
            style={{
              background: 'linear-gradient(45deg, #3b82f6, #8b5cf6, #ef4444, #10b981, #f59e0b, #3b82f6)',
              backgroundSize: '400% 400%',
              animation: 'movingBorder 4s ease-in-out infinite',
              padding: '2px'
            }}
          >
            <div className="w-full h-full bg-white rounded-md"></div>
          </div>
        </div>
        
        <style dangerouslySetInnerHTML={{
          __html: `
            @keyframes movingBorder {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
          `
        }} />
        
        {/* Content Container */}
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              🤔 How to Get Swags?
            </h3>
          </div>

          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-3">
                1
              </div>
              <div className="mb-3">
                <div className="text-4xl mb-2">📚</div>
              </div>
              <h4 className="font-bold text-gray-800 mb-2">Complete Courses</h4>
              <p className="text-sm text-gray-600 mb-1">
                Finish all <span className="text-green-500 font-semibold">20 courses</span>
              </p>
              <p className="text-xs text-gray-500">
                (19 badges + 1 game)
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-3">
                2
              </div>
              <div className="mb-3">
                <div className="text-4xl mb-2">📷</div>
              </div>
              <h4 className="font-bold text-gray-800 mb-2">Take Screenshot</h4>
              <p className="text-sm text-gray-600 mb-1">
                Capture your <span className="text-blue-500 font-semibold">completion page</span>
              </p>
              <p className="text-xs text-gray-500">
                showing 20/20
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-3">
                3
              </div>
              <div className="mb-3">
                <div className="text-4xl mb-2">📱</div>
              </div>
              <h4 className="font-bold text-gray-800 mb-2">Send in Group</h4>
              <p className="text-sm text-gray-600 mb-1">
                Post screenshot in our
              </p>
              <p className="text-xs text-green-500 font-semibold">
                WhatsApp Group
              </p>
            </div>

            {/* Step 4 */}
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-3">
                4
              </div>
              <div className="mb-3">
                <div className="text-4xl mb-2">🎁</div>
              </div>
              <h4 className="font-bold text-gray-800 mb-2">Get Swags!</h4>
              <p className="text-sm text-gray-600 mb-1">
                Your name appears here
              </p>
              <p className="text-xs text-green-500 font-semibold">
                Swags confirmed!
              </p>
            </div>
          </div>

          {/* Important Announcement */}
          <div className="bg-gray-900 border-2 border-red-500 rounded-xl p-4 mt-6 mx-4 transform transition-transform duration-1000"
               style={{
                 animation: 'zoomInOut 3s ease-in-out infinite'
               }}>
            <div className="text-center">
              <span className="text-yellow-400 font-bold text-lg">⚠️ Important:</span>
              <span className="text-white font-semibold"> Completing courses is </span>
              <span className="text-white font-bold">NOT ENOUGH!</span>
              <span className="text-white font-semibold"> You </span>
              <span className="text-white font-bold">MUST</span>
              <span className="text-white font-semibold"> send proof in </span>
              <span className="text-green-400 font-bold underline flex items-center justify-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
                WhatsApp group
              </span>
              <span className="text-white font-semibold"> to get swags!</span>
            </div>
          </div>
          
          <style dangerouslySetInnerHTML={{
            __html: `
              @keyframes zoomInOut {
                0% { transform: scale(1); }
                50% { transform: scale(1.05); }
                100% { transform: scale(1); }
              }
            `
          }} />
        </div>
      </div>

      {/* Ready to Join the Winners Section */}
      <div className="py-16 px-6 mb-32">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-cyan-400">Ready to </span>
            <span className="text-green-400">Join </span>
            <span className="text-yellow-400">the </span>
            <span className="text-orange-400">Winners?</span>
            <span className="text-2xl ml-2">🚀</span>
          </h2>
          
          <p className="text-gray-600 text-lg mb-10">
            Start your journey now and earn your swags!
          </p>
          
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            {/* View Syllabus Button */}
            <Link to="/syllabus">
              <button 
                className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg flex items-center gap-3"
              >
                <span className="text-xl">📚</span>
                View Syllabus
              </button>
            </Link>
            
            {/* Join WhatsApp Group Button */}
            <button 
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg flex items-center gap-3"
              onClick={() => window.open('https://chat.whatsapp.com/JA9clPhV4gz3bJekLY3t9a?mode=wwc', '_blank')}
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
              Join WhatsApp Group
            </button>
            
            {/* Check Leaderboard Button */}
            <Link to="/leaderboard/table">
              <button 
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg flex items-center gap-3"
              >
                <span className="text-xl">📊</span>
                Check Leaderboard
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Winners;
