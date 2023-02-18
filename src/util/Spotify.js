let clientID = '7959aee203d44b769033712ff5ece1b1';
let redirectURI = 'https://chickenBreadstick.surge.sh';
const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
let accessToken;
let userID;

const Spotify = {
  getAccessToken(){
    console.log('Getting Access Token...')
    // If token exists then return it.
    if(accessToken){ return accessToken; }

    // Check if current URL includes token
    const currentUrl = window.location.href;
    const tokenRegex = /access_token=([^&]*)/;
    const expireRegex = /expires_in=([^&]*)/;
    const tokenMatch = currentUrl.match(tokenRegex);
    const expireMatch = currentUrl.match(expireRegex);

    if(tokenMatch && expireMatch){
      accessToken = tokenMatch[1];
      window.setTimeout(() => accessToken = '', expireMatch[1]);
    }
    else {
      window.location = authUrl;
    }      
    console.log('Retrieved Token:' + accessToken)
    return accessToken;
  },

  search(searchTerm){
    accessToken = Spotify.getAccessToken()
    if(!accessToken) {window.alert('Access Token Invalid! \n Please try again.')}
    else {
      return fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`,
        {  headers: { 'Authorization': `Bearer ${accessToken}`}
        }).then((response) => {
          return response.json();
        }).then((searchResults) => {
          if(!searchResults.tracks) {
            return [];}
          return searchResults.tracks.items.map((result) => ({
              id: result.id,
              name: result.name,
              artist: result.artists[0].name,
              album: result.album.name,
              uri: result.uri }))
        });
    }
  },

  getUserID() {
  accessToken = Spotify.getAccessToken();
  return fetch( 'https://api.spotify.com/v1/me', {  
                headers: {  'Authorization': `Bearer ${accessToken}`}
              })
              .then((response) => {if(response.ok){ return response.json()}})
              .then((userInfo) => {
                if(!userInfo.id) {window.alert('User ID not found!')}
                  return userInfo.id;
              });
  }, 

  savePlaylist(name,trackURIs){
    if(!name || !trackURIs) {return}
    accessToken = Spotify.getAccessToken();
    console.log('Access Token:' + accessToken);
    // Get User ID
    let userID;
    // Create a new playlist
    let playlistID;
    return fetch( 'https://api.spotify.com/v1/me', {
      headers: {  'Authorization': `Bearer ${accessToken}`}})
    .then((response) => {if(response.ok){ return response.json()}
                         else{console.log('bad bad bad')}})
    .then((userInfo) => {
      if(!userInfo.id) {window.alert('User ID not found!')}
        userID = userInfo.id;
        console.log(userID);
        return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
          method: 'POST', 
          headers: {  'Authorization': `Bearer ${accessToken}`,
                      'Content-Type': 'application/json'},
          body: JSON.stringify({ name : name})})
          .then((response) => {
            if(response.ok) {return response.json()}
            console.log(response);})
          .then((decodedJSON) => {
            playlistID = decodedJSON.id
            console.log(playlistID)
            return fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
              method: 'POST',
              headers: {  'Authorization': `Bearer ${accessToken}`},
              body: JSON.stringify({uris : trackURIs})})
              .then((response) => {
                if(response.ok) {return response.snapshot_id}
                else{console.log('4000000000')}
                })
      })
      });
    
        
  }
}

export default Spotify;