const mongoose = require("mongoose");

exports.dataBase = () => {
    mongoose.connect(process.env.MONGO_URL)
    .then((con)=> console.log(`Database Connected: ${con.connection.host}`))
    .catch((error) => 
        console.log(error))
};