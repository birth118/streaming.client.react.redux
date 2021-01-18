import React, { Component } from 'react'
import flvjs from "flv.js";
import { connect } from "react-redux";
import { fetchStream } from "../../actions";

class StreamShow extends Component {

  constructor(props) {
    super(props)

    this.videoRef = React.createRef()

  }

  componentDidMount() {

    const { id } = this.props.match.params
    this.props.fetchStream(id)

    // 3rd party APU fetch usually goes to componentDidMount()
    this.buildPlayer()
    // this.flvPlayer.play();
  }

  componentDidUpdate() {

    // When componentDidMount() called, <video /> elememt is not rendered yet 
    // because it was returned with 'Loading...'
    // So, buildPlayer() called in componentDidUpdate()

    this.buildPlayer()
  }

  componentWillUnmount() {

    console.log('Player Unmounted');
    this.flvPlayer.destroy()
  }


  buildPlayer() {
    if (this.flvPlayer || !this.props.stream) {
      return;
    }

    const { id } = this.props.match.params

    // 3rd party API fetch usually goes to componentDidMount()

    this.flvPlayer = flvjs.createPlayer({
      type: 'flv',
      //url: `http://localhost:8000/live/${id}`
      url: `http://localhost:8000/live/${id}.flv`
    });
    this.flvPlayer.attachMediaElement(this.videoRef.current);
    this.flvPlayer.load();

    //   this.flvPlayer.play();


  }

  render() {
    if (!this.props.stream) {
      return <div>Loading...</div>
    }
    const { title, description } = this.props.stream
    return (
      < div >
        <video ref={this.videoRef} style={{ width: '100%' }} controls />
        {/* React videio player component */}
        <div className="ui content">
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
