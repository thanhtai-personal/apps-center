const { MongoClient } = require("mongodb");
const bcrypt = require("bcryptjs");

async function createDatabaseAndCollections(uri) {
  console.log("START CONNECT--------", uri);
  const client = new MongoClient(uri);
  console.log("CREATE CONNECTION SUCCESSFULLY--------");

  try {
    // Connect to the MongoDB cluster
    await client.connect();
    console.log("CONNECT SUCCESSFULLY--------");

    // Create a new database
    const database = client.db("hptool");

    // Create the products collection
    try {
      const productCollection = database.collection("product");
      const collectionExists = await productCollection.listIndexes().hasNext();
      if (collectionExists) {
        await productCollection.drop();
      }
    } catch (error) {
      console.log("drop collection error");
    }

    await database.createCollection("product", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["name", "price"],
          properties: {
            name: { bsonType: "string" },
            branch: { bsonType: "string" },
            code: { bsonType: "string" },
            sku: { bsonType: "string" },
            model: { bsonType: "string" },
            engine: { bsonType: "string" },
            original: { bsonType: "string" },
            warranty_time: { bsonType: "string" },
            quantity: { bsonType: "number", minimum: 0 },
            sold: { bsonType: "number", minimum: 0 },
            remain: { bsonType: "number", minimum: 0 },
            price: { bsonType: "number", minimum: 0 },
            rating: {
              bsonType: "number",
              enum: [0, 1, 2, 3, 4, 5],
            },
            images: {
              bsonType: "array",
              items: { bsonType: "objectId" },
            },
            categories: {
              bsonType: "array",
              items: { bsonType: "string" },
            },
            thumb: { bsonType: "objectId" },
            short_description: { bsonType: "string" },
            gifts: {
              bsonType: "array",
              items: { bsonType: "objectId" },
            },
            videos: {
              bsonType: "array",
              items: { bsonType: "string" },
            },
            description: { bsonType: "string" },
            technique: { bsonType: "string" },
            created_at: { bsonType: "date" },
            updated_at: { bsonType: "date" },
            is_delete: { bsonType: "bool" },
          },
        },
      },
    });

    // Create the orders collection
    try {
      const orderCollection = database.collection("order");
      const collectionExists = await orderCollection.listIndexes().hasNext();
      if (collectionExists) {
        await orderCollection.drop();
      }
    } catch (error) {
      console.log("drop collection error");
    }
    await database.createCollection("order", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["product_id", "quantity"],
          properties: {
            name: { bsonType: "string" },
            product_id: { bsonType: "objectId" },
            quantity: { bsonType: "int", minimum: 1 },
            description: { bsonType: "string" },
            status: {
              bsonType: "string",
              enum: ["pending", "in progress", "completed"],
            },
            created_at: { bsonType: "date" },
            updated_at: { bsonType: "date" },
            is_delete: { bsonType: "bool" },
          },
        },
      },
    });

    // Create the branch collection
    try {
      const branchCollection = database.collection("branch");
      const collectionExists = await branchCollection.listIndexes().hasNext();
      if (collectionExists) {
        await branchCollection.drop();
      }
    } catch (error) {
      console.log("drop collection error");
    }
    await database.createCollection("branch", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          properties: {
            name: { bsonType: "string" },
            description: { bsonType: "string" },
            logo: { bsonType: "objectId" },
            created_at: { bsonType: "date" },
            updated_at: { bsonType: "date" },
            is_delete: { bsonType: "bool" },
          },
        },
      },
    });

    // Create the category collection
    try {
      const categoryCollection = database.collection("category");
      const collectionExists = await categoryCollection.listIndexes().hasNext();
      if (collectionExists) {
        await categoryCollection.drop();
      }
    } catch (error) {
      console.log("drop collection error");
    }
    await database.createCollection("category", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["name"],
          properties: {
            name: { bsonType: "string" },
            parent: { bsonType: "string" },
            level: { bsonType: "number" },
            created_at: { bsonType: "date" },
            updated_at: { bsonType: "date" },
            is_delete: { bsonType: "bool" },
          },
        },
      },
    });

    // Create the user collection
    try {
      const userCollection = database.collection("user");
      const collectionExists = await userCollection.listIndexes().hasNext();
      if (collectionExists) {
        await userCollection.drop();
      }
    } catch (error) {
      console.log("drop collection error");
    }
    await database.createCollection("user", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["username", "email", "password"],
          properties: {
            email: { bsonType: "string" },
            username: { bsonType: "string" },
            password: { bsonType: "string" },
            fullname: { bsonType: "string" },
            phoneNumber: { bsonType: "string" },
            address: { bsonType: "string" },
            created_at: { bsonType: "date" },
            updated_at: { bsonType: "date" },
            role: { bsonType: "objectId" },
            roleName: { bsonType: "string" },
            is_delete: { bsonType: "bool" },
          },
        },
      },
    });

    // Create the role collection
    try {
      const roleCollection = database.collection("role");
      const collectionExists = await roleCollection.listIndexes().hasNext();
      if (collectionExists) {
        await roleCollection.drop();
      }
    } catch (error) {
      console.log("drop collection error");
    }
    await database.createCollection("role", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["name"],
          properties: {
            name: { bsonType: "string" },
            created_at: { bsonType: "date" },
            updated_at: { bsonType: "date" },
            is_delete: { bsonType: "bool" },
          },
        },
      },
    });

    // create ui_config collection
    try {
      const roleCollection = database.collection("uiconfig");
      const collectionExists = await roleCollection.listIndexes().hasNext();
      if (collectionExists) {
        await roleCollection.drop();
      }
    } catch (error) {
      console.log("drop collection error");
    }
    await database.createCollection("uiconfig", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          properties: {
            name: { bsonType: "string" },
            slider_images: {
              bsonType: "array",
              items: { bsonType: "objectId" },
            },
            branchs: {
              // Thương hiệu nổi bật
              bsonType: "array",
              items: { bsonType: "objectId" },
            },
            categories: {
              //Dòng sản phẩm nổi bật
              bsonType: "array",
              items: { bsonType: "objectId" },
            },
            showing_categories: {
              //Dòng sản phẩm nổi bật
              bsonType: "array",
              items: { bsonType: "objectId" },
            },
            app_logo: { bsonType: "objectId" },
            hot_line: { bsonType: "string" },
            email: { bsonType: "string" },
            address: { bsonType: "string" },
            welcome_text: { bsonType: "string" },
            is_active: { bsonType: "bool" },
            created_at: { bsonType: "date" },
            updated_at: { bsonType: "date" },
            is_delete: { bsonType: "bool" },
          },
        },
      },
    });

    // Create the image collection
    try {
      const imageCollection = database.collection("image");
      const collectionExists = await imageCollection.listIndexes().hasNext();
      if (collectionExists) {
        await imageCollection.drop();
      }
    } catch (error) {
      console.log("drop collection error");
    }
    await database.createCollection("image", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["url"],
          properties: {
            url: { bsonType: "string" },
            alt_name: { bsonType: "string" },
            type: { bsonType: "string" },
            created_at: { bsonType: "date" },
            updated_at: { bsonType: "date" },
            is_delete: { bsonType: "bool" },
          },
        },
      },
    });
    console.log("Database and collections created successfully");

    console.log("Seeding data...");
    const roleCollection = await database.collection("role");
    const userCollection = await database.collection("user");

    console.log("Inserting role super admin");
    const roleSuperAdmin = {
      name: "superadmin",
      is_delete: false,
    };
    const insertedRole = await roleCollection.insertOne(roleSuperAdmin);
    console.log("Inserted role with _id: " + insertedRole.insertedId);

    console.log("Inserting user super admin");
    const hashPassword = await bcrypt.hash("Aaaa@1111", 10);
    console.log("hashPassword", hashPassword);
    const superAdminUser = {
      username: "superadmin",
      email: "hoangphatequ@gmail.com",
      password: hashPassword,
      fullname: "",
      phoneNumber: "",
      address: "",
      roleName: "superadmin",
      role: insertedRole.insertedId,
      is_delete: false,
    };
    const insertedUser = await userCollection.insertOne(superAdminUser);
    console.log(
      "Inserted super admin user with _id: " + insertedUser.insertedId
    );
    console.log("Seed data successful");
  } catch (err) {
    console.error("Error creating database and collections:", err);
  } finally {
    // Close the MongoDB client
    await client.close();
  }
}

module.exports = createDatabaseAndCollections;
