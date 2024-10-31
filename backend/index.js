import express from "express";
import {PORT,mongoDBURL} from "./config.js";
import mongoose from "mongoose";

const app = express();

app.get("/", (req, res) => {
    console.log(req);
    return res.status(234).send("Hello World!");
    });

    

mongoose.connect(mongoDBURL).then(() => {
    console.log("Connected to the database");
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
      });
  }).catch((err) => {
    console.error("Error connecting to the database: ", err);
  });
