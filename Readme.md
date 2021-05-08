# AutoScout24 Task
## Prerequisites
1) node
2) npm
## Setup
1) Clone the project using 
#### `git clone`

2) Install all the application dependencies, by traversing into the application directory and running
#### `npm install`

## Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:7000](http://localhost:7000) to view it in the browser.

The page will reload if you make edits.<br>

#### `npm test`
This will run the unit test written for the report generation logic
## Things Achieved

### Report endpoint
#### Get `http://localhost:7000/reports`
This endpoint will render the HTML view for the available listing and contacts information according to the asked query points

#### Get `http://localhost:7000/data`
This endpoint will return the data aggregated in json format from the available listing and contacts information according to the asked query points for the other developers to consume

#### Post `http://localhost:7000/upload-listings`
This endpoint is used to upload the new Listings file. It will take  a body with `listings` key and value as a `csv` file and upload it into the server, after this file is uploaded the server will always take the data from this file to do the above operations


#### Post `http://localhost:7000/upload-contacts`
This endpoint is used to upload the new Listings file. It will take  a body with `contacts` key and value as a `csv` file and upload it into the server, after this file is uploaded the server will always take the data from this file to do the above operations