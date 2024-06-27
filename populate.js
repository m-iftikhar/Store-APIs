require('dotenv').config();

const connectDB = require('./db/connect');
const Product = require('./models/product');
const jsonProducts = require('./products.json');

const start = async () => {
    try {
        // Connect to the database
        await connectDB(process.env.MONGO_URI);
        console.log("Connected to DB successfully");

        // Clear the existing data
        await Product.deleteMany();
        console.log("Existing data deleted");

        // Populate the database with the JSON data
        await Product.create(jsonProducts);
        console.log("Database successfully populated");
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

start();
