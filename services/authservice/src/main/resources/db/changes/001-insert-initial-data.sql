INSERT INTO roles (name)
VALUES ('ROLE_USER')
ON CONFLICT (name) DO NOTHING;

INSERT INTO users (email, name, password)
VALUES ('email', '1234', '$2a$10$4u7X1sJ8A6YGnFhDag5/GuHVvH4jYmuHKTeTV6VXC1m1E5FC98BOm')
ON CONFLICT (email) DO NOTHING;
INSERT INTO users_roles (user_id, role_id)

SELECT u.id, r.id
FROM users u
JOIN roles r ON r.name = 'ROLE_USER'
WHERE u.email = 'email'
ON CONFLICT DO NOTHING;