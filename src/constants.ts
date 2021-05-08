import * as dotenv from "dotenv";
import path from "path";
dotenv.config();
if (!process.env.PORT) {
    process.exit(1);
}
export const PORT: number = parseInt(process.env.PORT as string, 10);
export const DB_NAME = "db.json";
export const LISTING_COLLECTION_NAME = "csv-listings";
export const CONTACTS_COLLECTION_NAME = "csv-contacts";
export const UPLOAD_PATH = path.join(__dirname + "/data");
