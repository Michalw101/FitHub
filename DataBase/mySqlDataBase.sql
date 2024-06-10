drop database project_db;
create database project_db;
use project_db;

CREATE TABLE roles (
    role_id INT PRIMARY KEY AUTO_INCREMENT,
    role_name VARCHAR(50) NOT NULL
);

CREATE TABLE users (
    user_id INT PRIMARY KEY,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(255),
    birth_date DATE,
    gender VARCHAR(255),
    role_id INT,
      FOREIGN KEY (role_id) 
      REFERENCES roles (role_id) 
      ON UPDATE RESTRICT 
      ON DELETE CASCADE
);

CREATE TABLE information (
    information_id INT PRIMARY KEY auto_increment,
	heart_disease BOOLEAN,
	chest_pain_at_rest BOOLEAN ,
	chest_pain_daily_activity BOOLEAN,
	chest_pain_exercise BOOLEAN,
	dizziness_balance_loss BOOLEAN ,
	fainting BOOLEAN ,
	asthma_medication BOOLEAN,
	asthma_symptoms BOOLEAN,
	family_heart_disease BOOLEAN,
	family_sudden_death BOOLEAN ,
	exercise_supervision BOOLEAN,
	chronic_disease BOOLEAN,
	pregnancy_risk BOOLEAN
);

CREATE TABLE trainees (
    trainee_id INT PRIMARY KEY,
    information_id INT,
    FOREIGN KEY (trainee_id) 
      REFERENCES users (user_id) 
      ON UPDATE RESTRICT 
      ON DELETE CASCADE,
    FOREIGN KEY (information_id) 
      REFERENCES information (information_id) 
      ON UPDATE RESTRICT 
      ON DELETE CASCADE
);


CREATE TABLE trainers (
    trainer_id INT PRIMARY KEY,
    experience INT,
    degree_link varchar(255),
    specialization VARCHAR(255),
    instegram_link VARCHAR(255),
	facebook_link VARCHAR(255),
    twitter_link VARCHAR(255),
    FOREIGN KEY (trainer_id) 
      REFERENCES users (user_id) 
      ON UPDATE RESTRICT 
      ON DELETE CASCADE
    
);

CREATE TABLE trainers_waiting_list (
	user_id INT PRIMARY KEY auto_increment,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(255),
    birth_date DATE,
    gender VARCHAR(255),
	degree_link varchar(255),
    experience INT,
    last_work_place VARCHAR(255),
    instegram_link VARCHAR(255),
	facebook_link VARCHAR(255),
    twitter_link VARCHAR(255)
);

CREATE TABLE classes (
    class_id INT PRIMARY KEY AUTO_INCREMENT,
    trainer_id INT,
    date DATE,
    hour TIME,
    description VARCHAR(255),
    price INT,
    link VARCHAR(255),
    FOREIGN KEY (trainer_id) 
      REFERENCES trainers (trainer_id) 
      ON UPDATE RESTRICT 
      ON DELETE CASCADE
);

CREATE TABLE trainees_in_class (
    trainee_id INT,
    class_id INT,
    PRIMARY KEY (trainee_id, class_id),
    FOREIGN KEY (trainee_id) 
      REFERENCES trainees (trainee_id) 
      ON UPDATE RESTRICT 
      ON DELETE CASCADE,
    FOREIGN KEY (class_id) 
      REFERENCES classes (class_id) 
      ON UPDATE RESTRICT 
      ON DELETE CASCADE
);

-- CREATE TABLE credit_cards (
--     trainee_id INT PRIMARY KEY,
--     card_number VARCHAR(16) NOT NULL,
--     card_expiry VARCHAR(7) NOT NULL,
--     card_CVV INT,
--     FOREIGN KEY (trainee_id) 
--       REFERENCES users (user_id) 
--       ON UPDATE RESTRICT 
--       ON DELETE CASCADE
-- );


CREATE TABLE passwords (
    user_id INT PRIMARY KEY,
    user_password VARCHAR(255),
    salt VARCHAR(255),
    FOREIGN KEY (user_id) 
      REFERENCES users (user_id) 
      ON UPDATE RESTRICT 
      ON DELETE CASCADE
);



-- Create the permissions table
CREATE TABLE permissions (
    user_id INT,
    role_id INT,
    PRIMARY KEY (user_id, role_id),
    FOREIGN KEY (user_id) 
      REFERENCES users (user_id) 
      ON UPDATE RESTRICT 
      ON DELETE CASCADE,
    FOREIGN KEY (role_id) 
      REFERENCES roles (role_id) 
      ON UPDATE RESTRICT 
      ON DELETE CASCADE
);

-- Insert data into the users table
INSERT INTO users (user_id, first_name, last_name, email, phone, birth_date, gender) 
VALUES 
(1, 'John', 'Doe', 'john.doe@example.com', '123456789', '1990-05-15', 'Male'),
(2, 'Jane', 'Smith', 'jane.smith@example.com', '987654321', '1985-10-20', 'Female'),
(3, 'Alice', 'Johnson', 'alice.johnson@example.com', '456789123', '1988-03-25', 'Female'),
(4, 'Bob', 'Brown', 'bob.brown@example.com', '654987321', '1992-07-08', 'Male'),
(5, 'Charlie', 'Davis', 'charlie.davis@example.com', '789654123', '1995-12-12', 'Male'),
(6, 'David', 'Wilson', 'david.wilson@example.com', '321456987', '1980-09-30', 'Male'),
(7, 'Emma', 'Martinez', 'emma.martinez@example.com', '159753246', '1993-04-18', 'Female'),
(8, 'Olivia', 'Taylor', 'olivia.taylor@example.com', '456123789', '1987-06-22', 'Female'),
(9, 'Ethan', 'Anderson', 'ethan.anderson@example.com', '987321654', '1998-08-05', 'Male'),
(10, 'Sophia', 'Thomas', 'sophia.thomas@example.com', '852369741', '1994-11-28', 'Female');

-- Insert data into the information table
INSERT INTO information (information_id) 
VALUES 
(1),
(2),
(3),
(4),
(5);

-- Insert data into the trainees table
INSERT INTO trainees (trainee_id, information_id) 
VALUES 
(8, 1),
(9, 2),
(10, 3);



-- Insert data into the trainers table
INSERT INTO trainers (trainer_id, 	degree_link , experience, specialization) 
VALUES 
(3, 'https://drive.google.com/file/d/1P6Ebxvp8s3_R1_kMcFVgDaUI2kjY2HpK/view', 5, 'Best At Pilatis'),
(4, 'https://drive.google.com/file/d/1P6Ebxvp8s3_R1_kMcFVgDaUI2kjY2HpK/view', 8, 'Best At Morning exc'),
(5, 'https://drive.google.com/file/d/1P6Ebxvp8s3_R1_kMcFVgDaUI2kjY2HpK/view', 3, 'Best At Gym'),
(6, 'https://drive.google.com/file/d/1P6Ebxvp8s3_R1_kMcFVgDaUI2kjY2HpK/view', 6, 'Best At KickBox'),
(7, 'https://drive.google.com/file/d/1P6Ebxvp8s3_R1_kMcFVgDaUI2kjY2HpK/view', 4, 'Best At Erobi');

select *  from classes;

-- Insert data into the classes table
INSERT INTO classes (class_id, trainer_id, date, hour, description, price, link) 
VALUES 
(1, 3, '2024-06-01', '08:00:00', 'Morning Workout', 20, 'https://example.com/class1'),
(2, 4, '2024-06-02', '18:00:00', 'Evening Yoga', 15, 'https://example.com/class2'),
(3, 5, '2024-06-03', '10:30:00', 'Pilates Session', 25, 'https://example.com/class3');

SELECT * FROM trainees WHERE trainee_id IN (8, 9, 10);


-- Insert data into the trainees_in_class table
INSERT INTO trainees_in_class (trainee_id, class_id) 
VALUES 
(8, 1),
(9, 2),
(10, 3);


-- Insert data into the passwords table
INSERT INTO passwords (user_id, user_password) 
VALUES 
(1, '4fc82b26aecb47d2868c4efbe3581732a3e7cbcc6c2efb32062c08170a05eeb8'),
(2, '4fc82b26aecb47d2868c4efbe3581732a3e7cbcc6c2efb32062c08170a05eeb8'),
(3, '4fc82b26aecb47d2868c4efbe3581732a3e7cbcc6c2efb32062c08170a05eeb8'),
(4, '4fc82b26aecb47d2868c4efbe3581732a3e7cbcc6c2efb32062c08170a05eeb8'),
(5, '4fc82b26aecb47d2868c4efbe3581732a3e7cbcc6c2efb32062c08170a05eeb8'),
(6, '4fc82b26aecb47d2868c4efbe3581732a3e7cbcc6c2efb32062c08170a05eeb8'),
(7, '4fc82b26aecb47d2868c4efbe3581732a3e7cbcc6c2efb32062c08170a05eeb8'),
(8, '4fc82b26aecb47d2868c4efbe3581732a3e7cbcc6c2efb32062c08170a05eeb8'),
(9, '4fc82b26aecb47d2868c4efbe3581732a3e7cbcc6c2efb32062c08170a05eeb8'),
(10, '4fc82b26aecb47d2868c4efbe3581732a3e7cbcc6c2efb32062c08170a05eeb8');

-- Insert data into the roles table
INSERT INTO roles (role_name) 
VALUES 
('Admin'),
('Trainer'),
('Trainee');

-- Insert data into the permissions table
INSERT INTO permissions (user_id, role_id) 
VALUES 
(1, 1),
(2, 1),
(3, 2),
(4, 2),
(5, 2),
(6, 2),
(7, 2),
(8, 3),
(9, 3),
(10, 3);
