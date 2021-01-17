import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import _ from 'lodash'

import {
  SIGNED_IN, SIGNED_OUT,
  CREATE_STREAM,
  FETCH_STREAMS,
  FETCH_STREAM,
  EDIT_STREAM,
  DELETE_STREAM
} from "../actions/types";


const INITIAL_STATE = {
  isSignedIn: null,
  userId: null

}

const authReducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {
    case SIGNED_IN:
      return { ...state, isSignedIn: true, userId: action.payload }
    case SIGNED_OUT:
      return { ...state, isSignedIn: false, userId: null }
    default:
      return state

  }
}


const INITIAL_STREAM_STATE = {}
// *Hashing* { key: vlaue , key:value, ...  }
// It will be structured  like... 
/*
{ 1: { id:1, title:'stream1', description: 'desc1'},
  2: { id:2, title:'stream2', description: 'desc2'},
  3: { id:3, title:'stream3', description: 'desc3'},
  ....}
*/

const streamReducer = (state = INITIAL_STREAM_STATE, action) => {
  switch (action.type) {
    case CREATE_STREAM:
    case FETCH_STREAM:
    case EDIT_STREAM:
      {
        /* 
        const newStream = { ...state }
        newStream[action.payload.id] = action.payload 
        return newStream
  
        or,
       */

        return { ...state, [action.payload.id]: action.payload }
      }

    case FETCH_STREAMS: {
      // console.log(_.mapKeys(action.payload, 'id'));
      return { ...state, ..._.mapKeys(action.payload, 'id') }
    }
    //... is needed for _.mapKeys() because _.mapKeys() returns multiple objects

    case DELETE_STREAM: {
      /* 
        const newSteam = { ...state }
        delete newSteam[action.payload]
        return newSteam
        
        Or...
      */
      return _.omit(state, action.payload)    //lodash _.omit()
    }

    default:
      return state
  }

}

export default combineReducers(
  {
    auth: authReducer,
    stream: streamReducer,
    form: formReducer       // built-in 'form' from redux-form

  }
)



