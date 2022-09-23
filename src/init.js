import "dotenv/config";
import "./db";
import "./models/Video";
import app from "./server";

const PORT = 80;
const handleListening = () => {
  console.log(`Server is Listening port ${PORT} !!! 🔨`);
};

// Listening...
app.listen(PORT, handleListening);
