CREATE TYPE category AS ENUM ('drinks', 'food', 'cultural', 'sport', 'experience', 'entertainment', 'outdoor', 'indoor');

CREATE TABLE "user" (
id SERIAL PRIMARY KEY,
email VARCHAR(30) NOT NULL,
password VARCHAR(30) NOT NULL,
is_admin BOOL NOT NULL,
profile_photo VARCHAR(100) 
);

CREATE TABLE trip (
id SERIAL PRIMARY KEY,
user_id INT NOT NULL,
start_date DATE NOT NULL,
end_date DATE NOT NULL,
accommodation_link VARCHAR(500),
transport_link VARCHAR(500),
CONSTRAINT fk_user_id FOREIGN KEY(user_id) REFERENCES "user"(id) ON DELETE CASCADE,
CHECK (start_date < end_date)
);

CREATE TABLE to_do (
id SERIAL PRIMARY KEY,
trip_id INT NOT NULL,
checked BOOL NOT NULL,
description VARCHAR(200) NOT NULL,
CONSTRAINT fk_trip_id FOREIGN KEY(trip_id) REFERENCES trip(id) ON DELETE CASCADE
);

CREATE TABLE activity (
id SERIAL PRIMARY KEY,
name VARCHAR(50) NOT NULL,
description VARCHAR(300),
category category[] NOT NULL,
city VARCHAR(30) NOT NULL,
country VARCHAR(30) NOT NULL
);

CREATE TABLE trip_activity (
trip_id INT NOT NULL,
activity_id INT NOT NULL,
day_number INT NOT NULL,
hours VARCHAR(15) NOT NULL,
note VARCHAR(200),
CONSTRAINT fk_trip_id FOREIGN KEY(trip_id) REFERENCES trip(id) ON DELETE CASCADE,
CONSTRAINT fk_activity_id FOREIGN KEY(activity_id) REFERENCES activity(id) ON DELETE CASCADE,
PRIMARY KEY(trip_id, activity_id, day_number),
CHECK (hours LIKE ('__:__-__:__')),
CHECK (day_number BETWEEN 1 AND 31)
);
