const {
    buildConnectionOptions, 
    createConnection
} = require('../config/dbConfig.js');

const inquirer = require('inquirer');

const { createPromptModule } = inquirer;
const prompt = createPromptModule()


//View------------------------------------------------
async function viewAllDepartments() {
    const connection = await createConnection(buildConnectionOptions());

    const [departments] = await connection.execute(`SELECT * FROM departments;`,[])
            console.table(departments)
}

async function viewAllRoles() {
    const connection = await createConnection(buildConnectionOptions());

    const [roles] = await connection.execute(`SELECT * FROM roles;`,[])
            console.table(roles)
}

async function viewAllEmployees() {
    const connection = await createConnection(buildConnectionOptions());

    const [employees] = await connection.execute(`SELECT * FROM employees;`,[])
            console.table(employees)
}

//Add------------------------------------------------

async function addDepartment() {
    const connection = await createConnection(buildConnectionOptions());
    
    const [departments] = await connection.execute(`SELECT * FROM departments;`,[])

    const answers = await prompt({
        type: 'input',
        name: 'departmentName',
        message: 'What is the name of the department'
    })

    await connection.query('INSERT INTO departments (title) VALUES(?)', answers.departmentName)

    console.log('Department added')

    viewAllDepartments()
}

async function addRole() {
    const connection = await createConnection(buildConnectionOptions());
    
    const [departments] = await connection.execute(`SELECT * FROM departments;`,[])

    const depTitles = []
    departments.forEach(department => depTitles.push(department.title)) 

    const answers = await prompt({
        type: "list",
        name: "roleDepartment",
        message:'What department is your new role in',
        choices:[depTitles]
    },
    {
        type: 'input',
        name: 'roleName',
        message: 'What is the name of the role'
    })
    
}



module.exports = {viewAllDepartments, viewAllRoles, viewAllEmployees, addDepartment}