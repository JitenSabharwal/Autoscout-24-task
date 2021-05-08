import moment from "moment";
import { Listing, Contacts } from "../types";

// - Average Listing Selling Price per Seller Type
export interface AverageListingSP {
  [key: string]: string;
}
export const getAverageListingSellingPrice = (data: Listing[]): AverageListingSP => {
  const result: AverageListingSP = {};
  const persellerData = data?.reduce(
    (
      acc: { [key: string]: { total: number; count: number } },
      val: Listing
    ) => {
      if (!acc[val.sellerType]) {
        acc[val.sellerType] = {
          total: 0,
          count: 0,
        };
      }
      acc[val.sellerType].total += val.price;
      acc[val.sellerType].count += 1;
      return acc;
    },
    {}
  );
  Object.keys(persellerData).map((k: string) => {
    const { total, count } = persellerData[k];
    result[k] = new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
    }).format(total / count);
  });
  return result;
};

// - Distribution (in percent) of available cars by Make
export interface AvailCarsByPercentMake {
  [key: string]: string;
}
export const availableCarsByMake = (data: Listing[]): AvailCarsByPercentMake[] => {
  const result: AvailCarsByPercentMake[] = [];
  const totalCount = data?.length;
  const dataPerMaking = data?.reduce(
    (acc: { [key: string]: number }, val: Listing) => {
      const { make } = val;
      if (!acc[make]) acc[make] = 0;
      acc[make] += 1;
      return acc;
    },
    {}
  );
  Object.keys(dataPerMaking)
    .sort((a, b) => dataPerMaking[b] - dataPerMaking[a])
    .map((k: string) => {
      const percent = (dataPerMaking[k] / totalCount) * 100;
      result.push({ [k]: percent.toFixed(2) });
    });
  return result;
};

// - Average price of the 30% most contacted listings
export const getAvgPrice30PrcntMostContactedListings = (
  data: Listing[],
  contacts: Contacts[]
): string => {
  const dataByListingId = data.reduce(
    (acc: { [key: string]: Listing }, val: Listing) => {
      acc[val.id] = val;
      return acc;
    },
    {}
  );
  const contactsByListingId = contacts.reduce(
    (acc: { [key: string]: number }, val: Contacts) => {
      const { listingId } = val;
      if (!acc[listingId]) acc[listingId] = 0;
      acc[listingId] += 1;
      return acc;
    },
    {}
  );
  const mostContactedListingId = Object.keys(contactsByListingId).sort(
    (a, b) => contactsByListingId[b] - contactsByListingId[a]
  );
  const lenght30prnct = Math.floor(mostContactedListingId.length * 0.3);
  const only30prnctList = mostContactedListingId.slice(0, lenght30prnct);
  const avgPrice = only30prnctList.reduce((acc, val: string) => {
    const { price } = dataByListingId[val];
    acc += price / lenght30prnct;
    return acc;
  }, 0);
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(avgPrice);
};

// - The Top 5 most contacted listings per Month
export interface TOPContactedListingByMonth {
  [key: string]: ({totalContacts: number} & Listing)[];
}
export const getTop5MostContactedListingPerMonth = (
  data: Listing[],
  contacts: Contacts[]
): TOPContactedListingByMonth => {
  const dataByListingId = data.reduce(
    (acc: { [key: string]: Listing }, val: Listing) => {
      acc[val.id] = val;
      return acc;
    },
    {}
  );
  const contactsPerMonth = contacts.reduce(
    (acc: { [key: string]: { [id: string]: number } }, val: Contacts) => {
      const contactDate = moment(val.contactDate).format("MM.YYYY");
      const { listingId } = val;
      if (!acc[contactDate]) {
        acc[contactDate] = {};
      } 
      if (acc[contactDate] && !acc[contactDate][listingId]) acc[contactDate][listingId] = 0;
      acc[contactDate][listingId] += 1;
      return acc;
    },
    {}
  );
  const result: TOPContactedListingByMonth = {};
  Object.keys(contactsPerMonth)
    .sort()
    .map((month) => {
      const listing = contactsPerMonth[month];
      result[month] = Object.keys(listing)
        .sort((a, b) => listing[b] - listing[a])
        .slice(0, 5)
        .filter(l => l)
        .map((l) => ({...dataByListingId[l], totalContacts: listing[l]}));
    });
  return result;
};

export interface Report {
  averageListingSellingPrice: AverageListingSP
  availableCarsByMakePercent: AvailCarsByPercentMake[]
  averagePriceOf30PercentMostContactedListing: string
  top5MostContactedListing: TOPContactedListingByMonth
}