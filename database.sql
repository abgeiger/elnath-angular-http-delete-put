CREATE TABLE food (
	id SERIAL PRIMARY KEY,
	name VARCHAR(100),
	deliciousness_rating INT NOT NULL,
	is_hot BOOLEAN NOT NULL
);

INSERT INTO food (name, deliciousness_rating, is_hot)
VALUES ('Pizza', 75, TRUE),
('Carbonara', 93, TRUE),
('Chocolate', 99, FALSE);

SELECT * FROM food;