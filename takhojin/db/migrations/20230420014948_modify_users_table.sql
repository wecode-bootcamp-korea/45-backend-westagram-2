-- migrate:up
ALTER TABLE users CHANGE profie_img profile_img varchar(2000) null;

-- migrate:down

