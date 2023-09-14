import Ract, {useState, useEffect} from 'react'


let accessToken = "";
let userName;


const clientID = "fb0d2611899b4a1b9700ba664788ea36";

//redirectURI in developer.spotify:
// -> erstellten App -> Settings -> Redirect URIs localhost einfügen
const redirectURI ="http://localhost:3000/"

const Spotify = {
  
    getAccessToken(){
        if(accessToken){
            return accessToken
        }

        const urlAccessToken = window.location.href.match(/access_token=([^&]*)/)
        const urlExpiresIn = window.location.href.match(/expires_in=([^&]*)/)
        if(urlAccessToken && urlExpiresIn){
            accessToken = urlAccessToken[1]
            const expiresIn = Number(urlExpiresIn[1])
            window.setTimeout(() =>(accessToken =""), expiresIn * 1000);
            window.history.pushState("Access Token", null, "/")
        } else{
            const redirect = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`
            window.location = redirect;
        }  

       

        return accessToken;
    },

   


    search(track){
        const accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${track}`, {
            headers:{ Authorization: `Bearer ${accessToken}` },
        })
        .then(response =>{
            return response.json();
        })
        .then((jsonResponse) =>{
            if(!jsonResponse.tracks){
                return [];
            }
            return jsonResponse.tracks.items.map((tracks) => ({
                id: tracks.id,
                name: tracks.name,
                artist: tracks.artists[0].name,
                album: tracks.album.name,
                uri: tracks.uri,
            }))
           
        })
       
    },
    
    savePlaylist(name, trackUris) {
        if (!name || !trackUris || trackUris.length === 0) return;
        const userUrl = 'https://api.spotify.com/v1/me';
        const headers = {
          Authorization: `Bearer ${accessToken}`
        };
        let userId = undefined;
        let playlistId = undefined;
        fetch(userUrl, {
          headers: headers 
        })
        .then(response => response.json())
        .then(jsonResponse => userId = jsonResponse.id)
        .then(() => {
          const createPlaylistUrl = `https://api.spotify.com/v1/users/${userId}/playlists`;
          fetch(createPlaylistUrl, {
              method: 'POST',
              headers: headers,
              body: JSON.stringify({
                name: name
              })
            })
            .then(response => response.json())
            .then(jsonResponse => playlistId = jsonResponse.id)
            .then(() => {
              const addPlaylistTracksUrl = `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`;
              fetch(addPlaylistTracksUrl, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({
                  uris: trackUris
                })
              });
            })
        })
      },



      getUsername(){



    
        const accessToken = Spotify.getAccessToken();


        return fetch('https://api.spotify.com/v1/me', {
            headers:{
              'Authorization': 'Bearer ' + accessToken
            }
          })
          .then(response => {
            if(!response.ok){
              throw new Error ('fehler beim abrufen der daten')
            }
            return response.json();
          })
          .then(data =>{
            
            //userName = data.display_name;
            //console.log(userName)  -> Anne


            //console.log(data)
            //console.log('hey', data.display_name, '❤️');
            //userName =  `heyyy, ${data.display_name} `
            //console.log(userName)
            
            //console.log(userName)
            //return userName
            console.log(data.display_name)
            return (data.display_name)
          })
         
        

       
          

      },

     

      

      

    
}

/*
console.log(Spotify.getUsername()
  .then(returnedValue => {
  console.log(returnedValue)
})
.catch(error =>{
  console.error('fehler', error)
})
)
*/

console.log(userName)


let currToken = Spotify.getAccessToken();
console.log(currToken)

console.log(Spotify.getAccessToken())
console.log(Spotify.getUsername())


console.log(Spotify)
console.log(Spotify.search)


export default Spotify;