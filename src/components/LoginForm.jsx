import React from 'react';
import styles from './LoginForm.module.css';
import passwordview from '../assets/pwd_view.png';
import passwordhide from '../assets/pwd_hide.png';
import { useState } from 'react';
import {login} from '../services/auth';
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
      email: "",
      password: "",
  });

  const [error, setError] = useState({
    email: false,
    password: false,
  });

  const errorMessages = {
    email: {
        message: "Email is required",
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
    }
    
  }

  const [password, setPassword] = useState("");
  const [type, setType] = useState('password');
  const [icon, setIcon] = useState(passwordhide);

  const handleToggle = () => {
    if (type==='password'){
       setIcon(passwordview);
       setType('text')
    } else {
       setIcon(passwordhide)
       setType('password')
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
        try {
            const res = await login(formData);
            if (res.status === 200) {
                alert("Logged in successfully");
                const token = res.data.token;
                localStorage.setItem("token", token);
                navigate("/dashboard");
            }

            else {
                alert("Something went wrong");
            }
        }
        catch (e) {
            if (e.response.status === 400) {
                alert("Invalid email or password");
            }
        }
    }
  }
  return (
    <div>
        <form method='POST' className={styles.form} onSubmit={onSubmit}>
          <input
             type="text"
             name='email'
             placeholder='Email'
             value={formData.email}
             onChange= {(e) => {
              setFormData({ ...formData, email: e.target.value })
            }}
            />
            {error['email'] ? <p>{errorMessages['email'].message}</p> : null}

            <input
                  type={type}
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {setPassword(e.target.value);setFormData({ ...formData, password: e.target.value })}}
             />
             <span className={styles.showHide} onClick={handleToggle}>
                 <img src={icon} />
              </span>
              {error['password'] ? <p>{errorMessages['password'].message}</p> : null}

            <button type='submit' className={styles.submitButton} onSubmit={onSubmit}>Log in</button>
        </form>
    </div>
  )
}

export default LoginForm
