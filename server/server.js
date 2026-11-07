import app from './src/app.js'
import connectDB from './src/config/db.js'
import { redis } from './src/config/redis.js';



redis.on("connect", () => {
    console.log("Connected to Redis");
});

redis.on("error", (err) => {
    console.error("Error connecting to Redis:", err);
});

await connectDB()

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});