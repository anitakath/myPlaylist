import React from "react";
import ReactDOM from 'react-dom'


//STYLES
import styles from './ErrorModal.module.css'


const ErrorModal = (props) =>{

  
   

    const Background = (props) =>{
        return(
            <div className={styles.backgroundContainer}>
                
            </div>
        )
    }

    const Modal = (props) =>{

        const closeModalHandler = () =>{
            props.setErrorModal(false)

            console.log(props.setErrorModal)
        }


        return(
            <div className={styles.modalContainer}>
                <h2> ERROR</h2>
                <div className={styles.errorMessageField}>
                    <p>{props.errorMessage}</p>
                </div>
              
                <button className={styles.modalBtn} onClick={closeModalHandler}> OK </button>
            </div>
        )
    }

    return(
            <React.Fragment>
                {ReactDOM.createPortal(<Background/>, document.getElementById('background'))}
                {ReactDOM.createPortal(<Modal errorMessage={props.errorMessage} setErrorModal={props.setErrorModal} />, document.getElementById('modal'))}

            </React.Fragment>

    )
}

export default ErrorModal;