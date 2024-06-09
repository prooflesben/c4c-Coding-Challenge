import express from "express";
import { promises as fs } from "fs";

const app = express();
const port = 4000;

/* 
  APPLICATION MIDDLEWARE
  This section contains some server configuration.
  You will likely not need to change anything here to meet the requirements.
  (but you are welcome to, if you'd like)
*/

// Parse request bodies as JSON
app.use(express.json());
// Enable CORS for the frontend so it can call the backend
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

/*
  APPLICATION ROUTES
*/

app.get("/partners", async (req, res) => {
  try {
    res.status(200).json(await getPartners());
  } catch (err) {
    res.status(400).json({ message: message });
  }
});

app.put("/partners", async (req, res) => {
  const { logoUrl, name, description, isCurrentParnter } = req.body;

  try {
    await storePartner(logoUrl, name, description, isCurrentParnter);

    res.status(200).send();
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete("/partners/:name", async (req, res) => {
  const  name  = req.params.name;
  console.log(name)
  try {
    await deletePartner(name);

    res.status(200).send();
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Think about fetching and changing instead of holding a handle
async function storePartner(logoUrl, name, description, isCurrentParnter) {
  let partners = await getPartners();
  
  partners[name] = {
    logoUrl: logoUrl,
    name: name,
    description: description,
    isCurrentParnter: isCurrentParnter,
  };

  try {
    await fs.writeFile(
      "./backend/jsons/partners.json",
      JSON.stringify(partners, null, 2),
      "utf8"
    );
  } catch (err) {
    throw err;
  }
}

async function getPartners() {
  try {
    const data = await fs.readFile("./backend/jsons/partners.json", "utf8");
    const jsonData = JSON.parse(data);
    return jsonData;
  } catch (err) {
    throw err;
  }
}

async function deletePartner(name){
  
  try{
    console.log(name)
    let partners = await getPartners();
    console.log("partners before delete",partners)
    delete partners[name]
    console.log("partners after delete",partners)
    await fs.writeFile(
      "./backend/jsons/partners.json",
      JSON.stringify(partners, null, 2),
      "utf8"
    );
  }
  catch(err){
    throw err;
  }
}

// Start the backend
app.listen(port, () => {
  console.log(`Express server starting on port ${port}!`);
})
