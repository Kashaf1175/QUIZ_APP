import React from 'react';
import { useAuth } from '../components/AuthContext';
import { BookOpen, BarChart3, User, Trophy, Clock, Users, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();

  // Mock data - in real app, this would come from API
  const mockStats = {
    admin: {
      quizzesCreated: 12,
      totalParticipants: 245,
      averageScore: 78,
      totalAttempts: 156
    },
    user: {
      quizzesAttempted: 8,
      averageScore: 85,
      rank: 15,
      totalTime: 120
    }
  };

  const mockRecentActivity = [
    {
      id: 1,
      title: 'JavaScript Basics',
      action: user?.role === 'admin' ? 'created' : 'completed',
      time: '2 hours ago',
      score: user?.role === 'admin' ? null : 88,
      participants: user?.role === 'admin' ? 12 : null
    },
    {
      id: 2,
      title: 'React Fundamentals',
      action: user?.role === 'admin' ? 'created' : 'completed',
      time: '1 day ago',
      score: user?.role === 'admin' ? null : 92,
      participants: user?.role === 'admin' ? 8 : null
    },
    {
      id: 3,
      title: 'CSS Advanced',
      action: user?.role === 'admin' ? 'created' : 'completed',
      time: '3 days ago',
      score: user?.role === 'admin' ? null : 76,
      participants: user?.role === 'admin' ? 15 : null
    }
  ];

  const stats = user?.role === 'admin' ? mockStats.admin : mockStats.user;

  const StatCard = ({ icon: Icon, title, value, subtitle, color = 'blue' }) => {
    const colorClasses = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      purple: 'bg-purple-100 text-purple-600',
      orange: 'bg-orange-100 text-orange-600'
    };

    return (
      <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center">
          <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
            <Icon size={24} />
          </div>
          <div className="ml-4 flex-1">
            <p className="text-sm text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
          </div>
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
        subtitle="Active quizzes"
        color="blue"
      />
      <StatCard
        icon={Users}
        title="Total Participants"
        value={stats.totalParticipants}
        subtitle="All time"
        color="green"
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
      />
    </>
  );

  const UserStats = () => (
    <>
      <StatCard
        icon={BookOpen}
        title="Quizzes Attempted"
        value={stats.quizzesAttempted}
        subtitle="Completed"
        color="blue"
      />
      <StatCard
        icon={BarChart3}
        title="Average Score"
        value={`${stats.averageScore}%`}
        subtitle="Keep it up!"
        color="green"
      />
      <StatCard
        icon={Trophy}
        title="Current Rank"
        value={`#${stats.rank}`}
        subtitle="Out of 100 users"
        color="purple"
      />
      <StatCard
        icon={Clock}
        title="Total Time"
        value={`${stats.totalTime}m`}
        subtitle="Learning time"
        color="orange"
      />
    </>
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
           Welcome back, {user?.name}! 👋
        </h1>
        <p className="text-gray-600 mt-2">
          {user?.role === 'admin' 
            ? "Here's an overview of your quiz management dashboard."
            : "Here's your learning progress and quiz performance."
          }
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {user?.role === 'admin' ? <AdminStats /> : <UserStats />}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            View All
          </button>
        </div>
        
        <div className="space-y-4">
          {mockRecentActivity.map((activity) => (
            <div 
              key={activity.id} 
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg mr-4">
                  <BookOpen className="text-blue-600" size={20} />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{activity.title}</h3>
                  <p className="text-sm text-gray-600">
                    {user?.role === 'admin' 
                      ? `Quiz ${activity.action} ${activity.time}`
                      : `${activity.action} ${activity.time}`
                    }
                  </p>
                </div>
              </div>
              
              <div className="text-right">
                {user?.role === 'admin' ? (
                  <div>
                    <span className="text-sm font-medium text-green-600">
                      {activity.participants} participants
                    </span>
                  </div>
                ) : (
                  <div>
                    <span className="text-lg font-semibold text-green-600">
                      {activity.score}%
                    </span>
                    <p className="text-xs text-gray-500">Score</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {mockRecentActivity.length === 0 && (
          <div className="text-center py-8">
            <BookOpen className="mx-auto text-gray-400 mb-4" size={48} />
            <p className="text-gray-600">
              {user?.role === 'admin' 
                ? "No quizzes created yet. Create your first quiz to get started!"
                : "No quizzes attempted yet. Start taking quizzes to see your activity here!"
              }
            </p>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="mt-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white">
        <h3 className="text-lg font-semibold mb-2">Quick Actions</h3>
        <p className="text-blue-100 mb-4">
          {user?.role === 'admin' 
            ? "Ready to create a new quiz or check your existing ones?"
            : "Ready to test your knowledge with a new quiz?"
          }
        </p>
        <div className="flex flex-wrap gap-3">
          {user?.role === 'admin' ? (
            <>
              <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                Create New Quiz
              </button>
              <button className="bg-blue-400 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-300 transition-colors">
                View My Quizzes
              </button>
            </>
          ) : (
            <>
              <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                Browse Quizzes
              </button>
              <button className="bg-blue-400 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-300 transition-colors">
                Continue Learning
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;