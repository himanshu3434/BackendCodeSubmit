import { Router } from "express";
import {
  CreateSubmission,
  getSubmissions,
} from "../controllers/submission.controller";

const submissionRouter = Router();

submissionRouter.route("/create").post(CreateSubmission);
submissionRouter.route("/all").get(getSubmissions);
export default submissionRouter;
