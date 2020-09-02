const mongoose = require('mongoose');

function connectDB() {
    var connectionURL = `mongodb+srv://root:jIP9lRUqmxjRwVnz@cluster0.lallq.mongodb.net/interview?retryWrites=true&w=majority`;

    // DB conenction and mongoose setup
    //mongoose.connect('mongodb://root:Yao199789!@localhost/admin',{useNewUrlParser: true},err=>{
    mongoose.connect(connectionURL, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
    .then(() => console.log('DB Connected!')).catch(err => {
        console.log(`DB Connection Error: ${err.message}`);
    });

    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
        console.log("Connected to DB")
    });
}

module.exports = {
    connectDB
}
