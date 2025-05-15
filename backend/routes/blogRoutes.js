import express from "express";
import blogController from "../controller/blogController.js";

const routes = express.Router();

routes.post("/addBlog", blogController.addBlog);

export default routes;
