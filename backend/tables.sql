DROP TABLE IF EXISTS manufacturers CASCADE;
CREATE TABLE manufacturers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

DROP TABLE IF EXISTS cars CASCADE;
CREATE TABLE cars (
  id SERIAL PRIMARY KEY,
  manufacturer_id INTEGER REFERENCES manufacturers(id),
  model VARCHAR(100) NOT NULL,
  fuel_type VARCHAR(50),
  transmission_type VARCHAR(20),
  production_year INTEGER,
  image_url VARCHAR(255),
  seats INTEGER,
  price DECIMAL(10,2)
);

DROP TABLE IF EXISTS rentals CASCADE;
CREATE TABLE rentals (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(255) REFERENCES users(user_id),
  car_id INTEGER REFERENCES cars(id),
  store_loc INTEGER REFERENCES store_location(id),
  pick_up_date DATE NOT NULL,
  drop_off_date DATE NOT NULL,
  pick_up_time TIME NOT NULL,
  drop_off_time TIME NOT NULL,
  phone INT NOT NULL
);

DROP TABLE IF EXISTS store_location CASCADE;
CREATE TABLE store_location (
  id SERIAL PRIMARY KEY,
  address VARCHAR(255) NOT NULL
);

DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
  user_id VARCHAR(255) PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);



-- Inserting data into store_location table
INSERT INTO store_location (address) VALUES
  ('Residence Youssef, 2 Bir Anzaran, Ifrane'),
  ('Ifrane centre ville');
-- Insert data into the manufacturers table
INSERT INTO manufacturers (name) VALUES
('Dacia'),
('Ford'),
('Honda'),
('Volkswagen'),
('Nissan'),
('Toyota');
-- Insert data into the cars table
INSERT INTO cars (manufacturer_id, model, fuel_type, transmission_type, production_year, image_url, seats, price) VALUES
(1, 'Sandero', 'Gas', 'Manual', 2018, '/images/dacia/dacia02.png', 5, 250),
(2, 'Fiesta', 'Gas','Manual', 2017, '/images/ford/ford01.png', 5, 270),
(3, 'CR-V', 'Gas', 'Manual',2022, '/images/honda/honda02.png', 5, 350),
(4, 'GTD', 'Gas','Automatic',2020, '/images/golf/golf01.png', 5, 290),
(5, 'Tidia', 'Gas', 'Manual', 2022, '/images/nissan/nissan01.png', 5, 300),
(6, 'MyToyota', 'Gas','Manual', 2022, '/images/toyota/toyota01.png',5, 270);

INSERT INTO cars (manufacturer_id, model, fuel_type, transmission_type, production_year, image_url, seats, price) VALUES
(1, 'Duster', 'Gas', 'Manual', 2018, '/images/dacia/dacia03.png', 5, 290),
(2, 'Focus', 'Gas','Manual', 2017, '/images/ford/ford02.png', 5, 250);


INSERT INTO cars (manufacturer_id, model, fuel_type, transmission_type, production_year, image_url, seats, price) VALUES
(1, 'Stepway', 'Gas', 'Manual', 2018, '/images/dacia/dacia01.png', 5, 220),
(2, 'Fugo', 'Gas','Manual', 2017, '/images/ford/ford03.png', 5, 200),
(3, 'HN', 'Gas','Automatic',2020, '/images/honda/honda03.png', 5, 290),
(4, 'Neuvo Gol', 'Gas', 'Manual',2022, '/images/golf/golf03.png', 5, 300);


SELECT * FROM cars;
SELECT * FROM manufacturers;
SELECT * FROM rentals;
SELECT * FROM store_location;

