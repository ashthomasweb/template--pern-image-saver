const express = require('express')
const cQuery = require('./src/db/connector.js')

const path = require('path')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const itemRoutes = express.Router()
const { default: axios } = require('axios')
const imgKey = process.env.UNSPLASH_API_KEY
const port = process.env.PORT || 4000

app.use(express.static(path.join(__dirname, 'build')))
app.use(cors())
app.use(bodyParser.json())

function resAllWithMessage(message, res, objData) {
  res.json({message, objData})
}

// called from axios-utils
itemRoutes.route('/alldata').get(async function (req, res) {
  const response = await cQuery(`SELECT * FROM pernimagesaver`)
  console.log(response)
  res.send(response)
})





itemRoutes.route('/item/:id').get(async function (req, res) {
  let id = req.params.id
  let allData = []

  // sql query
  const response = await cQuery(`SELECT * FROM pernimagesaver WHERE _id = ${id}`)
  res.send(response)




  // axios.get(firebaseBranchJSON).then((response) => {
  //   allData = Object.values(response.data)
  // }).then(() => {
  //   allData.forEach((item) => {
  //     if (item._id === id) {
  //       res.json({ message: 'Item retrieved', item})
  //     }
  //   })
  // })
})

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

itemRoutes.route('/update/:id').post(async function (req, res) {
  const response = await updateEntry(req.body)
  res.send(response)
})

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

itemRoutes.route('/').get(async function (req, res) {
  const response = await cQuery(`SELECT * FROM pernimagesaver`)
  res.send(response)
})


itemRoutes.route('/add').post(async function (req, res) {
  const response = await insertEntry(req.body)
  res.send(response)
})

itemRoutes.route('/delete/:id').post(function (req, res) {
  let id = req.params.id

  // sql query




  // let objData
  // let firebaseID
  // axios.get(firebaseBranchJSON).then((response) => {
  //   let dataObj = Object.entries(response.data)
  //   dataObj.forEach(item => {
  //     if (item[1]._id === id) {
  //       firebaseID = item[0]
  //     }
  //   })
  // }).then(() => {
  //   axios
  //   .delete(`${firebaseBranchURL}/${firebaseID}.json`).then(() => {
  //   })
  //   .catch((error) => console.log(error))
  //   .then(() => {
  //     axios.get(firebaseBranchJSON).then((response) => {
  //       response.data && (objData = Object.values(response.data))
  //     })
  //     .catch((error) => console.log(error))
  //     .finally(() => {
  //       resAllWithMessage('Successfully deleted!', res, objData)
  //     })
  //   })
  // })
})

itemRoutes.route('/image/').get(function (req, res) {
  let url = `https://api.unsplash.com/photos/random/?client_id=${imgKey}`
  axios.get(url).then((response) => {
    let data = response.data
    let url = data.urls.regular
    let name = data.user.name
    res.json({message: 'image route reached', url, name })
  })
})

app.use('/', itemRoutes)

// Listener compatible with Heroku, Localhost
app.listen(port, () => console.log(`Server accessible at port ${port}.`))

// END of document


// const query = `CREATE TABLE ${value} 
//       ( 
//         description varchar(255), 
//         comment varchar(255),
//         rating varchar(255),
//         imageurl varchar(255),
//         photographer varchar(255),
//         _id int
//         )
//       `



