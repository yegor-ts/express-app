const mongoose = require('mongoose');

const config = require('./config');

mongoose.connect(config.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then( () => {
    console.log(`Successfully connected to MongoDB at ${config.URI}`);
});