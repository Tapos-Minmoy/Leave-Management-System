import express, { Request, Response } from "express";
import db, {Database, TableName} from "../database"
import {z} from "zod"
import { SelectQueryBuilder } from "kysely";
import { paginatedResults } from "../helper/paginatedResults";

const certificateWithdrawal = express.Router();

certificateWithdrawal.get("/:user_id", async(req, res)=>{
    try{
        const user_id = z.coerce.string().parse(req.params.user_id);
        var userInfo = await db.selectFrom("User")
        .selectAll()
        .innerJoin("Student", "User.user_id", "Student.user_id")
        .innerJoin("Hall", "Hall.hall_id", "Student.hall_id")
        .innerJoin("Address", "Address.address_id", "User.permanent_address_id")
        .where("User.user_id", "=", user_id)
        .execute()

        var profileImage = await db.selectFrom("Image").select(["Image.image_path"])
        .where("Image.image_id", "=", userInfo[0]?.profile_image_id).execute()

        var signImage = await db.selectFrom("Image").select(["Image.image_path"])
        .where("Image.image_id", "=", userInfo[0]?.sign_id).execute()
        var data = {
            ...userInfo[0],
            profile_image: profileImage[0]?.image_path || null,
            sign_image: signImage[0]?.image_path || null
        }
        if(userInfo?.length) res.status(200).json(data)
        else res.status(404).json({message: "User not found"}) 
    }catch(error){
        console.log(error);
        res.status(500).json({ message: "Internal server error", error });
    }
})



const formBody = z.object ({
    cf_form_id: z.number().nullable(),
    cf_history_id: z.number(),
    degree: z.string().nullable(),
    district:z.string().nullable(),
    father_name_bn: z.string().nullable(),
    father_name_eng: z.string().nullable(),
    fifth_year_exam_actual_year: z.string().nullable(),
    fifth_year_exam_cgpa: z.string().nullable(),
    fifth_year_exam_name: z.string().nullable(),
    fifth_year_exam_time: z.string().nullable(),
    fir_year_exam_actual_year: z.string().nullable(),
    fir_year_exam_cgpa: z.string().nullable(),
    fir_year_exam_name: z.string().nullable(),
    fir_year_exam_time: z.string().nullable(),
    fourth_year_exam_actual_year: z.string().nullable(),
    fourth_year_exam_cgpa: z.number().nullable(),
    fourth_year_exam_name: z.string().nullable(),
    fourth_year_exam_time: z.string().nullable(),
    hall_name: z.string().nullable(),
    mobile_phone: z.string().nullable(),
    mother_name_bn: z.string(),
    mother_name_eng: z.string(),
    post_office: z.string().nullable(),
    present_address: z.string().nullable(),
    profile_image: z.string().nullable(),
    sec_year_exam_actual_year: z.string().nullable(),
    sec_year_exam_cgpa: z.number().nullable(),
    sec_year_exam_name: z.string().nullable(),
    sec_year_exam_time: z.string().nullable(),
    student_id: z.number().nullable(),
    student_name_bn: z.string().nullable(),
    student_name_eng: z.string().nullable(),
    thana: z.string().nullable(),
    third_year_exam_actual_year: z.string().nullable(),
    third_year_exam_cgpa: z.number().nullable(),
    third_year_exam_name: z.string().nullable(),
    third_year_exam_time: z.string().nullable(),
    village: z.string().nullable(),
})

export default certificateWithdrawal