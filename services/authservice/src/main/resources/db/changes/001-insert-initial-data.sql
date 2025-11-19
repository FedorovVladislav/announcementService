insert into roles (name) values ('ROLE_USER');
insert into users (email, name, password) values ('email', '1234', '$2a$10$4u7X1sJ8A6YGnFhDag5/GuHVvH4jYmuHKTeTV6VXC1m1E5FC98BOm');
insert into users_roles (user_id, role_id) values (1,1);