import React from 'react';
import './App.css';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlist } from '../Playlist/Playlist';
import {Spotify} from '../../util/Spotify';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      searchResults: [
        {name: 'trackName0', artist: 'artistName0', album: 'albumName0', id:'track-00'},
        {name: 'trackName1', artist: 'artistName1', album: 'albumName1', id:'track-01'},
        {name: 'trackName2', artist: 'artistName2', album: 'albumName2', id:'track-02'},
        {name: 'trackName3', artist: 'artistName3', album: 'albumName3', id:'track-03'}],
      playlistName: 'Songs to die to!',
      playlistTracks: [
        {name: 'playlistName0', artist: 'playlistartistName0', album: 'playlistalbumName0', id:'track-04'},
        {name: 'playlistName1', artist: 'playlistartistName1', album: 'playlistalbumName1', id:'track-05'},
        {name: 'playlistName2', artist: 'playlistartistName2', album: 'playlistalbumName2', id:'track-06'},
        {name: 'playlistName3', artist: 'playlistartistName3', album: 'playlistalbumName3', id:'track-07'}]};
      
      this.addTrack = this.addTrack.bind(this);
      this.removeTrack = this.removeTrack.bind(this);
      this.updatePlaylistName = this.updatePlaylistName.bind(this);
      this.savePlaylist = this.savePlaylist.bind(this);
      this.search = this.search.bind(this);
  }

  addTrack(track) {
    if(!this.state.playlistTracks.find(currentTrack => currentTrack.id === track.id)){
      this.setState({
        playlistTracks: [...this.state.playlistTracks, track]
      })
    }
  }

  removeTrack(track) {
    const newList = [...this.state.playlistTracks].filter(currentTrack => track.id !== currentTrack.id);
    this.setState({
      playlistTracks: newList
    });
  }

  updatePlaylistName(name) {
    this.setState({ playlistName: name })
  }

  savePlaylist() {
    const trackURIs = this.state.playlistTracks.map(track => track.id);
  }

  search(searchTerm) {
    console.log('Searching...')
    const searchResults = Spotify.search(searchTerm)
    this.setState({ searchResults: searchResults});
  }
  
  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={ this.search } />
          <div className="App-playlist">
          <SearchResults 
            searchResults={this.state.searchResults}
            onAdd={ this.addTrack }
            />
          <Playlist 
            playlistName={ this.state.playlistName }
            playlistTracks={ this.state.playlistTracks}
            onRemove={ this.removeTrack }
            onNameChange={ this.updatePlaylistName }
            onSave={ this.savePlaylist }
            /> 
          </div>
        </div>
      </div>
      );
  }}

export default App;
