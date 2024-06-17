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
	user_id INT PRIMARY KEY,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(255),
    birth_date DATE,
    gender VARCHAR(255),
	degree_link varchar(255),
    experience INT,
    specialization varchar(255),
    last_work_place VARCHAR(255),
    place_of_study varchar(255),
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

INSERT INTO users (user_id, first_name, last_name, email, phone, birth_date, gender , role_id) 
VALUES 
(214955064, 'Gru', 'Admin', 'michal0548429273@gmail.com', '0548429273', '2004-09-10', 'Female', 1),
(214859415, 'Lussie', 'Admin', 'michal24263@gmail.com', '0548475867', '2004-11-23', 'Female', 1),
(1, 'Kevin', 'The minion', 'micsharo@g.jct.ac.il', '456789123', '1988-03-25', 'Female', 2),
(2, 'Bob', 'The minion', 'ylyyrwslmy25@gmail.com', '654987321', '1992-07-08', 'Male', 3);


INSERT INTO information (information_id, heart_disease,	chest_pain_at_rest, chest_pain_daily_activity, chest_pain_exercise,	dizziness_balance_loss, fainting,
	asthma_medication,asthma_symptoms, family_heart_disease, family_sudden_death, exercise_supervision, chronic_disease, pregnancy_risk) 
VALUES 
(1, false,false,false,false,false,false,false,false,false,false,false,false,false);


INSERT INTO trainees (trainee_id, information_id) 
VALUES 
(2, 1);


INSERT INTO trainers  (trainer_id, experience, degree_link, specialization, instegram_link, facebook_link, twitter_link)
VALUES 
(1, 5, 'https://drive.google.com/file/d/1P6Ebxvp8s3_R1_kMcFVgDaUI2kjY2HpK/view', 'Eat BANANA', "https://www.instagram.com/Kevin_The_Minion_Official","https://www.facebook.com/KevinTheMinionPage","https://twitter.com/KevinTheMinion123");



INSERT INTO classes (class_id, trainer_id, date, hour, description, price, link) 
VALUES 
(1, 1, '2024-06-01', '08:00:00', 'Morning Workout', 20, 'https://example.com/class1'),
(2, 1, '2024-06-02', '18:00:00', 'Evening Yoga', 15, 'https://example.com/class2'),
(3, 1, '2024-06-03', '10:30:00', 'Pilates Session', 25, 'https://example.com/class3'),
(4, 1, '2024-06-01', '06:00:00', 'Morning Workout333', 20, 'https://example.com/class1'),
(5, 1, '2024-06-01', '10:00:00', 'Morning Workout...', 20, 'https://example.com/class1'),
(6, 1, '2024-06-03', '10:00:00', 'Morning Workout😎', 30, 'https://example.com/class1');

INSERT INTO trainees_in_class (trainee_id, class_id) 
VALUES 
(2, 1);


INSERT INTO passwords (user_id, user_password, salt) 
VALUES 
(214955064, '464e1a2683f24ff030f2deb7bb3452903ba9afb8cc67ad260e2efe6a42a8cf5f', "2a0280e31556715cbef22eca1b36ef15"),
(214859415, '464e1a2683f24ff030f2deb7bb3452903ba9afb8cc67ad260e2efe6a42a8cf5f', "2a0280e31556715cbef22eca1b36ef15"),
(1, '464e1a2683f24ff030f2deb7bb3452903ba9afb8cc67ad260e2efe6a42a8cf5f', "2a0280e31556715cbef22eca1b36ef15"),
(2, '464e1a2683f24ff030f2deb7bb3452903ba9afb8cc67ad260e2efe6a42a8cf5f', "2a0280e31556715cbef22eca1b36ef15");




