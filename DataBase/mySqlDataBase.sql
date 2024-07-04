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
    gender_limit VARCHAR(10) CHECK (gender_limit IN ('male', 'female', 'both')),
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
    class_type VARCHAR(20) CHECK (class_type IN ('Strength training', 'Crossfit', 'Zumba', 'Aerobics', 'Pilates', 'Yoga', 'Other')),
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
(214955064, 'Gru', 'Admin', 'michal0548429273@gmail.com', '0548429273', '2004-09-10', 'Male', 1),
(214859415, 'Lussie', 'Admin', 'michal24263@gmail.com', '0548475867', '2004-11-23', 'Female', 1),
(1, 'Kevin', 'The minion', 'micsharo@g.jct.ac.il', '0548429273', '1988-03-25', 'Female', 2),
(2, 'Bob', 'The minion', 'ylyyrwslmy25@gmail.com', '0548429273', '2004-07-08', 'Male', 3),
(3, 'Ariel', 'Seashell', 'micsharo@g.jct.ac.il', '0548429273', '2020-03-25', 'Female', 2),
(4, 'Simba', 'Roark', 'micsharo@g.jct.ac.il', '0548429273', '2000-03-25', 'Male', 2),
(5, 'Belle', 'Beaumont', 'micsharo@g.jct.ac.il', '0548429273', '2001-03-25', 'Female', 2),
(6, 'Elsa', 'Snow', 'micsharo@g.jct.ac.il', '0548429273', '2003-03-25', 'Female', 2),
(7, 'Aladdin', 'Desertwind', 'micsharo@g.jct.ac.il', '0548429273', '2002-03-25', 'Male', 2),
(8, 'Hercules', 'Titan', 'micsharo@g.jct.ac.il', '0548429273', '1999-03-25', 'Male', 2),
(9, 'Mickey', 'Mouse', 'micsharo@g.jct.ac.il', '0548429273', '2004-01-01', 'Male', 3),
(10, 'Minnie', 'Mouse', 'micsharo@g.jct.ac.il', '0548429273', '2004-02-14', 'Female', 3),
(11, 'Donald', 'Duck', 'micsharo@g.jct.ac.il', '0548429273', '2004-03-15', 'Male', 3),
(12, 'Daisy', 'Duck', 'micsharo@g.jct.ac.il', '0548429273', '2004-04-10', 'Female', 3),
(13, 'Goofy', 'Goof', 'micsharo@g.jct.ac.il', '0548429273', '2004-05-05', 'Male', 3),
(14, 'Pluto', 'Pup', 'micsharo@g.jct.ac.il', '0548429273', '2004-06-20', 'Male', 3),
(15, 'Tiana', 'Frog', 'micsharo@g.jct.ac.il', '0548429273', '2004-07-25', 'Female', 3),
(16, 'Rapunzel', 'Tower', 'micsharo@g.jct.ac.il', '0548429273', '2004-08-18', 'Female', 3),
(17, 'Moana', 'Ocean', 'micsharo@g.jct.ac.il', '0548429273', '2004-09-10', 'Female', 3),
(18, 'Mulan', 'Warrior', 'micsharo@g.jct.ac.il', '0548429273', '2004-10-12', 'Female', 3),
(19, 'Anna', 'Arendelle', 'micsharo@g.jct.ac.il', '0548429273', '2004-11-30', 'Female', 3),
(20, 'Elsa', 'Arendelle', 'micsharo@g.jct.ac.il', '0548429273', '2004-12-05', 'Female', 3),
(21, 'Aurora', 'Briar', 'micsharo@g.jct.ac.il', '0548429273', '2004-01-15', 'Female', 3),
(22, 'Snow', 'White', 'micsharo@g.jct.ac.il', '0548429273', '2004-02-25', 'Female', 3),
(23, 'Cinderella', 'Glass', 'micsharo@g.jct.ac.il', '0548429273', '2004-03-30', 'Female', 3),
(24, 'Pocahontas', 'Native', 'micsharo@g.jct.ac.il', '0548429273', '2004-04-22', 'Female', 3);


INSERT INTO trainers (trainer_id, experience, degree_link, specialization, instegram_link, facebook_link, twitter_link)
VALUES 
(1, 5, 'https://drive.google.com/file/d/1P6Ebxvp8s3_R1_kMcFVgDaUI2kjY2HpK/view', 'Eat BANANA', 'https://www.instagram.com/Kevin_The_Minion_Official', 'https://www.facebook.com/KevinTheMinionPage', 'https://twitter.com/KevinTheMinion123'),
(3, 5, 'https://drive.google.com/file/d/1P6Ebxvp8s3_R1_kMcFVgDaUI2kjY2HpK/view', 'Underwater Yoga', 'https://www.instagram.com/Ariel_Seashell_Official', 'https://www.facebook.com/ArielSeashellPage', 'https://twitter.com/ArielSeashell123'),
(4, 5, 'https://drive.google.com/file/d/1P6Ebxvp8s3_R1_kMcFVgDaUI2kjY2HpK/view', 'Savannah Running', 'https://www.instagram.com/Simba_Roark_Official', 'https://www.facebook.com/SimbaRoarkPage', 'https://twitter.com/SimbaRoark123'),
(5, 5, 'https://drive.google.com/file/d/1P6Ebxvp8s3_R1_kMcFVgDaUI2kjY2HpK/view', 'Enchanted Dance', 'https://www.instagram.com/Belle_Beaumont_Official', 'https://www.facebook.com/BelleBeaumontPage', 'https://twitter.com/BelleBeaumont123'),
(6, 5, 'https://drive.google.com/file/d/1P6Ebxvp8s3_R1_kMcFVgDaUI2kjY2HpK/view', 'Ice Sculpting', 'https://www.instagram.com/Elsa_Snow_Official', 'https://www.facebook.com/ElsaSnowPage', 'https://twitter.com/ElsaSnow123'),
(7, 5, 'https://drive.google.com/file/d/1P6Ebxvp8s3_R1_kMcFVgDaUI2kjY2HpK/view', 'Desert Survival Skills', 'https://www.instagram.com/Aladdin_Desertwind_Official', 'https://www.facebook.com/AladdinDesertwindPage', 'https://twitter.com/AladdinDesertwind123'),
(8, 5, 'https://drive.google.com/file/d/1P6Ebxvp8s3_R1_kMcFVgDaUI2kjY2HpK/view', 'Olympic Weightlifting', 'https://www.instagram.com/Hercules_Titan_Official', 'https://www.facebook.com/HerculesTitanPage', 'https://twitter.com/HerculesTitan123');


INSERT INTO information (information_id, heart_disease, chest_pain_at_rest, chest_pain_daily_activity, chest_pain_exercise, dizziness_balance_loss, fainting, asthma_medication, asthma_symptoms, family_heart_disease, family_sudden_death, exercise_supervision, chronic_disease, pregnancy_risk) 
VALUES 
(1, true, true, false, false, false, false, false, false, false, false, false, false, false),
(2, false, false, false, false, false, false, false, false, false, false, false, false, false),
(3, false, false, false, false, false, false, false, false, false, false, false, false, false),
(4, false, false, false, false, false, false, false, false, false, false, false, false, false),
(5, false, false, false, false, false, false, false, false, false, false, false, false, false),
(6, false, false, false, false, false, false, false, false, false, false, false, false, false),
(7, false, false, false, false, false, false, false, false, false, false, false, false, false),
(8, false, false, false, false, false, false, false, false, false, false, false, false, false),
(9, false, false, false, false, false, false, false, false, false, false, false, false, false),
(10, false, false, false, false, false, false, false, false, false, false, false, false, false),
(11, false, false, false, false, false, false, false, false, false, false, false, false, false),
(12, false, false, false, false, false, false, false, false, false, false, false, false, false),
(13, false, false, false, false, false, false, false, false, false, false, false, false, false),
(14, false, false, false, false, false, false, false, false, false, false, false, false, false),
(15, false, false, false, false, false, false, false, false, false, false, false, false, false),
(16, false, false, false, false, false, false, false, false, false, false, false, false, false),
(17, false, false, false, false, false, false, false, false, false, false, false, false, false);



INSERT INTO trainees (trainee_id, information_id) 
VALUES 
(2, 1),
(9, 2),
(10, 3),
(11, 4),
(12, 5),
(13, 6),
(14, 7),
(15, 8),
(16, 9),
(17, 10),
(18, 11),
(19, 12),
(20, 13),
(21, 14),
(22, 15),
(23, 16),
(24, 17);

INSERT INTO limits_in_class (trainer_id, gender_limit, heart_disease, chest_pain, fainted_or_dizziness, asthma, family_heart_disease_or_sudden_death, exercise_supervision, chronic_disease, pregnancy_risk) 
VALUES 
(1, 'both', true, false, false, true, true, false, false, true), 
(1, 'female', false, false, true, false, false, false, true, false), 
(3, 'male', true, true, false, false, false, false, true, false), 
(3, 'both', true, true, true, true, false, true, false, true), 
(4, 'female', false, false, false, true, true, false, false, false),  
(4, 'female', false, true, true, false, false, false, true, true), 
(5, 'both', true, false, false, true, true, false, false, true),  
(5, 'female', false, false, true, false, false, false, true, false),  
(6, 'male', true, true, false, false, false, false, true, false),  
(6, 'both', true, true, true, true, false, true, false, true),
(7, 'male', false, false, false, true, true, false, false, false), 
(7, 'male', false, true, true, false, false, false, true, true),
(8, 'male', false, false, false, true, true, false, false, false), 
(8, 'male', false, true, true, false, false, false, true, true); 


INSERT INTO classes (trainer_id, date, hour, description, price, link, limits_id, class_type) 
VALUES 
(1, '2024-07-01', '08:00:00', 'Morning Workout with Kevin', 20, 'https://meet.google.com/sov-bfcd-uku', 1, 'Strength training'),
(1, '2024-07-05', '18:00:00', 'Evening Workout with Kevin', 15, 'https://meet.google.com/sov-bfcd-uku', 2, 'Strength training'),
(3, '2024-07-01', '08:00:00', 'Dive deep into underwater yoga with Ariel!', 20, 'https://meet.google.com/sov-bfcd-uku', 3, 'Yoga'),
(3, '2024-07-05', '18:00:00', 'Relax and stretch with Ariel’s underwater yoga.', 15, 'https://meet.google.com/sov-bfcd-uku', 4, 'Yoga'),
(4, '2024-07-01', '10:30:00', 'Experience the thrill of running in the savannah with Simba!', 25, 'https://meet.google.com/sov-bfcd-uku', 5, 'Crossfit'),
(4, '2024-07-03', '06:00:00', 'Join Simba for a high-energy crossfit session.', 20, 'https://meet.google.com/sov-bfcd-uku', 6, 'Crossfit'),
(5, '2024-07-02', '10:00:00', 'Dance your way to fitness with Belle’s enchanted dance class.', 20, 'https://meet.google.com/sov-bfcd-uku', 7, 'Zumba'),
(5, '2024-07-04', '10:00:00', 'Join Belle for a magical Zumba session.', 30, 'https://meet.google.com/sov-bfcd-uku', 8, 'Zumba'),
(6, '2024-07-02', '08:00:00', 'Craft ice sculptures and stay fit with Elsa’s unique workout.', 20, 'https://meet.google.com/sov-bfcd-uku', 9, 'Strength training'),
(6, '2024-07-06', '18:00:00', 'Strength training with Elsa - cool and powerful!', 15, 'https://meet.google.com/sov-bfcd-uku', 10, 'Strength training'),
(7, '2024-07-03', '10:30:00', 'Master desert survival skills with Aladdin.', 25, 'https://meet.google.com/sov-bfcd-uku', 11, 'Other'),
(7, '2024-07-05', '06:00:00', 'Join Aladdin for a session on desert survival techniques.', 20, 'https://meet.google.com/sov-bfcd-uku', 12, 'Other'),
(8, '2024-07-04', '10:00:00', 'Train like a hero with Hercules in Olympic weightlifting.', 20, 'https://meet.google.com/sov-bfcd-uku', 13, 'Strength training'),
(8, '2024-07-06', '10:00:00', 'Build your strength with Hercules’ Olympic weightlifting class.', 30, 'https://meet.google.com/sov-bfcd-uku', 14, 'Strength training');



INSERT INTO trainees_in_class (trainee_id, class_id) 
VALUES 
(2, 1);

INSERT INTO passwords (user_id, user_password, salt) 
VALUES 
(214955064, '464e1a2683f24ff030f2deb7bb3452903ba9afb8cc67ad260e2efe6a42a8cf5f', '2a0280e31556715cbef22eca1b36ef15'),
(214859415, '464e1a2683f24ff030f2deb7bb3452903ba9afb8cc67ad260e2efe6a42a8cf5f', '2a0280e31556715cbef22eca1b36ef15'),
(1, '464e1a2683f24ff030f2deb7bb3452903ba9afb8cc67ad260e2efe6a42a8cf5f', '2a0280e31556715cbef22eca1b36ef15'),
(2, '464e1a2683f24ff030f2deb7bb3452903ba9afb8cc67ad260e2efe6a42a8cf5f', '2a0280e31556715cbef22eca1b36ef15'),
(3, '464e1a2683f24ff030f2deb7bb3452903ba9afb8cc67ad260e2efe6a42a8cf5f', '2a0280e31556715cbef22eca1b36ef15'),
(4, '464e1a2683f24ff030f2deb7bb3452903ba9afb8cc67ad260e2efe6a42a8cf5f', '2a0280e31556715cbef22eca1b36ef15'),
(5, '464e1a2683f24ff030f2deb7bb3452903ba9afb8cc67ad260e2efe6a42a8cf5f', '2a0280e31556715cbef22eca1b36ef15'),
(6, '464e1a2683f24ff030f2deb7bb3452903ba9afb8cc67ad260e2efe6a42a8cf5f', '2a0280e31556715cbef22eca1b36ef15'),
(7, '464e1a2683f24ff030f2deb7bb3452903ba9afb8cc67ad260e2efe6a42a8cf5f', '2a0280e31556715cbef22eca1b36ef15'),
(8, '464e1a2683f24ff030f2deb7bb3452903ba9afb8cc67ad260e2efe6a42a8cf5f', '2a0280e31556715cbef22eca1b36ef15'),
(9, '464e1a2683f24ff030f2deb7bb3452903ba9afb8cc67ad260e2efe6a42a8cf5f', '2a0280e31556715cbef22eca1b36ef15'),
(10, '464e1a2683f24ff030f2deb7bb3452903ba9afb8cc67ad260e2efe6a42a8cf5f', '2a0280e31556715cbef22eca1b36ef15'),
(11, '464e1a2683f24ff030f2deb7bb3452903ba9afb8cc67ad260e2efe6a42a8cf5f', '2a0280e31556715cbef22eca1b36ef15'),
(12, '464e1a2683f24ff030f2deb7bb3452903ba9afb8cc67ad260e2efe6a42a8cf5f', '2a0280e31556715cbef22eca1b36ef15'),
(13, '464e1a2683f24ff030f2deb7bb3452903ba9afb8cc67ad260e2efe6a42a8cf5f', '2a0280e31556715cbef22eca1b36ef15'),
(14, '464e1a2683f24ff030f2deb7bb3452903ba9afb8cc67ad260e2efe6a42a8cf5f', '2a0280e31556715cbef22eca1b36ef15'),
(15, '464e1a2683f24ff030f2deb7bb3452903ba9afb8cc67ad260e2efe6a42a8cf5f', '2a0280e31556715cbef22eca1b36ef15'),
(16, '464e1a2683f24ff030f2deb7bb3452903ba9afb8cc67ad260e2efe6a42a8cf5f', '2a0280e31556715cbef22eca1b36ef15'),
(17, '464e1a2683f24ff030f2deb7bb3452903ba9afb8cc67ad260e2efe6a42a8cf5f', '2a0280e31556715cbef22eca1b36ef15'),
(18, '464e1a2683f24ff030f2deb7bb3452903ba9afb8cc67ad260e2efe6a42a8cf5f', '2a0280e31556715cbef22eca1b36ef15'),
(19, '464e1a2683f24ff030f2deb7bb3452903ba9afb8cc67ad260e2efe6a42a8cf5f', '2a0280e31556715cbef22eca1b36ef15'),
(20, '464e1a2683f24ff030f2deb7bb3452903ba9afb8cc67ad260e2efe6a42a8cf5f', '2a0280e31556715cbef22eca1b36ef15'),
(21, '464e1a2683f24ff030f2deb7bb3452903ba9afb8cc67ad260e2efe6a42a8cf5f', '2a0280e31556715cbef22eca1b36ef15'),
(22, '464e1a2683f24ff030f2deb7bb3452903ba9afb8cc67ad260e2efe6a42a8cf5f', '2a0280e31556715cbef22eca1b36ef15'),
(23, '464e1a2683f24ff030f2deb7bb3452903ba9afb8cc67ad260e2efe6a42a8cf5f', '2a0280e31556715cbef22eca1b36ef15'),
(24, '464e1a2683f24ff030f2deb7bb3452903ba9afb8cc67ad260e2efe6a42a8cf5f', '2a0280e31556715cbef22eca1b36ef15');

SELECT
    c.class_id,
    c.trainer_id,
    c.date,
    c.hour,
    c.description,
    c.price,
    c.link,
    c.class_type,
    u.first_name AS trainer_first_name,
    u.last_name AS trainer_last_name,
    u.email AS trainer_email,
    u.phone AS trainer_phone,
    trainer.instegram_link,
    trainer.facebook_link,
    trainer.twitter_link
FROM classes c
JOIN limits_in_class l ON c.limits_id = l.limits_id
JOIN trainees t ON t.trainee_id = 15
JOIN information i ON t.information_id = i.information_id
JOIN users u ON c.trainer_id = u.user_id
JOIN trainers trainer ON c.trainer_id = trainer.trainer_id
JOIN users tu ON t.trainee_id = tu.user_id 
WHERE (l.gender_limit = 'both' OR l.gender_limit = tu.gender)
AND (l.heart_disease = FALSE OR i.heart_disease = FALSE)
AND (l.chest_pain = FALSE OR (i.chest_pain_at_rest = FALSE AND i.chest_pain_daily_activity = FALSE AND i.chest_pain_exercise = FALSE))
AND (l.fainted_or_dizziness = FALSE OR (i.dizziness_balance_loss = FALSE AND i.fainting = FALSE))
AND (l.asthma = FALSE OR (i.asthma_medication = FALSE AND i.asthma_symptoms = FALSE))
AND (l.family_heart_disease_or_sudden_death = FALSE OR (i.family_heart_disease = FALSE AND i.family_sudden_death = FALSE))
AND (l.exercise_supervision = FALSE OR i.exercise_supervision = FALSE)
AND (l.chronic_disease = FALSE OR i.chronic_disease = FALSE)
AND (l.pregnancy_risk = FALSE OR i.pregnancy_risk = FALSE);

