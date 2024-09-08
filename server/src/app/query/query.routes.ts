import { Router } from "express";
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

import { CabQueryConfirmed, cabQuerySave, findQueryByID, FlightQueryConfirmed, FlightQuerySave, getAllQueries, getCabQueries, getFlightQueries, getHotelQueries, HotelQuery, HotelQueryConfirmed, HotelQueryDup } from "./query.controller";
const app=Router();

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'uploads', // Folder in Cloudinary where images will be uploaded
      allowedFormats: ['jpg', 'png', 'jpeg'],
    },
  });

  const upload = multer({ storage: storage });

app.post("/flight/save",FlightQuerySave);
app.get("/flight/list",getFlightQueries);
app.put("/flight/confirm/:id",upload.single('hotelImage'),FlightQueryConfirmed);
app.get('/',getAllQueries);
app.post('/hotel/save',HotelQuery);
app.get('/hotel/list',getHotelQueries);
app.get('/:id',findQueryByID);
app.put('/hotel/confirm/:id',HotelQueryConfirmed);
app.put('/hotel/dup/',HotelQueryDup);
app.post('/cab/save',cabQuerySave);
app.get("/cab/list",getCabQueries);
app.put("/cab/confirm/:id",CabQueryConfirmed);
export {
    app as QueryRoutes
}

// Compare this snippet from server/src/app/query/query.model.ts:`