USE employee_db

INSERT INTO departments (name)
VALUES
    ('IT'),
    ('SALES'),
    ('HR');

INSERT INTO roles (title, salary, department_id)
VALUES
    ("CEO", 100000, 1), 
    ("SALES REP", 10000, 2), 
    ("JANITOR", 200000, 3); 


INSERT INTO employees(first_name, last_name, role_id, manager_id)
VALUES 
    ('John', 'Smith', 1, 2), 
    ('Sally', 'Guy', 1, null), 
    ('Tom', 'Man', 1, 2);
