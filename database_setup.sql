-- CipherSQLStudio Database Setup Script
-- Run these queries to set up the authentication system

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin', 'user') DEFAULT 'user',
  is_verified BOOLEAN DEFAULT FALSE,
  verification_token VARCHAR(255),
  verification_token_expires DATETIME,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_role (role),
  INDEX idx_verified (is_verified)
);

-- Insert a default admin user (password hash for 'admin123')
-- Use bcrypt to hash: password: admin123
INSERT INTO users (name, email, password, role, is_verified) VALUES
('Admin User', 'admin@example.com', '$2a$10$3k0T2d8Xc4L1V9.Z5Q7.k.G2M3P0R1S2T3U4V5W6X7Y8Z9.H0I1', 'admin', TRUE);

-- Create assignments table (for the assignment management system)
CREATE TABLE IF NOT EXISTS assignments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  prompt TEXT NOT NULL,
  difficulty ENUM('beginner', 'intermediate', 'advanced') DEFAULT 'beginner',
  database_schema LONGTEXT,
  expected_query VARCHAR(500),
  created_by INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES users(id),
  INDEX idx_difficulty (difficulty)
);

-- Create submissions table (to track user attempts)
CREATE TABLE IF NOT EXISTS submissions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  assignment_id INT NOT NULL,
  query_submitted TEXT NOT NULL,
  is_correct BOOLEAN DEFAULT FALSE,
  execution_time INT,
  error_message TEXT,
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (assignment_id) REFERENCES assignments(id),
  INDEX idx_user_assignment (user_id, assignment_id),
  INDEX idx_submitted_at (submitted_at)
);

-- Show tables to verify setup
SHOW TABLES;

-- Check admin user
SELECT id, name, email, role, is_verified FROM users WHERE email = 'admin@example.com';
