import React, { Component } from 'react'
import { connect } from "react-redux";

import { trySignIn, trySignOut } from "../actions";


const OAUTH_CLIENT_ID = '298787624725-n2ba208qn22h4aa55gkahu9de51k53q2.apps.googleusercontent.com'
class GoogleAuth extends Component {

  // state = { isSignedIn: null }

  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: OAUTH_CLIENT_ID,
        scope: 'email' //authorised google scope
      }).then(() => {
        this.auth = window.gapi.auth2.getAuthInstance()
        //    this.setState({ isSignedIn: this.auth.isSignedIn.get() })
        this.onAuthChange(this.auth.isSignedIn.get())
        this.auth.isSignedIn.listen(() => { // To listen if IsSignedIn changge
          this.onAuthChange(this.auth.isSignedIn.get())
        }
        )
      })
    })
  }



  onSignInClick = () => {
    this.auth.signIn()
  }
  onSignOutClick = () => {
    this.auth.signOut()
  }


  onAuthChange = (isSignedIn) => {
    //this.setState({ isSignedIn: this.auth.isSignedIn.get() })


    isSignedIn ?
      this.props.trySignIn(this.auth.currentUser.get().getId()) :
      this.props.trySignOut()

    /* 
        Must not 'this.renderAuthButton()' here.
        Action creators above will change redux store and that change triggers re-render
     */
    // this.renderAuthButton()  

  }

  renderAuthButton = () => {

    if (this.props.isSignedIn === null) {
      return null

    } else if (this.props.isSignedIn) {
      return (
        <button onClick={this.onSignOutClick} className="ui tiny red google button">
          <i className="google icon"></i> Sign Out
        </button>
      )
    } else {
      return (
        <button onClick={this.onSignInClick} className="ui tiny red google button">
          <i className="google icon"></i> Sign In with Google
        </button>
      )
    }
  }

  render() {
    // console.log(this.props.isSignedIn);
    return (

      // <div>Google</div>
      <div>{this.renderAuthButton()}</div>
    )

  }
}

const mapStateToProps = (state) => {

  return { isSignedIn: state.auth.isSignedIn }
}

export default connect(mapStateToProps, {
  trySignIn: trySignIn,
  trySignOut: trySignOut,

})(GoogleAuth) 