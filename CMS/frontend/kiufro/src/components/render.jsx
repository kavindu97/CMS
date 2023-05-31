
import React, { useState, useEffect } from 'react';
import axios from "axios";
import './login.css';
import './render.css';
import { Link } from 'react-router-dom';
 
 
export default function Render() {
    const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/university/admin/news/all')
      .then(res => {
        setData(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);
  if (!data || !data.data || data.data.length === 0) {
    return <div>Loading...</div>;
  }
    return(
   
        <div>
        <h1>Hello</h1>
        <br />
        <br />
        <div className='posts'>
          {data.data.map(item => (
            <Link key={item.id} to={`/update/${item.id}`} className='mlink'>
              <div>

       <div className='header'>   <div className='thumbnail'> <img src={item.thumbnail} alt="My Image" style={{  width: '60px',
    height: '60px',borderRadius:'60px'}}/>
              </div>
  
              <div className='title'>{item.title}</div></div>
              <br />
              <div  className='preview' dangerouslySetInnerHTML={{__html: item.content}}></div>

            </div>
            </Link>
          ))}
        </div>
      </div>


    );
}
