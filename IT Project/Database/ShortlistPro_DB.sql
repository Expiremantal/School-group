CREATE DATABASE IF NOT EXISTS ShortlistPro_DB;
USE ShortlistPro_DB;

-- Table to store user registration information
CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,  -- Password should be hashed
    otp VARCHAR(6),                  -- OTP for registration/login
    otp_created_at TIMESTAMP NULL,    -- Track OTP creation time
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table to store applicant information
CREATE TABLE IF NOT EXISTS applicants (
    applicant_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,                    -- Linked to the users table
    work_number VARCHAR(15),
    cell_number VARCHAR(15),
    location VARCHAR(255),
    job_title_applied_for VARCHAR(100),
    is_sa_citizen BOOLEAN DEFAULT TRUE,
    id_number VARCHAR(20),
    passport_number VARCHAR(20),
    ethnicity VARCHAR(50),
    gender VARCHAR(10),
    date_of_birth DATE,
    is_disabled BOOLEAN DEFAULT FALSE,
    applying_from VARCHAR(255),
    linkedin_profile VARCHAR(255),
    indeed_profile VARCHAR(255),
    cv_file_path VARCHAR(255),               -- Path to CV file
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Table for HR questions
CREATE TABLE IF NOT EXISTS hr_questions (
    question_id INT AUTO_INCREMENT PRIMARY KEY,
    question_text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table for storing applicant answers to HR questions
CREATE TABLE IF NOT EXISTS applicant_answers (
    answer_id INT AUTO_INCREMENT PRIMARY KEY,
    applicant_id INT NOT NULL,
    question_id INT NOT NULL,
    answer_text TEXT NOT NULL,
    FOREIGN KEY (applicant_id) REFERENCES applicants(applicant_id) ON DELETE CASCADE,
    FOREIGN KEY (question_id) REFERENCES hr_questions(question_id) ON DELETE CASCADE
);

-- Table for job postings
CREATE TABLE IF NOT EXISTS job_postings (
    job_id INT AUTO_INCREMENT PRIMARY KEY,
    job_title VARCHAR(100) NOT NULL,
    job_description TEXT NOT NULL,
    location VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table for aptitude tests
CREATE TABLE IF NOT EXISTS aptitude_tests (
    aptitude_test_id INT AUTO_INCREMENT PRIMARY KEY,
    job_id INT NOT NULL,
    questions TEXT NOT NULL,  -- Questions stored in text or JSON format
    answers TEXT NOT NULL,     -- Correct answers stored similarly
    FOREIGN KEY (job_id) REFERENCES job_postings(job_id) ON DELETE CASCADE
);

-- Table for storing applicant answers to aptitude tests
CREATE TABLE IF NOT EXISTS aptitude_test_answers (
    answer_id INT AUTO_INCREMENT PRIMARY KEY,
    applicant_id INT NOT NULL,
    aptitude_test_id INT NOT NULL,
    answers TEXT NOT NULL,  -- Applicant's answers in text or JSON
    FOREIGN KEY (applicant_id) REFERENCES applicants(applicant_id) ON DELETE CASCADE,
    FOREIGN KEY (aptitude_test_id) REFERENCES aptitude_tests(aptitude_test_id) ON DELETE CASCADE
);

-- Table for shortlisted applicants with rankings
CREATE TABLE IF NOT EXISTS shortlists (
    shortlist_id INT AUTO_INCREMENT PRIMARY KEY,
    job_id INT NOT NULL,
    applicant_id INT NOT NULL,
    ranks INT NOT NULL,
    FOREIGN KEY (job_id) REFERENCES job_postings(job_id) ON DELETE CASCADE,
    FOREIGN KEY (applicant_id) REFERENCES applicants(applicant_id) ON DELETE CASCADE
);

-- Table for storing applicant experience
CREATE TABLE IF NOT EXISTS experience (
    experience_id INT AUTO_INCREMENT PRIMARY KEY,
    applicant_id INT NOT NULL,
    job_title VARCHAR(100),
    company VARCHAR(100),
    duration VARCHAR(50),
    FOREIGN KEY (applicant_id) REFERENCES applicants(applicant_id) ON DELETE CASCADE
);

-- Trigger to calculate and update the ranking based on test score and experience
DELIMITER //
CREATE TRIGGER update_rank AFTER INSERT ON aptitude_test_answers
FOR EACH ROW
BEGIN
   DECLARE experience_score INT DEFAULT 0;
   DECLARE test_score INT DEFAULT 0;

   -- Calculate test score (mock calculation for now)
   SET test_score = (SELECT COUNT(*) FROM aptitude_tests WHERE aptitude_test_id = NEW.aptitude_test_id);

   -- Calculate experience score (mock calculation for now)
   SET experience_score = (SELECT COUNT(*) FROM experience WHERE applicant_id = NEW.applicant_id);

   -- Insert the calculated rank into the shortlists table
   INSERT INTO shortlists (job_id, applicant_id, ranks)
   VALUES (
       (SELECT job_id FROM aptitude_tests WHERE aptitude_test_id = NEW.aptitude_test_id),
       NEW.applicant_id,
       (test_score + experience_score) / 2
   );
END;
// 
DELIMITER ;
