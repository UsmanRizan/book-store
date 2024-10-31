import express from "express";
import {PORT,mongoDBURL} from "./config.js";
import mongoose from "mongoose";
import{Book} from "./models/bookModel.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    console.log(req);
    return res.status(234).send("Hello World!");
    });

// route to save a bookModel
app.post("/books", async (req, res) => {
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
app.get("/books", async (req, res) => {
    try {
        const books = await Book.find({});
        return res.status(200).json({
            count : books.length,
            data : books
        });
        
    } catch (error) {
        console.error("Error occurred: ", error);
        return res.status(500).send("Internal server error");
        
}});

// route to get a book by id
app.get("/books/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).send("Book not found");
        }
        return res.status(200).send(book);
    } catch (error) {
        console.error("Error occurred: ", error);
        return res.status(500).send("Internal server error");
    }
});

mongoose.connect(mongoDBURL).then(() => {
    console.log("Connected to the database");
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
      });
  }).catch((err) => {
    console.error("Error connecting to the database: ", err);
  });
