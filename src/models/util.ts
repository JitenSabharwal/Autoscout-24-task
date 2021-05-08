import multer from "multer";
import Loki from "lokijs";
import { UPLOAD_PATH, DB_NAME } from "../constants";
import { Request, Response, NextFunction } from "express";

const csvFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  // accept image only
  if (!file.originalname.match(/\.csv$/)) {
    throw new Error("Only csv files are allowed!");
  } else cb(null, true);
};

const upload = multer({
  dest: `${UPLOAD_PATH}/`,
  fileFilter: csvFilter,
}); // multer configuration

export const db = new Loki(`${UPLOAD_PATH}/${DB_NAME}`, {
  persistenceMethod: "fs",
});

export const loadCollection = function (
  colName: string,
  db: Loki
): Promise<Loki.Collection<any>> {
  return new Promise((resolve) => {
    db.loadDatabase({}, () => {
      const _collection =
        db.getCollection(colName) || db.addCollection(colName);
      resolve(_collection);
    });
  });
};

export const uploadFileWithField = (fieldName: string) => {
  const uploader = upload.single(fieldName);
  return (req: Request, res: Response, next: NextFunction) => {
    uploader(req, res, function (err: unknown) {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        res
          .status(500)
          .send({ message: `Multer error while uploading ${err.message}` });
      } else if (err) {
        // An unknown error occurred when uploading.
        res
          .status(500)
          .send({ message: `Something went wrong while uploading ${err}` });
        throw new Error(``);
      }
      // Everything went fine.
      next();
    });
  };
};
