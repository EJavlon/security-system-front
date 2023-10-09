import "../../css/login_and_signup/LoginAndSignUp.css";

import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

import MyService from "../MyService";

import { Button } from "@mui/material";
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import Password from "./Password";
import Loading2 from "../Loading2";


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function LoginAndSignUp() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  // Snackbar items
  const [message,setMessage] = useState("");
  const [success,setSuccess] = useState(false);
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const showMessage = (message,success)=>{
    setMessage(message);
    setSuccess(success);
    setOpen(true);
  }
  

  const loginOrSingUpBtnClick = async ()=>{      
    const vars = document.querySelectorAll("input");    

    if(vars[0].value !== "" && vars[1].value !== ""){
      setLoading(true);
      console.log('vars[0] = ' + vars[0].value);
      console.log('vars[1] = ' + vars[1].value);
      try{
        const response = await fetch(MyService.hostName + '/api/v1/auth/signin', {
          method: 'POST',
          mode : 'cors',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              "username": vars[0].value,
              "password": vars[1].value 
            })
          });
  
        if(response.status === 200){          
          const result = await response.json();        
          localStorage.setItem("jwt","Bearer " + result.data);
          localStorage.setItem("adminPage",true);
          showMessage("Admin sahifaga yo'naltirilmoqdasiz!",true);

          setTimeout(() => {
            navigate("/admin");
          }, 1500);
        }else{          
          console.log('res = ' + JSON.stringify(response,null,2));
          showMessage("Parol yoki login xato",false);
        }
      }catch(e){        
        localStorage.setItem("adminPage",false);
        showMessage("Xatolik yuz berdi",false);
      }finally{    
        setLoading(false);    
      }
    }else{
      showMessage("Maydonlar to'ldirilmagan!",false);
    }
  }

  
  useEffect(()=>{
    document.title = "Login Page"
    setLoading(true);
    const token = localStorage.getItem("jwt");
    if(token !== null && token !== "" && token.startsWith("Bearer ")){
      async function checkToken (){
        try{
          const response = await fetch(MyService.hostName + '/api/v1/auth/expiredToken', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization' : token
            }
          });
  
          const result = await response.json();
          const data = result.data;
                      
          if(response.status === 200 && data !== true){
            localStorage.setItem("adminPage",true);
            setLoading(false);
            showMessage("Admin sahifaga yo'naltirilmoqdasiz!",true);
            setTimeout(() => {
              navigate("/admin");
            }, 1500);
          }
        }catch(e){
          console.log('error:' + e);          
          localStorage.setItem("adminPage",false);
          showMessage("Token muddati o'tgan ",false);
        }finally{          
          setLoading(false);     
        }                      
      }
      checkToken();   

    } else{
      setLoading(false);
      showMessage("Token topilmadi!",false);      
    }      
  },[])

  
  return (
    <section id="signin-section" className="signin-section">
      <div className="container">
        <div className="signin-form">
          <div className="flex">
           <h4 className="title">Login</h4>
           <TextField className="form-input" id="outlined-basic" label="Username" variant="outlined" />
           <Password className="form-input"/>
                      
           {
            loading ? <Loading2/> : 
            <Link className="loginOrSingUpBtn" to="#" onClick={loginOrSingUpBtnClick} > 
              <Button className="btn" variant="contained">Login</Button>
           </Link>  
           }             
           
          </div>
          
        </div>
      </div>
      <Stack spacing={2} sx={{ width: '100%' }}>       
        <Snackbar open={open} autoHideDuration={1500} onClose={handleClose}>
          <Alert onClose={handleClose} severity={success ? "success" : "error"} sx={{ width: '100%' }}>
            {message}
          </Alert>
        </Snackbar>        
      </Stack>   
    </section>
  )
}

export default LoginAndSignUp;
