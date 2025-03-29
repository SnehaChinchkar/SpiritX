const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        credentials: true,
    })
);

app.get('/', (req, res) => {
    res.json({ message: "Welcome to the Home Page API!" });
});
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

app.use('/api/user', require('./routes/userRoutes'));
app.use("/api/auth", require("./routes/authRoutes"));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
