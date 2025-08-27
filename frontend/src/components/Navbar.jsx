// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { User, BookOpen, PlusCircle, List, Settings, LogOut, Menu, X } from 'lucide-react';

// // Auth Context
// const AuthContext = createContext();

// const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const savedUser = localStorage.getItem('quizUser');
//     if (savedUser) {
//       setUser(JSON.parse(savedUser));
//     }
//     setLoading(false);
//   }, []);

//   const login = (userData) => {
//     setUser(userData);
//     localStorage.setItem('quizUser', JSON.stringify(userData));
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem('quizUser');
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within AuthProvider');
//   }
//   return context;
// };

// // Navbar Component
// const Navbar = () => {
//   const { user, logout } = useAuth();
//   const [currentPage, setCurrentPage] = useState('dashboard');
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   const menuItems = user?.role === 'admin' 
//     ? [
//         { id: 'dashboard', label: 'Dashboard', icon: BookOpen },
//         { id: 'create-quiz', label: 'Create Quiz', icon: PlusCircle },
//         { id: 'my-quizzes', label: 'My Quizzes', icon: List },
//         { id: 'profile', label: 'Profile', icon: Settings },
//       ]
//     : [
//         { id: 'dashboard', label: 'Dashboard', icon: BookOpen },
//         { id: 'quizzes', label: 'All Quizzes', icon: List },
//         { id: 'profile', label: 'Profile', icon: Settings },
//       ];

//   return (
//     <nav className="bg-blue-600 text-white shadow-lg fixed top-0 left-0 right-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           <div className="flex items-center">
//             <BookOpen className="h-8 w-8 mr-2" />
//             <h1 className="text-xl font-bold">QuizPlatform</h1>
//           </div>

//           {/* Desktop Menu */}
//           <div className="hidden md:flex items-center space-x-4">
//             {menuItems.map((item) => {
//               const Icon = item.icon;
//               return (
//                 <button
//                   key={item.id}
//                   onClick={() => {
//                     setCurrentPage(item.id);
//                     window.dispatchEvent(new CustomEvent('navigate', { detail: item.id }));
//                   }}
//                   className="flex items-center px-3 py-2 rounded-md hover:bg-blue-700 transition-colors"
//                 >
//                   <Icon className="h-4 w-4 mr-2" />
//                   {item.label}
//                 </button>
//               );
//             })}
//             <button
//               onClick={logout}
//               className="flex items-center px-3 py-2 rounded-md hover:bg-red-600 transition-colors ml-4"
//             >
//               <LogOut className="h-4 w-4 mr-2" />
//               Logout
//             </button>
//           </div>

//           {/* Mobile Menu Button */}
//           <div className="md:hidden">
//             <button
//               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//               className="p-2 rounded-md hover:bg-blue-700"
//             >
//               {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         {mobileMenuOpen && (
//           <div className="md:hidden py-4 border-t border-blue-500">
//             {menuItems.map((item) => {
//               const Icon = item.icon;
//               return (
//                 <button
//                   key={item.id}
//                   onClick={() => {
//                     setCurrentPage(item.id);
//                     setMobileMenuOpen(false);
//                     window.dispatchEvent(new CustomEvent('navigate', { detail: item.id }));
//                   }}
//                   className="flex items-center w-full px-3 py-2 rounded-md hover:bg-blue-700 transition-colors"
//                 >
//                   <Icon className="h-4 w-4 mr-2" />
//                   {item.label}
//                 </button>
//               );
//             })}
//             <button
//               onClick={logout}
//               className="flex items-center w-full px-3 py-2 rounded-md hover:bg-red-600 transition-colors mt-2"
//             >
//               <LogOut className="h-4 w-4 mr-2" />
//               Logout
//             </button>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// // AuthPage Component (Login/Register)
// const AuthPage = () => {
//   const { login } = useAuth();
//   const [isLogin, setIsLogin] = useState(true);
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     role: 'user'
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Simulate API call
//     if (isLogin) {
//       // Mock login
//       login({
//         id: Date.now(),
//         name: formData.email.split('@')[0],
//         email: formData.email,
//         role: formData.role
//       });
//     } else {
//       // Mock registration then login
//       login({
//         id: Date.now(),
//         name: formData.name,
//         email: formData.email,
//         role: formData.role
//       });
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
//       <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
//         <div className="text-center mb-8">
//           <BookOpen className="h-12 w-12 text-blue-600 mx-auto mb-4" />
//           <h2 className="text-3xl font-bold text-gray-900">
//             {isLogin ? 'Welcome Back' : 'Join QuizPlatform'}
//           </h2>
//           <p className="text-gray-600 mt-2">
//             {isLogin ? 'Sign in to your account' : 'Create your account'}
//           </p>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           {!isLogin && (
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Full Name
//               </label>
//               <input
//                 type="text"
//                 required
//                 value={formData.name}
//                 onChange={(e) => setFormData({...formData, name: e.target.value})}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Enter your name"
//               />
//             </div>
//           )}

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Email Address
//             </label>
//             <input
//               type="email"
//               required
//               value={formData.email}
//               onChange={(e) => setFormData({...formData, email: e.target.value})}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter your email"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Password
//             </label>
//             <input
//               type="password"
//               required
//               value={formData.password}
//               onChange={(e) => setFormData({...formData, password: e.target.value})}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter your password"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Account Type
//             </label>
//             <select
//               value={formData.role}
//               onChange={(e) => setFormData({...formData, role: e.target.value})}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="user">Student</option>
//               <option value="admin">Teacher/Admin</option>
//             </select>
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
//           >
//             {isLogin ? 'Sign In' : 'Create Account'}
//           </button>
//         </form>

//         <div className="mt-6 text-center">
//           <button
//             onClick={() => setIsLogin(!isLogin)}
//             className="text-blue-600 hover:text-blue-500"
//           >
//             {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Dashboard Component
// const Dashboard = () => {
//   const { user } = useAuth();

//   const userStats = [
//     { label: 'Quizzes Taken', value: '12', color: 'bg-blue-500' },
//     { label: 'Average Score', value: '85%', color: 'bg-green-500' },
//     { label: 'Best Score', value: '98%', color: 'bg-purple-500' },
//     { label: 'Time Spent', value: '24h', color: 'bg-orange-500' }
//   ];

//   const adminStats = [
//     { label: 'Quizzes Created', value: '8', color: 'bg-blue-500' },
//     { label: 'Total Attempts', value: '156', color: 'bg-green-500' },
//     { label: 'Active Quizzes', value: '6', color: 'bg-purple-500' },
//     { label: 'Avg. Score', value: '78%', color: 'bg-orange-500' }
//   ];

//   const stats = user?.role === 'admin' ? adminStats : userStats;

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold text-gray-900">
//           Welcome back, {user?.name}!
//         </h1>
//         <p className="text-gray-600 mt-2">
//           {user?.role === 'admin' 
//             ? 'Manage your quizzes and track student progress' 
//             : 'Continue your learning journey'}
//         </p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         {stats.map((stat, index) => (
//           <div key={index} className="bg-white rounded-lg shadow-md p-6">
//             <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center mb-4`}>
//               <BookOpen className="h-6 w-6 text-white" />
//             </div>
//             <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
//             <p className="text-gray-600">{stat.label}</p>
//           </div>
//         ))}
//       </div>

//       <div className="bg-white rounded-lg shadow-md p-6">
//         <h2 className="text-xl font-semibold mb-4">
//           {user?.role === 'admin' ? 'Recent Activity' : 'Recent Quizzes'}
//         </h2>
//         <div className="space-y-4">
//           {[1, 2, 3].map((item) => (
//             <div key={item} className="flex items-center justify-between py-3 border-b">
//               <div>
//                 <h3 className="font-medium">
//                   {user?.role === 'admin' 
//                     ? `Quiz ${item} - New Attempt` 
//                     : `Mathematics Quiz ${item}`}
//                 </h3>
//                 <p className="text-sm text-gray-600">
//                   {user?.role === 'admin' 
//                     ? `Student scored 85% - 2 hours ago`
//                     : `10 questions • 15 minutes • Difficulty: Medium`}
//                 </p>
//               </div>
//               <button className="text-blue-600 hover:text-blue-500">
//                 {user?.role === 'admin' ? 'View Details' : 'Start Quiz'}
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// // Profile Component
// const Profile = () => {
//   const { user } = useAuth();
//   const [editing, setEditing] = useState(false);
//   const [profile, setProfile] = useState({
//     name: user?.name || '',
//     email: user?.email || '',
//     bio: '',
//     institution: ''
//   });

//   const handleSave = () => {
//     setEditing(false);
//     // Here you would typically save to backend
//   };

//   return (
//     <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       <div className="bg-white rounded-lg shadow-md overflow-hidden">
//         <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-8">
//           <div className="flex items-center">
//             <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
//               <User className="h-12 w-12 text-gray-600" />
//             </div>
//             <div className="ml-6 text-white">
//               <h1 className="text-2xl font-bold">{profile.name}</h1>
//               <p className="text-blue-100">{user?.role === 'admin' ? 'Teacher/Admin' : 'Student'}</p>
//             </div>
//           </div>
//         </div>

//         <div className="px-6 py-8">
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-xl font-semibold">Profile Information</h2>
//             <button
//               onClick={() => editing ? handleSave() : setEditing(true)}
//               className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
//             >
//               {editing ? 'Save Changes' : 'Edit Profile'}
//             </button>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Full Name
//               </label>
//               <input
//                 type="text"
//                 value={profile.name}
//                 onChange={(e) => setProfile({...profile, name: e.target.value})}
//                 disabled={!editing}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Email Address
//               </label>
//               <input
//                 type="email"
//                 value={profile.email}
//                 onChange={(e) => setProfile({...profile, email: e.target.value})}
//                 disabled={!editing}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
//               />
//             </div>

//             <div className="md:col-span-2">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Institution
//               </label>
//               <input
//                 type="text"
//                 value={profile.institution}
//                 onChange={(e) => setProfile({...profile, institution: e.target.value})}
//                 disabled={!editing}
//                 placeholder="Your school or university"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
//               />
//             </div>

//             <div className="md:col-span-2">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Bio
//               </label>
//               <textarea
//                 value={profile.bio}
//                 onChange={(e) => setProfile({...profile, bio: e.target.value})}
//                 disabled={!editing}
//                 rows={4}
//                 placeholder="Tell us about yourself..."
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // QuizList Component (for students)
// const QuizList = () => {
//   const quizzes = [
//     {
//       id: 1,
//       title: 'Mathematics Basics',
//       description: 'Test your knowledge of basic mathematical concepts',
//       questions: 10,
//       duration: 15,
//       difficulty: 'Easy',
//       category: 'Mathematics'
//     },
//     {
//       id: 2,
//       title: 'Science Quiz',
//       description: 'General science questions covering physics, chemistry, and biology',
//       questions: 15,
//       duration: 20,
//       difficulty: 'Medium',
//       category: 'Science'
//     },
//     {
//       id: 3,
//       title: 'History Challenge',
//       description: 'Test your knowledge of world history',
//       questions: 12,
//       duration: 18,
//       difficulty: 'Hard',
//       category: 'History'
//     }
//   ];

//   const getDifficultyColor = (difficulty) => {
//     switch (difficulty) {
//       case 'Easy': return 'bg-green-100 text-green-800';
//       case 'Medium': return 'bg-yellow-100 text-yellow-800';
//       case 'Hard': return 'bg-red-100 text-red-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold text-gray-900">Available Quizzes</h1>
//         <p className="text-gray-600 mt-2">Choose a quiz to test your knowledge</p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {quizzes.map((quiz) => (
//           <div key={quiz.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
//             <div className="p-6">
//               <div className="flex items-start justify-between mb-4">
//                 <h3 className="text-lg font-semibold text-gray-900">{quiz.title}</h3>
//                 <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(quiz.difficulty)}`}>
//                   {quiz.difficulty}
//                 </span>
//               </div>
              
//               <p className="text-gray-600 mb-4">{quiz.description}</p>
              
//               <div className="space-y-2 mb-6">
//                 <div className="flex justify-between text-sm">
//                   <span className="text-gray-500">Questions:</span>
//                   <span>{quiz.questions}</span>
//                 </div>
//                 <div className="flex justify-between text-sm">
//                   <span className="text-gray-500">Duration:</span>
//                   <span>{quiz.duration} minutes</span>
//                 </div>
//                 <div className="flex justify-between text-sm">
//                   <span className="text-gray-500">Category:</span>
//                   <span>{quiz.category}</span>
//                 </div>
//               </div>
              
//               <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
//                 Start Quiz
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// // CreateQuiz Component (for admins)
// const CreateQuiz = () => {
//   const [quiz, setQuiz] = useState({
//     title: '',
//     description: '',
//     category: '',
//     difficulty: 'Easy',
//     duration: 15,
//     questions: [{ question: '', options: ['', '', '', ''], correct: 0 }]
//   });

//   const addQuestion = () => {
//     setQuiz({
//       ...quiz,
//       questions: [...quiz.questions, { question: '', options: ['', '', '', ''], correct: 0 }]
//     });
//   };

//   const updateQuestion = (index, field, value) => {
//     const updatedQuestions = [...quiz.questions];
//     updatedQuestions[index][field] = value;
//     setQuiz({ ...quiz, questions: updatedQuestions });
//   };

//   const updateOption = (qIndex, oIndex, value) => {
//     const updatedQuestions = [...quiz.questions];
//     updatedQuestions[qIndex].options[oIndex] = value;
//     setQuiz({ ...quiz, questions: updatedQuestions });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle quiz creation
//     alert('Quiz created successfully!');
//   };

//   return (
//     <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold text-gray-900">Create New Quiz</h1>
//         <p className="text-gray-600 mt-2">Design a quiz for your students</p>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-8">
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <h2 className="text-xl font-semibold mb-4">Quiz Details</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Quiz Title</label>
//               <input
//                 type="text"
//                 required
//                 value={quiz.title}
//                 onChange={(e) => setQuiz({...quiz, title: e.target.value})}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Enter quiz title"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
//               <input
//                 type="text"
//                 value={quiz.category}
//                 onChange={(e) => setQuiz({...quiz, category: e.target.value})}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="e.g., Mathematics, Science"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
//               <select
//                 value={quiz.difficulty}
//                 onChange={(e) => setQuiz({...quiz, difficulty: e.target.value})}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="Easy">Easy</option>
//                 <option value="Medium">Medium</option>
//                 <option value="Hard">Hard</option>
//               </select>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Duration (minutes)</label>
//               <input
//                 type="number"
//                 value={quiz.duration}
//                 onChange={(e) => setQuiz({...quiz, duration: parseInt(e.target.value)})}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 min="1"
//               />
//             </div>
//             <div className="md:col-span-2">
//               <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
//               <textarea
//                 value={quiz.description}
//                 onChange={(e) => setQuiz({...quiz, description: e.target.value})}
//                 rows={3}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Describe what this quiz covers..."
//               />
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-lg shadow-md p-6">
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-xl font-semibold">Questions</h2>
//             <button
//               type="button"
//               onClick={addQuestion}
//               className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
//             >
//               Add Question
//             </button>
//           </div>

//           <div className="space-y-6">
//             {quiz.questions.map((q, qIndex) => (
//               <div key={qIndex} className="border border-gray-200 rounded-lg p-4">
//                 <div className="mb-4">
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Question {qIndex + 1}
//                   </label>
//                   <input
//                     type="text"
//                     value={q.question}
//                     onChange={(e) => updateQuestion(qIndex, 'question', e.target.value)}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     placeholder="Enter your question"
//                   />
//                 </div>
                
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {q.options.map((option, oIndex) => (
//                     <div key={oIndex} className="flex items-center">
//                       <input
//                         type="radio"
//                         name={`correct-${qIndex}`}
//                         checked={q.correct === oIndex}
//                         onChange={() => updateQuestion(qIndex, 'correct', oIndex)}
//                         className="mr-2"
//                       />
//                       <input
//                         type="text"
//                         value={option}
//                         onChange={(e) => updateOption(qIndex, oIndex, e.target.value)}
//                         className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         placeholder={`Option ${oIndex + 1}`}
//                       />
//                     </div>
//                   ))}
//                 </div>
//                 <p className="text-xs text-gray-500 mt-2">Select the correct answer by clicking the radio button</p>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="flex justify-end space-x-4">
//           <button
//             type="button"
//             className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
//           >
//             Save as Draft
//           </button>
//           <button
//             type="submit"
//             className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//           >
//             Publish Quiz
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// // MyQuizzes Component (for admins)
// const MyQuizzes = () => {
//   const [quizzes] = useState([
//     {
//       id: 1,
//       title: 'Mathematics Basics',
//       category: 'Mathematics',
//       questions: 10,
//       attempts: 23,
//       avgScore: 78,
//       status: 'active',
//       created: '2024-01-15'
//     },
//     {
//       id: 2,
//       title: 'Science Quiz',
//       category: 'Science',
//       questions: 15,
//       attempts: 18,
//       avgScore: 82,
//       status: 'active',
//       created: '2024-01-20'
//     },
//     {
//       id: 3,
//       title: 'History Challenge',
//       category: 'History',
//       questions: 12,
//       attempts: 8,
//       avgScore: 65,
//       status: 'draft',
//       created: '2024-01-25'
//     }
//   ]);

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'active': return 'bg-green-100 text-green-800';
//       case 'draft': return 'bg-yellow-100 text-yellow-800';
//       case 'archived': return 'bg-gray-100 text-gray-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold text-gray-900">My Quizzes</h1>
//         <p className="text-gray-600 mt-2">Manage your created quizzes</p>
//       </div>

//       <div className="bg-white rounded-lg shadow-md overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Quiz Title
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Category
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Questions
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Attempts
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Avg Score
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Status
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {quizzes.map((quiz) => (
//                 <tr key={quiz.id} className="hover:bg-gray-50">
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="text-sm font-medium text-gray-900">{quiz.title}</div>
//                     <div className="text-sm text-gray-500">Created: {quiz.created}</div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                     {quiz.category}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                     {quiz.questions}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                     {quiz.attempts}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                     {quiz.avgScore}%
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(quiz.status)}`}>
//                       {quiz.status.charAt(0).toUpperCase() + quiz.status.slice(1)}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
//                     <button className="text-blue-600 hover:text-blue-900">View</button>
//                     <button className="text-green-600 hover:text-green-900">Edit</button>
//                     <button className="text-red-600 hover:text-red-900">Delete</button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Main App Component
// const App = () => {
//   const [currentPage, setCurrentPage] = useState('auth');
//   const { user, loading } = useAuth();

//   useEffect(() => {
//     const handleNavigation = (e) => {
//       setCurrentPage(e.detail);
//     };

//     window.addEventListener('navigate', handleNavigation);
//     return () => window.removeEventListener('navigate', handleNavigation);
//   }, []);

//   useEffect(() => {
//     if (user && currentPage === 'auth') {
//       setCurrentPage('dashboard');
//     } else if (!user && currentPage !== 'auth') {
//       setCurrentPage('auth');
//     }
//   }, [user, currentPage]);

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <BookOpen className="h-12 w-12 text-blue-600 mx-auto mb-4 animate-pulse" />
//           <p className="text-gray-600">Loading...</p>
//         </div>
//       </div>
//     );
//   }

//   const renderPage = () => {
//     if (!user) return <AuthPage />;

//     switch (currentPage) {
//       case 'dashboard':
//         return <Dashboard />;
//       case 'profile':
//         return <Profile />;
//       case 'quizzes':
//         return <QuizList />;
//       case 'create-quiz':
//         return user.role === 'admin' ? <CreateQuiz /> : <Dashboard />;
//       case 'my-quizzes':
//         return user.role === 'admin' ? <MyQuizzes /> : <Dashboard />;
//       default:
//         return <Dashboard />;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {user && <Navbar />}
//       <main className={user ? "pt-16" : ""}>
//         {renderPage()}
//       </main>
//     </div>
//   );
// };

// // Root component with AuthProvider
// const QuizPlatform = () => {
//   return (
//     <AuthProvider>
//       <App />
//     </AuthProvider>
//   );
// };

// export default QuizPlatform;

import React, { useState } from 'react';
import { BookOpen, PlusCircle, List, Settings, LogOut, Menu, X, User } from 'lucide-react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = user?.role === 'admin'
    ? [
        { path: '/dashboard', label: 'Dashboard', icon: BookOpen },
        { path: '/create-quiz', label: 'Create Quiz', icon: PlusCircle },
        { path: '/my-quizzes', label: 'My Quizzes', icon: List },
        { path: '/profile', label: 'Profile', icon: Settings },
      ]
    : [
        { path: '/dashboard', label: 'Dashboard', icon: BookOpen },
        { path: '/quizzes', label: 'All Quizzes', icon: List },
        { path: '/profile', label: 'Profile', icon: Settings },
      ];

  const handleNavigate = (path) => {
    setMobileMenuOpen(false);
    navigate(path);
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center cursor-pointer" onClick={() => handleNavigate('/dashboard')}>
            <BookOpen className="h-8 w-8 mr-2" />
            <h1 className="text-xl font-bold">QuizPlatform</h1>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.path}
                  onClick={() => handleNavigate(item.path)}
                  className="flex items-center px-3 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {item.label}
                </button>
              );
            })}
            <button
              onClick={logout}
              className="flex items-center px-3 py-2 rounded-md hover:bg-red-600 transition-colors ml-4"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </button>
            <div className="ml-4 flex items-center gap-2">
              <User className="h-5 w-5" />
              <span className="font-medium">{user?.name}</span>
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md hover:bg-blue-700"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-blue-500">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.path}
                  onClick={() => handleNavigate(item.path)}
                  className="flex items-center w-full px-3 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {item.label}
                </button>
              );
            })}
            <button
              onClick={logout}
              className="flex items-center w-full px-3 py-2 rounded-md hover:bg-red-600 transition-colors mt-2"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </button>
            <div className="flex items-center gap-2 mt-4 px-3">
              <User className="h-5 w-5" />
              <span className="font-medium">{user?.name}</span>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;