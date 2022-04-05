const cQuery = require('./connector.js')
const sqlCommands = require('./sqlqueries.js')

function dataDestr(dataObj) {
    const { description, comment, rating, imageurl, photographer, _id } = dataObj
    const values = [description, comment, rating, imageurl, photographer, _id]
    return values
}

async function readAll() {
    const query = sqlCommands.selectAll
    const response = await cQuery(query)
    return response
}

async function queryReturnAll(passedQuery, values) {
    await cQuery(passedQuery, values)
    const query = sqlCommands.selectAll
    const response = await cQuery(query)
    return response
}

async function readAllByID(id) {
    const values = [id]
    const query = sqlCommands.selectByID
    const response = await cQuery(query, values)
    return response
}

async function updateEntry(dataObj) {
    const values = dataDestr(dataObj)
    const query = sqlCommands.updateByID
    return await queryReturnAll(query, values)
}

async function insertEntry(dataObj) {
    const values = dataDestr(dataObj)
    const query = sqlCommands.insertEntry
    return await queryReturnAll(query, values)
}

async function deleteEntry(entryID) {
    const values = [entryID]
    const query = sqlCommands.deleteByID
    return await queryReturnAll(query, values)
}

module.exports = { readAll, readAllByID, updateEntry, insertEntry, deleteEntry }

// END of document
