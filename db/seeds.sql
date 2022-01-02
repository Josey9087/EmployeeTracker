USE employeetracker_db;

INSERT INTO department (name)
VALUES("Front-End"),
("Back-End"),
("API-Team"),
("Debug"),
("Boss");

INSERT INTO role (title, salary, department_id)
VALUES ("API Lead", 100000, 3),
("Debug Lead", 200000, 4),
("Front End Lead", 150000, 1),
("Back End Lead", 150000, 2),
("Back End Developer", 180000, 2),
("API Developer", 150000, 3),
("Front End Developer", 200000, 1),
("Debug Devloper", 150000, 4),
("Manager", 300000, 5);
        
INSERT INTO employee (first_name, last_name, role_id, manager_id)
	VALUES ("Joseph", "Lee", 3, NULL),
("Robert", "Lee", 1, NULL),
("Frank", "Lee", 7, 3),
("Ethan", "Lee", 4, NULL),
("Ian", "Lee", 6, 1),
("Stephen", "Lee", 8, 2),
("Stephanie", "Lee", 2, NULL),
("Laura", "Lee", 5, 4),
("Warren", "Lee", 9, NULL);