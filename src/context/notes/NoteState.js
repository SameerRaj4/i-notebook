import React, { useState } from 'react';
import NoteContext from './NoteContext';

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesinitial = [
    {
      "_id": "65b3e8dbb72b9fcfd288bf8b",
      "user": "65b3e874b72b9fcfd288bf87",
      "title": "hello NKS",
      "tag": "i am fine thank u,and you",
      "description": "how are you,what did yo do",
      "date": "2024-01-26T17:13:58.827Z",
      "__v": 0
    },
    {
      "_id": "65b3e8e3b72b9fcfd288bf8d",
      "user": "65b3e874b72b9fcfd288bf87",
      "title": "hello NKS",
      "tag": "i am fine thank u,and you",
      "description": "how are you,what did yo do",
      "date": "2024-01-26T17:13:58.827Z",
      "__v": 0
    },
    {
      "_id": "65b3e8e3b72b9fcfd288bf8f",
      "user": "65b3e874b72b9fcfd288bf87",
      "title": "hello NKS",
      "tag": "i am fine thank u,and you",
      "description": "how are you,what did yo do",
      "date": "2024-01-26T17:13:58.827Z",
      "__v": 0
    },
    {
      "_id": "65b3e8e3b72b9fcfd288bf91",
      "user": "65b3e874b72b9fcfd288bf87",
      "title": "hello NKS",
      "tag": "i am fine thank u,and you",
      "description": "how are you,what did yo do",
      "date": "2024-01-26T17:13:58.827Z",
      "__v": 0
    },
    {
      "_id": "65b3e8e3b72b9fcfd288bf93",
      "user": "65b3e874b72b9fcfd288bf87",
      "title": "hello NKS",
      "tag": "i am fine thank u,and you",
      "description": "how are you,what did yo do",
      "date": "2024-01-26T17:13:58.827Z",
      "__v": 0
    },
    {
      "_id": "65b3e8e4b72b9fcfd288bf95",
      "user": "65b3e874b72b9fcfd288bf87",
      "title": "hello NKS",
      "tag": "i am fine thank u,and you",
      "description": "how are you,what did yo do",
      "date": "2024-01-26T17:13:58.827Z",
      "__v": 0
    },
    {
      "_id": "65b3e8e4b72b9fcfd288bf97",
      "user": "65b3e874b72b9fcfd288bf87",
      "title": "hello NKS",
      "tag": "i am fine thank u,and you",
      "description": "how are you,what did yo do",
      "date": "2024-01-26T17:13:58.827Z",
      "__v": 0
    },
    {
      "_id": "65b3e8e5b72b9fcfd288bf99",
      "user": "65b3e874b72b9fcfd288bf87",
      "title": "hello NKS",
      "tag": "i am fine thank u,and you",
      "description": "how are you,what did yo do",
      "date": "2024-01-26T17:13:58.827Z",
      "__v": 0
    }
  ]
  const [notes, setNotes] = useState(notesinitial)
  //get all  notes
  const getNotes = async () => {
    //Api call
const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')

      }
    });

    const json = await response.json();
 
    setNotes(json);
  }








  //Add a note
  const addNote = async (title, description, tag) => {
    //Api call


    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },

      body: JSON.stringify({ title, description, tag })
    });

    const note = await response.json();
    setNotes(notes.concat(note))
   
  
  }









  //Delete a note
  const deleteNote = async (id) => {
    //Api call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')

      }
    });
    const json = await response.json();
console.log(json);
    const newNotes = notes.filter((note) => {
      return note._id !== id
    })
    setNotes(newNotes)

  }










  //edit a note
  const editNote = async (id, title, description, tag) => {
    //Api call


    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')

      },

      body: JSON.stringify({ title, description, tag })
    });

    const json = await response.json();
console.log(json);
    let newNotes= JSON.parse(JSON.stringify(notes))
    //Logic
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }

    }
    console.log(id,notes);
    setNotes(newNotes);
  }


  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;