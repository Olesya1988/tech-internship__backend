import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import data from "./db.json" assert { type: "json" };

console.log(data);
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

// let posts = [
//     {id: 0, content: "«Секретка» - это специальная гайка или болт, которая отличается рисунком-конфигурацией выемки под специальный ключ и качеством металла. Кроме того, важным атрибутом является специальное вращающееся кольцо против отвертывания экстрактором.", created: new Date().toLocaleString()},
//     {id: 1, content: "Сход-развал (его же принято называть развал-схождение) – это процедура регулировки углов наклона колес автомобиля. Дело в том, что в процессе эксплуатации подвески колеса могут встать под неправильным углом, и машину при езде будет уводить в сторону. На сухой дороге это может оказаться не слишком заметно, но в дождь разница будет ощутима.", created: new Date().toLocaleString()}
// ];
let advertisements = data.advertisements;
console.log(advertisements);
let nextId = advertisements.length + 1;

app.get("/advertisements", (req, res) => {
  res.send(JSON.stringify(advertisements));
});

app.get("/advertisements/:id", (req, res) => {
  const advertisementId = req.params.id; 
  console.log(advertisementId);  
  const findAdvertisement = advertisements.find((o) =>o.id === advertisementId);
  console.log(findAdvertisement);  
  res.send(JSON.stringify({ advertisement: findAdvertisement }));
  
});

app.post("/advertisements", (req, res) => {
  advertisements.push({ ...req.body, id: String(nextId++), name: req.body.name, description: req.body.description, price: req.body.price, createdAt: new Date().toLocaleString(), views: 0, likes: 0, imageUrl: req.body.imageUrl });
  console.log(advertisements);
  res.status(204);
  res.end();
});

app.put("/advertisements/:id", (req, res) => {
  const advertisementId = req.params.id; 
  console.log(advertisementId); 
  
  const findAdvertisement = advertisements.find((o) =>o.id === advertisementId);
  console.log(findAdvertisement);
  const index = advertisements.findIndex((o) => o == findAdvertisement);  
  advertisements[index].name = req.body.name; 
  console.log(advertisements);

  res.status(204).end();
});

app.delete("/advertisements/:id", (req, res) => {
  const advertisementId = req.params.id; 
  console.log(advertisementId); 
  console.log(typeof advertisementId); 
  const findAdvertisement = advertisements.find((o) =>o.id === advertisementId);
  console.log(findAdvertisement);
  const index = advertisements.findIndex((o) => o == findAdvertisement);
  console.log(index);  
  advertisements.splice(index, 1);  
  console.log(advertisements);
  res.status(204);
  res.end();
});

const port = process.env.PORT || 7070;
app.listen(port, () =>
  console.log(`The server is running on http://localhost:${port}`)
  
);