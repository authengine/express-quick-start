require("dotenv").config();
const path = require("path");
const express = require("express");
const authengine = require("@authengine/node");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

const client = new authengine.default.Client({
  apiUrl: process.env.AUTHENGINE_API_URL,
  tenantId: process.env.AUTHENGINE_TENANT_ID,
  privateToken: process.env.AUTHENGINE_PRIVATE_TOKEN,
});

const protectWithAuthengine = (req, res, next) => {
  const token = req.headers.authorization?.substring(7);
  if (token) {
    client.session
      .validateToken(token)
      .then((session) => {
        req.session = session;
        return next();
      })
      .catch(() => {
        return res.status(401).send("Unauthorized");
      });
  } else {
    return res.status(401).send("Missing token");
  }
};

app.post("/login", async (req, res) => {
  const { email } = req.body;
  try {
    const session = await client.magicLink.create({ email });
    return res.status(200).send("Magic link sent");
  } catch (e) {
    return res.status(404).send("User does not exist");
  }
});

app.post("/register", async (req, res) => {
  const { email, name } = req.body;
  try {
    const user = await client.user.create({ email, name });
    const magicLink = await client.magicLink.create({ email });
  } catch (err) {
    return res.sendStatus(400);
  }
});

app.get("/whoami", protectWithAuthengine, async (req, res) => {
  return res.json(req.session.user);
});

app.listen(port, () => {
  console.log(`express-quick-start listening on port ${port}`);
});
