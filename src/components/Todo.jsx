import React from 'react'
import styles from './Todo.module.css';
import { Link } from 'react-router-dom';
import addNewTask from '../assets/boardIcons/addNewTask.png';
import collapseIcon from '../assets/boardIcons/collapse.png';

function Todo() {
  return (
    <div>
        <div className={styles.todoHeading}> 
            <p>To Do</p>
            <p className={styles.actionButton}>
                <Link to="/"><img src={addNewTask}/></Link>
                <Link to="/"><img src={collapseIcon}/></Link>
            </p> 
        </div> 
        <div className={styles.taskBoard}>
            <div className={styles.task}></div>
        </div>
    </div>
  )
}

export default Todo
