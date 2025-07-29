-- Create the banking database
DROP DATABASE IF EXISTS banking;
CREATE DATABASE banking;
USE banking;

-- Create the users table
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  balance FLOAT NOT NULL,
  accountType VARCHAR(50) NOT NULL
);

-- Insert sample data
INSERT INTO users (name, email, balance, accountType) VALUES
('Jane Doe', 'jane@example.com', 450, 'savings'),
('John Smith', 'john@example.com', 200, 'checking'),
('Ali Njeri', 'ali@example.com', 50, 'savings'),
('Fatuma Said', 'fatuma@example.com', 900, 'checking'),
('Brian Otieno', 'brian@example.com', 120, 'savings'),
('Grace Wanjiku', 'grace@example.com', 275, 'savings'),
('Peter Mwaura', 'peter@example.com', 350, 'checking'),
('Diana Oketch', 'diana@example.com', 100, 'savings'),
('Samuel Kariuki', 'samuel@example.com', 800, 'checking'),
('Lilian Achieng', 'lilian@example.com', 50, 'savings');
