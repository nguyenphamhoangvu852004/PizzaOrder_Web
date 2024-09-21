import express from "express";
import mysqlConnection from "../../../config/database_config.js";
const route = express.Router()


route.get('/product', async (req, res) => {
  try {
    const response = await mysqlConnection.query("SELECT ProductID,Name,Price,Image from Products p ")
    res.json(response[0])
  } catch (error) {
    console.log(error)
  }
})



export default route
