require('dotenv').config()
const express = require('express')
const app = express()
const itemRoutes = express.Router()
const path = require('path')
const cors = require('cors')
const bodyParser = require('body-parser')
const { default: axios } = require('axios')
const imgKey = process.env.UNSPLASH_API_KEY
const port = process.env.PORT || 4000
const dbOp = require('./src/db/operations.js')

app.use(express.static(path.join(__dirname, 'build')))
app.use(cors())
app.use(bodyParser.json())

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
  const response = await dbOp.readAll()
  res.send(response)
})

itemRoutes.route('/add').post(async function (req, res) {
  const response = await dbOp.insertEntry(req.body)
  res.send(response)
})

itemRoutes.route('/item/:id').get(async function (req, res) {
  const response = await dbOp.readAllByID(req.params.id)
  res.send(response)
})

itemRoutes.route('/update/:id').post(async function (req, res) {
  const response = await dbOp.updateEntry(req.body)
  res.send(response)
})

itemRoutes.route('/delete/:id').post(async function (req, res) {
  let id = req.params.id
  const response = await dbOp.deleteEntry(id)
  res.send(response)
})

app.use('/', itemRoutes)

app.listen(port, () => console.log(`Server accessible at port ${port}.`))

// END of document
