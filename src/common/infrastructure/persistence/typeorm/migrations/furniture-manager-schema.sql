-- Table: furniture_managers
CREATE TABLE IF NOT EXISTS furniture_managers (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    name varchar(50)  NOT NULL,
    CONSTRAINT furniture_managers_pk PRIMARY KEY  (id)
) ENGINE = InnoDB
  AUTO_INCREMENT = 1
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;
