-- migrate:up
ALTER TABLE likes ADD likeIndex INT NOT NULL UNIQUE ;

-- migrate:down

