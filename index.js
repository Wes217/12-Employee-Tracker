require('dotenv').config();

const inquirer = require('inquirer');

const {viewAllDepartments, viewAllRoles, viewAllEmployees, addDepartment, addRole, addEmployee, updateEmployeeRole} = require('./lib/mysqlQuery.js');

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

                case 'Add a Role':
                    addRole()
                break;
        
                case 'View All Employees':
                    viewAllEmployees()
                break;
                
                case 'Add an Employee':
                    addEmployee()
                break;

                case 'Update an Employee Role':
                    updateEmployeeRole()
                break;
        
            }
        
        })
    };
    



init()


/*

WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database

*/