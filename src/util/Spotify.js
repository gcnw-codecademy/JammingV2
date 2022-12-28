let accessToken = null;
let clientID = '7959aee203d44b769033712ff5ece1b1';
let redirectURI = 'http://localhost:3000/';

export const Spotify = {
  getAccessToken(){
    console.log('Getting access token... | Current Value: ' + accessToken);
    if(accessToken !== null) return accessToken;
    else {
      window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
      const currentUrl = window.location.href;
      console.log('Checking URL... | Current Value: ' + currentUrl);
      if(currentUrl.match('access_token')) {
        const tokenRegex = /access_token=([^&]*)/;
        const expireTime = /expires_in=([^&]*)/;
        accessToken =  currentUrl.match(tokenRegex)[0];
        console.log(accessToken)
        setTimeout(() => {accessToken = null},expireTime);
      }
      else {
        window.alert(currentUrl + ' doesnt include an access token!')
      }}
      return accessToken;
    },

  search(searchTerm){
    accessToken = this.getAccessToken()
    // setTimeout(accessToken = this.getAccessToken(), 1000);
    console.log('dodo' + accessToken)
    fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`,
      { method: 'GET'},
      { headers: { 
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'}})
      .then((response) => response.json())
      .then((searchResults) => 
      searchResults.tracks.items.map((result) => {
        return {
          id: result.id,
          name: result.name,
          artist: result.artist,
          album: result.album,
          uri: result.uri }
      }))}
}

