import jwt from "jsonwebtoken";
import User from "../models/user.js";

// Middleware to verify JWT token
export const authenticateToken = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.header("Authorization");
    const token = authHeader && authHeader.startsWith("Bearer ") 
      ? authHeader.substring(7) 
      : null;

    if (!token) {
      return res.status(401).json({
        error: "Access denied. No token provided."
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Get user from database
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({
        error: "Invalid token. User not found."
      });
    }

    if (!user.isActive) {
      return res.status(401).json({
        error: "Account has been deactivated."
      });
    }

    // Add user to request object
    req.user = user;
    next();

  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        error: "Invalid token."
      });
    } else if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        error: "Token expired. Please log in again."
      });
    }
    
    console.error("Auth middleware error:", error);
    res.status(500).json({
      error: "Server error during authentication."
    });
  }
};

// Middleware to check if user has admin role
export const requireAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({
      error: "Access denied. Admin privileges required."
    });
  }
};

// Middleware to check if user has user role (or admin)
export const requireUser = (req, res, next) => {
  if (req.user && (req.user.role === "user" || req.user.role === "admin")) {
    next();
  } else {
    res.status(403).json({
      error: "Access denied. User privileges required."
    });
  }
};

// Optional authentication - doesn't fail if no token
export const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    const token = authHeader && authHeader.startsWith("Bearer ") 
      ? authHeader.substring(7) 
      : null;

    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.userId);
      if (user && user.isActive) {
        req.user = user;
      }
    }
    
    next();
  } catch (error) {
    // Continue without authentication if token is invalid
    next();
  }
};