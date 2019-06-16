import React, { Component } from 'react';
import              './Metronome.css';

import click1 from  './click1.wav';
import click2 from  './click2.wav';

class Metronome extends Component {

  constructor (props){
    super (props);
    this.state = {
      playing: false,
      bpm: 100,
      count: 0,
      beatsPerMeasure: 2
    }
    this.click1 = new Audio(click1);
    this.click2 = new Audio(click2);
  }

  handleBpmChange = event => {
    const bpm = event.target.value;

    if (this.state.playing){
      // Stop the older timer and start a new one
      clearInterval(this.timer);
      this.timer = setInterval(
        this.playClick,
        (60 / this.state.bpm) * 1000
      );
      this.setState({
        count: 0,
        bpm
      });
    } else {
      this.setState( {bpm} );
    }
  }

  startStop = () => {
    if (this.state.playing){
      // Stops the timer
      clearInterval(this.timer);
      this.setState({
        playing: false
      });
    } else {
      // Starts timer with current BPM
      this.timer = setInterval(
        this.playClick,
        (60 / this.state.bpm) * 1000
      );
      this.setState({
        count: 0,
        playing: true
      }, this.playClick);
    }
  }

  playClick = () => {
    const { count, beatsPerMeasure } = this.state;

    if (count % beatsPerMeasure === 0){
      this.click2.play();
    } else {
      this.click1.play();
    }

    // Track the beat
    this.setState(state => ({
      count: (state.count + 1) % state.beatsPerMeasure
    }));
  }

  render (){
    const { bpm, playing } = this.state;

    return (
      <div className="metronome">
        <div className="bpm-slider">
          <h3>{bpm} BPM</h3>
          <input
            type="range"
            min="40"
            max="240"
            defaultValue={bpm}
            onChange={this.handleBpmChange}
          />
        </div>
        <button
         className="ui right labeled icon button"
         onClick={this.startStop}
        >
         <i className={playing ? "right stop icon":"right arrow icon"}></i>
         {playing ? "STOP":"START"}
       </button>
      </div>
    );
  }
}

export default Metronome;
