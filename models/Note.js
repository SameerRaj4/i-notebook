// const mongoose = require('mongoose');
// import mongoose from 'mongoose';
// const { Schema } = mongoose;

// const Notesschema= new Schema({
//     title: {
//         type: String,
//         required: true
//     },
//     tag: {
//         type: String,
//         default: "General"
//     },
//     description: {
//         type: String,
//         required: true
//     },
//     date: {
//         type: Date,
//         default: Date.now()
//     },



// });

// module.exports=mongoose.model('Notes',Notesschema);




const mongoose = require('mongoose');
const { Schema } = mongoose;

const NotesSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.Objected,
        ref: 'User'
       
    },
  title: {
    type: String,
    required: true
  },
  tag: {
    type: String,
   required:true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('Note', NotesSchema);
