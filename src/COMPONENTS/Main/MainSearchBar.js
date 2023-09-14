import React, {useState, useEffect} from 'react'


//COMPONENTS
import ErrorModal from '../MODAL/ErrorModal'

//STYLES
import styles from '../../STYLES/MainSearchBar.module.css'

//API 
import Spotify from '../../Spotifyy'

const MainSearchBar = (props) =>{

    const [track, setTrack] = useState('')
    const [ errorModal, setErrorModal ] = useState(false)
    const [isTouched, setIsTouched] = useState(false)

    const changeHandler = (e) =>{
        setTrack(e.target.value)
       
    }

    const submitHandler = (e) =>{
        e.preventDefault()

     if(track === ''){
         console.log('track empty')
         
          setErrorModal(true)
         return
     }
        setIsTouched(true)
        props.getSearchBarValue(track) // track = string
        setTrack('')
        
    }
    
/*
    useEffect(()=>{
        const timer = setTimeout(() =>{
          setTrack('');
        }, 5000)
        //return () => clearTimeout(timer)
      }, [])*/
  


    //console.log(track) 

    /*
    const isTouchedHandler = () =>{
        setIsTouched(true)

    }
    */
    //console.log(isTouched)

    props.isTouched(isTouched)

   
  
    

    return(
        <div className={styles.searchBarContainer}>
            {errorModal && <ErrorModal  errorMessage={'please enter a song in the input field'} setErrorModal ={setErrorModal} />}
            <form onSubmit={submitHandler}>
                <input 
                type="text" 
                className={styles.searchInput}
                placeholder="search..."
                value={track}
                onChange={changeHandler}
                ></input>
                <button className={styles.submitBtn} type="submit"> search </button>

            </form>
           
        </div>
    )
}

export default MainSearchBar;