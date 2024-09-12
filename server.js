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
let posts = data.advertisements;
let nextId = posts.length + 1;

app.get("/posts", (req, res) => {
  res.send(JSON.stringify(posts));
});

app.get("/posts/:id", (req, res) => {

  const postId = Number(req.params.id);
  const index = posts.findIndex((o) => o.id == postId);
  res.send(JSON.stringify({ post: posts[index] }));
  
});

app.post("/posts", (req, res) => {
  posts.push({ ...req.body, id: String(nextId++), created: new Date().toLocaleString() });
  console.log(posts);
  res.status(204);
  res.end();
});

app.put("/posts/:id", (req, res) => {
    console.log(req.body);
  const postId = Number(req.body.id);
  console.log(postId);
  console.log(req.body.content);
  posts[postId].content = req.body.content;
  console.log(posts);
  res.status(204).end();
});

app.delete("/posts/:id", (req, res) => {
  const postId = Number(req.params.id);
  const index = posts.findIndex((o) => o.id == postId);
  if (index !== -1) {
    posts.splice(index, 1);
  }
  res.status(204);
  res.end();
});

const port = process.env.PORT || 7070;
app.listen(port, () =>
  console.log(`The server is running on http://localhost:${port}`)
  
);

console.log(posts);