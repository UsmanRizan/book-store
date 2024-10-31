import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

// route to save a bookModel
router.post("/", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send("Please fill all required fields");
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };
    const book = await Book.create(newBook);
    return res.status(201).send(book);
  } catch (error) {
    console.error("Error occurred: ", error);
    return res.status(500).send("Internal server error");
  }
});

// route to get all books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.error("Error occurred: ", error);
    return res.status(500).send("Internal server error");
  }
});

// route to get a book by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findById(id);
    return res.status(200).json(book);
  } catch (error) {
    console.error("Error occurred: ", error);
    return res.status(500).send("Internal server error");
  }
});

// route to update a book by id
router.put("/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send("Please fill all required fields");
    }
    const { id } = req.params;
    const result = await Book.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.status(404).send("Book not found");
    }
    return res.status(200).send("Book updated successfully");
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error");
  }
});

// route to delete a book by id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Book.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).send("Book not found");
    }
    res.status(200).send("Book deleted successfully");
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error");
  }
});

export default router;
