const seedData = require("./nguyenphi_initialdata");

let database = null;

const initConnection = async () => {
  if (database) return;
  try {
    database = await seedData(process.env.DATABASE_URL);
  } catch (error) {
    console.log("error", error);
  }
};

initConnection();
