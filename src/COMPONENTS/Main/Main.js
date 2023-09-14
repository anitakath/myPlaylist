import React, {useState, useEffect} from 'react'

//COMPONENTS
import MainSearchBar from './MainSearchBar';
import MainPlaylist from './MainPlaylist';
import MainSearchResults from './MainSearchResults';


//STYLES
import styles from '../../STYLES/Main.module.css'

//API
import Spotify from '../../Spotifyy';

const Main = () =>{

    const [state, setState] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [theTrack, setTheTrack] = useState('')
    const [isTouched, setIsTouched] = useState(false)
    //const [ tracksArray, setTracksArray ] = useState([])
    

    const getSearchBarValue = (track) => {
        setTheTrack(track)
    }


  
   
  
    useEffect(()=>{
      function searchTrack (track){
        setIsLoading(true)
        Spotify.search(track).then((result) =>{
           setState(result)
           setIsLoading(false)
        });
      }
      searchTrack(theTrack)
    }, [theTrack])


    
    function savePlaylistHandler() {

      console.log('save playlist')
      
      const trackUris = this.state.playlistTracks.map(playlistTrack => playlistTrack.uri);
      Spotify.savePlaylist(this.state.playlistName, trackUris);
      this.setState({
        searchResults: []
      });
      this.updatePlaylistName('My playlist');
      console.info(trackUris);
    }

   

   
    

    
    const [trackId, setTrackId] = useState('')

   
    const getAddedId = (trackId) =>{
      setTrackId(trackId)
    }

    //console.log(trackId)

  

    
      
     

  
   const isTouchedhandler = (isTouched) =>{
    setIsTouched(isTouched)

   }
  

  
  

 

    return(
        <div className={styles.mainContainer}>
            <MainSearchBar isTouched={isTouchedhandler} getSearchBarValue={getSearchBarValue} />

            <div className={styles.musicField}>
                <MainSearchResults isTouched={isTouched} isLoading={isLoading} onGetAddedId={getAddedId} state={state}/>
                <MainPlaylist onSavePlaylist={savePlaylistHandler} theTrack={theTrack} state={state} trackId={trackId}/>
            </div>
            

        </div>
    )
}

export default Main;