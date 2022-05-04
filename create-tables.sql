CREATE TYPE category AS ENUM ('cultural', 'sport', 'experience', 'entertainment', 'outdoor', 'indoor');

CREATE TABLE user (
id INT PRIMARY KEY,
email VARCHAR(30) NOT NULL,
password VARCHAR(30) NOT NULL,
is_admin BOOL NOT NULL,
profile_photo VARCHAR(100) 
);

CREATE TABLE trip (
id INT PRIMARY KEY,
user_id INT NOT NULL,
start_date DATE NOT NULL,
end_date DATE NOT NULL,
accommodation_link VARCHAR(100),
transport_link VARCHAR(100),
CONSTRAINT fk_user_id FOREIGN KEY(user_id) REFERENCES user(id) ON DELETE CASCADE,
CHECK (start_date < end_date)
);

CREATE TABLE to_do (
id INT PRIMARY KEY,
trip_id INT NOT NULL,
checked BOOL NOT NULL,
description VARCHAR(100) NOT NULL,
CONSTRAINT fk_trip_id FOREIGN KEY(trip_id) REFERENCES trip(id) ON DELETE CASCADE
);

CREATE TABLE activity (
id INT PRIMARY KEY,
category category[] NOT NULL,
city VARCHAR(30) NOT NULL,
country VARCHAR(30) NOT NULL
);

CREATE TABLE trip_activity (
trip_id INT PRIMARY KEY,
activity_id INT PRIMARY KEY,
day_number INT NOT NULL,
hours VARCHAR(15) NOT NULL,
note VARCHAR(150),
CONSTRAINT fk_trip_id FOREIGN KEY(trip_id) REFERENCES trip(id) ON DELETE CASCADE,
CONSTRAINT fk_activity_id FOREIGN KEY(activity_id) REFERENCES activity(id) ON DELETE CASCADE,
CHECK (hours LIKE ('__:__-__:__')),
CHECK (day_number BETWEEN 1 AND 31)
);