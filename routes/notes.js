// // const express=require('express');
// // const router=express.Router();
// // const fetchuser = require('../middleware/fetchuser');
// // const Notes=require('../models/Notes');

// // //route1:get all Note
// // router.get('/fetchallNote',fetchuser,async(req,res)=>{
// //   const notes= await Notes.find({user:req.user.id});

// // res.json(notes)



// // })

// // module.exports=router


// const express = require('express');
// const router = express.Router();
// const fetchuser = require('../middleware/fetchuser');
// const Note = require('../models/Note');
// const { body, validationResult } = require('express-validator');


// // Route: Get all Note
// router.get('/fetchallnotes', fetchuser, async (req, res) => {
//     try {
//         const notes = await Note.find({ user: req.user.id });
//         res.json(notes)
//     }
//     catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });



// // Route2: add new node using post "/api/notes/addnote" 
// router.post('/addnote', fetchuser, [
//     body('title').isLength({ min: 3 }),
//     body('description').isLength({ min: 5 }),

// ], async (req, res) => {
//     try {
//         const { title, description, tag } = req.body;
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).json({ errors: errors.array() });
//         }

//         const note = new Note({
//             title, description, tag, user: req.user.id
//         })
//         const savenote = await note.save();
//         res.json(savenote)
//     }
//     catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });
// module.exports = router;

// const express = require('express');
// const router = express.Router();
// const fetchuser = require('../middleware/fetchuser');
// const Note = require('../models/Note');
// const { body, validationResult } = require('express-validator');

// // Route: Get all notes
// router.get('/fetchallnotes', fetchuser, async (req, res) => {
//     try {
//         const notes = await Note.find({ user: req.user.id });
//         res.json(notes);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });

// // Route: Add a new note using post "/api/notes/addnote" 
// router.post('/addnote', fetchuser, [
//     body('title').isLength({ min: 3 }),
//     body('description').isLength({ min: 5 }),
// ], async (req, res) => {
//     try {
//         const { title, description, tag } = req.body;
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).json({ errors: errors.array() });
//         }

//         const newNote = new Note({
//             title,
//             description,
//             tag,
//             user: req.user.id
//         });

//         const savedNote = await newNote.save();
//         res.json(savedNote);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Failed to add the note. Please try again." });
//     }
// });

// //route3:update note "/api/notes/updatenote"

// router.put('/updatenote/:id', fetchuser,  async (req, res) => {
// const {title,description,tag}=req.body;
// //create a new note object
// const newnote={};
// if(title){
//     newnote.title=title;
// }
// if(description){
//     newnote.description=description;
// }
// if(tag){
//     newnote.tag=tag;
// }
// //find the node to e updated
// let note=await Note.findById(req.params.id);
// if(!note){res.status(404).send("not found")}
// if(note.user.toString()!==req.user.id){
//     return req.status(404).send("Not allowed");
// }
// note=await Note.findByIdAndUpdate(req.params.id,{$set:newnote},{new:true})
// res.json({note});
// })



// //route4:delete note "api/notes/deletenote/id:"

// router.delete('/deletenote/:id', fetchuser,  async (req, res) => {
//     const {title,description,tag}=req.body;
//     //create a new note object
//     const newnote={};
//     if(title){
//         newnote.title=title;
//     }
//     if(description){
//         newnote.description=description;
//     }
//     if(tag){
//         newnote.tag=tag;
//     }
//     //find the node to be deleted
//     let note=await Note.findById(req.params.id);
//     if(!note){res.status(404).send("not found")}
//     if(note.user.toString()!==req.user.id){
//         return req.status(404).send("Not allowed");
//     }
//     note=await Note.findByIdAndDelete(req.params.id,{$set:newnote},{new:true})
//     res.json({"success":" note has been deleted", note: note});
//     })
    
// module.exports = router;



const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');

// Route: Get all notes
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Route: Add a new note using post "/api/notes/addnote" 
router.post('/addnote', fetchuser, [
    body('title').isLength({ min: 3 }),
    body('description').isLength({ min: 5 }),
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const newNote = new Note({
            title,
            description,
            tag,
            user: req.user.id
        });

        const savedNote = await newNote.save();
        res.json(savedNote);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to add the note. Please try again." });
    }
});

// Route: Update note "/api/notes/updatenote/:id"
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const newNote = {};
        if (title) {
            newNote.title = title;
        }
        if (description) {
            newNote.description = description;
        }
        if (tag) {
            newNote.tag = tag;
        }

        // Find the note to be updated
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Note not found");
        }

        // Check if the user owns the note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Unauthorized");
        }

        // Update the note
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json({ note });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to update the note. Please try again." });
    }
});

// Route: Delete note "/api/notes/deletenote/:id"
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        // Find the note to be deleted
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Note not found");
        }

        // Check if the user owns the note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Unauthorized");
        }

        // Delete the note
        await Note.findByIdAndDelete(req.params.id);
        res.json({ success: "Note has been deleted", note });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to delete the note. Please try again." });
    }
});

module.exports = router;
