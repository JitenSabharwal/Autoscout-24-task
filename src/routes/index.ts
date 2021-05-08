/**
 * Required External Modules and Interfaces
 */
import express, { Request, Response } from "express";
import {
  LISTING_COLLECTION_NAME,
  CONTACTS_COLLECTION_NAME,
} from "../constants";
import { generateReport, getAllData, uploadNewFile } from "../controllers";
import { uploadFileWithField } from "../models";
const Router = express.Router();

Router.get("/reports", async (req: Request, res: Response) => {
  try {
    const data = await generateReport();
    res.writeHead(200, {
      "Content-Type": "text/html",
    });
    res.write(data);
    res.end();
  } catch (e) {
    res.status(400).send({ message: e.message });
  }
});

Router.get("/data", async (req: Request, res: Response) => {
  try {
    const data = await getAllData();
    res.json(data);
  } catch (e) {
    res.status(400).send({ message: e.message });
  }
});

Router.post(
  "/upload-listings",
  uploadFileWithField("listings"),
  async (req, res) => {
    try {
      const data = await uploadNewFile(req, LISTING_COLLECTION_NAME);
      res.send({
        id: data.$loki,
        fileName: data.filename,
        originalName: data.originalname,
      });
    } catch (e) {
      res.status(500).send({ message: e.message });
    }
  }
);

Router.post(
  "/upload-contacts",
  uploadFileWithField("contacts"),
  async (req, res) => {
    try {
      const data = await uploadNewFile(req, CONTACTS_COLLECTION_NAME);
      res.send({
        id: data.$loki,
        fileName: data.filename,
        originalName: data.originalname,
      });
    } catch (e) {
      res.status(500).send({ message: e.message });
    }
  }
);

export default Router;
