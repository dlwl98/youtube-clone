import "./db";
import "./models/Video";
import app from "./server";

const PORT = 4000;
const handleListening = () => {
  console.log(`Server is Listening port ${4000} !!! 🔨`);
};

// Listening...
app.listen(PORT, handleListening);
