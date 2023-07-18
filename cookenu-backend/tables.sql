-- Active: 1689348517766@@127.0.0.1@5432@cookenu


CREATE TABLE IF NOT EXISTS Cookenu_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(64) NOT NULL,
  email VARCHAR(64) NOT NULL,
  password VARCHAR(64) NOT NULL,
  role VARCHAR(6) DEFAULT 'NORMAL' CHECK (role IN ('ADMIN', 'NORMAL'))
);


CREATE TABLE IF NOT EXISTS Recipes_table (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(64) NOT NULL,
    description VARCHAR(1024) DEFAULT 'No description provided',
    deadline DATE,
    author_id UUID,
    FOREIGN KEY (author_id) REFERENCES Cookenu_users(id)
);

CREATE TABLE IF NOT EXISTS Users_signup (
    recipe_id UUID,
    signup_id UUID,
    PRIMARY KEY (recipe_id, signup_id),
    FOREIGN KEY (recipe_id) REFERENCES Recipes_table(id),
    FOREIGN KEY (signup_id) REFERENCES Cookenu_users(id)
);




