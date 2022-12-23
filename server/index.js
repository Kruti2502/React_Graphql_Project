const express = require('express');
const {graphqlHTTP} = require("express-graphql");
const schema = require("./schema/schema");
const cors = require("cors");
require('dotenv').config();
const connectDB = require("./config/db");

const app = express();

// Connect to database
connectDB();

app.use(cors());

app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development',
}));

app.listen(3030, () => {
    console.log("listening on http://localhost:3030");
})