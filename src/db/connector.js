require('dotenv').config()

const pg = require('pg')

const { Client } = pg

async function cQuery(input, params) {
    const client = new Client()
    await client.connect()
    const response = await client.query(input, params)
    await client.end()
    return response
}

module.exports = cQuery

// sql command for creating appropriate table
// _id must be passed as string
//   const query = `CREATE TABLE pernimagesaver
//         ( 
//           description varchar(255), 
//           comment varchar(255),
//           rating varchar(255),
//           imageurl varchar(255),
//           photographer varchar(255),
//           _id varchar(255)
//           )
//         `

// END of document
