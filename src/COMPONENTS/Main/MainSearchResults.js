
import React, {useState, useEffect} from 'react'

//COMPONENTS



//STYLES
import styles from '../../STYLES/MainSearchResults.module.css'


const MainSearchResults = (props) =>{

    const isLoading = props.isLoading

    const [noResults, setNoResults] = useState(false)
    

    const searchResults = props.state;
    //console.log(searchResults)

    useEffect(()=>{
        if(searchResults.length === 0){
            setNoResults(true)
        } else{
            setNoResults(false) 
        }
    }, [searchResults])
    
  

    // const [addTrack, setAddTrack] = useState({})

     const [id, setId] = useState('')




     const addTrackHandler = (track) =>{
         //console.log(track)
         setId(track)
     
        /*for(let i = 0; i< searchResults.length; i++){
            if(searchResults[i].id === track){
                console.log('gefunden:', searchResults[i])
                setAddTrack(searchResults[i])
            }


        }*/
     

    }

    //console.log(id)

        
    props.onGetAddedId(id)

    //console.log(props.isTouched)
       


 

    return(
        <div className={styles.searchResultsContainer}>

             <div className={styles.titleContainer}>
                 <h1 className={styles.title}> Results </h1>
             </div>
             
            {isLoading && <p> loading ....</p>}
           {!isLoading && 
                <ul>
                    {searchResults.map((track) =>{
                            return(
                                <li 
                                className={styles.resultItem} 
                                key={track.id}
                                onClick={() => addTrackHandler(track.id)}
                                value={track.id}
                                >
                                    <p className={styles.track}>{track.name}</p>
                                    <p className={styles.artist}>by: {track.artist}</p>
                                </li>
                            )
                    })}

                </ul>
           
            }
            {!isLoading && noResults && props.isTouched && <p> sorry, we could not find this song </p>}
           
    
        </div>
    )
}

export default MainSearchResults