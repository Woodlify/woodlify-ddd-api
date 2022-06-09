
CREATE TABLE IF NOT EXISTS cards(
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    card_number VARCHAR(20) NOT null,
    card_holder_name VARCHAR(200) NOT NULL,
    cvv VARCHAR(3) NOT NULL,
    due_date VARCHAR(5) NOT NULL,
    company_name int NOT NULL,
    PRIMARY KEY(id),
    UNIQUE KEY UQ_cards_card_number(card_number)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS carpenters(
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL,
    username VARCHAR(90) NOT NULL,
    password VARCHAR(30) NOT NULL,
    name VARCHAR(100) NOT NULL,
    ruc VARCHAR(100) NOT NULL,
    PRIMARY KEY(id),
    UNIQUE KEY UQ_carpenters_username(username)
    ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS customers(
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL,
    username VARCHAR(90) NOT NULL,
    password VARCHAR(30) NOT NULL,
    name VARCHAR(100) NOT NULL,
    cards_id INT UNSIGNED  NULL,
    PRIMARY KEY(id),
    UNIQUE KEY UQ_customers_username(username),
    KEY IX_customers_cards_id(cards_id),
    CONSTRAINT FK_customers_cards_id FOREIGN KEY(cards_id) REFERENCES cards(id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
