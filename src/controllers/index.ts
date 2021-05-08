import { Request } from "express";
import {
  db,
  loadCollection,
  readContactsFile,
  readListingFile,
} from "../models";
import { generateViewReport } from "../views";
import {
  getAverageListingSellingPrice,
  availableCarsByMake,
  getAvgPrice30PrcntMostContactedListings,
  getTop5MostContactedListingPerMonth,
  Report,
} from "./reportHelpers";

const accumulatedReport = async (): Promise<Report> => {
  const listings = await readListingFile();
  const contacts = await readContactsFile();
  const averageListingSellingPrice = getAverageListingSellingPrice(listings);
  const availableCarsByMakePercent = availableCarsByMake(listings);
  const averagePriceOf30PercentMostContactedListing = getAvgPrice30PrcntMostContactedListings(
    listings,
    contacts
  );
  const top5MostContactedListing = getTop5MostContactedListingPerMonth(
    listings,
    contacts
  );
  return {
    averageListingSellingPrice,
    availableCarsByMakePercent,
    averagePriceOf30PercentMostContactedListing,
    top5MostContactedListing,
  };
};


export const generateReport = async () => {
  try {
    return accumulatedReport().then(generateViewReport);
  } catch (e) {
    throw new Error(`Something went wrong while fetching data ${e.message}`);
  }
};

// - Validation of data format
// - If everything goes correct upload the new file
export const uploadNewFile = async (req: Request, collectionName: string) => {
  try {
    const col = await loadCollection(collectionName, db);
    col.clear();
    const data = col.insert(req.file);
    db.saveDatabase();
    return data;
  } catch (err) {
    throw err;
  }
};

// - Return the file data in a structred format
export const getAllData = async () => {
  try {
    return accumulatedReport();
  } catch (error) {
    throw new Error(
      `Something went wrong while fetching data ${error.message}`
    );
  }
};
