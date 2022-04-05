// item-list.component

import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { MainContext } from '../../context/main/MainState'
import { useAxiosOnLoad } from '../../utils/custom-hooks'
import axios from 'axios'
import { withRoutedProps } from '../../hocs/hocs'
const serverURL = process.env.REACT_APP_SERVER_URL

// individual data item component, .map() into by parent component ItemList
const Item = (props) => {
  const { dispatch } = useContext(MainContext)
  let item = props.item

  function deleteItem() {
    let id = item._id
    axios.post(`${serverURL}/delete/${id}`).then((response) => {
      let objData = response.data.rows
      dispatch({ type: 'SET_ALL_ITEMS', payload: objData })
      props.nav('/')
    })
  }

  return (
    <tr>
      <td>
        {props.item.imageurl && (<img src={props.item.imageurl} style={{width: '150px', height: 'auto'}} alt='thumbnail'/>) }
      </td>
      <td>
        {props.item.photographer}
      </td>
      <td>
        {props.item.description}
      </td>
      <td>
        {props.item.comment}
      </td>
      <td>
        {item.rating}
      </td>
      <td>
        {/* this causes a re-render in the topDisplayPane in the App component */}
        <Link to={'/item/' + item._id}>Edit</Link>
      </td>
      <td>
        {/* this causes a re-render on the current page */}
        <button onClick={() => deleteItem()}>Remove</button>
      </td>
    </tr>
  )
}

function ItemsList(props) {
  // custom hook retrieves all items from database on component mount
  useAxiosOnLoad()

  const { state: { items } } = useContext(MainContext)

  function itemList() {
    if ( items ) {
      let itemCopy = [...items].reverse() // display most recent at top of list
      return itemCopy.map((itemData, i) => <Item {...props} item={itemData} key={i} />)
    }
  }

  return (
    <div style={{ margin: '10px auto', width: '95vw' }}>
      <h3>Database Item List</h3>
      <table className='table table-striped' style={{ marginTop: '20px' }}>
        <thead>
          <tr>
            <th>Thumbnail</th>
            <th>Photographer</th>
            <th>Description</th>
            <th>Comments</th>
            <th>Rating</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>{itemList()}</tbody>
      </table>
    </div>
  )
}

export default withRoutedProps(ItemsList)

// END of document
