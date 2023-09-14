import React, {useState} from 'react'
import ReactDOM from 'react-dom'


//STYLES
import styles from './SuccessModal.module.css'


const SuccessModal = (props) =>{


    console.log(props.setModal)
    console.log(props.modal)

    const Background = (props) =>{
        return(
            <div className={styles.backgroundContainer}> </div>
        )
    }

    

    const Modal = (props) =>{

        console.log(props.modal)

        const closeModalHandler = () =>{

            props.setModal(false)


            console.log(props.setModal)
        }


        return(
            <div className={styles.modalContainer}>
                <h2>  SUCCESS </h2>
                <div className={styles.messageField}>
                    <p>{props.message}</p>
                </div>
              
                <button className={styles.modalBtn} onClick={closeModalHandler}> OK </button>
            </div>
        )
    }

    return(
        <div >
             <React.Fragment>
                {ReactDOM.createPortal(<Background/>, document.getElementById('background'))}
                {ReactDOM.createPortal(<Modal setModal={props.setModal} modal={props.modal} message={props.message} />, document.getElementById('modal'))}

            </React.Fragment>
        </div>
    )
}

export default SuccessModal