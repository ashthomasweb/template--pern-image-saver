import { useContext, useEffect } from 'react'
import axios from 'axios'

import { MainContext } from '../context/main/MainState'
import { useParams } from 'react-router-dom'

// from items-list
export async function useAxiosOnLoad() {
  const { dispatch } = useContext(MainContext)

  useEffect(() => {
    axios.get('http://localhost:4000/').then((response) => {
        let objData = response.data.rows
        dispatch({ type: 'SET_ALL_ITEMS', payload: objData })
      })
      .catch((error) => console.log(error))
  }, [dispatch])
} 

// app.get('/routeNameTemplate', async (req, res) => {
//   const response = await cQuery(``)
//   res.send(response)
// })

export function useAxiosOnEditLoad() {
  const { state: { items }, dispatch } = useContext(MainContext)
  let { id } = useParams()
  useEffect(() => {
    items.forEach(item => {
      if (item._id === id) {
        dispatch({ type: 'SET_EDITED_ITEM', payload: item })
      }
    })
  }, [dispatch, id, items])
}

// END of document
