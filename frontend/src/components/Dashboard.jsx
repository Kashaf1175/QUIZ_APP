// import React from 'react';
// import { useAuth } from '../components/AuthContext';
// import { BookOpen, BarChart3, User, Trophy, Clock, Users, TrendingUp } from 'lucide-react';

// const Dashboard = () => {
//   const { user } = useAuth();

//   // Mock data - in real app, this would come from API
//   const mockStats = {
//     admin: {
//       quizzesCreated: 12,
//       totalParticipants: 245,
//       averageScore: 78,
//       totalAttempts: 156
//     },
//     user: {
//       quizzesAttempted: 8,
//       averageScore: 85,
//       rank: 15,
//       totalTime: 120
//     }
//   };

//   const mockRecentActivity = [
//     {
//       id: 1,
//       title: 'JavaScript Basics',
//       action: user?.role === 'admin' ? 'created' : 'completed',
//       time: '2 hours ago',
//       score: user?.role === 'admin' ? null : 88,
//       participants: user?.role === 'admin' ? 12 : null
//     },
//     {
//       id: 2,
//       title: 'React Fundamentals',
//       action: user?.role === 'admin' ? 'created' : 'completed',
//       time: '1 day ago',
//       score: user?.role === 'admin' ? null : 92,
//       participants: user?.role === 'admin' ? 8 : null
//     },
//     {
//       id: 3,
//       title: 'CSS Advanced',
//       action: user?.role === 'admin' ? 'created' : 'completed',
//       time: '3 days ago',
//       score: user?.role === 'admin' ? null : 76,
//       participants: user?.role === 'admin' ? 15 : null
//     }
//   ];

//   const stats = user?.role === 'admin' ? mockStats.admin : mockStats.user;

//   const StatCard = ({ icon: Icon, title, value, subtitle, color = 'blue' }) => {
//     const colorClasses = {
//       blue: 'bg-blue-100 text-blue-600',
//       green: 'bg-green-100 text-green-600',
//       purple: 'bg-purple-100 text-purple-600',
//       orange: 'bg-orange-100 text-orange-600'
//     };

//     return (
//       <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
//         <div className="flex items-center">
//           <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
//             <Icon size={24} />
//           </div>
//           <div className="ml-4 flex-1">
//             <p className="text-sm text-gray-600">{title}</p>
//             <p className="text-2xl font-bold text-gray-900">{value}</p>
//             {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const AdminStats = () => (
//     <>
//       <StatCard
//         icon={BookOpen}
//         title="Quizzes Created"
//         value={stats.quizzesCreated}
//         subtitle="Active quizzes"
//         color="blue"
//       />
//       <StatCard
//         icon={Users}
//         title="Total Participants"
//         value={stats.totalParticipants}
//         subtitle="All time"
//         color="green"
//       />
//       <StatCard
//         icon={BarChart3}
//         title="Average Score"
//         value={`${stats.averageScore}%`}
//         subtitle="Across all quizzes"
//         color="purple"
//       />
//       <StatCard
//         icon={TrendingUp}
//         title="Total Attempts"
//         value={stats.totalAttempts}
//         subtitle="This month"
//         color="orange"
//       />
//     </>
//   );

//   const UserStats = () => (
//     <>
//       <StatCard
//         icon={BookOpen}
//         title="Quizzes Attempted"
//         value={stats.quizzesAttempted}
//         subtitle="Completed"
//         color="blue"
//       />
//       <StatCard
//         icon={BarChart3}
//         title="Average Score"
//         value={`${stats.averageScore}%`}
//         subtitle="Keep it up!"
//         color="green"
//       />
//       <StatCard
//         icon={Trophy}
//         title="Current Rank"
//         value={`#${stats.rank}`}
//         subtitle="Out of 100 users"
//         color="purple"
//       />
//       <StatCard
//         icon={Clock}
//         title="Total Time"
//         value={`${stats.totalTime}m`}
//         subtitle="Learning time"
//         color="orange"
//       />
//     </>
//   );

//   return (
//     <div className="p-6 max-w-7xl mx-auto">
//       {/* Header */}
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold text-gray-900">
//            Welcome back, {user?.name}! 👋
//         </h1>
//         <p className="text-gray-600 mt-2">
//           {user?.role === 'admin' 
//             ? "Here's an overview of your quiz management dashboard."
//             : "Here's your learning progress and quiz performance."
//           }
//         </p>
//       </div>

//       {/* Stats Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         {user?.role === 'admin' ? <AdminStats /> : <UserStats />}
//       </div>

//       {/* Recent Activity */}
//       <div className="bg-white rounded-xl shadow-sm p-6">
//         <div className="flex items-center justify-between mb-6">
//           <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
//           <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
//             View All
//           </button>
//         </div>
        
//         <div className="space-y-4">
//           {mockRecentActivity.map((activity) => (
//             <div 
//               key={activity.id} 
//               className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
//             >
//               <div className="flex items-center">
//                 <div className="p-2 bg-blue-100 rounded-lg mr-4">
//                   <BookOpen className="text-blue-600" size={20} />
//                 </div>
//                 <div>
//                   <h3 className="font-medium text-gray-900">{activity.title}</h3>
//                   <p className="text-sm text-gray-600">
//                     {user?.role === 'admin' 
//                       ? `Quiz ${activity.action} ${activity.time}`
//                       : `${activity.action} ${activity.time}`
//                     }
//                   </p>
//                 </div>
//               </div>
              
//               <div className="text-right">
//                 {user?.role === 'admin' ? (
//                   <div>
//                     <span className="text-sm font-medium text-green-600">
//                       {activity.participants} participants
//                     </span>
//                   </div>
//                 ) : (
//                   <div>
//                     <span className="text-lg font-semibold text-green-600">
//                       {activity.score}%
//                     </span>
//                     <p className="text-xs text-gray-500">Score</p>
//                   </div>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>

//         {mockRecentActivity.length === 0 && (
//           <div className="text-center py-8">
//             <BookOpen className="mx-auto text-gray-400 mb-4" size={48} />
//             <p className="text-gray-600">
//               {user?.role === 'admin' 
//                 ? "No quizzes created yet. Create your first quiz to get started!"
//                 : "No quizzes attempted yet. Start taking quizzes to see your activity here!"
//               }
//             </p>
//           </div>
//         )}
//       </div>

//       {/* Quick Actions */}
//       <div className="mt-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white">
//         <h3 className="text-lg font-semibold mb-2">Quick Actions</h3>
//         <p className="text-blue-100 mb-4">
//           {user?.role === 'admin' 
//             ? "Ready to create a new quiz or check your existing ones?"
//             : "Ready to test your knowledge with a new quiz?"
//           }
//         </p>
//         <div className="flex flex-wrap gap-3">
//           {user?.role === 'admin' ? (
//             <>
//               <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors">
//                 Create New Quiz
//               </button>
//               <button className="bg-blue-400 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-300 transition-colors">
//                 View My Quizzes
//               </button>
//             </>
//           ) : (
//             <>
//               <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors">
//                 Browse Quizzes
//               </button>
//               <button className="bg-blue-400 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-300 transition-colors">
//                 Continue Learning
//               </button>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
import React, { useState, useEffect } from 'react';
import { useAuth } from '../components/AuthContext';
import { BookOpen, BarChart3, User, Trophy, Clock, Users, TrendingUp, Settings, LogOut, Plus } from 'lucide-react';

const Dashboard = () => {
  const { user, logout, isAdmin } = useAuth();
  const [stats, setStats] = useState(null);
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data - in real app, this would come from API
  const mockStats = {
    admin: {
      quizzesCreated: 12,
      totalParticipants: 245,
      averageScore: 78,
      totalAttempts: 156,
      pendingQuizzes: 3,
      activeQuizzes: 9
    },
    user: {
      quizzesAttempted: 8,
      averageScore: 85,
      rank: 15,
      totalTime: 120,
      completedToday: 2,
      streak: 5
    }
  };

  const mockRecentActivity = [
    {
      id: 1,
      title: 'JavaScript Basics',
      action: isAdmin() ? 'created' : 'completed',
      time: '2 hours ago',
      score: isAdmin() ? null : 88,
      participants: isAdmin() ? 12 : null,
      status: 'active'
    },
    {
      id: 2,
      title: 'React Fundamentals',
      action: isAdmin() ? 'updated' : 'completed',
      time: '1 day ago',
      score: isAdmin() ? null : 92,
      participants: isAdmin() ? 8 : null,
      status: 'active'
    },
    {
      id: 3,
      title: 'CSS Advanced',
      action: isAdmin() ? 'created' : 'attempted',
      time: '3 days ago',
      score: isAdmin() ? null : 76,
      participants: isAdmin() ? 15 : null,
      status: 'draft'
    }
  ];

  useEffect(() => {
    // Simulate API call
    const loadDashboardData = async () => {
      try {
        // In real app, make API calls here
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setStats(isAdmin() ? mockStats.admin : mockStats.user);
        setRecentActivity(mockRecentActivity);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  const handleLogout = () => {
    logout();
    window.location.href = '/auth/login';
  };

  const StatCard = ({ icon: Icon, title, value, subtitle, color = 'blue', trend = null }) => {
    const colorClasses = {
      blue: 'bg-blue-100 text-blue-600 border-blue-200',
      green: 'bg-green-100 text-green-600 border-green-200',
      purple: 'bg-purple-100 text-purple-600 border-purple-200',
      orange: 'bg-orange-100 text-orange-600 border-orange-200',
      red: 'bg-red-100 text-red-600 border-red-200'
    };

    return (
      <div className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-all duration-200">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
            <Icon size={24} />
          </div>
          {trend && (
            <div className={`text-xs px-2 py-1 rounded-full ${trend.type === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {trend.value}
            </div>
          )}
        </div>
        <div>
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
        </div>
      </div>
    );
  };

  const AdminStats = () => (
    <>
      <StatCard
        icon={BookOpen}
        title="Quizzes Created"
        value={stats.quizzesCreated}
        subtitle={`${stats.activeQuizzes} active, ${stats.pendingQuizzes} pending`}
        color="blue"
        trend={{ type: 'up', value: '+2 this week' }}
      />
      <StatCard
        icon={Users}
        title="Total Participants"
        value={stats.totalParticipants}
        subtitle="All time participants"
        color="green"
        trend={{ type: 'up', value: '+15%' }}
      />
      <StatCard
        icon={BarChart3}
        title="Average Score"
        value={`${stats.averageScore}%`}
        subtitle="Across all quizzes"
        color="purple"
      />
      <StatCard
        icon={TrendingUp}
        title="Total Attempts"
        value={stats.totalAttempts}
        subtitle="This month"
        color="orange"
        trend={{ type: 'up', value: '+8%' }}
      />
    </>
  );

  const UserStats = () => (
    <>
      <StatCard
        icon={BookOpen}
        title="Quizzes Attempted"
        value={stats.quizzesAttempted}
        subtitle={`${stats.completedToday} completed today`}
        color="blue"
        trend={{ type: 'up', value: '+2 today' }}
      />
      <StatCard
        icon={BarChart3}
        title="Average Score"
        value={`${stats.averageScore}%`}
        subtitle="Keep improving!"
        color="green"
        trend={{ type: 'up', value: '+5%' }}
      />
      <StatCard
        icon={Trophy}
        title="Current Rank"
        value={`#${stats.rank}`}
        subtitle="Out of 100 users"
        color="purple"
        trend={{ type: 'up', value: '+3 spots' }}
      />
      <StatCard
        icon={Clock}
        title="Learning Streak"
        value={`${stats.streak} days`}
        subtitle={`${stats.totalTime}m total time`}
        color="orange"
      />
    </>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <BookOpen className="text-white" size={20} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Quiz Platform</h1>
                <p className="text-sm text-gray-600">{isAdmin() ? 'Admin Dashboard' : 'Student Dashboard'}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <User size={16} />
                <span>{user?.name}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  isAdmin() ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                }`}>
                  {user?.role}
                </span>
              </div>
              
              <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                <Settings size={20} />
              </button>
              
              <button 
                onClick={handleLogout}
                className="flex items-center space-x-2 px-3 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut size={16} />
                <span className="text-sm">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name}! 👋
          </h2>
          <p className="text-gray-600">
            {isAdmin() 
              ? "Manage your quizzes and monitor student progress from your admin dashboard."
              : "Continue your learning journey and track your quiz performance."
            }
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats && (isAdmin() ? <AdminStats /> : <UserStats />)}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Recent Activity</h3>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium hover:underline">
                  View All
                </button>
              </div>
              
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div 
                    key={activity.id} 
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center">
                      <div className="p-2 bg-blue-100 rounded-lg mr-4">
                        <BookOpen className="text-blue-600" size={20} />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{activity.title}</h4>
                        <p className="text-sm text-gray-600">
                          {activity.action} {activity.time}
                          {isAdmin() && activity.status && (
                            <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                              activity.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                            }`}>
                              {activity.status}
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      {isAdmin() ? (
                        <div>
                          <span className="text-sm font-medium text-green-600">
                            {activity.participants} participants
                          </span>
                        </div>
                      ) : (
                        activity.score && (
                          <div>
                            <span className="text-lg font-semibold text-green-600">
                              {activity.score}%
                            </span>
                            <p className="text-xs text-gray-500">Score</p>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {recentActivity.length === 0 && (
                <div className="text-center py-8">
                  <BookOpen className="mx-auto text-gray-400 mb-4" size={48} />
                  <p className="text-gray-600">
                    {isAdmin() 
                      ? "No recent activity. Create your first quiz to get started!"
                      : "No recent activity. Start taking quizzes to see your progress here!"
                    }
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-2">Quick Actions</h3>
              <p className="text-blue-100 mb-4 text-sm">
                {isAdmin() 
                  ? "Manage your quizzes and content"
                  : "Continue your learning journey"
                }
              </p>
              <div className="space-y-3">
                {isAdmin() ? (
                  <>
                    <button className="w-full bg-white text-blue-600 px-4 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors flex items-center justify-center space-x-2">
                      <Plus size={16} />
                      <span>Create New Quiz</span>
                    </button>
                    <button className="w-full bg-blue-400 text-white px-4 py-3 rounded-lg font-medium hover:bg-blue-300 transition-colors">
                      View My Quizzes
                    </button>
                    <button className="w-full bg-blue-400 text-white px-4 py-3 rounded-lg font-medium hover:bg-blue-300 transition-colors">
                      Analytics
                    </button>
                  </>
                ) : (
                  <>
                    <button className="w-full bg-white text-blue-600 px-4 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                      Browse Quizzes
                    </button>
                    <button className="w-full bg-blue-400 text-white px-4 py-3 rounded-lg font-medium hover:bg-blue-300 transition-colors">
                      Continue Learning
                    </button>
                    <button className="w-full bg-blue-400 text-white px-4 py-3 rounded-lg font-medium hover:bg-blue-300 transition-colors">
                      View Results
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Progress or Management Panel */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {isAdmin() ? 'Quiz Management' : 'Learning Progress'}
              </h3>
              
              {isAdmin() ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Active Quizzes</span>
                    <span className="font-semibold text-green-600">{stats?.activeQuizzes}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Pending Review</span>
                    <span className="font-semibold text-yellow-600">{stats?.pendingQuizzes}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Participants</span>
                    <span className="font-semibold text-blue-600">{stats?.totalParticipants}</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Weekly Goal</span>
                      <span className="text-sm font-semibold">6/10 quizzes</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Current Streak</span>
                    <span className="font-semibold text-orange-600">{stats?.streak} days</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Avg Score</span>
                    <span className="font-semibold text-green-600">{stats?.averageScore}%</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;