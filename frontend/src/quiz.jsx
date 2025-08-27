import React, { useState, useEffect, useRef } from 'react';
import { Play, Trophy, Users, Brain, Zap, Star, Timer, Target, BookOpen, Award, ChevronRight, Sparkles, Gamepad2, PlusCircle, Search, Filter, Mic, Volume2, Eye, BarChart3 } from 'lucide-react';

const QuizPlatform = () => {
  const [currentView, setCurrentView] = useState('landing');
  const [user, setUser] = useState(null);
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [streak, setStreak] = useState(0);
  const [experience, setExperience] = useState(0);
  const [level, setLevel] = useState(1);
  const [achievements, setAchievements] = useState([]);
  const timerRef = useRef(null);

  // Sample data
  const quizzes = [
    {
      id: 1,
      title: "JavaScript Mastery Challenge",
      category: "Programming",
      difficulty: "Advanced",
      questions: 15,
      avgTime: "12 min",
      rating: 4.8,
      participants: 1247,
      rewards: { xp: 500, badge: "JS Master" },
      isLive: true,
      color: "from-yellow-400 to-orange-500"
    },
    {
      id: 2,
      title: "React Hooks Deep Dive",
      category: "Frontend",
      difficulty: "Intermediate",
      questions: 20,
      avgTime: "15 min",
      rating: 4.6,
      participants: 892,
      rewards: { xp: 300, badge: "Hook Expert" },
      isLive: false,
      color: "from-blue-400 to-cyan-500"
    },
    {
      id: 3,
      title: "Algorithm Speed Run",
      category: "Computer Science",
      difficulty: "Expert",
      questions: 10,
      avgTime: "8 min",
      rating: 4.9,
      participants: 567,
      rewards: { xp: 750, badge: "Algorithm Ace" },
      isLive: true,
      color: "from-purple-400 to-pink-500"
    }
  ];

  const sampleQuestion = {
    question: "What is the output of: console.log(typeof typeof 1)?",
    options: ["number", "string", "undefined", "object"],
    correct: 1,
    explanation: "typeof 1 returns 'number', and typeof 'number' returns 'string'",
    difficulty: "Medium",
    timeLimit: 30
  };

  // Timer effect
  useEffect(() => {
    if (currentView === 'quiz' && timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    }
    return () => clearTimeout(timerRef.current);
  }, [currentView, timeLeft]);

  // Experience calculation
  const getExperienceForLevel = (lvl) => lvl * 1000;
  const getCurrentLevel = () => Math.floor(experience / 1000) + 1;

  // Innovative Features Components
  const GamificationBar = () => (
    <div className="fixed top-0 left-0 right-0 bg-gradient-to-r from-indigo-900 to-purple-900 text-white p-3 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <Star className="w-5 h-5 text-yellow-400" />
            <span className="font-semibold">Level {getCurrentLevel()}</span>
          </div>
          <div className="flex-1 max-w-48">
            <div className="bg-gray-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(experience % 1000) / 10}%` }}
              />
            </div>
            <span className="text-xs text-gray-300">{experience % 1000}/1000 XP</span>
          </div>
          <div className="flex items-center space-x-2">
            <Zap className="w-4 h-4 text-orange-400" />
            <span className="text-sm">{streak} streak</span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded-lg text-sm transition-colors">
            🏆 Leaderboard
          </button>
          <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full flex items-center justify-center">
            <User className="w-5 h-5" />
          </div>
        </div>
      </div>
    </div>
  );

  const FloatingParticles = () => (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-blue-400 rounded-full animate-pulse opacity-30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 3}s`
          }}
        />
      ))}
    </div>
  );

  const LandingPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white relative overflow-hidden">
      <FloatingParticles />
      
      {/* Hero Section */}
      <div className="container mx-auto px-6 pt-20 pb-16">
        <div className="text-center">
          <div className="inline-flex items-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 mb-8">
            <Sparkles className="w-5 h-5 text-yellow-400 mr-2" />
            <span className="text-sm font-medium">AI-Powered Quiz Platform</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
            QuizMaster
            <span className="text-4xl md:text-6xl block mt-2">Pro</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Level up your knowledge with gamified learning, real-time battles, and AI-generated quizzes
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <button 
              onClick={() => {setCurrentView('dashboard'); setUser({name: 'Demo User', level: 5, xp: 2450})}}
              className="group bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
            >
              <span className="flex items-center justify-center">
                Start Learning 
                <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            <button className="group border-2 border-white/30 hover:border-white/50 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:bg-white/10">
              Watch Demo
              <Play className="w-5 h-5 inline-block ml-2 group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>
        
        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            { icon: Brain, title: "AI Quiz Generation", desc: "Smart questions adapted to your skill level", color: "from-cyan-400 to-blue-500" },
            { icon: Users, title: "Live Battles", desc: "Real-time multiplayer quiz competitions", color: "from-green-400 to-emerald-500" },
            { icon: Trophy, title: "Gamification", desc: "Earn XP, badges, and climb leaderboards", color: "from-yellow-400 to-orange-500" }
          ].map((feature, i) => (
            <div key={i} className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-300 hover:scale-105">
              <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
              <p className="text-gray-300">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const Dashboard = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-16">
      <GamificationBar />
      
      <div className="container mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 mb-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name}! 🚀</h1>
              <p className="text-blue-100">Ready to dominate today's challenges?</p>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <div className="text-center">
                <div className="text-2xl font-bold">15</div>
                <div className="text-sm text-blue-200">Quizzes Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">89%</div>
                <div className="text-sm text-blue-200">Average Score</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">5</div>
                <div className="text-sm text-blue-200">Current Streak</div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {[
            { icon: PlusCircle, label: "Create Quiz", action: () => {}, color: "from-green-500 to-emerald-600" },
            { icon: Gamepad2, label: "Quick Battle", action: () => setCurrentView('quiz'), color: "from-red-500 to-pink-600" },
            { icon: BarChart3, label: "Analytics", action: () => {}, color: "from-blue-500 to-cyan-600" },
            { icon: Trophy, label: "Achievements", action: () => {}, color: "from-yellow-500 to-orange-600" }
          ].map((item, i) => (
            <button
              key={i}
              onClick={item.action}
              className={`group bg-gradient-to-r ${item.color} rounded-2xl p-6 text-white hover:scale-105 transition-all duration-300 hover:shadow-xl`}
            >
              <item.icon className="w-8 h-8 mb-3 group-hover:scale-110 transition-transform" />
              <div className="font-semibold">{item.label}</div>
            </button>
          ))}
        </div>

        {/* Featured Quizzes */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-white">Featured Quizzes</h2>
            <div className="flex space-x-4">
              <button className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-2 text-white hover:bg-white/20 transition-all">
                <Search className="w-4 h-4 inline-block mr-2" />
                Search
              </button>
              <button className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-2 text-white hover:bg-white/20 transition-all">
                <Filter className="w-4 h-4 inline-block mr-2" />
                Filter
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {quizzes.map((quiz) => (
              <div key={quiz.id} className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300 hover:scale-105">
                {quiz.isLive && (
                  <div className="bg-red-500 text-white px-3 py-1 text-xs font-semibold inline-block m-4 rounded-full animate-pulse">
                    LIVE
                  </div>
                )}
                
                <div className="p-6">
                  <div className={`w-full h-32 bg-gradient-to-r ${quiz.color} rounded-xl mb-4 flex items-center justify-center`}>
                    <BookOpen className="w-12 h-12 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-2">{quiz.title}</h3>
                  <p className="text-gray-400 mb-4">{quiz.category}</p>
                  
                  <div className="flex items-center justify-between mb-4 text-sm text-gray-300">
                    <span>🎯 {quiz.questions} questions</span>
                    <span>⏱️ {quiz.avgTime}</span>
                    <span>⭐ {quiz.rating}</span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-sm text-gray-400">
                      <Users className="w-4 h-4 mr-1" />
                      {quiz.participants} participants
                    </div>
                    <div className="text-sm text-yellow-400 font-semibold">
                      +{quiz.rewards.xp} XP
                    </div>
                  </div>
                  
                  <button
                    onClick={() => {setCurrentView('quiz'); setActiveQuiz(quiz); setTimeLeft(30)}}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 group-hover:scale-105"
                  >
                    Start Challenge
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const QuizInterface = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 pt-16">
      <GamificationBar />
      
      <div className="container mx-auto px-6 py-8">
        {/* Quiz Header */}
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-white">{activeQuiz?.title}</h1>
            <div className="flex items-center space-x-6">
              <div className="flex items-center text-white">
                <Timer className={`w-5 h-5 mr-2 ${timeLeft <= 10 ? 'text-red-400 animate-pulse' : 'text-green-400'}`} />
                <span className={`font-mono text-xl ${timeLeft <= 10 ? 'text-red-400' : 'text-white'}`}>
                  {timeLeft}s
                </span>
              </div>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors">
                <Mic className="w-4 h-4" />
              </button>
              <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors">
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center space-x-6">
              <span>Question {currentQuestion + 1} of {activeQuiz?.questions}</span>
              <div className="flex items-center">
                <Target className="w-4 h-4 mr-1" />
                <span>{sampleQuestion.difficulty}</span>
              </div>
            </div>
            <div className="w-1/3">
              <div className="bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-400 to-purple-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestion + 1) / (activeQuiz?.questions || 1)) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8 mb-8">
          <h2 className="text-2xl font-semibold text-white mb-8 leading-relaxed">
            {sampleQuestion.question}
          </h2>
          
          <div className="grid gap-4">
            {sampleQuestion.options.map((option, index) => (
              <button
                key={index}
                className="group text-left bg-white/5 hover:bg-white/15 border border-white/10 hover:border-white/30 rounded-2xl p-6 text-white transition-all duration-300 hover:scale-102 hover:shadow-lg"
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-4 font-semibold group-hover:scale-110 transition-transform">
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span className="text-lg">{option}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Power-ups */}
        <div className="flex justify-center space-x-4">
          {[
            { icon: Eye, label: "Hint", color: "from-yellow-500 to-orange-600" },
            { icon: Users, label: "Ask Audience", color: "from-green-500 to-emerald-600" },
            { icon: Zap, label: "Double XP", color: "from-purple-500 to-pink-600" }
          ].map((powerup, i) => (
            <button
              key={i}
              className={`group bg-gradient-to-r ${powerup.color} rounded-xl px-4 py-3 text-white font-semibold hover:scale-110 transition-all duration-300 hover:shadow-xl`}
            >
              <powerup.icon className="w-5 h-5 inline-block mr-2 group-hover:animate-pulse" />
              {powerup.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderView = () => {
    switch(currentView) {
      case 'landing': return <LandingPage />;
      case 'dashboard': return <Dashboard />;
      case 'quiz': return <QuizInterface />;
      default: return <LandingPage />;
    }
  };

  return <div className="font-sans">{renderView()}</div>;
};

export default QuizPlatform;