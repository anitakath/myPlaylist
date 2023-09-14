import React, {useState, useEffect} from 'react'



//COMPONENTS



//STYLES 
import styles from '../../STYLES/Header.module.css'


//API 
import Spotify from '../../Spotifyy'


const Header = () =>{


    const [userName, setUserName] = useState('')


    useEffect(()=>{

        let userToken = Spotify.getAccessToken();

        async function getLoggedInUser(){
           
            const response = fetch('https://api.spotify.com/v1/me', {
                headers:{
                  'Authorization': 'Bearer ' + userToken
                }
              });

              const data = await (await response).json();
              //console.log(data)  DEVTOOLS 2X!!!!!!!
              setUserName(data.display_name)
              
              return data
        }

        getLoggedInUser()

        const user = Spotify.getAccessToken()
        console.log(user)
        console.log(Spotify.getUsername())
    }, [])

    //console.log(userName) DEVTOOLS 4x!!!

    return(
        <div className={styles.headerContainer}>
        
                <h1 className={styles.title}> The Soundtrack Of ✨ {userName} ✨ </h1>
              
     
           
            <h2> create the soundtrack of your life using the Spotify API - and save it to your Spotify account</h2>
           
           
        </div>
    )
}

export default Header;