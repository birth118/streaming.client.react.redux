import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchStreams } from '../../actions'



class StreamList extends Component {


  componentDidMount = () => {
    this.props.fetchStreams()
  }

  renderAdmin(stream) {
    if (stream.userId === this.props.currentUserId) {
      return (
        <div className="right floated content">
          <Link to={`/streams/edit/${stream.id}`}
            className="ui tiny button primary">Edit</Link>
          <Link to={`/streams/delete/${stream.id}`}
            className="ui tiny button negative">Delete</Link>
        </div>
      )

    }
  }

  renderCreate() {
    if (this.props.isSignedIn) {
      return (
        <div >
          <Link to="/streams/new" className="ui tiny right floated button primary">Create Stream</Link>
        </div>
      )
    }
  }

  renderedStream = () => {

    return this.props.streams.map((stream) => {
      return (

        <div key={stream.id} className="item">
          {this.renderAdmin(stream)}            {/* semantics-ui for right end button */}
          <i className="large middle alighed icon camera" />
          <div className="content">
            <Link to={`/streams/${stream.id}`} className="header">
              {stream.title}
            </Link>
            <div className="description">
              {stream.description}
            </div>

          </div>
        </div>
      )
    })

  }


  render() {
    return (
      <div>
        <h3>Streams</h3>
        <div className="ui relaxed celled list">
          {this.renderedStream()}
        </div >
        { this.renderCreate()}
      </div>


    )
  }
}

const mapStateToProps = (state) => {
  //console.log(state.stream);
  return {
    streams: Object.values(state.stream),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn,

  }
}

export default connect(mapStateToProps, { fetchStreams })(StreamList)
