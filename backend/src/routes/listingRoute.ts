import express from "express";
const listingRouter = express.Router();
import {
  newListingController,
  getListingController,
  updateListingController,
  deleteListingController,
} from "../controllers/listingController";

listingRouter.post("/new", newListingController);
listingRouter.get("/:id", getListingController);
listingRouter.put("/:id", updateListingController);
listingRouter.delete("/:id", deleteListingController);

export default listingRouter;
