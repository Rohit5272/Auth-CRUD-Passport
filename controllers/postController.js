const Post = require('../models/post')

// Create
exports.createPost = (req,res) => {
    console.log("Create");
    const {fname,lname,age} = req.body
    const userId = req.userData.id;
    const post = new Post({
        fname: fname,
        lname: lname,
        age: age,
        user: userId,
    });
    post.save().then((result) => {
        res.send("Post Created Successfully"+result)
    }).catch((err) => {
        res.send("not created"+err)
    });
}

// Retrieve all posts of the logged-in user
exports.GetPost = (req, res) => {
    const userId = req.userData.id;

    Post.find({ user: userId })
        .then(data => res.json({ message: "Posts retrieved successfully", data }))
        .catch(err => res.status(400).json({ message: "Failed to retrieve posts", error: err }));
}

// Get Single Data
exports.GetSinglePost = (req,res) => {
    console.log("Get Single");
    const postId = req.params.id;
    console.log(postId);
    const userId = req.userData.id;
    console.log(userId);
    Post.findOne({ _id: postId, user: userId })
        .then((data) => {
            if (data) {
                res.json({ message: "Post retrieved successfully", data: data });
            } else {
                res.status(404).json({ message: "Post not found" });
            }
        })
        .catch(err => res.status(400).json({ message: "Failed to retrieve post", error: err }));
}
// Update by Id
exports.UpdatePost = (req,res) => {
    const postId = req.params.id;
    const userId = req.userData.id;
    Post.findOneAndUpdate({ _id: postId, user: userId }, req.body, {new: true,})
    .then((data) => {
        if (data) {
            res.json({ message: "Post updated successfully", data: data });
        } else {
            res.status(404).json({ message: "Post not found or unauthorized" });
        }
    })
    .catch((err) =>
        res.status(400).json({ message: "Failed to update post", error: err })
    );
};

// Delete
exports.DeletePost = (req, res) => {
    const postId = req.params.id;
    const userId = req.userData.id;

    Post.findOneAndDelete({ _id: postId, user: userId })
        .then(data => {
            if (data) {
                res.json({ message: "Post deleted successfully", data: data });
            } else {
                res.status(404).json({ message: "Post not found or unauthorized" });
            }
        })
        .catch(err => res.status(400).json({ message: "Failed to delete post", error: err }));
}

