import React from 'react';
import './App.css';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlist } from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {searchResults: [
                                  // { name: "A1", id: 1 , album: "B1", artist: "C1", uri: "101"},
                                  // { name: "A2", id: 2 , album: "B2", artist: "C2", uri: "102"},
                                  // { name: "A3", id: 3 , album: "B3", artist: "C3", uri: "103"}
                                  ],
                  playlistName: "Playlist",
                  playlistTracks: [{ name: "PA1", id: 4 , album: "PB1", artist: "PC1", uri: "104"},
                                   { name: "PA2", id: 5 , album: "PB2", artist: "PC2", uri: "105"},
                                   { name: "PA3", id: 6 , album: "PB3", artist: "PC3", uri: "106"}]};
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults}
                           onAdd={this.addTrack}/>
            <Playlist playlistName={this.state.playlistName}
                      playlistTracks={this.state.playlistTracks}
                      onRemove={this.removeTrack}
                      onNameChange={this.updatePlaylistName}
                      onSave={this.savePlaylist}/>
          </div>
        </div>
      </div>
    );
  }

  addTrack(track) {
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
    let newPlaylist = this.state.playlistTracks
    newPlaylist.push(track);
    this.setState({
      playlistTracks: newPlaylist
    })
  }

  removeTrack(track) {
    let newPlaylist = this.state.playlistTracks.filter(savedTrack => savedTrack.id !== track.id)
    this.setState({
      playlistTracks: newPlaylist
    })
  }

  updatePlaylistName(name) {
    this.setState({
      playlistName: name
    })
  }

  savePlaylist() {
    const trackURIs = this.state.playlistTracks.map(track => track.uri);
    // console.log(trackURIs);
  }

  search(searchTerm) {
    Spotify.search(searchTerm).then(result =>
      this.setState({
        searchResults: result
      })
    )
  }
}

export default App;