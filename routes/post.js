const postController = require("../controllers/post");
const express = require("express");
const { check, body } = require("express-validator/check");
const path = require("path");

const isAuth = require("../middleware/isAuth");
const isCreator = require("../middleware/isCreator");
const multer = require("multer");

const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalName);
  }
});

const upload = multer({
  storage: diskStorage
});

const router = express.Router();

router.get("/posts", postController.getPosts);

router.post("/post", isAuth, upload.single("photos"), postController.postPost);

router.get("/post/:postId", postController.getPost);

router.get("/post/edit/:postId", isAuth, postController.getPatchPost);

router.patch("/post/edit/:postId", isAuth, isCreator, postController.patchPost);

router.delete(
  "/post/delete/:postId",
  isAuth,
  isCreator,
  postController.deletePost
);

module.exports = router;
