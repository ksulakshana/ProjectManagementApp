import React from 'react'
import styles from './Board.module.css';
import { Link } from 'react-router-dom';
import Backlog from './Backlog';
import Todo from './Todo';
import InProgress from './Inprogress';
import Done from './Done';
import addPeopleImage from '../assets/boardIcons/addPeopleImg.png';
import downarrow from '../assets/boardIcons/downarrow.png';
import {getUserData} from '../services/auth';
import { useState , useEffect } from 'react';

function Board() {

  const [userName,setUserName] = useState('');
  
  useEffect(() => {

    getUserData().then(res => {
         setUserName(res.data.userdata.name);
    })

  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <p>
          <span className={styles.name}>Welcome! {userName}</span>
          <span className={styles.date}>
            {new Date().toLocaleString("en-US", { day : '2-digit'})}th&nbsp;{new Date().toLocaleString("en-US", { month: "short" })},&nbsp;{new Date().getFullYear()}
            {/* 12th Jan, 2024 */}
            </span>
        </p> 
      </div>
      <div className={styles.heading2}>
        <div className={styles.leftHeading2}>
          <p>Board <Link to="/"><img src={addPeopleImage}/> <span>Add People</span></Link></p>          
        </div>
        <div className={styles.rightHeading2}>
          <select defaultValue={'DEFAULT'} className={styles.filter}>
              <option>Today</option>
              <option value="DEFAULT">This week</option>
              <option>This Month</option>
          </select>
          {/* </div> */}
        </div>
      </div>

      <div className={styles.boardContainer}>

        <div className={styles.backlog}>
          <Backlog />
        </div>

        <div className={styles.todo}> 
          <Todo />
        </div>

        <div className={styles.inprogress}> 
          <InProgress />
        </div>

        <div className={styles.done}>
          <Done />
        </div>

      </div>
    </div>
  )
}

export default Board
