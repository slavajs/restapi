const express = require("express");

const Post = require("../models/Post");
const User = require("../models/User");

module.exports = (req, res, next) => {
  const postId = req.params.postId;
  Post.findById(postId)
    .then(post => {
      const creatorId = post.author;
      const authUserId = req.userId;
      if (creatorId === authUserId) {
        next();
      }
      const error = new Error("You are not allowed to manupulate this post");
      error.statusCode = 401;
      throw error;
    })
    .catch(err => next(err));
};
