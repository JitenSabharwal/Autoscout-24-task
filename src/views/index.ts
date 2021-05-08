import {
  AvailCarsByPercentMake,
  AverageListingSP,
  Report,
  TOPContactedListingByMonth,
} from "../controllers/reportHelpers";

const createRow = (data: string[]) => {
  return `<tr>
    ${data.map((d) => "<td>" + d + "</td>").join(" ")}
    </tr>`;
};
const createHeadings = (headings: string[]) => {
  return `<thead>
    ${headings.map((d) => "<th>" + d + "</th>").join(" ")}
    </thead>`;
};

const createTableAvgListingSP = (
  averageListingSellingPrice: AverageListingSP
) => {
  let table = "<table border=1>";
  table += createHeadings(Object.keys(averageListingSellingPrice));
  table += createRow(Object.values(averageListingSellingPrice));
  table += "</table>";
  return table;
};
const createTableCarByMake = (
  availableCarsByMakePercent: AvailCarsByPercentMake[]
) => {
  let table = "<table border=1>";
  table += createHeadings(["Car Name", "Percentage"]);
  availableCarsByMakePercent.map((obj) => {
    const keys = Object.keys(obj);
    const values = Object.values(obj);
    table += createRow([...keys, ...values]);
  });
  table += "</table>";
  return table;
};

const createTableContactedList = (
  averagePriceOf30PercentMostContactedListing: string
) => {
  let table = "<table border=1>";
  table += createHeadings(["Average price"]);
  table += createRow([averagePriceOf30PercentMostContactedListing]);
  table += "</table>";
  return table;
};

const createTableTopContactListPerMonth = (
  data: TOPContactedListingByMonth
) => {
  let table = ""
  Object.keys(data).forEach((key) => {
    table += `<h4>Date: ${key}</h4>`;
    table += "<table border=1>";
    table += createHeadings(["Ranking", "Listing Id", "Make", "Selling Price", "Mileage", "Seller Type","Total Amount of contacts"]);
    data[key].map((d, i) => {
      table += createRow([i + 1, ...Object.values(d)]);
    })
    table += "</table>";
  })
  return table;
};
export function generateViewReport(report: Report) {
  const {} = report;
  let page = "<html> <body>";
  page += "<h3>Average Listing Selling Price per Seller Type</h3>";
  page += createTableAvgListingSP(report.averageListingSellingPrice);
  page += "<h3>Distribution (in percent) of available cars by Make </h3>";
  page += createTableCarByMake(report.availableCarsByMakePercent);
  page += "<h3>Average price of the 30% most contacted listings</h3>";
  page += createTableContactedList(
    report.averagePriceOf30PercentMostContactedListing
  );
  page += "<h3>The Top 5 most contacted listings per Month</h3>";
  page += createTableTopContactListPerMonth(report.top5MostContactedListing);
  page += "</body> </html>";
  return page;
}
