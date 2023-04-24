-- migrate:up
ALTER TABLE likes ADD UNIQUE likeIndex (users_id , posts_id);

-- migrate:down

