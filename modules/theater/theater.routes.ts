import express, { Router } from "express";
import * as theaterController from "./theater.controller";
import validate from "../../middlewares/validate";
import { TheaterSchema } from "./theater.validation";

const router: Router = express.Router();

// Create a new theater
router.post("/", validate(TheaterSchema), theaterController.createTheater);

// Get all theaters or filter by state
router.get("/", theaterController.getTheaters);

export default router;