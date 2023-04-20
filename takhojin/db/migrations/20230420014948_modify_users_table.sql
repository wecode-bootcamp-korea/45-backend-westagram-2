-- migrate:up
ALTER TABLE users CHANGE profile_img profile_image varchar(2000) null;
ALTER TABLE users MODIFY password varchar(200) not null;

-- migrate:down

