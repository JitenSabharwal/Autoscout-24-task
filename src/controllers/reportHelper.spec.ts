import { Contacts, Listing } from "../types";
import {
  availableCarsByMake,
  getAverageListingSellingPrice,
  getAvgPrice30PrcntMostContactedListings,
  getTop5MostContactedListingPerMonth,
} from "./reportHelpers";
const mockListing: Listing[] = [
  {
    id: 1061,
    make: "Renault",
    mileage: 7000,
    price: 5641,
    sellerType: "other",
  },
  {
    id: 1132,
    make: "Mercedes-Benz",
    mileage: 7000,
    price: 34490,
    sellerType: "dealer",
  },
  {
    id: 1077,
    make: "Mercedes-Benz",
    mileage: 4000,
    price: 8007,
    sellerType: "other",
  },
  {
    id: 1099,
    make: "BWM",
    mileage: 8500,
    price: 5914,
    sellerType: "dealer",
  },
  {
    id: 1122,
    make: "Audi",
    mileage: 2000,
    price: 40481,
    sellerType: "other",
  },
];
const mockContact: Contacts[] = [
  { listingId: 1061, contactDate: new Date(1592498493000) },
  { listingId: 1122, contactDate: new Date(1582474057000) },
  { listingId: 1099, contactDate: new Date(1579365755000) },
  { listingId: 1077, contactDate: new Date(1585159440000) },
  { listingId: 1132, contactDate: new Date(1583574198000) },
];
describe("Get Average Listing Price", () => {
  test("Function exits", () => {
    expect(typeof getAverageListingSellingPrice).toBe("function");
  });
  test("Function returns object as an ouput", () => {
    expect(typeof getAverageListingSellingPrice([])).toBe("object");
  });
  test("Function returns correct ouput for given mock data", () => {
    expect(getAverageListingSellingPrice(mockListing)).toEqual({
      dealer: "€20,202.00",
      other: "€18,043.00",
    });
  });
});

describe("Distribution (in percent) of available cars by Make", () => {
  test("Function exits", () => {
    expect(typeof availableCarsByMake).toBe("function");
  });
  test("Function returns array as an ouput", () => {
    expect(availableCarsByMake([])).toBeInstanceOf(Array);
  });
  test("Function returns correct ouput for given mock data", () => {
    expect(availableCarsByMake(mockListing)).toEqual([
      { "Mercedes-Benz": "40.00" },
      { Renault: "20.00" },
      { BWM: "20.00" },
      { Audi: "20.00" },
    ]);
  });
});

describe("Average price of the 30% most contacted listings", () => {
  test("Function exits", () => {
    expect(typeof getAvgPrice30PrcntMostContactedListings).toBe("function");
  });
  test("Function returns string as an ouput", () => {
    expect(typeof getAvgPrice30PrcntMostContactedListings([], [])).toBe(
      "string"
    );
  });
  test("Function returns correct ouput for given mock data", () => {
    expect(
      getAvgPrice30PrcntMostContactedListings(mockListing, mockContact)
    ).toEqual("€5,641.00");
  });
});

describe("The Top 5 most contacted listings per Month", () => {
  test("Function exits", () => {
    expect(typeof getTop5MostContactedListingPerMonth).toBe("function");
  });
  test("Function returns object as an ouput", () => {
    expect(typeof getTop5MostContactedListingPerMonth([], [])).toBe("object");
  });
  test("Function returns correct ouput for given mock data", () => {
    expect(
      getTop5MostContactedListingPerMonth(mockListing, mockContact)
    ).toEqual({
      "01.2020": [
        {
          id: 1099,
          make: "BWM",
          mileage: 8500,
          price: 5914,
          sellerType: "dealer",
          totalContacts: 1,
        },
      ],
      "02.2020": [
        {
          id: 1122,
          make: "Audi",
          mileage: 2000,
          price: 40481,
          sellerType: "other",
          totalContacts: 1,
        },
      ],
      "03.2020": [
        {
          id: 1077,
          make: "Mercedes-Benz",
          mileage: 4000,
          price: 8007,
          sellerType: "other",
          totalContacts: 1,
        },
        {
          id: 1132,
          make: "Mercedes-Benz",
          mileage: 7000,
          price: 34490,
          sellerType: "dealer",
          totalContacts: 1,
        },
      ],
      "06.2020": [
        {
          id: 1061,
          make: "Renault",
          mileage: 7000,
          price: 5641,
          sellerType: "other",
          totalContacts: 1,
        },
      ],
    });
  });
});
