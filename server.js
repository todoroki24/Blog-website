const dotenv = require("dotenv");
const connectDB = require('./config/db.js');

const app = require('./app.js');

dotenv.config();
connectDB();

const autherRouter = require('./routes/author.routes.js')
const userRouter = require('./routes/user.routes.js');
app.use('/author',autherRouter);
app.use('/user',userRouter);



const PORT = process.env.PORT || 8080;

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})