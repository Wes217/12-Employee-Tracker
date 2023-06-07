require('dotenv').config();
const {
    buildConnectionOptions, 
    createConnection
} = require('./config/dbConfig.js');

async function main() {
    const connection = await(createConnection(buildConnectionOptions()));
    console.log(connection)
}
