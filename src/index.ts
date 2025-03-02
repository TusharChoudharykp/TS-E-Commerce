import express, { Application, Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import "./config/databaseConnection";
import routes from "./routes/index";

const app: Application = express();
const PORT: number = 8001;

app.use(bodyParser.json());

// Routes
app.use("/api", routes);

// Error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Something broke!" });
});

app.listen(PORT, () => console.log(`Server Started on port ${PORT}`));
