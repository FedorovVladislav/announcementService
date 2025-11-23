-- Вставка роли, если её еще нет
INSERT INTO roles (name)
SELECT 'ROLE_USER'
WHERE NOT EXISTS (SELECT 1 FROM roles WHERE name = 'ROLE_USER');

-- Вставка пользователя, если его еще нет
INSERT INTO users (email, name, password)
SELECT 'email', '1234', '$2a$10$4u7X1sJ8A6YGnFhDag5/GuHVvH4jYmuHKTeTV6VXC1m1E5FC98BOm'
WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'email');

-- Связывание пользователя с ролью, если связь еще не существует
INSERT INTO users_roles (user_id, role_id)
SELECT u.id, r.id
FROM users u
CROSS JOIN roles r
WHERE u.email = 'email' 
  AND r.name = 'ROLE_USER'
  AND NOT EXISTS (
    SELECT 1 FROM users_roles ur 
    WHERE ur.user_id = u.id AND ur.role_id = r.id
  );