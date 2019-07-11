const Post = require("../models/Post");
const User = require("../models/User");

const { validationResult } = require("express-validator/check");

exports.getPosts = (req, res, next) => {
  Post.find()
    .then(posts => {
      console.log(posts);
      if (!posts.length) {
        return res.status(202).json({
          message: "No posts found"
        });
      }
      return res.status(200).json({
        message: "Successfully fetched posts",
        posts: posts
      });
    })
    .catch(err => {
      next(err);
    });
};

exports.getPost = (req, res, next) => {
  const postId = req.params.postId;
  Post.findById(postId)
    .then(post => {
      if (!post) {
        return res.status(422).json({
          message: "post not found"
        });
      }
      return res.status(200).json({
        message: "successfully found the post",
        post: post
      });
    })
    .catch(err => {
      return next(err);
    });
};

exports.postPost = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(422).json({
      status: "error",
      errors: result.array()
    });
  }

  const title = req.body.title;
  const mainText = req.body.mainText;
  const authorId = req.userId;

  const post = new Post({
    title: title,
    mainText: mainText,
    author: authorId
  });

  return post
    .save()
    .then(post => {
      return res.status(201).json({
        message: "Successfully created a post",
        post: post
      });
    })
    .catch(err => next(err));
};
exports.getPatchPost = (req, res, next) => {
  const postId = req.params.postId;
  Post.findById(postId)
    .then(post => {
      if (!post) {
        const error = new Error("Post can not be found");
        error.statusCode = 422;
        next(err);
      }
      return res.status(201).json({
        message: "successfully fetched old post",
        oldTitle: post.title,
        oldMainText: post.mainText
      });
    })
    .catch(err => next(err));
};

exports.patchPost = (req, res, next) => {
  const postId = req.params.postId;
  const title = req.body.title;
  const mainText = req.body.mainText;
  Post.findOneAndUpdate(postId)
    .then(post => {
      if (!post) {
        return res.status(422).json({
          message: "post not found"
        });
      }
      post.title = title;
      post.mainText = mainText;
      return post.save();
    })
    .then(upPost => {
      return res.status(200).json({
        message: "successfully updated the post",
        post: upPost
      });
    })
    .catch(err => next(err));
};

exports.deletePost = (req, res, next) => {
  const postId = req.params.postId;
  Post.findOneAndDelete(postId)
    .then(post => {
      if (!post) {
        return res.status(422).json({
          message: "post not found"
        });
      }
      return res.status(200).json({
        message: "successfully deleted the post",
        post: post
      });
    })
    .catch(err => next(err));
};
