import React from 'react';
import { Track } from '../Track/Track'

export class TrackList extends React.Component {
  render() {
    let tracks = this.props.tracks;
    return (
      <div className="TrackList">
        {tracks && tracks.map((track) => 
          {
            return <Track 
                    track={track} 
                    key={track.id}
                    onAdd={ this.props.onAdd }
                    onRemove={ this.props.onRemove }
                    isRemoval={ this.props.isRemoval }
                    />})}
      </div>
    )
  }
}