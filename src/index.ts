import * as dotenv from "dotenv";
dotenv.config();
import { app } from "./app";

app.listen(process.env.PORT || 8000, () => {
  console.log("server running on the port ", process.env.PORT);
});
