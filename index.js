require('dotenv').config();

const inquirer = require('inquirer');

const {viewAllDepartments, viewAllRoles, viewAllEmployees, addDepartment} = require('./lib/mysqlQuery.js');

const { createPromptModule } = inquirer;
const prompt = createPromptModule()

const options = [
        {
        type: "list",
        name: "menuOption",
        choices:[
            'View All Departments',
            'Add a Department',
            'View All Roles',
            'Add a Role',
            'View All Employees',
            'Add an Employee',
            'Update an Employee Role',            
        ]},
]


function init() {
    prompt(options)
        .then((option) => {
            switch(option.menuOption){
                case 'View All Departments':
                    viewAllDepartments()
                break;
        
                case 'Add a Department':
                    addDepartment()
                break;
        
                case 'View All Roles':
                    viewAllRoles()
                break;
        
                case 'View All Employees':
                    viewAllEmployees()
                break;
        
        
            }
        
        })
    };
    



init()


/*
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database

WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database

WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database

WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database
*/