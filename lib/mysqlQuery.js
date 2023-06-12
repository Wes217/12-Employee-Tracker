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
        message: 'What is the name of the department?'
    })

    await connection.query('INSERT INTO departments (title) VALUES(?)', answers.departmentName)

    console.log('Department added')

    viewAllDepartments()
}

async function addRole() {
    const connection = await createConnection(buildConnectionOptions());
    
    const [departments] = await connection.execute(`SELECT * FROM departments;`,[],(err)=> {
        if(err) throw err;
    })

    const depTitles = []
    departments.forEach(department => depTitles.push(department.title)) 

    const answers = await prompt([
        {
        type: 'input',
        name: 'roleName',
        message: 'What is the name of the role?'
        },
        {
        type: 'input',
        name: 'rolePay',
        message: 'What is the salary of the role?'
        },
        {
        type: "list",
        name: "roleDepartment",
        message:'What department is your new role in?',
        choices:depTitles
        },
    ]);
    const {roleName, rolePay, roleDepartment} = answers;

    let departmentId;
    departments.forEach((department) => {
        if(department.title === roleDepartment) 
        {departmentId  = department.id;}});
    
    await connection.query('INSERT INTO roles (title, salary, department_id) VALUES(?, ?, ?)', [roleName, rolePay, departmentId], (err)=> {
        if(err) throw err;
    })
    console.log(`${roleName}, has been created`)

    viewAllRoles()
}

async function addEmployee(){
    const connection = await createConnection(buildConnectionOptions());

    const [roles] = await connection.execute(`SELECT * FROM roles;`,[],(err)=> {
        if(err) throw err;
    })

    const roleTitles = []
    roles.forEach(role => roleTitles.push(role.title)) 


    const answers = await prompt([
        {
        type: 'input',
        name: 'firstName',
        message: 'What is the first name of the employee?'
        },
        {
        type: 'input',
        name: 'lastName',
        message: 'What is the first name of the employee?'
        },
        {
        type: "list",
        name: "employeeRole",
        message:'What is the role of your new employee?',
        choices:roleTitles
        },
        {
        type: "input",
        name: "mangerId",
        message: "What is the ID of your New employee's manager?"
        },
    ]);

    const {firstName, lastName, employeeRole, mangerId} = answers;

    let roleId;
    roles.forEach((role) => {
        if(role.title === employeeRole) 
        {roleId  = role.id;}});

    await connection.query('INSERT INTO employees(first_name, last_name, role_id, manager_id) VALUES(?, ?, ?, ?)', [firstName, lastName, roleId, mangerId], (err)=> {
        if(err) throw err;
    })
    
    console.log('employee, has been added')

    viewAllEmployees()
}

async function updateEmployeeRole() {
    const connection = await createConnection(buildConnectionOptions());

    const [employees] = await connection.execute(`SELECT * FROM employees;`,[],(err)=> {
        if(err) throw err;
    })

    const employeeNames = []
    employees.forEach(employee => employeeNames.push(`${employee.first_name} ${employee.last_name}`)) 


    const [roles] = await connection.execute(`SELECT * FROM roles;`,[],(err)=> {
        if(err) throw err;
    })

    const roleTitles = []
    roles.forEach(role => roleTitles.push(role.title)) 



const answers = await prompt([
        {
        type: 'list',
        name: 'employeeName',
        message: 'Who is the employee?',
        choices: employeeNames
        },
        {
        type: 'list',
        name: 'roleTitle',
        message: "What is the employee's new role?",
        choices: roleTitles
        },
    ])
    const {employeeName, roleTitle} = answers

    let employeeId;
    employees.forEach((employee => {
        if(`${employee.first_name} ${employee.last_name}` === employeeName)
        {employeeId = employee.id}
    }))

    let roleId;
    roles.forEach((role) => {
        if(role.title === roleTitle) 
        {roleId = role.id;}});

    
    await connection.query('UPDATE employees SET employees.role_id = ? WHERE employees.id = ?', [roleId, employeeId], (err)=> {
        if(err) throw err;
    })

    console.log(`${employeeName}, has been updated to ${roleTitle}`)

    viewAllEmployees()
}

module.exports = {viewAllDepartments, viewAllRoles, viewAllEmployees, addDepartment, addRole, addEmployee, updateEmployeeRole}