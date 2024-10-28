import React from 'react'
import styles from './Done.module.css';
import { Link } from 'react-router-dom';
import collapseIcon from '../assets/boardIcons/collapse.png';

function Done() {
  return (
    <div>
        <div className={styles.doneHeading}>
            <p>Done</p>
            <p><Link to="/"><img src={collapseIcon}/></Link></p> 
        </div> 
        <div className={styles.taskBoard}>
            <div className={styles.task}></div>
            <div className={styles.task}></div>
        </div>
    </div>
  )
}

export default Done
