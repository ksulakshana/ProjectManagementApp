import React from 'react'
import styles from './NewTask.module.css';
import { useState , useEffect, useRef } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {getAllUsers} from '../../services/auth';
import {createPost} from '../../services/task';
import { useNavigate } from 'react-router-dom';

function NewTask({openModal,closeModal}) {

    const navigate = useNavigate();
    let modalRef = useRef();

    const [inputList, setInputList] = useState([]);
    const [date, setDate] = useState(new Date());
    const weekend = (date) => new Date() < date;

    const [checkKey,setCheckKey] = useState(0);

    const [checkedCount,setCheckedCount] = useState(0);
    const [totalCount,setTotalCount] = useState(0);
    const [array,setArray] = useState([]);

    const [value,setValue] = useState('');
    const [data,setData] = useState([]);

    useEffect(() => {
        document.addEventListener('mousedown',checkClickOutside);
      });

    const [formData, setFormData] = useState({
        title: "",
        priority: "HIGH PRIORITY",
        assignTo:"",
        assignToName:"",
        checklistData:[],
        duedate:"",
        status:"TO-DO"
    });

    const [error, setError] = useState({
        title: false,
        priority: false,
        checklistData:false
      });      

      const checkValue = async (e) => {

        let inputName = "checklistInput"+e.target.name.at(-1);
        let elements = document.getElementsByName(inputName);

        if(e.target.checked){
            setCheckedCount((prev) => prev + 1);

         setArray((prevArray) => {
            const newArray = [...prevArray, elements[0].value];
            setFormData({ ...formData, checklistData: newArray })
            return newArray;
          });

        }else{
            setCheckedCount((prev) => prev - 1);
        // setFormData(formData['checklistData'].filter(value => value !== elements[0].value))
        }
    }

      const onChange = async (event) => {
        setValue(event.target.value);
        getAllUsers().then(res => {
           console.log(res.data.userdata);
           const response = res.data.userdata;
           setData(response);
        }).catch(e =>{
            alert("something happened")
        });
    }

    const Input = () => {
        let name = "checklistInput"+checkKey;
        let checkboxName = "checkbox"+checkKey;
        return <li name='checklist'>
                <input type="checkbox" htmlFor={name} name={checkboxName} className={styles.check}  onClick={checkValue} />
                <input id={checkKey} type="text" name={name}   placeholder="Task to be done1" className={styles.checklistInput} 
                />
        </li>  
                    
    }
    const setDueDate = (date) => {
        date =  date.toLocaleString("en-US", { day : '2-digit' ,  month: "short", year:"numeric"})

        console.log(date);
        setDate(date)
        setFormData({ ...formData, duedate: date })
    }
    const errorMessages = {
        title: {
            message: "Title is required",
            isValid: formData.title.length > 0,
            onError: () => {
                setError((error) => ({ ...error, title: true }))
            }
        },
        priority: {
            message: "Priority is required",
            isValid: formData.priority,
            onError: () => {
                setError((error) => ({ ...error, priority: true }))
            }
        },
        checklistData: {
            message: "checklist is required",
            isValid: checkedCount > 0,
            onError: () => {
                setError((error) => ({ ...error, checklistData: true }))
            }
        }
        
      }

    const saveNewTask = async (e) =>{
        let isError = false;
        e.preventDefault();
        console.log(formData)
        Object.keys(errorMessages).forEach(key => {
            if (!errorMessages[key].isValid) {
                isError = true;
                errorMessages[key].onError();
            }

        });

        if (!isError) {
            try {
                const res = await createPost(formData);
                console.log(res)
                if (res.status === 200) {
                    alert("Task Created Successfully");
                    navigate("/dashboard");
                }
                else {
                    alert("Something went wrong");
                }
            }
            catch (e) {
                if (e.response.status === 400) {
                    alert("Invalid Data");
                }
                if (e.response.status === 401) {
                    alert("Please Login/Register to Create a task");
                }
            }
        }
    }

    function checkClickOutside(e){

        if({openModal} && modalRef.current && !modalRef.current.contains(e.target)){
            closeModal(false);
        }
    }
    
    const createNew = () => {
        setTotalCount(inputList.length+1);
        setInputList(inputList.concat(<Input key={inputList.length} />));
        setCheckKey(inputList.length+1);
    }

  return (
    <div className={styles.container} >
        <form className={styles.modalContainer} ref={modalRef} method="POST">
        <div className={styles.tasktitle}>
            <label>Title <span>*</span></label>
            <input 
                type='text' 
                name='title' 
                placeholder='Enter Task Title' 
                value={formData.title} 
                onChange={(e) => {
                    setFormData(
                        { ...formData, title: e.target.value })
                  }}
            />
            {error['title'] ? <p className={styles.errorMessage}>{errorMessages['title'].message}</p> : null}

        </div>
        <div className={styles.priority}>
            <p>Select Priority <span>*</span></p> 
            <select name='priority' size="3" value={formData.priority} onChange={(e) => {
                    setFormData(
                        { ...formData, priority: e.target.value })
                  }}>
                <option value="HIGH PRIORITY" > 🔴 HIGH PRIORITY</option>
                <option value="MODERATE PRIORITY"> 🔵 MODERATE PRIORITY</option>
                <option value="LOW PRIORITY">🟢 LOW PRIORITY</option>
            </select>
            {error['priority'] ? <p className={styles.errorMessage}>{errorMessages['priority'].message}</p> : null}

        </div>

        <div className={styles.search}>
            <div className={styles.searchInput}>
                <label>Assign to</label>
                <input type='text' name='assignTo' value={value} placeholder='Add a assignee' onChange={onChange} />
            </div>
            <div className={styles.dropdownContent}>
                {
                    value &&
                    data.filter(item => item.email.startsWith(value) && item.email !== value)
                    .slice(0,5)
                    .map(item => <div key={item._id} onClick={(e) => {setValue(item.email);setFormData(
                        { ...formData, assignTo: item._id });
                        setFormData(
                            { ...formData, assignToName: item.name })} }>
                        {item.email} <br/>
                    </div>)
                }
            </div>
            {error['assignTo'] ? <p className={styles.errorMessage}>{errorMessages['assignTo'].message}</p> : null}

        </div>

        <div className={styles.checklistDiv}>
            <p className={styles.checklistHeading}>Checklist ({checkedCount}/{totalCount}) <span>*</span></p>
        </div>
        <div className={styles.addnewTask}>
        <ul name='checklistdata' className={styles.checklistData} required>
            {inputList}
        </ul>
        {error['checklistData'] ? <p className={styles.errorMessage}>{errorMessages['checklistData'].message}</p> : null}

        </div>
        <div className={styles.addnewTaskButton}>
           <button type='button' onClick={createNew}>+ Add New</button>
        </div>
        <div className={styles.lastDiv}>
            {/* <button type='button' className={styles.left}>Select Due Date</button> */}
            <DatePicker selected={date} filterDate={weekend} 
                type='button' 
                className={styles.left}
                onChange={(date) => setDueDate(date)}
                // onChange={(e) => setDueDate(e)}
                />
                {/* onChange={(date) => setDate(date)}   */}
         
            {/* <input type="date"/> */}
            
            <div className={styles.right}>
                <button type='button' onClick={() => closeModal(false)} className={styles.cancelButton}>Cancel</button>
                <button type='button' className={styles.submitButton} onClick={saveNewTask}>Save</button>
            </div>
        </div>
        <input id="hiddenArray" name="hiddenArray" type='hidden' value={array}/>
        </form>
    </div>
  )
}

export default NewTask
