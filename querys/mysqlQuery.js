const {
    buildConnectionOptions, 
    createConnection
} = require('../config/dbConfig.js');



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






module.exports = {viewAllDepartments, viewAllRoles, viewAllEmployees}