import React from 'react'
import styles from './Register.module.css';
import circleImage from '../../assets/Back_Circle.png';
import robotImage from '../../assets/robot.png';
import Form  from '../../components/Form';
import { useNavigate } from 'react-router-dom';
function Register() {

  const navigate = useNavigate();

  const redirectToLogIn = () => {
    navigate("/login");
  }

  return (
    <div className={styles.registercontainer}>
        <div className={styles.registerleftSubContainer}>
            <img src={circleImage} className={styles.registercircleImage} />
            <img src={robotImage} className={styles.registerrobotImage}/>
            <p className={styles.registerwelcomeMessage}>Welcome aboard my friend <br/><span> just a couple of clicks and we start</span></p>
        </div>
        <div className={styles.registerrightSubContainer}>
            <h2>Register</h2>
            <Form/>
            <p className={styles.existAccount}>Have an account ?</p>
            <button type='button' className={styles.loginButton} onClick={redirectToLogIn}>Log in</button>
        </div>
    </div>
  )
}

export default Register
