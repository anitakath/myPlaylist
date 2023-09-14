import React, { useEffect, useState, useRef} from 'react'


//COMPONENTS
import ErrorModal from '../MODAL/ErrorModal'
import SuccessModal from '../MODAL/SuccessModal'



//STYLES
import styles from '../../STYLES/MainPlaylist.module.css'

//API
import Spotify from '../../Spotifyy'

const MainPlaylist = (props) =>{

    const [errorModal, setErrorModal] = useState(false)
    const [playlist, setPlaylist] = useState([])
    const [modal, setModal] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [playlistInput, setPlaylistInput] = useState('')
    const [playlistSaved, setPlaylistSaved] = useState(false)
   

    const addedTrack = props.addedTrack
    let id  = props.trackId
    //console.log(id)

   


    const state = props.state
    //console.log(state)

    

   const [theState, setState] = useState([])


    const filteredObject = state.filter(obj => obj.id === id)[0];
   


      
    useEffect(() => {
        const timer = setTimeout(() => {
            id = ''
            console.log(id)
        }, 5000); // Zeit X in Millisekunden (hier 5 Sekunden)
    
        return () => clearTimeout(timer);
      }, []);


  

    useEffect(()=>{

        const filteredArrayIds = filteredArray.map((x)=> {return x.id})
     
        //console.log(filteredArrayIds)
        //console.log(filteredArrayIds.includes(id))

        
        if(filteredArrayIds.includes(id)){
            setErrorModal(true)
            //console.log(errorModal)
            //alert('moinnn')
            
            return
        }else{
           
            setPlaylist((prevPlaylist) => [...prevPlaylist, filteredObject])
        }
       // setPlaylist((prevPlaylist) => [...prevPlaylist, filteredObject])

    }, [id])

  
    

    //console.log(playlist)

    const filteredArray = playlist.filter(element => element !== undefined)

    //console.log(filteredArray)
    //console.log(playlist.map((x)=> {return x}))




    const deleteTrackHandler = (trackId) =>{
        const filterTracks = filteredArray.filter(element => element.id !== trackId)
        setPlaylist(filterTracks)
    }


   








































   

    /*
    useEffect(()=>{

        const value = refValue.current.value
        console.log(value)
        
        content = (playlistInput=== '') ?  'give your playlist a name ' : 'add tracks to your playlist'
        console.log(content)

    }, [playlistInput, filteredArray])
    */

























    

    const [content, setContent] = useState('please name your playlist and add songs to it')
    
  

    function savePlaylistHandler() {

        setIsLoading(true)


        console.log(filteredArray)

        if(filteredArray.length === 0 || playlistInput === ''){
        

            setIsError(true)
            console.log(isError)

                 

        } else {
       

            
            console.log(isError)
           
            
            const trackUris = filteredArray.map(playlistTrack => playlistTrack.uri);
            Spotify.savePlaylist(playlistInput, trackUris);
            setState({
            searchResults: []
            });

            setIsLoading(false)
            setModal(true)
            setPlaylistSaved(true)   
            
        }   

    }


    //console.log(content)
    //console.log(isError)
    //console.log(filteredArray)
    //console.log(playlistInput)

    useEffect(()=>{
        if(filteredArray.length >= 1 && playlistInput !== ''){
            console.log('hi')
            setIsError(false)
            setIsLoading(false)

        }
    }, [playlistInput])

  
  
 

   const playlistInputHandler = (e) =>{
       setPlaylistInput(e.target.value)
   }

 



    return(
        
        <div className={styles.playlistContainer}>
          

            <div className={styles.titleContainer}>
                <input 
                    id="playlistTitle" 
                    type="text" 
                    className={styles.title} 
                    placeholder=" give your playlist a name "
                    onChange={playlistInputHandler}
                    >
                </input>
            </div>
            
            {errorModal && !modal && <ErrorModal setErrorModal={setErrorModal} errorMessage={'this song has already been added to your playlist - add it anyway?'} />}

            {!playlistSaved && 
                <ul>
                    {filteredArray.map((track) =>{
                        return(
                            <li className={styles.resultItem} key={track.id} onClick={() => deleteTrackHandler(track.id)}>
                                <p className={styles.track}> {track.name} </p>
                                <p className={styles.artist}> {track.artist}</p>
                            </li>
                        )
                    })}

                </ul>}

            {!playlistSaved && !modal && isLoading && !isError && <p> loading ... </p>}
            {isError && !playlistSaved &&  <p id="addTracksInfo" className={styles.addTracksInfo}> {content} </p>}

            {playlistSaved && !modal && 
            <div className={styles.playlistSavedContainer}>
                <p> PLAYLIST SAVED  </p>
            </div>}

            <button className={styles.playlistBtn} onClick={savePlaylistHandler}> save to spotify </button>
          
           {modal && <SuccessModal setModal={setModal} modal={modal} message={'YOUR SOUNDTRACK HAS BEEN SUCCESSFULLY UPLOADED TO YOUR SPOTIFY ACCOUNT'} />}


        </div>
    )
}

export default MainPlaylist