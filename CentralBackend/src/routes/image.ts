import express, {Request, Response} from 'express'
import { z } from "zod";
import db from "../database";
import { addFiltration } from "../helper/addFiltration";
import { paginatedResults } from "../helper/paginatedResults";
import { sql } from "kysely";
import { verifySession } from "../middlewares/verifySession";
import {
  checkPermissions,
  PermissionRequest,
  Role,
} from "../middlewares/checkPermissions";

const imageRouter = express.Router();

imageRouter.get("/:id", async (req, res) => {
    try{
        const image_id = z.coerce.number().parse(req.params.id)
        const result = await db.selectFrom("Image").selectAll().where("Image.image_id", "=", image_id).executeTakeFirst()

        if(!result){
            return res.status(404).json({message : "Image not found"})
        }
        res.status(200).json(result)
    }catch(error){
        if(error instanceof z.ZodError){
            return res.status(400).json({
                name : 'Invalid data type',
                message : JSON.parse(error.message)
            })
        }
        res.status(500).json({ message: "Internal server error", error });
    }
})

const imageReqBody = z.object({
    url : z.string()
})
imageRouter.put("/:id", async (req, res) => {
    try{
        const image_id = z.coerce.number().parse(req.params.id)
        const { url } = imageReqBody.parse(req.body)
        await db.updateTable("Image").set({remote_image_url : url}).where("Image.image_id", "=", image_id).execute()
        return res.status(200).json({status: true, message : 'image uploaded'})
    }catch(error){
        if(error instanceof z.ZodError){
            return res.status(400).json({
                name : 'Invalid data type',
                message : JSON.parse(error.message)
            })
        }
        res.status(500).json({ message: "Internal server error", error });
    }
})

export default imageRouter