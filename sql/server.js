// entire file is for copy to server.js in root folder

import express from 'express'
// import cQuery from '../db/connector.js'

const port = 3000
const app = express()

async function createTable(name) {
  const value = name
  const query = `CREATE TABLE ${value} (name varchar(255), age int)`
  const response = await cQuery(query)
  return response
}

async function insertUser(name, age) {
  const values = [name, age]
  const query = `
  INSERT INTO users
  (name, age)
  VALUES
  ($1, $2)
  RETURNING name, age
  `
  const response = await cQuery(query, values)
  return response
}

app.get('/addTable/:name', async (req, res) => {
  const response = await createTable(req.params.name)
  res.send(response)
})

app.get('/add/:name/:age', async (req, res) => {
  const response = await insertUser(req.params.name, req.params.age)
  res.send(response)
})

app.get('/sql/:command', async (req, res) => {
  const response = await cQuery(req.params.command)
  res.send(response)
})

app.get('/allTables', async (req, res) => {
  let response = await cQuery(`SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE='BASE TABLE'`)
  res.send(response)
})

app.listen(port, () => {
  console.log(`Server accessible on port ${port}`)
})

// app.get('/routeNameTemplate', async (req, res) => {
//   const response = await cQuery(``)
//   res.send(response)
// })

// END of document
