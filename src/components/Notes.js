
// import React, { useContext, useEffect, useRef,useState } from 'react'
// import noteContext from '../context/notes/NoteContext';
// import Noteitem from './Noteitem';
// import AddNote from './AddNote';
// export const Notes = () => {
//   const context = useContext(noteContext);
// const { notes, getNotes,editNote } = context;


//   useEffect(() => {
//     // eslint-disable-next-line
//     getNotes()
//   }, []);

//   const updateNote = (currentnote) => {
//     ref.current.click();
//     setNote({id:currentnote._id,etitle:currentnote.title,edescription:currentnote.description,etag:currentnote.tag});
//   }
//   const [note,setNote]=useState({id:"",etitle:"", edescription:"",etag:"default"} );

//   const handleClick=(e)=>{
//     console.log("updating note");
// editNote(note._id,note.etitle,note.edescription,note.etag)
//    refClose.current.click();

    
//  }

//  const onChange=(e)=>{
//     setNote({...note,[e.target.name]:e.target.value});
//  }
//   const ref = useRef(null);
//   const refClose=useRef(null)
//   return (
//     <>
//       <AddNote />

//       <button  ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
//         Launch demo modal
//       </button>
// <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
//         <div className="modal-dialog">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
//               <button type="button" className="btn-close " data-bs-dismiss="modal" aria-label="Close"></button>
//             </div>
//             <div className="modal-body">
//               <form>
//                 <div className="mb-3">
//                   <label htmlFor="title" className="form-label">title</label>
//                   <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} />

//                 </div>
//                 <div className="mb-3">
//                   <label htmlFor="description" className="form-label">description</label>
//                   <input type="text" className="form-control" id="edescription" name="edescription" value={ note.edescription} onChange={onChange} />
//                 </div>
//                 <div className="mb-3">
//                   <label htmlFor="tag" className="form-label">Tag</label>
//                   <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
//                 </div>
              
//               </form>
//             </div>
//             <div className="modal-footer">
//               <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
//               <button onClick={handleClick} type="button" className="btn btn-primary">Save changes</button>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="row my-3">
//         <h1>Your Notes</h1>
//         {notes.map((note) => {
//           return <Noteitem key={note._id} updateNote={updateNote} note={note} />
//         })
//         }
//       </div>
//     </>
//   )
// }

// export default Notes;

import React, { useContext, useEffect, useRef, useState } from 'react';
import noteContext from '../context/notes/NoteContext';
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import {  useNavigate } from 'react-router-dom';
export const Notes = (props) => {
  const context = useContext(noteContext);
  let history=useNavigate();

  const { notes, getNotes, editNote } = context;

  useEffect(() => {
    if(localStorage.getItem('token')){

    getNotes();
    }
    else{
      history("/login")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Include getNotes in the dependency array

  const updateNote = (currentnote) => {
    ref.current.click();
    setNote({ id: currentnote._id, etitle: currentnote.title, edescription: currentnote.description, etag: currentnote.tag });
    
  }

  const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "default" });

  const handleClick = (e) => {
    console.log("updating note");
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
    props.showAlert("Updated successfully","success");
  }

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  }

  const ref = useRef(null);
  const refClose = useRef(null);

  return (
    <>
      <AddNote showAlert={props.showAlert}/>
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
              <button type="button" className="btn-close " data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">title</label>
                  <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} minlength={5}  required/>
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">description</label>
                  <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} minlength={5}  required/>
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length<5||note.edescription.length<5}  onClick={handleClick} type="button" className="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h1>Your Notes</h1>
        <div className="container mx-2">
        {notes.length===0 && 'No Notes to Display'}
        </div>
        {notes.map((note) => (
          <Noteitem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />
        ))}
      </div>
    </>
  );
};

export default Notes;
