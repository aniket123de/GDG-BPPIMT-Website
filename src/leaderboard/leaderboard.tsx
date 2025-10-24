import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Papa from 'papaparse';

interface Participant {
  rank: number;
  name: string;
  email: string;
  progress: number;
  badges: number;
  score: number;
  total: number;
  completed: boolean;
  lastUpdated: string;
  initials: string;
  proofSent?: boolean;
}

const Leaderboard: React.FC = () => {
  const [data, setData] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [autoRefresh] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(50);
  const [stats, setStats] = useState({
    above50Progress: 0,
    totalBadges: 0,
    completed: 0,
    averageProgress: 0,
    tier: 0,
    tierProgress: 0,
    nextTierThreshold: 50
  });

  // Google Sheets CSV URL
  const SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRpmW5aXF3MXdxw-tvh7C7L8lYBWCs23jFwBztWGMzqxhf_syNYLf7fkKWgg3wnw1jkEeSKHpIEDpDo/pub?output=csv";

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(SHEET_CSV_URL);
      const csv = await response.text();
      
      Papa.parse(csv, {
        header: true,
        complete: (results) => {
          const transformedData: Participant[] = results.data.map((row: any, index: number) => {
            // Extract initials from name - using actual Google Sheets column names
            const name = row['User Name'] || row['Name'] || row['Student Name'] || '';
            
            const initials = name ? name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2) : '??';
            
            // Parse numeric values - using actual Google Sheets column names
            const badges = parseInt(row['# of Skill Badges Completed'] || row['Badges'] || '0');
            const arcadeGames = parseInt(row['# of Arcade Games Completed'] || '0');
            const totalScore = badges + arcadeGames; // Total score is badges + arcade games
            const total = 20; // Assuming 20 is the max possible score
            const progress = total > 0 ? Math.round((totalScore / total) * 100) : 0;
            
            return {
              rank: index + 1,
              name: name || `Participant ${index + 1}`,
              email: row['User Email'] || row['Email'] || '',
              progress: progress,
              badges: badges,
              score: totalScore,
              total: total,
              completed: totalScore >= total,
              lastUpdated: 'Just now', // Google Sheets doesn't have this column
              initials: initials,
              proofSent: row['Access Code Redemption Status'] === 'Redeemed' || 
                        row['Profile URL Status'] === 'Valid'
            };
          });

          // Sort by rank/score
          transformedData.sort((a, b) => b.score - a.score);
          transformedData.forEach((participant, index) => {
            participant.rank = index + 1;
          });

          setData(transformedData);
          
          // Calculate stats
          const above50Progress = transformedData.filter(p => p.progress >= 50).length;
          const totalBadges = transformedData.reduce((sum, p) => sum + p.badges, 0);
          const averageProgress = Math.round(transformedData.reduce((sum, p) => sum + p.progress, 0) / transformedData.length);
          
          // Calculate tier system based on skill badges completion (19 badges = 100%)
          const skillBadgesCompleted = transformedData.filter(p => p.badges >= 19).length;
          let tier = 0;
          let tierProgress = 0;
          let nextTierThreshold = 50;
          
          if (skillBadgesCompleted >= 100) {
            tier = 1;
            tierProgress = 100;
            nextTierThreshold = 100;
          } else if (skillBadgesCompleted >= 75) {
            tier = 2;
            tierProgress = Math.round((skillBadgesCompleted / 100) * 100);
            nextTierThreshold = 100;
          } else if (skillBadgesCompleted >= 50) {
            tier = 3;
            tierProgress = Math.round((skillBadgesCompleted / 75) * 100);
            nextTierThreshold = 75;
          } else {
            tier = 0;
            tierProgress = Math.round((skillBadgesCompleted / 50) * 100);
            nextTierThreshold = 50;
          }
          
          setStats({
            above50Progress,
            totalBadges,
            completed: skillBadgesCompleted,
            averageProgress,
            tier,
            tierProgress,
            nextTierThreshold
          });
          
          setLastUpdated(new Date().toLocaleString());
          setLoading(false);
        },
        error: (error: any) => {
          console.error('Error parsing CSV:', error);
          // Fallback to mock data for testing
          const mockData: Participant[] = [
            {
              rank: 1,
              name: 'Krish Gupta',
              email: 'krish.gupta@example.com',
              progress: 100,
              badges: 19,
              score: 20,
              total: 20,
              completed: true,
              lastUpdated: 'Just now',
              initials: 'KG',
              proofSent: true
            },
            {
              rank: 2,
              name: 'Siddhesh Katale',
              email: 'siddhesh.katale@example.com',
              progress: 95,
              badges: 18,
              score: 19,
              total: 20,
              completed: false,
              lastUpdated: '2 minutes ago',
              initials: 'SK',
              proofSent: false
            },
            {
              rank: 3,
              name: 'Ansari Mohd Rahil Zakir Hussain',
              email: 'ansari.hussain@example.com',
              progress: 90,
              badges: 17,
              score: 18,
              total: 20,
              completed: false,
              lastUpdated: '5 minutes ago',
              initials: 'AH',
              proofSent: true
            }
          ];
          setData(mockData);
          setStats({
            above50Progress: 3,
            totalBadges: 54,
            completed: 1, // 1 person completed 19 skill badges
            averageProgress: 95,
            tier: 0,
            tierProgress: 2,
            nextTierThreshold: 50
          });
          setLastUpdated(new Date().toLocaleString());
          setLoading(false);
        }
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      // Fallback to mock data for testing
      const mockData: Participant[] = [
        {
          rank: 1,
          name: 'Krish Gupta',
          email: 'krish.gupta@example.com',
          progress: 100,
          badges: 19,
          score: 20,
          total: 20,
          completed: true,
          lastUpdated: 'Just now',
          initials: 'KG',
          proofSent: true
        },
        {
          rank: 2,
          name: 'Siddhesh Katale',
          email: 'siddhesh.katale@example.com',
          progress: 95,
          badges: 18,
          score: 19,
          total: 20,
          completed: false,
          lastUpdated: '2 minutes ago',
          initials: 'SK',
          proofSent: false
        },
        {
          rank: 3,
          name: 'Ansari Mohd Rahil Zakir Hussain',
          email: 'ansari.hussain@example.com',
          progress: 90,
          badges: 17,
          score: 18,
          total: 20,
          completed: false,
          lastUpdated: '5 minutes ago',
          initials: 'AH',
          proofSent: true
        }
      ];
      setData(mockData);
      setStats({
        above50Progress: 3,
        totalBadges: 54,
        completed: 1, // 1 person completed 19 skill badges
        averageProgress: 95,
        tier: 0,
        tierProgress: 2,
        nextTierThreshold: 50
      });
      setLastUpdated(new Date().toLocaleString());
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    
    // Auto-refresh every 60 seconds
    const interval = setInterval(() => {
      if (autoRefresh) {
        fetchData();
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [autoRefresh]);

  const filteredData = data.filter(participant => {
    const matchesSearch = participant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         participant.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filter === 'All' || 
                         (filter === 'Complete (20/20)' && participant.completed) ||
                         (filter === 'Beginner' && participant.progress < 50) ||
                         (filter === 'Advanced' && participant.progress >= 50 && participant.progress < 100) ||
                         (filter === '✓ Proof Sent' && participant.proofSent);
    
    return matchesSearch && matchesFilter;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  // Reset to first page when search or filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filter]);

  const getRankIcon = (rank: number) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return null;
  };

  const getInitialsColor = (initials: string) => {
    const colors = [
      'bg-green-500', 'bg-orange-500', 'bg-red-500', 'bg-blue-500', 
      'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500',
      'bg-yellow-500', 'bg-cyan-500'
    ];
    const index = initials.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const getTierInfo = (tier: number) => {
    switch (tier) {
      case 1:
        return {
          name: 'Tier 1 - Elite',
          color: 'from-yellow-400 to-yellow-600',
          bgColor: 'bg-yellow-100',
          textColor: 'text-yellow-800',
          icon: '👑',
          description: '100+ participants completed 19 skill badges'
        };
      case 2:
        return {
          name: 'Tier 2 - Advanced',
          color: 'from-blue-400 to-blue-600',
          bgColor: 'bg-blue-100',
          textColor: 'text-blue-800',
          icon: '🥈',
          description: '75+ participants completed 19 skill badges'
        };
      case 3:
        return {
          name: 'Tier 3 - Rising',
          color: 'from-green-400 to-green-600',
          bgColor: 'bg-green-100',
          textColor: 'text-green-800',
          icon: '🥉',
          description: '50+ participants completed 19 skill badges'
        };
      default:
        return {
          name: 'No Tier',
          color: 'from-gray-400 to-gray-600',
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-800',
          icon: '🚀',
          description: 'Working towards Tier 3'
        };
    }
  };

  const exportToCSV = () => {
    const csvContent = [
      ['Rank', 'Name', 'Email', 'Progress', 'Skill Badges', 'Arcade Games', 'Total Score', 'Completed', 'Proof Sent', 'Status'],
      ...filteredData.map(p => [
        p.rank, p.name, p.email, p.progress, p.badges, p.score - p.badges, p.score, p.completed ? 'Yes' : 'No', p.proofSent ? 'Yes' : 'No', p.lastUpdated
      ])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'leaderboard.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const exportToPDF = () => {
    window.print();
  };

  const resetData = () => {
    setSearchTerm('');
    setFilter('All');
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">&lt;/&gt;</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                  Live Leaderboard
                  <svg className="w-6 h-6 ml-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
                  </svg>
                </h1>
                <p className="text-gray-600">Track your progress and compete with {data.length} participants!</p>
              </div>
            </div>
            <a
              href="https://chat.whatsapp.com/JhtrD6e673hKMqlxaWs1CR"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              <span>Join Group</span>
            </a>
          </div>
        </div>
      </div>

      {/* Gradient Line */}
      <div className="h-1 bg-gradient-to-r from-orange-400 to-green-500"></div>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
            </svg>
            Last Updated: {lastUpdated}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-3xl font-bold text-gray-900">{stats.above50Progress}</p>
                <p className="text-gray-600 font-medium">Above 50% Progress</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-3xl font-bold text-gray-900">{stats.totalBadges.toLocaleString()}</p>
                <p className="text-gray-600 font-medium">Total Badges Earned</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-3xl font-bold text-gray-900">{stats.completed}</p>
                <p className="text-gray-600 font-medium">Completed (20/20)</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-3xl font-bold text-gray-900">{stats.averageProgress}</p>
                <p className="text-gray-600 font-medium">Average Progress</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tier System Progress */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-6">
          <div className="flex items-center mb-4">
            <span className="text-2xl mr-3">{getTierInfo(stats.tier).icon}</span>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{getTierInfo(stats.tier).name}</h2>
              <p className="text-gray-600">{getTierInfo(stats.tier).description}</p>
            </div>
          </div>
          
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Progress to Next Tier</span>
              <span className="text-sm font-bold text-gray-900">{stats.tierProgress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className={`h-3 rounded-full bg-gradient-to-r ${getTierInfo(stats.tier).color} transition-all duration-1000 ease-out`}
                style={{ width: `${stats.tierProgress}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>{stats.completed} completed 19 skill badges</span>
              <span>{stats.nextTierThreshold} needed for next tier</span>
            </div>
          </div>

          {/* Tier Requirements */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className={`p-3 rounded-lg ${stats.tier === 3 ? getTierInfo(3).bgColor : 'bg-gray-100'}`}>
              <div className="flex items-center">
                <span className="text-lg mr-2">🥉</span>
                <div>
                  <p className={`font-semibold ${stats.tier === 3 ? getTierInfo(3).textColor : 'text-gray-600'}`}>
                    Tier 3 - Rising
                  </p>
                  <p className="text-xs text-gray-500">50+ completed 19 badges</p>
                </div>
              </div>
            </div>
            <div className={`p-3 rounded-lg ${stats.tier === 2 ? getTierInfo(2).bgColor : 'bg-gray-100'}`}>
              <div className="flex items-center">
                <span className="text-lg mr-2">🥈</span>
                <div>
                  <p className={`font-semibold ${stats.tier === 2 ? getTierInfo(2).textColor : 'text-gray-600'}`}>
                    Tier 2 - Advanced
                  </p>
                  <p className="text-xs text-gray-500">75+ completed 19 badges</p>
                </div>
              </div>
            </div>
            <div className={`p-3 rounded-lg ${stats.tier === 1 ? getTierInfo(1).bgColor : 'bg-gray-100'}`}>
              <div className="flex items-center">
                <span className="text-lg mr-2">👑</span>
                <div>
                  <p className={`font-semibold ${stats.tier === 1 ? getTierInfo(1).textColor : 'text-gray-600'}`}>
                    Tier 1 - Elite
                  </p>
                  <p className="text-xs text-gray-500">100+ completed 19 badges</p>
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* All Students Progress Section */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center mb-4">
            <svg className="w-6 h-6 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
            </svg>
            <h2 className="text-xl font-bold text-gray-900">All Students Progress</h2>
          </div>
          <p className="text-gray-600 mb-6">See where you stand! Find your name and track your progress 👉</p>

          {/* Search and Filter Bar */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <svg className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"/>
                </svg>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {['All', 'Beginner', 'Advanced', 'Complete (20/20)', '✓ Proof Sent'].map((filterOption) => (
                <button
                  key={filterOption}
                  onClick={() => setFilter(filterOption)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filter === filterOption
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {filterOption}
                </button>
              ))}
              
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 flex items-center">
                Sort by Rank
                <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Export buttons */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={fetchData}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 flex items-center"
            >
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd"/>
              </svg>
              Refresh Data
            </button>
            <button
              onClick={exportToCSV}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 flex items-center"
            >
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
              </svg>
              CSV
            </button>
            <button
              onClick={exportToPDF}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 flex items-center"
            >
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd"/>
              </svg>
              PDF
            </button>
            <button
              onClick={resetData}
              className="px-4 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200 flex items-center border border-red-200"
            >
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd"/>
              </svg>
              Reset
            </button>
          </div>

          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">
              Showing {startIndex + 1}-{Math.min(endIndex, filteredData.length)} of {filteredData.length} participants
            </p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <label className="text-sm text-gray-500">Per page:</label>
                <select
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="px-2 py-1 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                  <option value={200}>200</option>
                </select>
              </div>
              <div className="text-sm text-gray-500">
                Page {currentPage} of {totalPages}
              </div>
            </div>
          </div>

          {/* Leaderboard Table */}
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">RANK</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">PARTICIPANT</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">PROGRESS</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">SKILL BADGES</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">ARCADE GAMES</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">TOTAL SCORE</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">COMPLETED</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">PROOF SENT</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map((participant, index) => (
                    <motion.tr
                      key={`${participant.email}-${participant.rank}-${index}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center">
                          <span className="text-lg font-bold text-gray-900 mr-2">
                            {participant.rank}
                          </span>
                          {getRankIcon(participant.rank) && (
                            <span className="text-xl">{getRankIcon(participant.rank)}</span>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center">
                          <div className={`w-10 h-10 ${getInitialsColor(participant.initials)} rounded-full flex items-center justify-center text-white font-semibold text-sm mr-3`}>
                            {participant.initials}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{participant.name}</p>
                            <p className="text-sm text-gray-500">{participant.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${participant.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600 ml-2">{participant.progress}%</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-lg font-semibold text-gray-900">{participant.badges}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-lg font-semibold text-gray-900">{participant.score - participant.badges}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-lg font-semibold text-gray-900">{participant.score}/{participant.total}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          participant.completed 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {participant.completed ? 'Yes' : 'No'}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          participant.proofSent 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {participant.proofSent ? 'Yes' : 'No'}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-sm text-gray-600">{participant.lastUpdated}</span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Auto-refresh notification */}
          {autoRefresh && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-blue-900">Auto-Refreshing Data</h3>
                  <p className="text-sm text-blue-700">This leaderboard automatically updates every 60 seconds to show the latest progress.</p>
                  <div className="flex items-center mt-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-xs text-blue-600">Auto-refreshing every 60s</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-8 px-4 py-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                  className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  First
                </button>
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
              </div>

              <div className="flex items-center space-x-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }

                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`px-3 py-2 text-sm font-medium rounded-md ${
                        currentPage === pageNum
                          ? 'bg-blue-500 text-white'
                          : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
                <button
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Last
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-white border border-gray-200 rounded-full px-4 py-2 shadow-lg">
          <div className="flex items-center space-x-1">
            <a href="/" className="flex flex-col items-center p-2 text-gray-600 hover:text-blue-500 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
              </svg>
              <span className="text-xs mt-1">Home</span>
            </a>
            <a href="/syllabus" className="flex flex-col items-center p-2 text-gray-600 hover:text-blue-500 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/>
              </svg>
              <span className="text-xs mt-1">Syllabus</span>
            </a>
            <a href="/leaderboard" className="flex flex-col items-center p-2 bg-blue-500 text-white rounded-full transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
              </svg>
              <span className="text-xs mt-1">Leaderboard</span>
            </a>
            <a href="/winners" className="flex flex-col items-center p-2 text-gray-600 hover:text-blue-500 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
              <span className="text-xs mt-1">Winners</span>
            </a>
            <a href="/rules" className="flex flex-col items-center p-2 text-gray-600 hover:text-blue-500 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd"/>
              </svg>
              <span className="text-xs mt-1">Guide</span>
            </a>
          </div>
        </div>
      </div>

      {/* Floating Rewards Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <a
          href="#rewards"
          className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-full font-semibold flex items-center space-x-2 shadow-lg transition-colors"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
          </svg>
          <span>Rewards</span>
        </a>
      </div>
    </div>
  );
};

export default Leaderboard;
