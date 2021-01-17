
import React from 'react'
import {
  Route,
  // BrowserRouter,
  Router
} from 'react-router-dom'
import { Switch } from 'react-router-dom'


import Header from "./Header";
import StreamCreate from "./streams/StreamCreate";
import StreamShow from "./streams/StreamShow";
import StreamList from "./streams/StreamList";
import StreamDelete from "./streams/StreamDelete";
import StreamEdit from "./streams/StreamEdit";


//  #1. now we are keeping browser history in my BrowserHistory
//   It can be referred from anywhere in the app 
import history from "../history";


const App = () => {
  return (
    <div className="ui container" style={{ marginTop: '10px' }}>
      {/*       <BrowserRouter> */}
      <Router history={history}>
        {/* #2. Instead, to use plain 'Router' instead of 'BrowserRouter' to pass down the 'history'. */}
        <Header />
        <Switch>   {/* Switch: To picks only one <Route/> to solve this issue. */}
          <Route path='/' exact component={StreamList} />

          <Route path='/streams/new' exact component={StreamCreate} />
          <Route path='/streams/:id' exact component={StreamShow} />
          {/*  
               path='/streams/:id' works as wild card.
               Therefore when path='/streams/new' is selected, 
               StreamShow is also rendered at the same page with StreamCreate
               --> We need 'Switch' which  picks only one <Route/> to solve this issue. 
                It once picks /new and ignores /:id        
          */}

          <Route path='/streams/edit/:id' exact component={StreamEdit} />   {/* ':??' works as wildcard */}
          <Route path='/streams/delete/:id' exact component={StreamDelete} />
        </Switch>

      </Router>
      {/*       </BrowserRouter> */}
    </div>
  )
}

export default App
