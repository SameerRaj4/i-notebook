// const express = require('express');
// const User = require('../models/user');
// const router = express.Router();
// const { body, validationResult } = require('express-validator');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const fetchuser= require('../middleware/fetchuser');

// const JWT_SECRET = 'Pawanisagoodboy';

// // route1:Create a user: using post "/api/auth/createuser". Doesn't require auth, no login required
// router.post('/createuser', [
//     body('name').isLength({ min: 3 }),
//     body('email').isEmail(),
//     body('password').isLength({ min: 5 })
// ], async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }

//     try {
//         // Check whether the user with the same email already exists
//         let existingUser = await User.findOne({ email: req.body.email });
//         if (existingUser) {
//             return res.status(400).json({ error: "User with this email already exists" });
//         }

//         // Create a new user
//         const salt = await bcrypt.genSalt(10);
//         const secPass = await bcrypt.hash(req.body.password, salt);

//         const newUser = await User.create({
//             name: req.body.name,
//             password: secPass,
//             email: req.body.email
//         });

//         // Generate JWT
//         const data = {
//             user: {
//                 id: newUser.id
//             }
//         };
//         const authtoken = jwt.sign(data, JWT_SECRET);

//         res.json({ authtoken });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });

// // route2:Login a user using post "/api/auth/login"
// router.post('/login', [
//     body('email').isEmail(),
//     body('password').exists()
// ], async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }

//     const { email, password } = req.body;

//     try {
//         const user = await User.findOne({ email: email });
//         if (!user) {
//             return res.status(400).json({ error: "User not found" });
//         }

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(400).json({ error: "Invalid password" });
//         }

//         // Generate JWT
//         const data = {
//             user: {
//                 id: user.id
//             }
//         };
//         const authtoken = jwt.sign(data, JWT_SECRET);

//         res.json({ authtoken });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });


// //route3:get logged user details  with post "/api/auth/getuser"
// router.get('/getuser', fetchuser,async (req, res) => {
//     try {
//         userid=req.user.id;
//         const user = await User.findById(req.user.id);
//         res.send(user);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });


// // //route4:
// // router.get('/logout', (req, res) => {
// //     req.logout();
// //     res.redirect('/');
// // });

// // //route5:
// // router.get('/auth', (req, res) => {
// //     if (req.isAuthenticated()) {
// //         res.redirect('/dashboard');
// //     } else {
// //         res.redirect('/login');
// //     }
// // });

// module.exports = router;



const express = require('express');
const User = require('../models/user');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');


const JWT_SECRET = 'Pawanisagoodboy';

// Route 1: Create a user: using post "/api/auth/createuser". Doesn't require auth, no login required
router.post('/createuser', [
    body('name').isLength({ min: 3 }),
    body('email').isEmail(),
    body('password').isLength({ min: 5 })
], async (req, res) => {
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success,errors: errors.array() });
    }

    try {
        // Check whether the user with the same email already exists
        let existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            
            return res.status(400).json({ success,error: "User with this email already exists" });
        }

        // Create a new user
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        const newUser = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email
        });

        // Generate JWT
        const data = {
            user: {
                id: newUser.id
            }
        };
        const authtoken = jwt.sign(data, JWT_SECRET);
success=true;
        res.json({success,authtoken });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Route 2: Login a user using post "/api/auth/login"
router.post('/login', [
    body('email').isEmail(),
    body('password').exists()
], async (req, res) => {
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            success=false;
            return res.status(400).json({success, error: "Invalid password" });
        }

        // Generate JWT
        const data = {
            user: {
                id: user.id
            }
        };
        const authtoken = jwt.sign(data, JWT_SECRET);
success=true;
        res.json({success, authtoken });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Route 3: Get logged user details with get "/api/auth/getuser"
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        userid = req.user.id;
        const user = await User.findById(userid).select("-password")
        res.send(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;

