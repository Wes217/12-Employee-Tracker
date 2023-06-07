require('dotenv').config();
const {
    buildConnectionOptions, 
    createConnection
} = require('./config/dbConfig.js');

async function main() {
    const connection = await(createConnection(buildConnectionOptions()));
    
    const [departments] = await connection.execute(`SELECT * FROM departments;`,[])
    console.table(departments)
}







main()