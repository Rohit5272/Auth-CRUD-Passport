const authenticate = require('../authenticate');
const Post = require('../controllers/postController');
const router = require('express').Router();

//Create Post
router.post('/create',Post.createPost);

// Retrieve all post
router.get('/find',Post.GetPost)

// Get Single post
router.get('/find/:id',Post.GetSinglePost);

// Update
router.put('/update/:id',Post.UpdatePost);

// Delete
router.delete('/delete/:id',Post.DeletePost)

module.exports = router