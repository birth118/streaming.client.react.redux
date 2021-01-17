import React, { Component } from 'react'
import { connect } from 'react-redux'

import { createStream } from "../../actions/";
import StreamForm from "./StreamForm";

class StreamCreate extends Component {

  onSubmit = (formValues) => {
    //console.log(formValues);
    this.props.createStream(formValues)
  }

  render() {
    // console.log(this.props);
    return (
      <div>
        <h3>Create a Stream</h3>
        <StreamForm onFormSubmit={this.onSubmit} />
      </div>
    )
  }
}

export default connect(null, { createStream })(StreamCreate)