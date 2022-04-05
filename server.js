const express = require('express')
const app = express()
const itemRoutes = express.Router()
const path = require('path')
const cors = require('cors')
const bodyParser = require('body-parser')
const { default: axios } = require('axios')
const imgKey = process.env.UNSPLASH_API_KEY
const port = process.env.PORT || 4000
const cQuery = require('./src/db/connector.js')

app.use(express.static(path.join(__dirname, 'build')))
app.use(cors())
app.use(bodyParser.json())


async function readAll() {
  const query = `SELECT * FROM pernimagesaver`
  const response = await cQuery(query)
  return response
}

async function readAllByID(id) {
  const _id = id
  const query = `SELECT * FROM pernimagesaver WHERE _id = ${_id}`
  const response = await cQuery(query)
  return response
}

async function updateEntry(dataObj) {
  const { description, comment, rating, imageurl, photographer, _id } = dataObj
  const values = [description, comment, rating, imageurl, photographer, _id]
  const query = `
    UPDATE pernimagesaver
    SET description= $1, comment= $2, rating= $3, imageurl= $4, photographer= $5
    WHERE _id = $6
    `
  await cQuery(query, values)
  const response = await cQuery(`SELECT * FROM pernimagesaver`)
  return response
}

async function insertEntry(dataObj) {
  const { description, comment, rating, imageurl, photographer, _id } = dataObj
  const values = [description, comment, rating, imageurl, photographer, _id]
  const query = `
    INSERT INTO pernimagesaver
    (description, comment, rating, imageurl, photographer, _id)
    VALUES
    ($1, $2, $3, $4, $5, $6)
    `
  await cQuery(query, values)
  const response = await cQuery(`SELECT * FROM pernimagesaver`)
  return response
}

async function deleteEntry(entryID) {
  const values = [entryID]
  const query = `
    DELETE FROM pernimagesaver
    WHERE _id = $1
    `
  await cQuery(query, values)
  const response = await cQuery(`SELECT * FROM pernimagesaver`)
  return response
}

// UNSPLASH API ROUTE
itemRoutes.route('/image/').get(function (req, res) {
  let url = `https://api.unsplash.com/photos/random/?client_id=${imgKey}`
  axios.get(url).then((response) => {
    let data = response.data
    let url = data.urls.regular
    let name = data.user.name
    res.json({message: 'image route reached', url, name })
  })
})

itemRoutes.route('/').get(async function (req, res) {
  const response = await readAll()
  res.send(response)
})

itemRoutes.route('/add').post(async function (req, res) {
  const response = await insertEntry(req.body)
  res.send(response)
})

itemRoutes.route('/item/:id').get(async function (req, res) {
  const response = await readAllByID(req.params.id)
  res.send(response)
})

itemRoutes.route('/update/:id').post(async function (req, res) {
  const response = await updateEntry(req.body)
  res.send(response)
})

itemRoutes.route('/delete/:id').post(async function (req, res) {
  let id = req.params.id
  const response = await deleteEntry(id)
  res.send(response)
})



app.use('/', itemRoutes)

app.listen(port, () => console.log(`Server accessible at port ${port}.`))

// END of document
