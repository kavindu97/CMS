import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from "axios";


import './home.css';

export default function Home(props) {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");

  const [value, setValue] = useState('');
  const [fileUpload, setFileUpload] = useState('');

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
  

  async function save(event) {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/university/admin/news/save", {
        title: title,
        content: value,
        thumbnail: fileUpload

      });
      console.log(response.data);
      console.log(value);
      console.log(fileUpload);
      if (response.data.code === 404) {
        alert("Data not inserted");
      } else if (response.data.code === 200) {
        alert("Data inserted");
        navigate('/render');
      } else {
        alert("data not inserteed error");
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


        <button type="submit" className="btn btn-primary" onClick={save} style={{ marginRight: '10px' }}> Submit
        </button>
       

      </div>
    </div>
  );
}
