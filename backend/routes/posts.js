const express = require("express");
const router = express.Router();
// const mongoose = require("mongoose");
const passport = require("passport");

// Post model
const Post = require("../models/Posts");
const Comment = require("../models/Comments");

// Validation
const validatePostInput = require("../validation/post");

// @route   GET api/posts/test
// @desc    Tests post route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Posts Works" }));

// @route   POST api/posts/:postId/comment
// @desc    Add comment to post
// @access  Public
router.post("/:postId/comment", (req, res) => {
  console.log("asbabsab");
  const postId = req.params.postId;

  console.log("11111111111");

  const comment = new Comment({
    name: req.body.name,
    commentText: req.body.commentText,
    user: req.body.user,
    parentPost: postId,
  });
  console.log("askfgjasklgj 22222");

  comment
    .save()
    .then(() => {
      return Post.findById(postId);
    })
    .then((post) => {
      post.comments.unshift(comment);
      console.log("Save comment");
      return post.save();
    })
    .then(() => {
      console.log("Save post in comment");
      res.json(comment);
    })
    .catch((err) => res.status(404).json({ postnotfound: "No post found" }));
});

// @route   POST api/posts/:postId/comment
// @desc    Add comment to post
// @access  Public
router.post("/:postId/comment/:commentId", (req, res) => {
  const postId = req.params.postId;
  const commentId = req.params.commentId;
  const newcomment = new Comment({
    name: req.body.name,
    commentText: req.body.commentText,
    user: req.body.user,
    parentPost: postId,
  });
  newcomment.save();
  Post.findById(postId)
    .then((post) => {
      return Comment.findById(commentId);
    })
    .then((comment) => {
      comment.comments.unshift(newcomment);
      return comment.save();
    })
    .then(() => {
      res.json(newcomment);
    })
    .catch((err) => res.status(404).json({ postnotfound: "No comment found" }));
});

// @route   POST api/posts/reaction/:commentId
// @desc    Add comment to post
// @access  Public
router.post("/reaction/:commentId", (req, res) => {
  const commentId = req.params.commentId;
  const reactionName = req.body.reactionName;

  Comment.findById(commentId)
    .then((comment) => {
      const hasReaction = comment.reactions.find(
        (r) => r.name === reactionName
      );
      if (hasReaction) {
        const nR = comment.reactions.map((reaction) => {
          if (reaction.name === reactionName) {
            const newc = reaction.count + 1;
            return {
              name: reactionName,
              count: newc,
            };
          } else {
            return reaction;
          }
        });
        comment.reactions = nR;
      } else {
        comment.reactions = [
          ...comment.reactions,
          {
            name: reactionName,
            count: 1,
          },
        ];
      }
      return comment.save();
    })
    .then((c) => {
      res.json(c);
    })
    .catch((err) => res.status(404).json({ postnotfound: "No comment found" }));
});

// @route   GET api/posts/comment/:id
// @desc    Add comment to post
// @access  Public
router.get("/:postId/comments", (req, res) => {
  const postId = req.params.postId;
  Post.findById(postId, { comments: 1 })
    .populate({
      path: "comments",
    })
    .then((comments) => {
      res.json(comments);
    })
    .catch((err) =>
      res.status(404).json({ postnotfound: "Comments not found" })
    );
});

// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Remove comment from post
// @access  Private
router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then((post) => {
        // Check to see if comment exists
        if (
          post.comments.filter(
            (comment) => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ commentnotexists: "Comment does not exist" });
        }

        // Get remove index
        const removeIndex = post.comments
          .map((item) => item._id.toString())
          .indexOf(req.params.comment_id);

        // Splice comment out of array
        post.comments.splice(removeIndex, 1);

        post.save().then((post) => res.json(post));
      })
      .catch((err) => res.status(404).json({ postnotfound: "No post found" }));
  }
);

// @route   POST api/posts
// @desc    Create post
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const newPost = new Post({
      user: req.user.id,
      title: req.body.title,
      mainPhoto: req.body.mainPhoto,
      content: req.body.content,
      category: req.body.category,
      section: req.body.section,
    });

    newPost
      .save()
      .then((post) => {
        res.json(post);
      })
      .catch((err) =>
        res.status(404).json({ message: "Error! Could not add post" })
      );
  }
);

// @route   PUT api/posts
// @desc    Edit post
// @access  Private
router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {

    const editPost = new Post({
    user: req.user.id,
    title: req.body.title,
    mainPhoto: req.body.mainPhoto,
    content: req.body.content,
    category: req.body.category,
    section: req.body.section
    });

    Post.findOneAndUpdate({_id:req.params.id}, editPost, {upsert:true, new:true}, function(err, result){
      if(err){
          res.send(err)
      }
      else{
          res.send(result)
      }
  })
  }
);

// @route   GET api/posts
// @desc    Get posts
// @access  Public
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then((posts) => {
      res.json(posts);
    })
    .catch((err) => res.status(404).json({ nopostsfound: "No posts found" }));
});

//@route   GET api/posts/newestPosts/:section
//@desc    Get posts
//@access  Public

//@route   GET api/posts/:category
//@desc    Get posts
//@access  Public

router.post("/:section/:category", (req, res) => {
  const section = req.params.section;
  const category = req.params.category;
  const start = req.body.start;
  const count = req.body.count;
  if (category === "all categories" && section === "mainView") {
    Post.find()
      .sort({ date: -1 })
      .skip(start - 1)
      .limit(count)
      .then((post) => {
        res.json(post);
      })
      .catch((err) =>
        res.status(404).json({ nopostsfound: "No post found for that section" })
      );
  } else if (category === "all categories" && section !== "mainView") {
    Post.find({ section: section })
      .sort({ date: -1 })
      .skip(start - 1)
      .limit(count)
      .then((post) => {
        res.json(post);
      })
      .catch((err) =>
        res
          .status(404)
          .json({ nopostsfound: "No post found for that category" })
      );
  } else {
    Post.find({ category: category })
      .sort({ date: -1 })
      .skip(start - 1)
      .limit(count)
      .then((post) => {
        res.json(post);
      })
      .catch((err) =>
        res
          .status(404)
          .json({ nopostsfound: "No post found for that category" })
      );
  }
});
//@route   GET api/posts/newestPosts/:section
//@desc    Get posts
//@access  Public

router.get("/morePosts/:category", (req, res) => {
  const category = req.params.category;

  Post.find({ category: category }, { title: 1, mainPhoto: 1 })
    .sort({ date: -1 })
    .limit(3)
    .then((post) => {
      res.json(post);
    })
    .catch((err) => res.status(404).json({ nopostsfound: "No post found " }));
});

//@route   GET api/posts/newestPosts/:section
//@desc    Get posts
//@access  Public

router.get("/newestPosts/:section", (req, res) => {
  const section = req.params.section;

  if (section === "mainView") {
    Post.find({}, { title: 1, mainPhoto: 1 })
      .sort({ date: -1 })
      .limit(5)
      .then((post) => {
        res.json(post);
      })
      .catch((err) => res.status(404).json({ nopostsfound: "No post found " }));
  } else {
    Post.find({ section: section }, { title: 1, mainPhoto: 1 })
      .sort({ date: -1 })
      .limit(5)
      .then((post) => {
        res.json(post);
      })
      .catch((err) => res.status(404).json({ nopostsfound: "No post found " }));
  }
});

// @route   GET api/posts/search
// @desc    Get post by id
// @access  Public
router.post("/search", (req, res) => {
  const start = req.body.start;
  const count = req.body.count;
  const matchWord = req.body.searchText;
  const regex = new RegExp(matchWord, "i");

  Post.find({ title: { $regex: regex } })
    .sort({ date: -1 })
    .skip(start - 1)
    .limit(count)
    .then((post) => {
      res.json(post);
    })
    .catch((err) => {
      res.status(404).json({ nopostfound: "No post found with that ID" });
    });
});

// @route   GET api/posts/:id
// @desc    Get post by id
// @access  Public
router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then((post) => res.json(post))
    .catch((err) =>
      res.status(404).json({ nopostfound: "No post found with that ID" })
    );
});

// @route   DELETE api/posts/:id
// @desc    Delete post
// @access  Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then((profile) => {
      Post.findById(req.params.id)
        .then((post) => {
          // Check for post owner
          if (post.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: "User not authorized" });
          }

          // Delete
          post.remove().then(() => res.json({ success: true }));
        })
        .catch((err) =>
          res.status(404).json({ postnotfound: "No post found" })
        );
    });
  }
);

module.exports = router;
