import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import axios from "axios";
import './login.css';
 
 
function Login() {
  
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
 
 
    async function login(event) {
        event.preventDefault();
        try {
          await axios.post("http://localhost:8080/university/admin/login", {
            email: email,
            password: password,
            }).then((res) =>
            {
             console.log(res.data);
            
             if (res.data.code=== 404)
             {
               alert("Email not exits");
             }
             else if(res.data.code === 200)
             {
                
                navigate('/home');
             }
              else
             {
                alert("Incorrect Email and Password not match");
             }
          }, fail => {
           console.error(fail); // Error!
  });
        }
 
         catch (err) {
          alert(err);
        }
      
      }
  
  
  
  
  
  
    return (
       <div>
            <div class="container">
          
 
             <div class="row">
             <div class="col-sm-6">
            <form>
        <div class="form-group">
         
          <input type="email"  class="form-control" id="email" placeholder="Enter admin email"
          
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          
          />
 
        </div>
 
        <div class="form-group">
           
            <input type="password"  class="form-control" id="password" placeholder="Enter password"
            
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            
            />
          </div>
                  <button type="submit" class="btn btn-primary" onClick={login} >Login</button>
              </form>
 
            </div>
            </div>
            </div>
 
     </div>
    );
  }
  
  export default Login;