-- migrate:up
create table users (
  id int not null auto_increment primary key,
  email varchar(100) not null unique,
  password varchar(1000) not null ,
  description varchar(1000) null,
  profile_img varchar(2000) null ,
  created_at timestamp not null default current_timestamp,
  updated_at timestamp not null default current_timestamp on update current_timestamp
);
-- migrate:down
drop table users;