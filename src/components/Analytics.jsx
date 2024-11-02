import React, {useState,useEffect} from 'react'
import styles from './Analytics.module.css'
import {getAllTasks} from '../services/task';

function Analytics() {
  const [backlogtasks,setBacklogtasks] = useState(0);
  const [todotasks,setTodotasks] = useState(0);
  const [progresstasks,setProgresstasks] = useState(0);
  const [donetasks,setDonetasks] = useState(0);

  const [lowPrioritytasks,setlowPrioritytasks] = useState(0);
  const [moderatePrioritytasks,setModeratePrioritytasks] = useState(0);
  const [highPrioritytasks,setHighPrioritytasks] = useState(0);
  const [dueDatetasks,setDueDatetasks] = useState(0);

  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {

    let backtaskcount = 0;
    let todotaskcount = 0;
    let progresstaskcount = 0;
    let donetaskcount = 0;

    let lowcount = 0;
    let moderatecount = 0;
    let highcount = 0;
    let duedatecount = 0;

    getAllTasks().then(res => {
         
         for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].status == 'BACKLOG') {
            backtaskcount++;
            setBacklogtasks(backtaskcount);
          }
          else if (res.data[i].status == 'TO-DO') {
            todotaskcount++;
            setTodotasks(todotaskcount);
          }
          else if (res.data[i].status == 'PROGRESS') {
            progresstaskcount++;
            setProgresstasks(progresstaskcount);
          }
          else if(res.data[i].status == 'DONE') {
            donetaskcount++;
            setDonetasks(donetaskcount);
          }

          if (res.data[i].priority == 'LOW PRIORITY') {
            lowcount++;
            setlowPrioritytasks(lowcount);
          }
          else if (res.data[i].priority == 'MODERATE PRIORITY') {
            moderatecount++;
            setModeratePrioritytasks(moderatecount);
          }
          else if (res.data[i].priority == 'HIGH PRIORITY') {
            highcount++;
            setHighPrioritytasks(highcount);
          }
          
          if (res.data[i].dueDate !== null) {
            duedatecount++;
            setDueDatetasks(duedatecount);
          }


        }
    })

  }, [])

  return (
    <div className={styles.container}>
      <h1>Analytics</h1>
      <div className={styles.tableContainers}>
          <div className={styles.leftReport}>
            <table>
              <tr className={styles.tableRow}>
                <td><span className={styles.dot}></span>&nbsp;Backlog Tasks</td>
                <td id='backlog' className={styles.taskCount}>{backlogtasks}</td>
              </tr>
              <tr className={styles.tableRow}>
                <td><span className={styles.dot}></span>&nbsp;To-do Tasks</td>
                <td id='todo' className={styles.taskCount}>{todotasks}</td>
              </tr>
              <tr className={styles.tableRow}>
                <td><span className={styles.dot}></span>&nbsp;In-Progress Tasks</td>
                <td id='progress' className={styles.taskCount}>{progresstasks}</td>
              </tr>
              <tr className={styles.tableRow}>
                <td><span className={styles.dot}></span>&nbsp;Completed Tasks</td>
                <td id='done' className={styles.taskCount}>{donetasks}</td>
              </tr>
            </table>
          </div>
          <div className={styles.rightReport}>
            <table>
              <tr className={styles.tableRow}>
                <td><span className={styles.dot}></span>&nbsp;Low Priority</td>
                <td className={styles.taskCount}>{lowPrioritytasks}</td>
              </tr>
              <tr className={styles.tableRow}>
                <td><span className={styles.dot}></span>&nbsp;Moderate Priority</td>
                <td className={styles.taskCount}>{moderatePrioritytasks}</td>
              </tr>
              <tr className={styles.tableRow}>
                <td><span className={styles.dot}></span>&nbsp;High Priority</td>
                <td className={styles.taskCount}>{highPrioritytasks}</td>
              </tr>
              <tr className={styles.tableRow}>
                <td><span className={styles.dot}></span>&nbsp;Due Date Tasks</td>
                <td className={styles.taskCount}>{dueDatetasks}</td>
              </tr>
            </table>
          </div>
      </div>
    </div>
  )
}

export default Analytics
