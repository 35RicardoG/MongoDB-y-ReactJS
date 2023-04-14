const mongoose = require("mongoose");

//const URI = 'mongodb://127.0.0.1:27017/proyecto';
const URI = 'mongodb+srv://ricardog:DogeMeme.3@cluster0.8i0qs7s.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

}).then(() => {
    console.log("MongoDB is connected");
}).catch((err) => {
    console.log(err);
});

module.exports = mongoose;