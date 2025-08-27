import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import { BookOpen, BarChart3, User, Trophy, Clock, Users, TrendingUp, Settings, LogOut, Plus, Star, Target, Activity, Zap } from 'lucide-react';

const API_URL = "http://localhost:5000/api";

const Dashboard = () => {
  const { user, logout, isAdmin } = useAuth();
  const [stats, setStats] = useState(null);
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch dashboard data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (isAdmin()) {
          // Fetch quizzes created by admin
          const quizzesRes = await fetch(`${API_URL}/quizzes/my/${user._id}`);
          const quizzes = await quizzesRes.json();

          // Calculate stats
          const totalAttempts = quizzes.reduce((sum, q) => sum + (q.attempts || 0), 0);
          const averageScore = quizzes.length
            ? Math.round(
                quizzes.reduce((sum, q) => sum + (q.bestScore || 0), 0) / quizzes.length
              )
            : 0;
          const totalParticipants = quizzes.reduce((sum, q) => sum + (q.attempts > 0 ? 1 : 0), 0);

          setStats({
            quizzesCreated: quizzes.length,
            totalParticipants,
            averageScore,
            totalAttempts,
            activeQuizzes: quizzes.length,
            pendingQuizzes: 0
          });

          // Recent activity: show recently added quizzes
          setRecentActivity(
            quizzes
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .slice(0, 5)
              .map(q => ({
                id: q._id,
                title: q.title,
                action: 'created',
                time: new Date(q.createdAt).toLocaleString(),
                participants: q.attempts,
                status: 'active'
              }))
          );
        } else {
          // Fetch user's quiz results
          const resultsRes = await fetch(`${API_URL}/results/user/${user._id}`);
          const results = await resultsRes.json();

          // Calculate stats
          const quizzesAttempted = results.length;
          const averageScore = quizzesAttempted
            ? Math.round(results.reduce((sum, r) => sum + (r.score || 0), 0) / quizzesAttempted)
            : 0;

          setStats({
            quizzesAttempted,
            averageScore,
            rank: 1,
            totalTime: 0,
            streak: 0,
            completedToday: results.filter(r => {
              const today = new Date();
              const date = new Date(r.createdAt);
              return (
                date.getDate() === today.getDate() &&
                date.getMonth() === today.getMonth() &&
                date.getFullYear() === today.getFullYear()
              );
            }).length
          });

          // Recent activity: show recent quiz attempts (show quiz title, score, and time)
          setRecentActivity(
            results
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .slice(0, 5)
              .map(r => ({
                id: r._id,
                title: r.quiz?.title || 'Quiz',
                action: 'completed',
                time: new Date(r.createdAt).toLocaleString(),
                score: r.score
              }))
          );
        }
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, isAdmin]);

  const handleLogout = () => {
    logout();
    window.location.href = '/auth/login';
  };

  const StatCard = ({ icon: Icon, title, value, subtitle, color = 'blue', trend }) => {
    const colorClasses = {
      blue: {
        bg: 'bg-gradient-to-br from-blue-50 to-blue-100',
        icon: 'bg-blue-500 text-white',
        text: 'text-blue-600',
        trend: 'text-blue-500'
      },
      green: {
        bg: 'bg-gradient-to-br from-green-50 to-green-100',
        icon: 'bg-green-500 text-white',
        text: 'text-green-600',
        trend: 'text-green-500'
      },
      purple: {
        bg: 'bg-gradient-to-br from-purple-50 to-purple-100',
        icon: 'bg-purple-500 text-white',
        text: 'text-purple-600',
        trend: 'text-purple-500'
      },
      orange: {
        bg: 'bg-gradient-to-br from-orange-50 to-orange-100',
        icon: 'bg-orange-500 text-white',
        text: 'text-orange-600',
        trend: 'text-orange-500'
      },
      indigo: {
        bg: 'bg-gradient-to-br from-indigo-50 to-indigo-100',
        icon: 'bg-indigo-500 text-white',
        text: 'text-indigo-600',
        trend: 'text-indigo-500'
      }
    };

    return (
      <div className={`${colorClasses[color].bg} rounded-2xl p-6 hover:shadow-lg hover:scale-105 transition-all duration-300 border border-white`}>
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-xl ${colorClasses[color].icon} shadow-lg`}>
            <Icon size={24} />
          </div>
          {trend && (
            <div className={`flex items-center ${colorClasses[color].trend} text-sm font-medium`}>
              <TrendingUp size={16} className="mr-1" />
              {trend}
            </div>
          )}
        </div>
        <div>
          <p className="text-sm text-gray-600 mb-1 font-medium">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
          {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
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
        subtitle={`${stats.activeQuizzes} active quizzes`}
        color="blue"
        trend="+12%"
      />
      <StatCard
        icon={Users}
        title="Total Participants"
        value={stats.totalParticipants}
        subtitle="Unique participants"
        color="green"
        trend="+8%"
      />
      <StatCard
        icon={BarChart3}
        title="Average Score"
        value={`${stats.averageScore}%`}
        subtitle="Across all quizzes"
        color="purple"
        trend="+5%"
      />
      <StatCard
        icon={TrendingUp}
        title="Total Attempts"
        value={stats.totalAttempts}
        subtitle="All quiz attempts"
        color="orange"
        trend="+15%"
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
        trend="+3 this week"
      />
      <StatCard
        icon={BarChart3}
        title="Average Score"
        value={`${stats.averageScore}%`}
        subtitle="Keep improving!"
        color="green"
        trend="+12%"
      />
      <StatCard
        icon={Trophy}
        title="Current Rank"
        value={`#${stats.rank}`}
        subtitle="Global ranking"
        color="purple"
        trend="↑2 positions"
      />
      <StatCard
        icon={Clock}
        title="Learning Streak"
        value={`${stats.streak} days`}
        subtitle={`${stats.totalTime}m total time`}
        color="indigo"
        trend="Personal best!"
      />
    </>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto mb-4"></div>
            <div className="absolute inset-0 rounded-full h-16 w-16 border-4 border-purple-200 border-t-purple-600 animate-spin mx-auto" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
          </div>
          <p className="text-gray-600 font-medium">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Enhanced Header */}
      <header className="bg-white/80 backdrop-blur-lg shadow-lg border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <BookOpen className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Quiz Platform
                </h1>
                <p className="text-sm text-gray-600 font-medium">
                  {isAdmin() ? 'Admin Dashboard' : 'Student Dashboard'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3 bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-2 rounded-xl border border-blue-200/50">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <User size={16} className="text-white" />
                </div>
                <div className="text-sm">
                  <span className="font-medium text-gray-900">{user?.name}</span>
                  <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                    isAdmin() ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {user?.role}
                  </span>
                </div>
              </div>
              <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all duration-200">
                <Settings size={20} />
              </button>
              <button 
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl transition-all duration-200"
              >
                <LogOut size={16} />
                <span className="text-sm font-medium">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Enhanced Welcome Section */}
        <div className="mb-10">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>
            <div className="relative z-10">
              <h2 className="text-4xl font-bold mb-3">
                Welcome back, {user?.name}!
              </h2>
              <p className="text-blue-100 text-lg">
                {isAdmin() 
                  ? "Manage your quizzes and monitor student progress from your admin dashboard."
                  : "Continue your learning journey and track your quiz performance."
                }
              </p>
            </div>
          </div>
        </div>

        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats && (isAdmin() ? <AdminStats /> : <UserStats />)}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Enhanced Recent Activity */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-gray-200/50 p-8">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                    <Activity size={20} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Recent Activity</h3>
                </div>
              </div>
              
              <div className="space-y-4">
                {recentActivity.length === 0 && (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <BookOpen className="text-gray-400" size={32} />
                    </div>
                    <p className="text-gray-600 text-lg">
                      {isAdmin() 
                        ? "No quizzes created yet. Create your first quiz to get started!"
                        : "No quizzes attempted yet. Start taking quizzes to see your activity here!"
                      }
                    </p>
                  </div>
                )}
                
                {recentActivity.map((activity, index) => (
                  <div 
                    key={activity.id} 
                    className="group relative bg-gradient-to-r from-gray-50 to-gray-100/50 rounded-2xl p-6 hover:from-blue-50 hover:to-purple-50 transition-all duration-300 cursor-pointer border border-gray-200/50 hover:border-blue-200/50 hover:shadow-lg"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 rounded-xl ${
                          index % 4 === 0 ? 'bg-blue-500' :
                          index % 4 === 1 ? 'bg-green-500' :
                          index % 4 === 2 ? 'bg-purple-500' : 'bg-orange-500'
                        } text-white shadow-lg`}>
                          <BookOpen size={20} />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 text-lg group-hover:text-blue-600 transition-colors">
                            {activity.title}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {activity.action === 'created' ? 'Quiz created' : 'Quiz completed'} • {activity.time}
                          </p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        {isAdmin() ? (
                          <div className="bg-green-100 px-3 py-2 rounded-xl">
                            <span className="text-sm font-semibold text-green-700">
                              {activity.participants} attempts
                            </span>
                          </div>
                        ) : (
                          activity.score !== undefined && (
                            <div className="bg-gradient-to-r from-green-100 to-blue-100 px-4 py-3 rounded-xl">
                              <span className="text-2xl font-bold text-green-600">
                                {activity.score}%
                              </span>
                              <p className="text-xs text-gray-600 font-medium">Score</p>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Enhanced Quick Actions */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-600 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
              
              <div className="relative z-10">
                <div className="flex items-center space-x-2 mb-4">
                  <Zap size={24} />
                  <h3 className="text-xl font-bold">Quick Actions</h3>
                </div>
                <p className="text-blue-100 mb-6 text-sm">
                  {isAdmin() 
                    ? "Manage your quizzes and content"
                    : "Continue your learning journey"
                  }
                </p>
                
                <div className="space-y-3">
                  {isAdmin() ? (
                    <>
                      <button 
                        className="w-full bg-white text-blue-600 px-6 py-4 rounded-2xl font-semibold hover:bg-blue-50 transition-all duration-200 flex items-center justify-center space-x-3 group hover:scale-105"
                        onClick={() => navigate('/create-quiz')}
                      >
                        <Plus size={18} className="group-hover:scale-110 transition-transform" />
                        <span>Create New Quiz</span>
                      </button>
                      <button 
                        className="w-full bg-white/20 backdrop-blur text-white px-6 py-4 rounded-2xl font-semibold hover:bg-white/30 transition-all duration-200 hover:scale-105"
                        onClick={() => navigate('/my-quizzes')}
                      >
                        View My Quizzes
                      </button>
                    </>
                  ) : (
                    <>
                      <button 
                        className="w-full bg-white text-blue-600 px-6 py-4 rounded-2xl font-semibold hover:bg-blue-50 transition-all duration-200 flex items-center justify-center space-x-2 group hover:scale-105"
                        onClick={() => navigate('/quizzes')}
                      >
                        <Star size={18} className="group-hover:scale-110 transition-transform" />
                        <span>Browse Quizzes</span>
                      </button>
                      <button className="w-full bg-white/20 backdrop-blur text-white px-6 py-4 rounded-2xl font-semibold hover:bg-white/30 transition-all duration-200 hover:scale-105">
                        <Target size={18} className="inline mr-2" />
                        Continue Learning
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;