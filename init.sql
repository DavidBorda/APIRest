CREATE TABLE users ( id SERIAL PRIMARY KEY,
                                       name VARCHAR(100) NOT NULL,
                                                         email VARCHAR(100) UNIQUE NOT NULL);


CREATE TABLE posts
    ( id SERIAL PRIMARY KEY,
                        title VARCHAR(100) NOT NULL,
                                           content TEXT NOT NULL,
                                                        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE);