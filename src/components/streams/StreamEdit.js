// import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchStream, editStream } from "../../actions";
import StreamForm from "./StreamForm";



class StreamEdit extends Component {
  // console.log(props.match.params);

  componentDidMount() {

    this.props.fetchStream(this.props.match.params.id)
  }

  onSubmit = (formValues) => {
    // #1.
    // Check out what properties  & values pairs coming as formValues!!
    // If formValues  unnecessarily  contains {id & userId}
    // we 'ONLY' need to updated {tile & description} over API
    // Think about what if the API only accepts {tile & description}?
    // then Our Api call to send whole formValues to be failed.

    this.props.editStream(this.props.match.params.id, formValues)
  }

  render() {
    if (!this.props.stream) {
      return <div>Loading...</div>
    }
    // const { title, description } = this.props.stream

    return (

      <div>
        <h3>Edit Stream</h3>
        <StreamForm
          onFormSubmit={this.onSubmit}

          // Prop name must be 'initialValues'. 
          // Once it passed down to children component, 
          // its property 'name' (ex, title and description) will be matched to element name of the 
          // <Field /> in form of the child
          // Its 'value' will go to the element's value accordingly automatically
          // 
          // #2. So we will only send title & descriptions, not  whole this.props.stream

          initialValues={{
            title: this.props.stream.title,
            description: this.props.stream.description
          }}
        // or, using lodash pick()
        // initialValues={_.pick(this.props.stream, 'title', 'description')}

        />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {

  return { stream: state.stream[ownProps.match.params.id] }
}

export default connect(mapStateToProps,
  { fetchStream, editStream }
)(StreamEdit)
