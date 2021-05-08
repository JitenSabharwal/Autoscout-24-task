import express from "express";
import Router from "../routes"
class App {
    public express;
  
    constructor() {
      this.express = express();
      this.mountRoutes();
    }
  
    private mountRoutes(): void {
      this.express.use("/", Router);
    }
  }
  
  export default new App().express;
  