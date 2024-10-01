const _ = require("lodash");
const { MongoClient } = require("mongodb");
const bcrypt = require("bcryptjs");
const { composeAsync, fetchHtmlFromUrl } = require("./helper");
const shell = require("shelljs");

const replaceAllObj = {
  ".vn.vn": ".vn",
};

// truyencv (Base URL)
const VISIOR_BASE = "https://visior.vn";

const recoverData = async ($root) => {
  console.log("START CONNECT--------", process.env.DATABASE_URL);
  const client = new MongoClient(process.env.DATABASE_URL);
  console.log("CREATE CONNECTION SUCCESSFULLY--------");
  await client.connect();
  const database = client.db("sale_web");
  const categoryCollection = await database.collection("category");
  const productCollection = database.collection("product");
  const imageCollection = await database.collection("image");
  const branchCollection = await database.collection("branch");
  console.log("CONNECT SUCCESSFULLY--------");
  try {
    const result = await productCollection.updateMany(
      {
        is_delete: true,
      },
      {
        $set: {
          is_delete: false,
        },
      }
    );
    console.log("***DONE***");
  } catch (error) {
    console.log("error", error);
  } finally {
    await client.close();
  }
};

const recover = async () => {
  return composeAsync(recoverData, fetchHtmlFromUrl)(VISIOR_BASE);
};

recover();
