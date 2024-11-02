import React from 'react'
import styles from './Form.module.css';
import {register} from '../services/auth';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';

function Form() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
});
  const [error, setError] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const errorMessages = {
    name: {
        message: "Name is required",
        isValid: formData.name.length > 0,
        onError: () => {
            setError((error) => ({ ...error, name: true }))
        }
    },
    email: {
        message: "Email is required or User Exists",
        isValid: formData.email.length > 0,
        onError: () => {
            setError((error) => ({ ...error, email: true }))
        }
    },
    password: {
        message: "Password is required",
        isValid: formData.password.length > 0,
        onError: () => {
            setError((error) => ({ ...error, password: true }))
        }
    },
    confirmPassword: {
        message: "Passwords do not match",
        isValid: formData.confirmPassword === formData.password,
        onError: () => {
            setError((error) => ({ ...error, confirmPassword: true }))
        }
    }
  }

  const onSubmit = async (e) => {
      let isError = false;
      e.preventDefault();
      Object.keys(errorMessages).forEach(key => {
          if (!errorMessages[key].isValid) {
              isError = true;
              errorMessages[key].onError();
          }
      });
      if (!isError) {
          const res = await register(formData);
          
          if (res.status === 201) {
              alert("Registered successfully");
              navigate("/login");
          }
          else if(res === 400){
              alert("User Exists");
              errorMessages['email'].onError();
          }
          else {
              alert(res.data.message);
          }
      }
  }

  return (
    <div>
        <form method='POST' className={styles.form} onSubmit={onSubmit}>
            <input 
              type="text" 
              name='name'
              placeholder='Name' 
              value={formData.name}
              onChange= {(e) => {
                setFormData({ ...formData, name: e.target.value })
              }}
            />
            {error['name'] ? <p className={styles.errorMessage}>{errorMessages['name'].message}</p> : null}
            <input
             type="text"
             name='email'
             placeholder='Email'
             value={formData.email}
             onChange= {(e) => {
              setFormData({ ...formData, email: e.target.value })
            }}
            />
            {error['email'] ? <p className={styles.errorMessage}>{errorMessages['email'].message}</p> : null}
            <input
             type="password"
             name='password'
             value={formData.pPassword} 
             placeholder='Password'
             onChange= {(e) => {
              setFormData({ ...formData, password: e.target.value })
            }}
            />
            {error['password'] ? <p className={styles.errorMessage}>{errorMessages['password'].message}</p> : null}
            <input 
              type="password"
              name='confirmPassword'
              value={formData.confirmPassword}
              placeholder='Confirm Password'
              onChange= {(e) => {
                setFormData({ ...formData, confirmPassword: e.target.value })
              }}
            />
            {error['confirmPassword'] ? <p className={styles.errorMessage}>{errorMessages['confirmPassword'].message}</p> : null}

            <button type='submit' className={styles.submitButton} onSubmit={onSubmit}>Register</button>
        </form>
    </div>
  )
}

export default Form
