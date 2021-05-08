import fs from "fs";
import csv from "csv-parser";
import { Listing, Contacts, ListingCSV, ContactsCSV } from "../types";
import path from "path";
import { db, loadCollection } from "./util";
import { CONTACTS_COLLECTION_NAME, LISTING_COLLECTION_NAME } from "../constants";
export * from "./util";

const readCsvFile = <T>(filePath: string): Promise<T[]> => {
  const results: T[] = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data: T) => results.push(data))
      .on("end", () => {
        resolve(results);
      });
  });
};

export async function readListingFile(): Promise<Listing[]> {
  const defaultfilePath = "listings.csv";
  const col = await loadCollection(LISTING_COLLECTION_NAME, db);
  const { filename } = col.get(1) || {};
  const filePath =
    path.join(__dirname, "../data") + `/${filename || defaultfilePath}`;
  return readCsvFile<ListingCSV>(filePath).then((data: ListingCSV[]) =>
    data.map((d) => ({
      id: parseInt(d.id),
      make: d.make,
      mileage: parseInt(d.mileage),
      price: parseInt(d.price),
      sellerType: d.seller_type,
    }))
  );
}

export async function readContactsFile(): Promise<Contacts[]> {
  const defaultfilePath = "contacts.csv";
  const col = await loadCollection(CONTACTS_COLLECTION_NAME, db);
  const { filename } = col.get(1) || {};
  const filePath =
    path.join(__dirname, "../data") + `/${filename || defaultfilePath}`;
  return readCsvFile<ContactsCSV>(filePath).then((data: ContactsCSV[]) =>
    data.map((d) => ({
      listingId: parseInt(d.listing_id),
      contactDate: new Date(parseInt(d.contact_date)),
    }))
  );
}
