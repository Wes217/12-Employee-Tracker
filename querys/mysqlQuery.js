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








module.exports = {viewAllDepartments, viewAllRoles}