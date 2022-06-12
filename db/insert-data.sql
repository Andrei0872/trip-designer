-- user
INSERT INTO "user" (email, password, is_admin, profile_photo) 
VALUES ('george@gmail.com', 'georgepa55', FALSE, NULL);

INSERT INTO "user" (email, password, is_admin, profile_photo)
VALUES ('elena@gmail.com', 'elenapa55', TRUE, NULL);

INSERT INTO "user" (email, password, is_admin, profile_photo)
VALUES ('mihai@gmail.com', 'mariuspa55', FALSE, NULL);

-- trip
INSERT INTO trip (user_id, start_date, end_date, accommodation_link, transport_link)
VALUES (1, '2022-10-05', '2022-10-08', 'shorturl.at/bkz34', NULL);

INSERT INTO trip (user_id, start_date, end_date, accommodation_link, transport_link)
VALUES (3, '2022-12-20', '2022-12-25', 'shorturl.at/betB1', 'shorturl.at/hrIJ5');

INSERT INTO trip (user_id, start_date, end_date, accommodation_link, transport_link)
VALUES (1, '2022-08-01', '2022-08-02', NULL, 'shorturl.at/dnuBD');

-- to_do
INSERT INTO to_do (trip_id, checked, description)
VALUES (1, FALSE, 'take shampoo');

INSERT INTO to_do (trip_id, checked, description)
VALUES (1, FALSE, 'check COVID-19  restrictions');

INSERT INTO to_do (trip_id, checked, description)
VALUES (1, FALSE, 'do not forget sunscreen');

INSERT INTO to_do (trip_id, checked, description)
VALUES (2, FALSE, 'check luggage dimensions');

INSERT INTO to_do (trip_id, checked, description)
VALUES (2, FALSE, 'do not forget baby food');

INSERT INTO to_do (trip_id, checked, description)
VALUES (3, FALSE, 'take umbrellas');

INSERT INTO to_do (trip_id, checked, description)
VALUES (3, FALSE, 'take pills');

INSERT INTO to_do (trip_id, checked, description)
VALUES (3, FALSE, 'read visa information');

-- activity
INSERT INTO activity (name, description, category, city, country)
VALUES ('County Museum of Art', 'The largest art museum in the western United States, with a collection of more than 147,000 objects that illuminate 6,000 years of artistic expression across the globe.', '{cultural, indoor}' , 'Los Angeles', 'USA');

INSERT INTO activity (name, description, category, city, country)
VALUES ('Watts Tower', 'A collection of 17 interconnected sculptural towers, architectural structures, and individual sculptural features and mosaics within the site of the artist''s original residential property in Watts, Los Angeles.', '{cultural, outdoor}', 'Los Angeles', 'USA');

INSERT INTO activity (name, description, category, city, country)
VALUES ('Runyon Canyon Park', 'One of the most popular hiking destinations in Los Angeles and often shows up on publishers'' lists of best hikes in LA.', '{sport, outdoor}', 'Los Angeles', 'USA');

INSERT INTO activity (name, description, category, city, country)
VALUES ('Escape Room LA', NULL, '{entertainment, indoor}', 'Los Angeles', 'USA');

INSERT INTO activity (name, description, category, city, country)
VALUES ('Disneyland', 'With its mix of new and classic attractions and entertainment, Walt''s original Theme Park is home to timeless fun. Here, you can meet some of your favorite Disney Characters.', '{entertainment, outdoor}', 'Los Angeles', 'USA');

INSERT INTO activity (name, description, category, city, country)
VALUES ('Maccheroni Republic', NULL, '{drinks, food}', 'Los Angeles', 'USA');

INSERT INTO activity (name, description, category, city, country)
VALUES ('Menotti''s Coffee Stop', NULL, '{drinks}', 'Los Angeles', 'USA');

INSERT INTO activity (name, description, category, city, country)
VALUES ('Sushi Gen', NULL, '{drinks, food}', 'Los Angeles', 'USA');

INSERT INTO activity (name, description, category, city, country)
VALUES ('Off Vine', NULL, '{drinks, food}', 'Los Angeles', 'USA');

INSERT INTO activity (name, description, category, city, country)
VALUES ('The Grove', NULL, '{outdoor,shopping}', 'Los Angeles', 'USA');

INSERT INTO activity (name, description, category, city, country)
VALUES ('South Coast Plaza', NULL, '{indoor,shopping}', 'Los Angeles', 'USA');

-- trip_activity
INSERT INTO trip_activity (trip_id, activity_id, day_number, hours, note)
VALUES (1, 1, 1, '10:00-12:00', 'check Mary Cassatt''s artwork');

INSERT INTO trip_activity (trip_id, activity_id, day_number, hours, note)
VALUES (1, 2, 1, '16:30-18:00', NULL);

INSERT INTO trip_activity (trip_id, activity_id, day_number, hours, note)
VALUES (1, 8, 2, '13:00-14:10', 'kinda boring');

INSERT INTO trip_activity (trip_id, activity_id, day_number, hours, note)
VALUES (2, 3, 1, '10:00-12:00', NULL);

INSERT INTO trip_activity (trip_id, activity_id, day_number, hours, note)
VALUES (2, 4, 2, '13:30-16:00', NULL);

INSERT INTO trip_activity (trip_id, activity_id, day_number, hours, note)
VALUES (2, 9, 4, '19:00-21:30', 'amazing food and great serving');

INSERT INTO trip_activity (trip_id, activity_id, day_number, hours, note)
VALUES (3, 5, 1, '11:00-13:00', 'take more money next time');

INSERT INTO trip_activity (trip_id, activity_id, day_number, hours, note)
VALUES (3, 6, 2, '17:20-18:10', NULL);

INSERT INTO trip_activity (trip_id, activity_id, day_number, hours, note)
VALUES (3, 7, 4, '12:00-13:30', 'the lobster was not so good');




