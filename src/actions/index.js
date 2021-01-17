
import {
  SIGNED_IN,
  SIGNED_OUT,
  CREATE_STREAM,
  FETCH_STREAMS,
  FETCH_STREAM,
  EDIT_STREAM,
  DELETE_STREAM
} from "./types";
import client from '../apis/json-api'
import history from "../history";


// export const trySignIn = (payload) => ({
//   type: type,
//   payload
// })

export const trySignIn = (userId) => {
  // console.log(`trySignIn: ${isSignedIn}`);
  return {
    type: SIGNED_IN,
    payload: userId

  }
}

export const trySignOut = () => {
  //console.log(`trySignOut: ${isSignedIn}`);
  return {
    type: SIGNED_OUT,

  }
}

export const createStream = (formValues) => async (dispatch, getState) => {
  const { userId } = getState().auth
  const { data } = await client.post('/streams', { ...formValues, userId })
  dispatch({ type: CREATE_STREAM, payload: data })

  history.push('/') // programmaic navigation to '/' route

}

export const fetchStreams = () => async (dispatch, getState) => {

  const { data } = await client.get('/streams')
  // console.log(data);
  dispatch({ type: FETCH_STREAMS, payload: data })
}

export const fetchStream = (id) => async (dispatch, getState) => {

  const { data } = await client.get(`/streams/${id}`)
  dispatch({ type: FETCH_STREAM, payload: data })
}

export const editStream = (id, formValues) => async (dispatch, getState) => {

  // const { data } = await client.put(`/streams/${id}`, formValues) // PUT: overwrite
  const { data } = await client.patch(`/streams/${id}`, formValues) // PATCH: update
  dispatch({ type: EDIT_STREAM, payload: data })
  history.push('/')
}

export const deleteStream = (id) => async (dispatch, getState) => {

  await client.delete(`/streams/${id}`)
  dispatch({ type: DELETE_STREAM, payload: id })
  history.push('/')
}

