import React, { useState , useEffect} from 'react'
import styles from './Dashboard.module.css';
import Board from '../../components/Board';
import Analytics from '../../components/Analytics'
import Settings from '../../components/Settings'
import profile from '../../assets/leftContainerIcons/codesandbox.png';
import database from '../../assets/leftContainerIcons/database.png';
import layout from '../../assets/leftContainerIcons/layout.png';
import settings from '../../assets/leftContainerIcons/settings.png';
import logout from '../../assets/leftContainerIcons/Logout.png';
import { Link } from 'react-router-dom';
import {getUserData} from '../../services/auth';
import { useNavigate } from 'react-router-dom';

function index() {

    const [rightContainer , setRightContainer] = useState('board');
    const navigate = useNavigate();

    useEffect(() => {
        getUserData().then(res => {
            if(!res.data)
            {
                alert("please login to visit the dashboard page")
                navigate('/login');
            }
        })
      }, [])

    const rightDisplay = (e) => {
        setRightContainer(e.target.id);
    }
    
    const logoutAction = () => {
        alert("logout")
        localStorage.removeItem("token");
        navigate("/login");
    }
  return (
    <div className={styles.container}>
        <div className={styles.leftContainer}>
            <div className={styles.upperSection}>
                <p className={styles.profile}><img src={profile} /><span>Pro Manage</span></p>
            </div>
            <div className={styles.midUpperSection}>
                {rightContainer === 'board'}
                <p  className={styles.layout}><img src={layout}/><Link id="board" onClick={rightDisplay}>Board</Link></p>
                <p styles='color:#707070' className={styles.database}><img src={database}/><Link id="analytics" onClick={rightDisplay}>Analytics</Link></p>
                <p styles='color:#707070' className={styles.settings}><img src={settings}/><Link id="settings" onClick={rightDisplay}>Settings</Link></p>
            </div>
            <div className={styles.lowerSection}>
                <p className={styles.logout} onClick={logoutAction}><img src={logout}/><span>Log out</span></p>
            </div>
        </div>
        <div className={styles.rightContainer}>
            {rightContainer === 'board' ? <Board /> : rightContainer === 'analytics' ? <Analytics/> : <Settings />}
        </div>
    </div>
  )
}

export default index
