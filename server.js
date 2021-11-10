const express = require('express');
const connectDB = require('./config/db');

const app = express();

connectDB();

app.use(express.json());
app.use('/api/users', require('./routes/api/users'));

app.get('/', (req, res) => {
    res.send('App is running');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
