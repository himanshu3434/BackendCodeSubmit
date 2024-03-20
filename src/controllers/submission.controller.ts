import { apiError } from "../utils/apiError";
import { apiResponse } from "../utils/apiResponse";
import pool from "../db/databse";
import { Request, Response, NextFunction } from "express";
import axios from "axios";
import { asyncHandler } from "../utils/asyncHandler";
import { RapidGetSubmissionType } from "../types/types";
import { v4 as uuidv4 } from "uuid";
import base64 from "base-64";
import utf8 from "utf8";

type RapidSubmitType = {
  data: {
    token: string;
  };
};
type RapidGetSubmitType = {
  data: {
    stdout: string;
    status: {
      id: string;
      description: string;
    };
  };
};
const CreateSubmission = asyncHandler(async (req: Request, res: Response) => {
  const { username, encodedStdin, encodedCode, language } = req.body;

  if (
    [username, encodedStdin, encodedCode, language].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new apiError(400, "all Fields Must be Field");
  }

  const rapidApiKey = process.env.X_RAPIDAPI_KEY || "";
  const rapidApiHost = process.env.X_RAPIDAPI_HOST || "";
  const rapidApiUrl = process.env.RAPIDAPI_URL || "";

  const createOptions = {
    method: "POST",
    url: rapidApiUrl,
    params: {
      base64_encoded: "true",
      fields: "*",
    },
    headers: {
      "content-type": "application/json",
      "Content-Type": "application/json",
      "X-RapidAPI-Key": rapidApiKey,
      "X-RapidAPI-Host": rapidApiHost,
    },
    data: {
      language_id: language,
      source_code: encodedCode,
      stdin: encodedStdin,
    },
  };

  const submitResponse = (await axios.request(
    createOptions
  )) as RapidSubmitType;

  const token = submitResponse.data.token;

  const getUrl = rapidApiUrl + "/" + token;
  const statusOptions = {
    method: "GET",
    url: getUrl,
    params: {
      base64_encoded: "true",
      fields: "*",
    },
    headers: {
      Authorization: `Bearer ${token}`,
      "X-RapidAPI-Key": rapidApiKey,
      "X-RapidAPI-Host": rapidApiHost,
    },
  };

  const getAPi = async () =>
    (await axios.request(statusOptions)) as RapidGetSubmissionType;

  const pr = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(getAPi());
    }, 2000);
  });
  const response = (await pr) as RapidGetSubmitType;

  const output = response.data.stdout || "";
  // console.log("output ", output);

  const createdAt = new Date();
  const docid = uuidv4();
  const submission = await pool.query(
    "INSERT INTO Submission (docid,language,username,output,code,createdAt,stdin)  VALUES (?,?,?,?,?,?,?)",
    [docid, language, username, output, encodedCode, createdAt, encodedStdin]
  );

  // console.log("submission   ", submission);

  res.status(200).json(new apiResponse(200, submission[0], "Code Submitted"));
});
const getSubmissions = asyncHandler(async (req, res) => {
  const allSubmission = await pool.query("SELECT * FROM Submission ");
  if (!allSubmission)
    throw new apiError(
      500,
      "Internal Server Error While Fetching All Submission"
    );
  // console.log(allSubmission);
  return res.status(200).json(allSubmission[0]);
});
export { CreateSubmission, getSubmissions };
