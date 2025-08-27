// const API_URL = "http://localhost:5000/api";

// export async function registerUser(data) {
//   console.log("Registering with:", data); // Add this
//   const res = await fetch(`${API_URL}/auth/register`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data),
//   });
//   const result = await res.json();
//   if (!res.ok) throw new Error(result.error || "Registration failed");
//   return result;
// }

// export async function loginUser(data) {
//   const res = await fetch(`${API_URL}/auth/login`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data),
//   });
//   const result = await res.json();
//   if (!res.ok) throw new Error(result.error || "Login failed");
//   return result;
// }

const API_URL = import.meta.env.REACT_APP_API_URL || "http://localhost:5000/api";

// Helper function to handle API responses
const handleResponse = async (response) => {
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error || `HTTP error! status: ${response.status}`);
  }
  
  return data;
};

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

// Register user
export async function registerUser(data) {
  try {
    console.log("Registering user with:", { ...data, password: '[HIDDEN]' });
    
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    return await handleResponse(response);
  } catch (error) {
    console.error("Registration API error:", error);
    throw error;
  }
}

// Login user
export async function loginUser(data) {
  try {
    console.log("Logging in user with email:", data.email);
    
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    return await handleResponse(response);
  } catch (error) {
    console.error("Login API error:", error);
    throw error;
  }
}

// Get current user info
export async function getCurrentUser() {
  try {
    const response = await fetch(`${API_URL}/auth/me`, {
      method: "GET",
      headers: getAuthHeaders(),
    });
    
    return await handleResponse(response);
  } catch (error) {
    console.error("Get current user API error:", error);
    throw error;
  }
}

// Logout user (optional API call)
export async function logoutUser() {
  try {
    const response = await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      headers: getAuthHeaders(),
    });
    
    return await handleResponse(response);
  } catch (error) {
    console.error("Logout API error:", error);
    // Don't throw error for logout as it's not critical
    return { message: 'Logout completed locally' };
  }
}

// Quiz API functions (these would need authentication)
export async function getQuizzes() {
  try {
    const response = await fetch(`${API_URL}/quizzes`, {
      method: "GET",
      headers: getAuthHeaders(),
    });
    
    return await handleResponse(response);
  } catch (error) {
    console.error("Get quizzes API error:", error);
    throw error;
  }
}

export async function createQuiz(quizData) {
  try {
    const response = await fetch(`${API_URL}/quizzes`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(quizData),
    });
    
    return await handleResponse(response);
  } catch (error) {
    console.error("Create quiz API error:", error);
    throw error;
  }
}

export async function getQuizById(quizId) {
  try {
    const response = await fetch(`${API_URL}/quizzes/${quizId}`, {
      method: "GET",
      headers: getAuthHeaders(),
    });
    
    return await handleResponse(response);
  } catch (error) {
    console.error("Get quiz by ID API error:", error);
    throw error;
  }
}

export async function submitQuizResult(quizId, answers) {
  try {
    const response = await fetch(`${API_URL}/results`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({ quizId, answers }),
    });
    
    return await handleResponse(response);
  } catch (error) {
    console.error("Submit quiz result API error:", error);
    throw error;
  }
}

// Get my quizzes
export async function getMyQuizzes(userId) {
  try {
    const response = await fetch(`${API_URL}/quizzes/my/${userId}`, {
      method: "GET",
      headers: getAuthHeaders(),
    });
    
    return await handleResponse(response);
  } catch (error) {
    console.error("Get my quizzes API error:", error);
    throw error;
  }
}

// Health check
export async function checkHealth() {
  try {
    const response = await fetch(`${API_URL}/health`, {
      method: "GET",
    });
    
    return await handleResponse(response);
  } catch (error) {
    console.error("Health check API error:", error);
    throw error;
  }
}