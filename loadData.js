import { MongoClient } from "mongodb";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.DB_LINK;

const productsJsonFilePath = "./src/data/fs/files/products.json";
const usersJsonFilePath = "./src/data/fs/files/user.json";

async function loadData(jsonFilePath, collectionName) {
  const client = new MongoClient(uri);

  try {
    await client.connect();

    const database = client.db();
    const collection = database.collection(collectionName);

    // Leer el archivo JSON
    const jsonData = JSON.parse(fs.readFileSync(jsonFilePath, "utf-8"));

    // Insertar los datos en la base de datos
    const result = await collection.insertMany(jsonData);
    console.log(
      `${result.insertedCount} documentos agregados correctamente en la colección ${collectionName}.`
    );
  } catch (error) {
    console.error(
      `Error al cargar los datos en la colección ${collectionName}:`,
      error
    );
  } finally {
    await client.close();
  }
}

loadData(productsJsonFilePath, "products");

loadData(usersJsonFilePath, "users");