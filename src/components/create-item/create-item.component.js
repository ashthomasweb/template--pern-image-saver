// create-item.component

import React, { useContext, useEffect } from 'react'
import axios from 'axios'
import { MainContext } from '../../context/main/MainState'
import { withRoutedProps } from '../../hocs/hocs'
const serverURL = process.env.REACT_APP_SERVER_URL

function CreateItem(props) {
  const { state: { tempItem }, dispatch } = useContext(MainContext)
  let { imageurl, photographer } = tempItem

  // controlled input elements
  function changeDescription(e) {
    tempItem.description = e.target.value
    dispatch({ type: 'ONCHANGE_DESC', payload: tempItem })
  }

  function changeComment(e) {
    tempItem.comment = e.target.value
    dispatch({ type: 'ONCHANGE_COMMENT', payload: tempItem })
  }

  function changeRating(e) {
    tempItem.rating = e.target.value
    dispatch({ type: 'ONCHANGE_RATING', payload: tempItem })
  }

  useEffect(() => {
    dispatch({ type: 'CLEAR_ITEM' })
  }, [dispatch])

  function imageRetrieval() {
    axios.get(`${serverURL}/image`).then((response) => {
      dispatch({ type: 'SET_RANDOM_IMAGE', payload: response.data })
    })
  }

  function createItemWithUID(input) {
    let temp = '0'
    for ( let i = 0; i <= 20; i++ ) {
      temp = temp + String(Math.floor(Math.random() * 9))
    }
    input._id = temp
  }

  // data handling
  function onSubmit(e) {
    e.preventDefault()
    createItemWithUID(tempItem)
    axios.post(`${serverURL}/add`, tempItem).then((response) => {
      let objData = response.data.rows
      dispatch({ type: 'SET_ALL_ITEMS', payload: objData })
    })
    dispatch({ type: 'CLEAR_ITEM' })
  }

  return (
    <div style={{ margin: '10px auto', width: '95vw' }}>
      <h3 style={{ textAlign: 'center' }}>Create New Item</h3>

      { imageurl && 
          <div style={{ textAlign: 'center', width: '40vw', margin: '0 auto', position: 'relative'}}>
            <img src={imageurl} style={{width: '100%', position: 'relative'}} alt='no alt yet'/>
            <p>Photo by {photographer}, courtesy of Unsplash API</p>
          </div>
      }

      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label>Description: </label>
          <input
            type='text'
            className='form-control'
            value={tempItem.description}
            onChange={changeDescription}
          />
        </div>

        <div className='form-group'>
          <label>Comment: </label>
          <input
            type='text'
            className='form-control'
            value={tempItem.comment}
            onChange={changeComment}
          />
        </div>

        <div className='form-group'>
          <label>URL: </label>
          <p
            className='form-control'
            style={{ overflowWrap: 'anywhere' }}
            disabled
          >{imageurl}</p>
        </div>

        <div className='form-group'>
          <label>Photographer: </label>
          <p
            className='form-control'
            style={{ overflowWrap: 'anywhere' }}
            disabled
          >{photographer}</p>
        </div>

        <div className='form-group'>
          <div className='form-check form-check-inline'>
            <label className='form-check-label'>
              <input
                className='form-check-input'
                type='radio'
                value='Low'
                checked={tempItem.rating === 'Low'}
                onChange={changeRating}
              />
              Low
            </label>
          </div>

          <div className='form-check form-check-inline'>
            <label className='form-check-label'>
              <input
                className='form-check-input'
                type='radio'
                value='Medium'
                checked={tempItem.rating === 'Medium'}
                onChange={changeRating}
              />
              Medium
            </label>
          </div>

          <div className='form-check form-check-inline'>
            <label className='form-check-label'>
              <input
                className='form-check-input'
                type='radio'
                value='High'
                checked={tempItem.rating === 'High'}
                onChange={changeRating}
              />
              High
            </label>
          </div>
        </div>

        <div className='form-group'>
          <input
            type='submit'
            value='Create Item'
            className='btn btn-primary'
          />
          <button
            type='button'
            style={{marginLeft: '10px'}}
            className='btn btn-primary'
            onClick={() => imageRetrieval()}
          >Get New Image</button>
        </div>
      </form>
    </div>
  )
}

export default withRoutedProps(CreateItem)

// END of document
