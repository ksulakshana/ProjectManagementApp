import React from 'react'
import styles from './Login.module.css';
import circleImage from '../../assets/Back_Circle.png';
import robotImage from '../../assets/robot.png';
import LoginForm  from '../../components/LoginForm';
import { useNavigate } from 'react-router-dom';
function Login() {
  const navigate = useNavigate();

  const submitHandler = () =>{
    navigate('/register');
  }
  return (
    <div className={styles.container}>
        <div className={styles.leftSubContainer}>
            <img src={circleImage} className={styles.circleImage} />
            <img src={robotImage} className={styles.robotImage}/>
            <p className={styles.welcomeMessage}>Welcome aboard my friend <br/><span> just a couple of clicks and we start</span></p>
        </div>
        <div className={styles.rightSubContainer}>
            <h2>Login</h2>
            <LoginForm/>
            <p className={styles.existAccount}>Have no account yet?</p>
            <button type='button' className={styles.loginButton} onClick={submitHandler}>Register</button>
        </div>
    </div>
  )
}

export default Login
