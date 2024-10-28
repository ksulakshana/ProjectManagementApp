import React from 'react'
import styles from './Inprogress.module.css';
import { Link } from 'react-router-dom';
import collapseIcon from '../assets/boardIcons/collapse.png';

function Inprogress() {
  return (
    <div>
        <div className={styles.inProgressHeading}>
            <p>In progress</p>
            <p><Link to="/"><img src={collapseIcon}/></Link></p> 
        </div> 
        <div className={styles.taskBoard}>
            <div className={styles.task}></div>
            <div className={styles.task}></div>
        </div>
    </div>
  )
}

export default Inprogress
