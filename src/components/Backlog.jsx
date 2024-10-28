import React from 'react'
import styles from './Backlog.module.css';
import { Link } from 'react-router-dom';
import collapseIcon from '../assets/boardIcons/collapse.png';
import green from '../assets/priority/green.png';
import blue from '../assets/priority/blue.png';
import red from '../assets/priority/red.png';
import moreActionsDot from '../assets/priority/moreActionsDot.png';
import ArrowDown2 from '../assets/boardIcons/ArrowDown2.png';

function Backlog() {
  return (
    <div className={styles.container}>
        <div className={styles.backlogHeading}>
            <p>Backlog</p>
            <p><Link to="/"><img src={collapseIcon}/></Link></p> 
        </div> 
        <div className={styles.taskBoard}>
            <div className={styles.showFulltask}>
                <ul className={styles.firstLine}>
                  <li><img src={green} alt='low priority'/></li>
                  <li className={styles.priorityText}>LOW PRIORITY</li>
                  <li className={styles.assignedTo}>AK</li>
                  <li className={styles.right}><Link to="/"><img src={moreActionsDot}/></Link></li>
                </ul>
                <p className={styles.title}>Hero section</p>
                <div className={styles.checklist}>
                  <ul className={styles.checklistHeading}>
                    <li className={styles.checklistCount}>Checklist (0/3)</li>
                    <li className={styles.arrow}><Link to="#"><img src={ArrowDown2}/></Link></li>
                  </ul>
                  {/* <div className={styles.checklistData}> */}
                    <ul className={styles.checklistData}>
                        <li>
                          <label htmlFor="checkbox1">
                            <input type="checkbox" name="checkbox1" className={styles.check}/>
                            <span>Task to be done1</span>
                          </label>
                        </li>  
                        <li>
                          <label htmlFor="checkbox2">
                            <input type="checkbox" name="checkbox2" className={styles.check}/>
                            <span>Task to be done2</span>
                          </label>
                        </li>  
                        {/* <li>
                          <label className={styles.checkboxContainer}>One
                            <input type="checkbox"  />
                            <span className={styles.checkmark}></span>
                          </label>
                        </li> */}
                    </ul>
                  {/* </div> */}
                </div>
                <div className={styles.taskStatus}>
                  <div className={styles.date}>
                      <span>Feb 10th</span>
                  </div>
                  <div className={styles.selectStatus}>
                      <span>PROGRESS</span>
                      <span>TO-DO</span>
                      <span>DONE</span>
                  </div>
                </div>
            </div>

            <div className={styles.showFulltask}>
                <ul className={styles.firstLine}>
                  <li><img src={green} alt='low priority'/></li>
                  <li className={styles.priorityText}>LOW PRIORITY</li>
                  <li className={styles.assignedTo}>AK</li>
                  <li className={styles.right}><Link to="/"><img src={moreActionsDot}/></Link></li>
                </ul>
                <p className={styles.title}>Hero section</p>
                <div className={styles.checklist}>
                  <ul className={styles.checklistHeading}>
                    <li className={styles.checklistCount}>Checklist (0/3)</li>
                    <li className={styles.arrow}><Link to="#"><img src={ArrowDown2}/></Link></li>
                  </ul>
                    <ul className={styles.checklistData}>
                        <li>
                          <label htmlFor="checkbox1">
                            <input type="checkbox" name="checkbox1" className={styles.check}/>
                            <span>Task to be done1</span>
                          </label>
                        </li>  
                        <li>
                          <label htmlFor="checkbox2">
                            <input type="checkbox" name="checkbox2" className={styles.check}/>
                            <span>Task to be done2</span>
                          </label>
                        </li>  
                    </ul>
                </div>
                <div className={styles.taskStatus}>
                  <div className={styles.date}>
                      <span>Feb 10th</span>
                  </div>
                  <div className={styles.selectStatus}>
                      <span>PROGRESS</span>
                      <span>TO-DO</span>
                      <span>DONE</span>
                  </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Backlog
