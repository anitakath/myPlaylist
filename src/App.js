

import React, {useEffect, useState} from 'react'

//COMPONENTS
import Header from './COMPONENTS/Header/Header';
import Main from './COMPONENTS/Main/Main';
import Footer from './COMPONENTS/Footer/Footer';


//STYLES
import './App.css';


//API


import MainSearchBar from './COMPONENTS/Main/MainSearchBar';
import Spotify  from './Spotifyy';


function App() {




  return (
    <div className="App">

     
      <Header/>

      <Main/>

      <Footer/>
      
    </div>
  );
}

export default App;
