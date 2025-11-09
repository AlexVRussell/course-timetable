CREATE DATABASE hackathon2_db;
USE course_timeTable;

CREATE TABLE courses (
  course_id INT PRIMARY KEY AUTO_INCREMENT,
  course_code VARCHAR(20),
  title VARCHAR(100),
  instructor VARCHAR(100),
  time VARCHAR(50),
  location VARCHAR(50)
);

CREATE TABLE user_schedule (
  user_id INT,
  course_id INT,
  FOREIGN KEY (course_id) REFERENCES courses(course_id)
);

INSERT INTO courses (course_code, title, instructor, time, location)
VALUES 
('CSCI 1234', 'Intro to Web Development', 'Dr. Leia Organa', 'Mon 10:00–11:30', 'Room G101'),
('CSCI 2170', 'Server-Side Scripting', 'Dr. Han Solo', 'Wed 14:00–15:30', 'Room F203'),
('CSCI 2134', 'Data Structures', 'Dr. Luke Skywalker', 'Fri 9:00–10:30', 'Room A202');