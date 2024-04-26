import express from "express";
import { z } from "zod";
import db from "../database";
import { addFiltration } from "../helper/addFiltration";
import { paginatedResults } from "../helper/paginatedResults";
const addressRouter = express.Router();

// Get address by id
addressRouter.get("/:id", async (req, res) => {
  try {
    const address_id = z.coerce.number().parse(req.params.id);

    const data = await db
      .selectFrom("Address")
      .selectAll()
      .where("Address.address_id", "=", address_id)
      .executeTakeFirst();

    if (!data) {
      return res
        .status(404)
        .json({ message: "Address with id " + address_id + " not found" });
    }

    return res.status(200).json(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        name: "Invalid data type.",
        message: JSON.parse(error.message),
      });
    }

    return res.status(500).json({ message: "Internal server error", error });
  }
});

// Get all addresses
addressRouter.get("/", async (req, res) => {
  try {
    var query = db.selectFrom("Address").selectAll();
    query = addFiltration("Address", query as any, req) as any;
    paginatedResults(query as any, req, res);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
});
export default addressRouter;
