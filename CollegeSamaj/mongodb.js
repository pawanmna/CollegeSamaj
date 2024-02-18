// MongoDB Schema and Connection

const mongoose = require('mongoose');

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/college', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB Connected');
}).catch(err => {
    console.error('MongoDB Connection Error:', err);
});

// Define MongoDB Schema
const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    year: String,
    contact: String,
    collegePerformance: String,
    achievement: String
});
const User = mongoose.model('User', UserSchema);

module.exports = User; // Export User model if needed in other files
