require('dotenv').config();

const inquirer = require('inquirer');

const {viewAllDepartments, viewAllRoles} = require('./querys/mysqlQuery.js');




const { createPromptModule } = inquirer;
const prompt = createPromptModule()

prompt([
        {
        type: "list",
        name: "menuOption",
        choices: 
            ['View All Departments',
            'View All Roles',
            'View All Employees',],
        },
])
.then((option) => {
    switch(option.menuOption){
        case 'View All Departments':
            viewAllDepartments()
        break;
        case 'View All Roles':
            viewAllRoles()
        break;
        }
})




