// App.js

import React from 'react'
import { useParams } from 'react-router-dom'
import MainState from '../src/context/main/MainState'
import NavHeader from './components/nav-header/nav-header.component'
import ItemsList from './components/items-list/items-list.component'
import EditItem from './components/edit-item/edit-item.component'
import CreateItem from './components/create-item/create-item.component'
import 'bootstrap/dist/css/bootstrap.min.css'

function useTopDisplayPane() {
  let {edit} = useParams()
  return edit ? <EditItem /> : <CreateItem/>
}

function App() {
  return (
    <MainState >
      <NavHeader />
      <br />
      { useTopDisplayPane() }
      <br />
      <ItemsList />
      <br />
      <br />
      <p style={{textAlign: 'center' }}>Template is connected to a PostgreSQL local, or an ElephantSQL data store. No external css other than standard bootstrap table and header.</p>
      <ul style={{marginLeft: '40%'}}>
        <li>PostgreSQL</li>
        <li>Node</li>
        <li>Express</li>
        <li>Axios</li>
        <li>React</li>
        <li>Bootstrap</li>
      </ul>
    </MainState>
  )
}

export default App

// END of document
