import React from 'react'
import styles from './NewTask.module.css';
import { useState , useEffect } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {getAllUsers} from '../../services/auth';

function NewTask() {

    const [inputList, setInputList] = useState([]);
    const [date, setDate] = useState(new Date());
    const weekend = (date) => new Date() < date;

    const [checkedItems,setCheckedItems] = useState();
    const [checkedItemsInput,setCheckedItemsInput] = useState();
    const [checkedCount,setCheckedCount] = useState(0);
    const [totalCount,setTotalCount] = useState(0);

    const [value,setValue] = useState('');
    const [data,setData] = useState([]);

    const [formData, setFormData] = useState({
        title: "",
        priority: "HIGH PRIORITY",
        assignTo:"",
        checklistData:[],
        duedate:"",
    });

    const [error, setError] = useState({
        title: false,
        priority: false,
        checklistData:false
      });

      const checkValue = (e) => {

        // if(e.target.checked){
        //     alert("checked");
        //     setCheckedCount(checkedCount + 1);
        // }else{
        //     alert("unchecked")
        //     if(checkedCount < 0)
        //         setCheckedCount(0);
        //     else
        //         setCheckedCount(checkedCount - 1);
        // }
        if(e.target.checked){
           setCheckedCount((prev) => prev + 1)
        }else{
            setCheckedCount((prev) => prev - 1)
        }
        }

      const updateCheckInput = (e) => {
        // setCheckedItemsInput(e.target.value);
        // setChecklistData(...checklistData,e.target.value);
        // {
        //             setFormData(
        //                 { ...formData, title: e.target.value })
        //           }}
      }

      const onChange = async (event) => {
        setValue(event.target.value);
        //const response = await getAllUsers();
        getAllUsers().then(res => {
           console.log(res.data.userdata);
           const response = res.data.userdata;
        //    var data = JSON.stringify(response);
        //    console.log(data);
           setData(response);
        }).catch(e =>{
            alert("something happened")
        });
    }

    const Input = () => {
        return <li name='checklist'>
                <input type="checkbox" name="checkbox" className={styles.check} value={checkedItemsInput} onClick={checkValue}/>
                <input type="text" name='checklistInput' value={checkedItemsInput} placeholder="Task to be done1" className={styles.checklistInput} onChange={(e) => {
                    setFormData(
                        { ...formData, checklistData: e.target.value })
                  }}
                />
        </li>  
                    
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
        console.log(formData);

        alert(checkedCount);
        // formData.checklistData 

        Object.keys(errorMessages).forEach(key => {
            if (!errorMessages[key].isValid) {
                isError = true;
                errorMessages[key].onError();
                alert(key)
            }
        });

        if (!isError) {
            try {
                const res = await saveNewPost(formData);
                if (res.status === 200) {
                    alert("Logged in successfully");
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
            }
        }
    }

    const createNew = () => {
        setTotalCount(inputList.length+1);
        setInputList(inputList.concat(<Input key={inputList.length} />));
    }

  return (
    <form className={styles.modalContainer} method="POST">
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
                <option value="HIGH PRIORITY" selected="selected"><span className={styles.red}>🔴</span> HIGH PRIORITY</option>
                <option value="MODERATE PRIORITY"><span className={styles.red}>🔵</span>MODERATE PRIORITY</option>
                <option value="LOW PRIORITY"><span className={styles.red}>🟢</span>LOW PRIORITY</option>
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
                        { ...formData, assignTo: item.email })} }>
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
            {/* <li>
                <input type="checkbox" name="checkbox" className={styles.check}/>
                <input type="text" placeholder="Task to be done1" className={styles.checklistInput}/>
            </li>   */}
            {/* <li name='checklist'>
                <input type="checkbox" name="checkbox" className={styles.check} value={checkedItemsInput} onClick={checkValue}/>
                <input type="text" name="checkedItemsInput" value={checkedItemsInput} placeholder="Task to be done1" className={styles.checklistInput}/>
            </li>   */}
            
            {inputList}
        </ul>
        {error['checklistData'] ? <p className={styles.errorMessage}>{errorMessages['checklistData'].message}</p> : null}

        </div>
        <div className={styles.addnewTaskButton}>
           <button type='button' onClick={createNew}>+ Add New</button>
        </div>
        <div className={styles.lastDiv}>
            {/* <button type='button' className={styles.left}>Select Due Date</button> */}
            <DatePicker selected={date} filterDate={weekend} onChange={(date) => setDate(date)}  type='button' className={styles.left}/>
            {/* <input type="date"/> */}
            
            <div className={styles.right}>
                <button type='button' className={styles.cancelButton}>Cancel</button>
                <button type='button' className={styles.submitButton} onClick={saveNewTask}>Save</button>
            </div>
        </div>
    </form>
  )
}

export default NewTask
