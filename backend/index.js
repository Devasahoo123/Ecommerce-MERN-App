import express from 'express';
import cors from  'cors'
import ('dotenv');
import connectDB from './config/db.js';
import router  from './routes/index.js';


const app = express();
app.use(cors(
    {
        origin: process.env.FRONTEND_URL,
        credentials : true
    }
));
// parse requests of content-type - application
app.use(express.json());
app.use("/api",router);


const  PORT = 1000 || process.env.PORT;

connectDB();

app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`)
});
