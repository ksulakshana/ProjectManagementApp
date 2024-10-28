import React from 'react'
import styles from './Dashboard.module.css';
import Board from '../../components/Board';
import profile from '../../assets/leftContainerIcons/codesandbox.png';
import database from '../../assets/leftContainerIcons/database.png';
import layout from '../../assets/leftContainerIcons/layout.png';
import settings from '../../assets/leftContainerIcons/settings.png';
import logout from '../../assets/leftContainerIcons/Logout.png';

function index() {
  return (
    <div className={styles.container}>
        <div className={styles.leftContainer}>
            <div className={styles.upperSection}>
                <p className={profile}><img src={profile} /><span>Pro Manage</span></p>
            </div>
            <div className={styles.midUpperSection}>
                <p className={layout}><img src={layout}/><span>Board</span></p>
                <p className={database}><img src={database}/><span>Analytics</span></p>
                <p className={settings}><img src={settings}/><span>Settings</span></p>
            </div>
            <div className={styles.lowerSection}>
                <p className={logout}><img src={logout}/><span>Log out</span></p>
            </div>
        </div>
        <div className={styles.rightContainer}>
            <Board />
        </div>
    </div>
  )
}

export default index
