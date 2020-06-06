const mongoose = require('mongoose');

const logError = (err) => {
    console.error(err);
    process.exit(1);
}

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.catch((err) => logError(err));

mongoose.connection.on('error', (err) => {
    logError(err);
});

mongoose.connection.on('connecting', () => {
    console.log('Database connecting');
});

mongoose.connection.on('connected', () => {
    console.log('Database connected');
});
