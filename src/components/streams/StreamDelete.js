import React, { Fragment, Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import Modal from "../Modal";
import history from "../../history";
import { deleteStream, fetchStream } from "../../actions";


class StreamDelete extends Component {

  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id)
  }

  actions = (
    <Fragment >          {/* Or just <> */}
      <button
        onClick={() => {
          //  console.log('CONFIRMED')
          this.props.deleteStream(this.props.match.params.id)
        }}
        className="ui tiny  button negative">Delete</button>
      <Link
        // onClick={() => { history.push('/') }}
        to='/'
        className="ui tiny button ">Cancel</Link>
    </Fragment>
  )

  renderContent = () => {
    if (!this.props.stream) {
      return <div>
        < Modal
          title="Delete Stream"
          description="Are you sure to delete this stream?"
          actions={this.actions}
          onDismiss={() => { history.push('/') }}
        //      streamTitle={this.props.stream.title}
        /></div>
    }
  }

  renderContent = () => {
    if (!this.props.stream) {
      return 'Are you sure to delete this stream?'
    } else {
      return `Are you sure to delete this stream? Title:  ${this.props.stream.title} `

    }
  }

  render() {


    return (
      <div>
        < Modal
          title="Delete Stream"
          description={this.renderContent()}
          actions={this.actions}
          onDismiss={() => { history.push('/') }}
        />
      </div >
    )
  }

}

const mapStateToProp = (state, ownProps) => {
  return { stream: state.stream[ownProps.match.params.id] }
}

export default connect(mapStateToProp,
  {
    fetchStream,
    deleteStream
  })(StreamDelete)
