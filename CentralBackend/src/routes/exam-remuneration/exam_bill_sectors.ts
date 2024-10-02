import express from "express";
import { SelectQueryBuilder } from "kysely";
import { z } from "zod";
import db, { Database, TableName } from "../../database";
import { addFiltration } from "../../helper/addFiltration";
import { paginatedResults } from "../../helper/paginatedResults";
import { verifySession } from "../../middlewares/verifySession";
import {
  PermissionRequest,
  Role,
  checkPermissions,
} from "../../middlewares/checkPermissions";

const examBillSectorRouter = express.Router();

const checkChairman = async (req: PermissionRequest, res: express.Response) => {
  const session_id = req.session?.session_id as string;
  const isChairman = await db
    .selectFrom("Auth_Session")
    .innerJoin("Roles", "Auth_Session.user_id", "Roles.user_id")
    .where("Auth_Session.session_id", "=", session_id)
    .where("Roles.role", "=", "chairman")
    .select(["Auth_Session.user_id", "Roles.start_date", "Roles.end_date"])
    .executeTakeFirst();
  console.log(isChairman);
  return isChairman;
};

// get request
examBillSectorRouter.get(
  "/",
  verifySession,
  checkPermissions,
  async (req: PermissionRequest, res) => {
    try {
      // check if the user is chairman
      const chairmanId = await checkChairman(req, res);
      if (!chairmanId) {
        return res.status(403).json({
          message: "You don't have enough permissions to access this document.",
        });
      }

      try {
        const query = await db.selectFrom("Bill_Sectors").selectAll().execute();
        res.status(200).send({
          data: query,
        });
      } catch (err) {
        res.status(500).json({ message: "Internal server error", err });
      }
    } catch (err) {
      res.status(500).json({ message: "Internal server error", err });
    }
  },
);

// post request
examBillSectorRouter.post(
  "/",
  verifySession,
  checkPermissions,
  async (req: PermissionRequest, res) => {
    try {
      // check if the user is chairman
      const chairmanId = await checkChairman(req, res);
      if (!chairmanId) {
        return res.status(403).json({
          message: "You don't have enough permissions to access this document.",
        });
      }

      const examBillSectorsInfo = z
        .object({
          bill_sector_id: z.number(),
          bill_sector_name: z.string(),
        })
        .parse(req.body);

      try {
        const query = await db
          .insertInto("Bill_Sectors")
          .values({
            bill_sector_id: examBillSectorsInfo.bill_sector_id,
            bill_sector_name: examBillSectorsInfo.bill_sector_name,
          })
          .execute();

        const convertedQuery = JSON.parse(
          JSON.stringify(query, (key, value) => 
            typeof value === 'bigint' ? value.toString() : value
          )
        );

        res.status(200).json({
          message: "Exam Bill Sector added successfully.",
          data: convertedQuery,
        });
      } catch (err) {
        res.status(500).json({ message: "Internal server error", err });
      }
    } catch (err) {
      res.status(500).json({ message: "Internal server error", err });
    }
  },
);

// put request
examBillSectorRouter.put(
  "/",
  verifySession,
  checkPermissions,
  async (req: PermissionRequest, res) => {
    try {
      // check if the user is chairman
      const chairmanId = await checkChairman(req, res);
      if (!chairmanId) {
        return res.status(403).json({
          message: "You don't have enough permissions to access this document.",
        });
      }
      const examBillSectorsInfo = z
        .object({
          bill_sector_id: z.number(),
          bill_sector_name: z.string(),
        })
        .parse(req.body);

      const {bill_sector_id, bill_sector_name} = examBillSectorsInfo;

      const query = await db
        .updateTable("Bill_Sectors")
        .set({
          bill_sector_name: bill_sector_name,
        })
        .where("bill_sector_id", "=", bill_sector_id)
        .execute();

      res.status(200).json({
        message: "Exam Bill Sector updated successfully.",
      });
    } catch (err) {
      res.status(500).json({ message: "Internal server error", err });
    }
  },
);

// delete request
examBillSectorRouter.delete(
  "/",
  verifySession,
  checkPermissions,
  async (req: PermissionRequest, res) => {
    try {
      // check if the user is chairman
      const chairmanId = await checkChairman(req, res);
      if (!chairmanId) {
        return res.status(403).json({
          message: "You don't have enough permissions to access this document.",
        });
      }

      const billSectorInfo = z.object({
        bill_sector_id: z.number(),
      }).parse(req.body)

      const {bill_sector_id} = billSectorInfo;

      const query = await db
        .deleteFrom("Bill_Sectors")
        .where("bill_sector_id", "=", bill_sector_id)
        .execute();

      res.status(200).json({
        message: "Exam Bill Sector data deleted successfully.",
      });
    } catch (err) {
      res.status(500).json({ message: "Internal server error", err });
    }
  },
);

export default examBillSectorRouter;
