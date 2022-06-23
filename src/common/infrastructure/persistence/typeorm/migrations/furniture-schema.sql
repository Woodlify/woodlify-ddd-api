
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

CREATE TABLE IF NOT EXISTS canvases (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    name varchar(50)  NOT NULL,
    creation_date datetime  NOT NULL,
    last_modification_date datetime  NOT NULL,
    CONSTRAINT canvases_pk PRIMARY KEY  (id)
);

-- Table: edges
CREATE TABLE  IF NOT EXISTS edges (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    x1 int  NOT NULL,
    y1 int  NOT NULL,
    z1 int  NOT NULL,
    x2 int  NOT NULL,
    y2 int  NOT NULL,
    z2 int  NOT NULL,
    pieces_id int  NOT NULL,
    CONSTRAINT edges_pk PRIMARY KEY  (id)
);

-- Table: furnitures
CREATE TABLE IF NOT EXISTS furnitures (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    name varchar(50)  NOT NULL,
    design_date datetime  NOT NULL,
    last_modification_date datetime  NOT NULL,
    canvases_id int  NOT NULL,
    CONSTRAINT furnitures_pk PRIMARY KEY  (id)
);

-- Table: furnitures_manager
CREATE TABLE IF NOT EXISTS furnitures_manager (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    furnitures_id int  NOT NULL,
    state int  NOT NULL,
    CONSTRAINT furnitures_manager_pk PRIMARY KEY  (id)
);
-- Table: pieces
CREATE TABLE IF NOT EXISTS pieces (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    length int  NOT NULL,
    height int  NOT NULL,
    width int  NOT NULL,
    name varchar(50)  NOT NULL,
    furnitures_id int  NOT NULL,
    CONSTRAINT pieces_pk PRIMARY KEY  (id)
);

-- Table: textures
CREATE TABLE IF NOT EXISTS textures (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    r_channel int  NOT NULL,
    g_channel int  NOT NULL,
    b_channel int  NOT NULL,
    piexels_density int  NOT NULL,
    material int  NOT NULL,
    pieces_id int  NOT NULL,
    CONSTRAINT textures_pk PRIMARY KEY  (id)
);

/*

ALTER TABLE edges ADD CONSTRAINT edges_pieces
    FOREIGN KEY (pieces_id)
    REFERENCES pieces (id);


-- Reference: furnitures_canvases (table: furnitures)
ALTER TABLE furnitures ADD CONSTRAINT furnitures_canvases
    FOREIGN KEY (canvases_id)
    REFERENCES canvases (id);

-- Reference: furnitures_manager_furnitures (table: furnitures_manager)
ALTER TABLE furnitures_manager ADD CONSTRAINT furnitures_manager_furnitures
    FOREIGN KEY (furnitures_id)
    REFERENCES furnitures (id);

-- Reference: pieces_furnitures (table: pieces)
ALTER TABLE pieces ADD CONSTRAINT pieces_furnitures
    FOREIGN KEY (furnitures_id)
    REFERENCES furnitures (id);


-- Reference: textures_pieces (table: textures)
ALTER TABLE textures ADD CONSTRAINT textures_pieces
    FOREIGN KEY (pieces_id)
    REFERENCES pieces (id);
*/
