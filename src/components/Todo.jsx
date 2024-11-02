import React ,{useState,useEffect} from 'react'
import styles from './Todo.module.css';
import { Link } from 'react-router-dom';
import addNewTask from '../assets/boardIcons/addNewTask.png';
import collapseIcon from '../assets/boardIcons/collapse.png';
import green from '../assets/priority/green.png';
import blue from '../assets/priority/blue.png';
import red from '../assets/priority/red.png';
import moreActionsDot from '../assets/priority/moreActionsDot.png';
import ArrowDown2 from '../assets/boardIcons/ArrowDown2.png';
import {getUserData} from '../services/auth';
import {getAllTasks} from '../services/task';
import {NewTask} from '../pages/index';

function Todo() {

  const [tasks,setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isChecked, setIsChecked] = useState(false)
  const [isCheckedCount,setIsCheckedCount] = useState(0);
  const [openModal,setOpenModal] = useState(false);

  useEffect(() => {

    getAllTasks().then(res => {
      console.log("inside gettask")
         console.log(res.data)
         setTasks(res.data);
         setIsLoading(false);            
    })

  }, [])

  const handleModalOpen = () =>{
    setOpenModal(true);
  }
  const handleModalClose = () =>{
      setOpenModal(false);
  }

  const checkHandler = (e) => {
    setIsChecked(!isChecked) ;

    if(!isChecked){

      let id = e.target.id;
      alert(id);
      let name = id.substring(0, id.length - 2)+"_checkbox";
      alert(name)

      var checkboxes = document.getElementsByName(name);
      console.log(checkboxes)
      var x = 0;
      for(var i = 0 ; i<checkboxes.length; i++)
      {
        if(checkboxes[i].checked==0)
        {
          // checkboxes.splice(i,1);
          alert(i)
        }
      }
      alert("Number of checked checkboxes: "+checkboxes.length);


      setIsCheckedCount((prev) => prev + 1);
      localStorage.setItem(e.target.id,e.target.value);
      document.getElementById
      }else{
        
        setIsCheckedCount((prev) => prev - 1);
        localStorage.removeItem(e.target.id);  
      }
  }

  return (
    <div className={styles.container}>
        <div className={styles.todoHeading}> 
            <p>To Do</p>
            <p className={styles.actionButton}>
                <Link onClick={handleModalOpen}><img src={addNewTask}/></Link>
                <Link to="/"><img src={collapseIcon}/></Link>
            </p> 
        </div> 
        <div className={styles.taskBoard}>

        {isLoading ? <p>Loading...</p> : tasks.map((task, idx) => 

            (task.status === "TO-DO") 
            ?
              <div key={idx} className={styles.showFulltask}>
                  <ul className={styles.firstLine}>
                  {
                    (task.priority === 'HIGH PRIORITY')
                      ? <li><img src={red} alt='low priority'/></li>
                      : (task.priority === 'MODERATE PRIORITY') ? <li><img src={blue} alt='low priority'/></li> : <li><img src={green} alt='low priority'/></li>
                  }
                    
                    <li className={styles.priorityText}>{task.priority}</li>

                    <li className={styles.assignedTo}>{task.assignToName}</li>
                    <li className={styles.right}><Link to="/"><img src={moreActionsDot}/></Link></li>
                  </ul>
                  <p className={styles.title}>{task.title}</p>
                  <div className={styles.checklist}>
                    <ul className={styles.checklistHeading}>
                      <li className={styles.checklistCount}>Checklist ({isCheckedCount}/{task.checklists.length})</li>
                      <li className={styles.arrow}><Link to="#"><img src={ArrowDown2}/></Link></li>
                    </ul>
                      <ul className={styles.checklistData} key="checkboxdatakey">
                      {task.checklists.map((checkboxData,id) => 
                          <li>
                            <label htmlFor="checkbox">
                              {localStorage.getItem(task._id+'_'+id) !== null ? 
                              <input id={task._id+'_'+id} type="checkbox" 
                                      name={task._id+"_checkbox"}
                                      className={styles.check}
                                      checked
                                      onChange={checkHandler}
                                      value={checkboxData}
                              /> :
                              <input id={task._id+'_'+id} type="checkbox" 
                              name="checkbox"
                              className={styles.check}
                              checked={isChecked}
                              onChange={checkHandler}
                              value={checkboxData}
                      /> 

                      }
                              <span id={id}>{checkboxData}</span>
                            </label>
                          </li>
                      )}     

                      </ul>
                  </div>
                  <div className={styles.taskStatus}>
                  
                    <div className={styles.date}>
                    {(task.dueDate !== null) ? 
                        <span>{new Date(task.dueDate).toLocaleString("en-us",{ day: '2-digit', month: 'short'})}</span>
                          : ''
                      }                
                    </div> 
                    <div className={styles.selectStatus}>
                        <span>BACKLOG</span>
                        <span>PROGRESS</span>
                        <span>DONE</span>
                    </div>
                  </div>
              </div>
            : ''

        )}
          
        </div>
        {openModal && <NewTask closeModal={setOpenModal}/>}
    </div>
  )
}

export default Todo
