import React from 'react'

import Routes from './routes'

import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import './index.css'

global.jQuery = require('jquery')
require('bootstrap/dist/js/bootstrap')
window.$ = require('jquery')

function App() {
  return <Routes />
}

export default App
