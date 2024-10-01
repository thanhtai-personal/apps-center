const createDatabaseAndCollections = require("./initialscript");

let database = null;

const initConnection = async () => {
  if (database) return;
  try {
    database = await createDatabaseAndCollections(process.env.DATABASE_URL);
  } catch (error) {
    console.log("error", error);
  }
};

initConnection();
