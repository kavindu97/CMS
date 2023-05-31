import React, { Component } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

import { render } from "react-dom";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import './home.css';
export default class TextEditor extends Component {
  state = {
    editorState: EditorState.createEmpty(),
  };

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });

    
  };

  render() {
    async function save(event) {
      event.preventDefault();
      try {
        await axios.post("http://localhost:8080/university/admin/news/save", {
       description: draftToHtml(convertToRaw(editorState.getCurrentContent())),
        
          }).then((res) =>
          {
           console.log(res.data);
          
           if (res.data.code== 404)
           {
             alert("Data not inserted");
           }
           else if(res.data.code == 200)
           {
              
            alert("Data inserted");
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
    
    const { editorState } = this.state;
    console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
    function uploadImageCallBack(file) {
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "localhost:8080/university/admin/news/save");
        xhr.setRequestHeader("Authorization", "Client-ID ##clientid###");
        const data = new FormData();
        data.append("image", file);
        xhr.send(data);
        xhr.addEventListener("load", () => {
          const response = JSON.parse(xhr.responseText);
          console.log(response);
          resolve(response);
        });
        xhr.addEventListener("error", () => {
          const error = JSON.parse(xhr.responseText);
          console.log(error);
          reject(error);
        });
      });
    }
    
    return (
      <div>
        <Editor
          editorState={editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={this.onEditorStateChange}
          toolbar={{
           
            image: {
              uploadCallback: uploadImageCallBack,
              alt: { present: true, mandatory: true },
            },
          }}
          
        />
        <textarea
          disabled
          value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
        ></textarea>
 <button type="submit" class="btn btn-primary" onClick={save} >submit</button>
        
      </div>
       
      
    );
  }
}