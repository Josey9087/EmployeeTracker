const inquirer = require('inquirer');
const mysql = require('mysql2');

require('dotenv').config()
const db = mysql.createConnection(
  {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  },
);

db.connect((err) => {
  if (err) {
    throw error;
  }
});

Options()

function Options() {

  return inquirer.prompt([
    {
      type: "list",
      name: "Options",
      message: "What would you like to do?",
      choices: ["View All Departments", "View All Roles", "View All Employees", "Add Department", "Add Role", "Add Employee", "Update Employee Role",]
    }
  ])

    .then((answers) => {
      if (answers.Options === "View All Departments") {
        viewDepartments();
      }
      if (answers.Options === "View All Roles") {
        viewRoles();
      }
      if (answers.Options === "View All Employees") {
        viewEmployees();
      }
      if (answers.Options === "Add Department") {
        addDepartment();
      }
      if (answers.Options === "Add Role") {
        addRole();
      }
      if (answers.Options === "Add Employee") {
        addEmployee();
      }
      if (answers.Options === "Update Employee Role") {
        updateEmployee();
      }
    })
};


function viewDepartments() {
  db.query('SELECT * FROM employeetracker_db.department;', function (err, results) {
    console.table(results);
    Options();
  });

};

function viewEmployees() {

  db.query('SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT (manager.first_name, " ", manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON employee.manager_id = manager.id', function (err, results) {
    console.table(results);
    Options();

  })
};

function viewRoles() {
  db.query("SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;", function (err, results) {
    console.table(results);
    if (err) {
      console.log(err);
    };
    Options();
  })
};

function addDepartment() {
  return inquirer.prompt([
    {
      type: "input",
      name: "departmentname",
      message: "What is the name of the new department?"
    },

  ])
    .then(function (answer) {
      db.query("INSERT INTO department (name) VALUES (?)", [answer.departmentname], function (err, results) {
      })
      Options();
    })
};


function addRole() {
  db.query('SELECT * FROM employeetracker_db.department;', function (err, results) {
    let departmentArray = [];
    results.forEach(result => departmentArray.push({ name: result.name, value: result.id }));
    return inquirer.prompt([
      {
        type: "input",
        name: "rolename",
        message: "What is the name of the new role?"
      },
      {
        type: "input",
        name: "rolesalary",
        message: "What is the salary of the new role?"
      },
      {
        type: "list",
        name: "roledepartment",
        message: "What department is the new role in?",
        choices: departmentArray
      },

    ])
      .then((answers) => {
        db.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [answers.rolename, answers.rolesalary, answers.roledepartment], function (err, results) {
          console.log(err);
        })
        Options();
      })
  })
};
