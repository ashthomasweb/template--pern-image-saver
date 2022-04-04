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

// END of document
