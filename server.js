import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import data from "./db.json" assert { type: "json" };

const app = express();

app.use(cors());
app.use(
  bodyParser.json({
    type(req) {
      return true;
    },
  })
);
app.use(function (req, res, next) {
  res.setHeader("Content-Type", "application/json");
  next();
});

let advertisements = data.advertisements;
let orders = data.orders;

let nextId = advertisements.length + 1;
let nextIdOrder = orders.length + 1;

// Объявления
app.get("/advertisements", (req, res) => {
  res.send(JSON.stringify(advertisements));
});

app.get("/advertisements/:id", (req, res) => {
  const advertisementId = req.params.id;
  const findAdvertisement = advertisements.find(
    (o) => o.id === advertisementId
  );
  res.send(JSON.stringify({ advertisement: findAdvertisement }));
});

app.post("/advertisements", (req, res) => {
  advertisements.push({
    ...req.body,
    id: String(nextId++),
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    createdAt: new Date().toLocaleString(),
    views: 0,
    likes: 0,
    imageUrl: req.body.imageUrl,
  });
  res.status(204);
  res.end();
});

app.put("/advertisements/:id", (req, res) => {
  const advertisementId = req.params.id;
  const findAdvertisement = advertisements.find(
    (o) => o.id === advertisementId
  );
  const index = advertisements.findIndex((o) => o == findAdvertisement);
  advertisements[index].name = req.body.name;
  res.status(204).end();
});

app.delete("/advertisements/:id", (req, res) => {
  const advertisementId = req.params.id;
  const findAdvertisement = advertisements.find(
    (o) => o.id === advertisementId
  );
  const index = advertisements.findIndex((o) => o == findAdvertisement);
  advertisements.splice(index, 1);
  res.status(204);
  res.end();
});

// Заказы
app.get("/orders", (req, res) => {
  res.send(JSON.stringify(orders));
});

const port = process.env.PORT || 7070;
app.listen(port, () =>
  console.log(`The server is running on http://localhost:${port}`)
);
