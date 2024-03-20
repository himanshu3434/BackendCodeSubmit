import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

app.use(express.urlencoded({ extended: true, limit: "10mb" }));

import submissionRouter from "./routes/submission.routes";

app.use("/api/v1/submission", submissionRouter);
export { app };
