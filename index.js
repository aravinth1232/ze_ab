import 'dotenv/config';
import connectDatabase from './src/config/database.js';
import app from './src/app.js';


// Connect to the database
await connectDatabase();

// Server setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});