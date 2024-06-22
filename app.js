import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from 'dotenv';
import bookRoute from './routes/bookRoute.js';
import memberRoute from './routes/memberRoute.js'
import borrowRoute from './routes/borrowRoute.js'
import swaggerDocs from './swagger.js'; 
/* import swaggerUI from 'swagger-ui-express';
import swaggerSpec from './swagger.js'; */

/** Define express object and atributes usage */
const app = express();
app.use(cors());
app.use(bodyParser.json());
//app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

/** load configurations */
dotenv.config();
const port = process.env.PORT || 8100;
const mongoUrl = process.env.DATABASE_URL;

/**trying to connect to mongo db */
mongoose.connect(mongoUrl).then( ()=>{
    console.log("Database connected");
    app.listen(port, () => {
        console.log(`App listening on port ${port}`)
      });
    swaggerDocs(app, port);  
} ).catch(error => console.log(error));

/** navigate user to html page while requesting root*/
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
  });

 /** Define routes for whole api */ 
app.use("/api/books", bookRoute);
app.use("/api/members", memberRoute);
app.use("/api/borrows", borrowRoute);