import React, { useState,useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from "axios";
import { useParams } from 'react-router-dom';

import './home.css';

export default function Update(props) {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");

  const [value, setValue] = useState('');
  const [fileUpload, setFileUpload] = useState('');
  const { id: idUpdate } = useParams();
  const modules = {
    toolbar: [[{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { 'align': [] },
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },

    ],
    [{ 'color': [] }, { 'background': [] }],
    ["link", "image"]
    ]
  }

  const [data, setData] = useState([]);

 useEffect(() => {
  axios.get(`http://localhost:8080/university/admin/news/getbyid/${idUpdate}`)
    .then(res => {
      setData(res.data);
      
    })
    .catch(err => {
      console.error(err);
    });
}, [idUpdate, setData]);

useEffect(() => {
  console.log(data);
  console.log(title);
}, [data, title]);
  async function update(event) {
    event.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8080/university/admin/news/update`, {
        id: idUpdate,
        title: title,
        content: value,
        thumbnail: fileUpload
      });
      console.log(response.data);
      
      if (response.data.code === 404) {
        alert("Data not found");
      } else if (response.data.code === 200) {
        alert("Data updated");
        navigate("/render");
      } else {
        alert("Error updating data");
      }
    } catch (err) {
      alert(err);
    }
  }

  



  return (
    <div >
      <div>
        <h1>News</h1>

        <div className="col-xs-1 text-center" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px', marginTop: '30px' }}>
          <input
            className="inputtitle"
            type="text"
            name="title"
            id="title"
            placeholder="Input title"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
        </div>


        <div className="col-xs-1 text-center" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '40px' }}>
          <ReactQuill
            theme="snow"
            style={{
              height: '50vh',
              width: '80%',

            }}
            value={value}
            modules={modules}
            onChange={setValue} />

        </div>
        <div className="col-xs-1 text-center" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
          <div className="mb-3">

            <input
              className="form-control w-5"
              type="file"
              id="formFile"
              onChange={(event) => {
                const file = event.target.files[0];
                const reader = new FileReader();
                reader.onload = () => {
                  const base64Data = reader.result;

                  setFileUpload(base64Data);
                };
                reader.readAsDataURL(file);
              }}
            />
          </div>
        </div>
      </div>

      <div>


       
        <button type="submit" className="btn btn-primary" onClick={update} > Update</button>

      </div>
    </div>
  );
}
