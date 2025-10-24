import { motion } from 'framer-motion';
import { FaCheckCircle, FaClock, FaBan, FaPercentage, FaSearch, FaCalendarAlt, FaComments, FaStepForward, FaLightbulb, FaGlobe, FaEye, FaGift, FaStar } from 'react-icons/fa';
import { Footer } from '../components';
import Squares from '../components/Squares';
import AmongUsButton from '../components/AmongUsButton';

const Rules = () => {
    return (
        <div className="min-h-screen bg-white font-GSD_Regular relative overflow-hidden">
            {/* Squares grid background */}
            <div className="absolute inset-0 z-0">
                <Squares
                    direction="down"
                    speed={0.1}
                    squareSize={70}
                    borderColor="#C8C3C1"
                    hoverFillColor="#ea4335"
                    hoverColors={["#4285f4", "#34a853", "#f9ab00", "#ea4335"]}
                />
            </div>

            {/* Header Section */}
            <div className="relative bg-transparent pt-20 pb-8 z-10">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <div className="flex items-center justify-center mb-4">
                        <span className="text-4xl mr-3">📋</span>
                        <h1 className="text-4xl md:text-5xl font-bold text-black">Rules & Guidelines</h1>
                    </div>
                    <p className="text-grey-700 text-lg max-w-2xl mx-auto">
                        Master the labs with these proven tips and essential rules! 🚀
                    </p>

                    {/* Join Group Button */}
                    <div className="mt-6">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-yellow-400 hover:bg-yellow-500 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 border-2 border-black shadow-lg text-lg"
                            onClick={() => {
                                // TODO: Add join group redirect
                                console.log('Join Group clicked');
                            }}
                        >
                            💬 Join Group
                        </motion.button>
                    </div>
                </div>
            </div>

            {/* Redeem Section */}
            <div className="py-12 bg-white/90 backdrop-blur-sm relative z-10">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="bg-white rounded-2xl p-8 border border-grey-100 shadow-lg">
                        <div className="flex flex-col md:flex-row items-center justify-between">
                            <div className="flex items-center mb-4 md:mb-0">
                                <span className="text-4xl mr-4">💳</span>
                                <div>
                                    <h3 className="text-xl font-bold text-black">Haven't Redeemed Your Google Cloud Credits?</h3>
                                    <p className="text-grey-700">If you haven't redeemed your Google Cloud credits yet, click below to get started!</p>
                                </div>
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-yellow-400 hover:bg-yellow-500 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 border-2 border-black shadow-lg flex items-center gap-2"
                                onClick={() => {
                                    // TODO: Add Google Cloud credits redemption redirect
                                    console.log('Redeem credits clicked');
                                }}
                            >
                                💳 Redeem Now
                            </motion.button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Easy Steps Section */}
            <div className="py-16 bg-transparent relative z-10">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                            Easy Steps for Completing Labs
                        </h2>
                        <p className="text-grey-700 text-lg">
                            Follow these proven steps to complete any lab successfully! 🎯
                        </p>
                    </div>

                    <div className="grid gap-8 md:gap-12">
                        {/* Step 1 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-white rounded-2xl p-8 border border-grey-100 shadow-lg"
                        >
                            <div className="flex items-start">
                                <div className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mr-6 flex-shrink-0">
                                    1
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center mb-4">
                                        <span className="text-2xl mr-3">📄</span>
                                        <h3 className="text-2xl font-bold text-black">Copy the Lab Code</h3>
                                    </div>
                                    <p className="text-grey-700 text-lg mb-4">
                                        Copy the code of that lab (e.g., <span className="text-blue-500 font-mono">gsp421</span>)
                                    </p>
                                    <div className="bg-grey-100 rounded-lg p-4 border-l-4 border-green-500">
                                        <p className="text-green-600 font-semibold">
                                            <strong>Example:</strong> Look for codes like GSP421, GSP313, etc.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Step 2 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white rounded-2xl p-8 border border-grey-100 shadow-lg"
                        >
                            <div className="flex items-start">
                                <div className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mr-6 flex-shrink-0">
                                    2
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center mb-4">
                                        <FaSearch className="text-2xl mr-3 text-blue-500" />
                                        <h3 className="text-2xl font-bold text-black">Search on YouTube</h3>
                                    </div>
                                    <p className="text-grey-700 text-lg mb-4">
                                        Search the lab code on YouTube to find solution videos
                                    </p>
                                    <div className="bg-grey-100 rounded-lg p-4 border-l-4 border-green-500">
                                        <p className="text-green-600 font-semibold">
                                            <strong>Search:</strong> "gsp421 solution" or "gsp421 quicklab"
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Step 3 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-white rounded-2xl p-8 border border-grey-100 shadow-lg"
                        >
                            <div className="flex items-start">
                                <div className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mr-6 flex-shrink-0">
                                    3
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center mb-4">
                                        <FaCalendarAlt className="text-2xl mr-3 text-red-500" />
                                        <h3 className="text-2xl font-bold text-black">Look for Latest Video</h3>
                                    </div>
                                    <p className="text-grey-700 text-lg mb-4">
                                        Look for the most recent video only (e.g., 1 month or 1 week ago)
                                    </p>
                                    <div className="bg-grey-100 rounded-lg p-4 border-l-4 border-yellow-500">
                                        <p className="text-yellow-600 font-semibold">
                                            💡 <strong>Tip:</strong> Use YouTube filters → Sort by "Upload date" → Select "This month" or "This week"
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Step 4 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="bg-white rounded-2xl p-8 border border-grey-100 shadow-lg"
                        >
                            <div className="flex items-start">
                                <div className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mr-6 flex-shrink-0">
                                    4
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center mb-4">
                                        <FaComments className="text-2xl mr-3 text-blue-500" />
                                        <h3 className="text-2xl font-bold text-black">Check Comments</h3>
                                    </div>
                                    <p className="text-grey-700 text-lg mb-4">
                                        Read the comments section to verify whether the solution is working or not
                                    </p>
                                    <div className="bg-grey-100 rounded-lg p-4 border-l-4 border-red-500">
                                        <p className="text-red-600 font-semibold">
                                            ⚠️ <strong>Important:</strong> If most comments say "not working," skip that video and find another one!
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Step 5 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="bg-white rounded-2xl p-8 border border-grey-100 shadow-lg"
                        >
                            <div className="flex items-start">
                                <div className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mr-6 flex-shrink-0">
                                    5
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center mb-4">
                                        <FaStepForward className="text-2xl mr-3 text-green-500" />
                                        <h3 className="text-2xl font-bold text-black">Follow Step by Step</h3>
                                    </div>
                                    <p className="text-grey-700 text-lg mb-4">
                                        Watch one step at a time and perform it on the actual lab carefully
                                    </p>
                                    <div className="bg-grey-100 rounded-lg p-4 border-l-4 border-yellow-500">
                                        <p className="text-yellow-600 font-semibold">
                                            💡 <strong>Pro Tip:</strong> Pause the video after each step, complete it in your lab, then continue!
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Important Rules Section */}
            <div className="py-16 bg-white/80 backdrop-blur-sm relative z-10">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                            ⚠️ MUST READ
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                            Important Rules to Follow
                        </h2>
                        <p className="text-grey-700 text-lg">
                            Keep these in mind to avoid any issues and ensure success! 🏆
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Incognito Mode */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-white rounded-2xl p-6 border border-grey-100 shadow-lg"
                        >
                            <div className="text-center mb-4">
                                <FaEye className="text-4xl text-blue-500 mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-black mb-2">Incognito Mode</h3>
                            </div>
                            <p className="text-grey-700 mb-4">
                                Open all labs in incognito window only (Google Cloud Console Student Emails)
                            </p>
                            <div className="bg-grey-100 rounded-lg p-3 text-sm">
                                <p className="text-blue-500 font-semibold">
                                    <strong>Setup:</strong> Lab page → Normal tab | Google Cloud Console → Incognito window
                                </p>
                            </div>
                        </motion.div>

                        {/* Chrome Browser */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white rounded-2xl p-6 border border-grey-100 shadow-lg"
                        >
                            <div className="text-center mb-4">
                                <FaGlobe className="text-4xl text-blue-500 mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-black mb-2">Use Chrome Browser</h3>
                            </div>
                            <p className="text-grey-700 mb-4">
                                Preferably use Chrome browser only, not other browsers
                            </p>
                            <div className="bg-grey-100 rounded-lg p-3 text-sm">
                                <p className="text-blue-500 font-semibold">
                                    <strong>Why?</strong> Google Cloud Console works best with Chrome for optimal compatibility
                                </p>
                            </div>
                        </motion.div>

                        {/* Minimum 6 Minutes */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-white rounded-2xl p-6 border border-grey-100 shadow-lg"
                        >
                            <div className="text-center mb-4">
                                <FaClock className="text-4xl text-grey-700 mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-black mb-2">Minimum 6 Minutes</h3>
                            </div>
                            <p className="text-grey-700 mb-4">
                                Spend at least 6 minutes on each lab before ending it
                            </p>
                            <div className="bg-grey-100 rounded-lg p-3 text-sm">
                                <p className="text-yellow-600 font-semibold">
                                    <strong>Why?</strong> Labs completed too quickly may be flagged as suspicious
                                </p>
                            </div>
                        </motion.div>

                        {/* One Lab at a Time */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="bg-white rounded-2xl p-6 border border-grey-100 shadow-lg"
                        >
                            <div className="text-center mb-4">
                                <FaBan className="text-4xl text-red-500 mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-black mb-2">One Lab at a Time</h3>
                            </div>
                            <p className="text-grey-700 mb-4">
                                Don't start two labs at once or simultaneously
                            </p>
                            <div className="bg-grey-100 rounded-lg p-3 text-sm">
                                <p className="text-red-600 font-semibold">
                                    <strong>Why?</strong> Multiple concurrent labs can cause errors and confuse the system
                                </p>
                            </div>
                        </motion.div>

                        {/* Complete 100% Score */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="bg-white rounded-2xl p-6 border border-red-500 shadow-lg"
                        >
                            <div className="text-center mb-4">
                                <FaPercentage className="text-4xl text-red-500 mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-black mb-2">Complete 100% Score</h3>
                            </div>
                            <p className="text-grey-700 mb-4">
                                Don't end the lab before getting all 100 points
                            </p>
                            <div className="bg-grey-100 rounded-lg p-3 text-sm">
                                <p className="text-red-600 font-semibold">
                                    <strong>Why?</strong> Incomplete labs won't count toward your final completion score
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Pro Tips Section */}
            <div className="py-16 bg-transparent relative z-10">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="bg-white rounded-2xl p-8 border border-grey-100 shadow-lg">
                        <div className="flex items-center mb-6">
                            <FaLightbulb className="text-4xl text-yellow-500 mr-4" />
                            <h2 className="text-3xl font-bold text-black">Pro Tips for Success</h2>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="flex items-start">
                                <FaCheckCircle className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                                <p className="text-grey-700">Always verify lab code before starting</p>
                            </div>
                            <div className="flex items-start">
                                <FaCheckCircle className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                                <p className="text-grey-700">Bookmark working video solutions</p>
                            </div>
                            <div className="flex items-start">
                                <FaCheckCircle className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                                <p className="text-grey-700">Keep your Cloud Skills Boost account logged in</p>
                            </div>
                            <div className="flex items-start">
                                <FaCheckCircle className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                                <p className="text-grey-700">Take breaks between labs to avoid fatigue</p>
                            </div>
                            <div className="flex items-start">
                                <FaCheckCircle className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                                <p className="text-grey-700">Join WhatsApp group for help and updates</p>
                            </div>
                            <div className="flex items-start">
                                <FaCheckCircle className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                                <p className="text-grey-700">Screenshot your completion for proof</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Ready to Start Section */}
            <div className="py-16 bg-gradient-to-r from-blue-500 via-green-500 to-yellow-500 relative z-20">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Ready to <span className="text-green-200">Start</span> Your <span className="text-yellow-200">Journey</span>? 🚀
                    </h2>
                    <p className="text-white/90 text-lg mb-8">
                        Follow these rules and you'll complete all 20 courses in no time!
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-yellow-400 hover:bg-yellow-500 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 border-2 border-black shadow-lg text-lg min-w-[200px]"
                            onClick={() => {
                                // TODO: Add courses page redirect
                                console.log('View All Courses clicked');
                            }}
                        >
                            📚 View All Courses
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-yellow-400 hover:bg-yellow-500 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 border-2 border-black shadow-lg text-lg min-w-[200px]"
                            onClick={() => {
                                // TODO: Add WhatsApp group redirect
                                console.log('Join WhatsApp Group clicked');
                            }}
                        >
                            💬 Join WhatsApp Group
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-yellow-400 hover:bg-yellow-500 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 border-2 border-black shadow-lg text-lg min-w-[200px]"
                            onClick={() => {
                                // TODO: Add leaderboard redirect
                                console.log('Check Leaderboard clicked');
                            }}
                        >
                            🏆 See Leaderboard
                        </motion.button>
                    </div>
                </div>
            </div>



            {/* Floating Rewards Button */}
            <motion.div
                className="fixed bottom-8 right-8 z-50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                    y: [0, -10, 0]
                }}
                transition={{
                    y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                }}
            >
                <button
                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-6 py-3 rounded-full font-semibold shadow-lg border-2 border-black flex items-center gap-2 transition-all duration-300"
                    onClick={() => {
                        // TODO: Add rewards page redirect
                        console.log('Rewards button clicked');
                    }}
                >
                    <FaStar className="text-white" />
                    <span>Rewards</span>
                    <FaGift className="text-white" />
                </button>
            </motion.div>

            {/* Footer */}
            <div className="relative z-20 bg-white">
                <Footer />
            </div>
        </div>
    );
};

export default Rules;