import dotenv from "dotenv";
import express from "express";
import authengine from "../node_modules/@authengine/node/dist/index";

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

const client = new authengine.Client({
  apiUrl: process.env.REACT_APP_AUTHENGINE_API_URL,
  projectId: process.env.AUTHENGINE_PROJECT_ID,
  secretKey: process.env.AUTHENGINE_SECRET_KEY,
});

const protectWithAuthengine = (req, res, next) => {
  console.log(client.session);
  client.session
    .getByBearerTokenFromHeader(req)
    .then((session) => {
      req.session = session;
      return next();
    })
    .catch((error) => {
      console.log(error);
      return res.status(401).send("Unauthorized");
    });
};

app.get("/whoami", protectWithAuthengine, async (req, res) => {
  // @ts-ignore
  return res.json(req.session.user);
});

app.listen(port, () => {
  console.log(`express-quick-start listening on port ${port}`);
});
