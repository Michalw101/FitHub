DROP DATABASE IF EXISTS project_db;
CREATE DATABASE project_db;
USE project_db;

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
    information_id INT PRIMARY KEY AUTO_INCREMENT,
    heart_disease BOOLEAN,
    chest_pain_at_rest BOOLEAN,
    chest_pain_daily_activity BOOLEAN,
    chest_pain_exercise BOOLEAN,
    dizziness_balance_loss BOOLEAN,
    fainting BOOLEAN,
    asthma_medication BOOLEAN,
    asthma_symptoms BOOLEAN,
    family_heart_disease BOOLEAN,
    family_sudden_death BOOLEAN,
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
    degree_link VARCHAR(255),
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
    user_id INT PRIMARY KEY,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(255),
    birth_date DATE,
    gender VARCHAR(255),
    degree_link VARCHAR(255),
    experience INT,
    specialization VARCHAR(255),
    last_work_place VARCHAR(255),
    place_of_study VARCHAR(255),
    instegram_link VARCHAR(255),
    facebook_link VARCHAR(255),
    twitter_link VARCHAR(255)
);

CREATE TABLE limits_in_class (
    limits_id INT PRIMARY KEY AUTO_INCREMENT,
    trainer_id INT,
    gender VARCHAR(10) CHECK (gender IN ('male', 'female', 'both')),
    heart_disease BOOLEAN,
    chest_pain BOOLEAN,
    fainted_or_dizziness BOOLEAN,
    asthma BOOLEAN,
    family_heart_disease_or_sudden_death BOOLEAN,
    exercise_supervision BOOLEAN,
    chronic_disease BOOLEAN,
    pregnancy_risk BOOLEAN,
    FOREIGN KEY (trainer_id) 
      REFERENCES trainers (trainer_id) 
      ON UPDATE RESTRICT 
      ON DELETE CASCADE
);

CREATE TABLE classes (
    class_id INT PRIMARY KEY AUTO_INCREMENT,
    trainer_id INT,
    date DATE,
    hour TIME,
    description VARCHAR(255),
    price INT,
    link VARCHAR(255),
    limits_id INT,
    FOREIGN KEY (trainer_id) 
      REFERENCES trainers (trainer_id) 
      ON UPDATE RESTRICT 
      ON DELETE CASCADE,
    FOREIGN KEY (limits_id) 
      REFERENCES limits_in_class (limits_id) 
      ON UPDATE RESTRICT 
      ON DELETE CASCADE
);

CREATE TABLE trainees_waiting_list (
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

CREATE TABLE passwords (
    user_id INT PRIMARY KEY,
    user_password VARCHAR(255),
    salt VARCHAR(255),
    FOREIGN KEY (user_id) 
      REFERENCES users (user_id) 
      ON UPDATE RESTRICT 
      ON DELETE CASCADE
);

INSERT INTO roles (role_name) 
VALUES 
('Admin'),
('Trainer'),
('Trainee');

INSERT INTO users (user_id, first_name, last_name, email, phone, birth_date, gender, role_id) 
VALUES 
(214955064, 'Gru', 'Admin', 'michal0548429273@gmail.com', '0548429273', '2004-09-10', 'Female', 1),
(214859415, 'Lussie', 'Admin', 'michal24263@gmail.com', '0548475867', '2004-11-23', 'Female', 1),
(1, 'Kevin', 'The minion', 'micsharo@g.jct.ac.il', '456789123', '1988-03-25', 'Female', 2),
(2, 'Bob', 'The minion', 'ylyyrwslmy25@gmail.com', '654987321', '1992-07-08', 'Male', 3);

INSERT INTO trainers (trainer_id, experience, degree_link, specialization, instegram_link, facebook_link, twitter_link)
VALUES 
(1, 5, 'https://drive.google.com/file/d/1P6Ebxvp8s3_R1_kMcFVgDaUI2kjY2HpK/view', 'Eat BANANA', 'https://www.instagram.com/Kevin_The_Minion_Official', 'https://www.facebook.com/KevinTheMinionPage', 'https://twitter.com/KevinTheMinion123');

INSERT INTO information (information_id, heart_disease, chest_pain_at_rest, chest_pain_daily_activity, chest_pain_exercise, dizziness_balance_loss, fainting,
    asthma_medication, asthma_symptoms, family_heart_disease, family_sudden_death, exercise_supervision, chronic_disease, pregnancy_risk) 
VALUES 
(1, false, false, false, false, false, false, false, false, false, false, false, false, false);

INSERT INTO trainees (trainee_id, information_id) 
VALUES 
(2, 1);

INSERT INTO limits_in_class (trainer_id, gender, heart_disease, chest_pain, fainted_or_dizziness, asthma, family_heart_disease_or_sudden_death,
    exercise_supervision, chronic_disease, pregnancy_risk) 
VALUES 
(1, 'male', true, false, false, true, true, false, false, true),
(1, 'female', false, false, true, false, false, false, true, false),
(1, 'male', true, true, false, false, false, false, true, false),
(1, 'both', true, true, true, true, false, true, false, true),
(1, 'both', false, false, false, true, true, false, false, false),
(1, 'female', false, true, true, false, false, false, true, true);

INSERT INTO classes (trainer_id, date, hour, description, price, link, limits_id) 
VALUES 
(1, '2024-06-27', '08:00:00', 'Morning Workout', 20, 'https://meet.google.com/sov-bfcd-uku', 1),
(1, '2024-06-28', '18:00:00', 'Evening Yoga', 15, 'https://meet.google.com/sov-bfcd-uku', 2),
(1, '2024-06-29', '10:30:00', 'Pilates Session', 25, 'https://meet.google.com/sov-bfcd-uku', 3),
(1, '2024-06-30', '06:00:00', 'Morning Workout333', 20, 'https://meet.google.com/sov-bfcd-uku', 4),
(1, '2024-06-27', '10:00:00', 'Morning Workout...', 20, 'https://meet.google.com/sov-bfcd-uku', 5),
(1, '2024-06-18', '10:00:00', 'Morning Workout😎', 30, 'https://meet.google.com/sov-bfcd-uku', 6);

INSERT INTO trainees_in_class (trainee_id, class_id) 
VALUES 
(2, 1);

INSERT INTO passwords (user_id, user_password, salt) 
VALUES 
(214955064, 'hashed_password1', 'salt1'),
(214859415, 'hashed_password2', 'salt2'),
(1, 'hashed_password3', 'salt3'),
(2, 'hashed_password4', 'salt4');

-- insert into trainers_waiting_list(user_id, first_name, last_name, email, phone, birth_date, gender, degree_link, experience, specialization, last_work_place, place_of_study, instegram_link, facebook_link, twitter_link)
-- values (4, "a", "a", "michal0548429273@gmail.com", "050", '2004-06-03', "Female", "aaaa", "12", "blablabla", "d", "f", "f","f", "f");

-- insert into trainees_waiting_list(trainee_id, class_id) values (214955064, 7);

-- insert into trainees(trainee_id, information_id) values (214955064, 1);



-- SELECT * FROM trainees_waiting_list join users where class_id = 3  and users.user_id = trainees_waiting_list.trainee_id