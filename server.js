const inquirer = require('inquirer')
const db = require('./db/connections')
require('dotenv').config();
require('console.table');

function questions() {
    inquirer
        .prompt([
            {
                type: 'list',
                message: 'What would you like to do?',
                name: 'userChoices',
                choices: [
                    'View All Employees',
                    'Add Employee',
                    'Update Employee Role',
                    'View All Roles',
                    'Add Role',
                    'View All Departments',
                    'Add Department',
                    'Quit',
                ],
            },
        ])

        .then((answer) => {
            switch (answer.userChoices) {
                case 'View All Employees':
                    viewEmployees();
                    break;
                case 'Add Employee':
                    newEmployee();
                    break;
                case 'Update Employee Role':
                    updateExistingRole();
                    break;
                case 'View All Roles':
                    updateRoles();
                    break;
                case 'Add Role':
                    newRole();
                    break;
                case 'View All Departments':
                    updateDepartment();
                    break;
                case 'Add Department':
                    targetDepartment();
                    break;
                case 'Quit':
                    quit();
                    break;
            }
        })
}

function updateDepartment() {
    db.query('SELECT * FROM department order by id', (err, result) => {
        if (err) {
            console.log(err);
        }
        console.log('\n');
        console.table(result);
        questions();
    })
}

function updateRoles() {
    db.query('SELECT * FROM role', (err, result) => {
        if (err) {
            console.log(err);
        }
        console.log('\n');
        console.table(result);
        questions();
    })
}

function updateEmployees() {
    db.query('SELECT * FROM employee', (err, result) => {
        if (err) {
            console.log(err);
        }
        console.log('\n');
        console.table(result);
        questions();
    })
}

function viewEmployees() {
    db.query('SELECT * FROM employee', (err, result) => {
        if (err) {
            console.log(err);
        }
        console.log('\n');
        console.table(result);
        questions();
    })
}

function targetDepartment() {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'What is the name of the department you would like to add?',
                name: 'addDepartment',
            },
        ])
        .then((answer) => {
            db.query(
                `INSERT INTO department (title) VALUES (?)`,
                `${answer.addDepartment}`,
                (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                    console.log(`\n`);
                    console.table(result);
                    questions();
                }
            )
        })
}

function newRole() {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'What is the title of the role you would like to add?',
                name: 'addNewTitle',
            },
            {
                type: 'input',
                message: 'What is the salary of the role you would like to add?',
                name: 'addNewSalary',
            },
            {
                type: 'input',
                message: 'What is the department of the role you would like to add?',
                name: 'addNewDepartment',
            },
        ])
        .then((answer) => {
            db.query(
                `INSERT INTO role(title, salary, department_id) VALUES (?, ?, ?)`,
                [answer.addNewTitle, answer.addNewSalary, answer.addNewDepartment],
                (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                    console.log('\n');
                    console.table(result);
                    questions();
                }
            )
        })
}

function newEmployee() {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'What is the first name of the employee you would like to add?',
                name: 'addNewEmployeeFirstName',
            },
            {
                type: 'input',
                message: 'What is the employee last name?',
                name: 'addNewEmployeeLastName',
            },
            {
                type: 'input',
                message: 'What is the employee role id?',
                name: 'addNewEmployeeRoleId',
            },
            {
                type: 'input',
                message: 'What is the manager for this employee?',
                name: 'newEmployeeManager',
            },
        ])
        .then((answer) => {
            db.query(
                `INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`,
                [
                    answer.addNewEmployeeFirstName,
                    answer.addNewEmployeeLastName,
                    answer.addNewEmployeeRoleId,
                    answer.newEmployeeManager,
                ],
                (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                    console.log('\n');
                    console.table(result);
                    questions();
                }
            )
        })
}

function updateExistingRole() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'employee_id',
                message: 'which employee id  would you like to update the role for',
            },
            {
                type: 'input',
                message: 'What is the role id you would like to choose ?',
                name: 'role_id',
            },
        ])
        .then((answer) => {
            db.query(
                'update employee set role_id = ? where id = ?',
                [answer.role_id, answer.employee_id],
                function (err, data) {
                    questions();
                }
            );
        });
}

function quit() {
    process.exit();
}

questions();