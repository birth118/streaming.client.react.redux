import React, { Component } from 'react'
import { connect } from "react-redux";
import { fetchStream } from "../../actions";

class StreamShow extends Component {

  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id)
  }


  render() {
    if (!this.props.stream) {
      return <div>Loading...</div>
    }
    const { title, description } = this.props.stream
    return (
      < div >
        \        <div className="ui content">
          <div className="ui header">{title}</div>
          <div className="ui description">{description}</div>

        </div>
      </ div >
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.stream[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { fetchStream })(StreamShow)
