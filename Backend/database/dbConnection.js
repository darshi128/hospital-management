import mongoose from "mongoose";

export const dbConnection =  () => {
    mongoose
    .connect(process.env.MONGO_URI,{
        dbName:"hospitalDB"
    })
    .then(() => console.log("DataBase Connected"))
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
        
    });
};