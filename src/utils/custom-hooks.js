// custom-hooks.js

import { useContext, useEffect } from 'react'
import { MainContext } from '../context/main/MainState'
import { useParams } from 'react-router-dom'
import axios from 'axios'
const serverURL = process.env.REACT_APP_SERVER_URL

// to: /items-list-component
export async function useAxiosOnLoad() {
  const { dispatch } = useContext(MainContext)
  useEffect(() => {
    axios.get(serverURL).then((response) => {
        let objData = response.data.rows
        dispatch({ type: 'SET_ALL_ITEMS', payload: objData })
      })
      .catch((error) => console.log(error))
  }, [dispatch])
} 

// to: /edit-item-component
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
