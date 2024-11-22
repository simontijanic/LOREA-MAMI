const mongoose = require('mongoose');

class Database {
  async connect(dbString) {
    try {
        //console.log(dbString)
      const connection = await mongoose.connect(dbString);
      console.log(`Connected to database: ${connection.connection.name}`);
    } catch (error) {
        console.log("problem i dbhandler")
    }
  }

  async disconnect() {
    try {
      await mongoose.disconnect();
      console.log('Database connection closed');
    } catch (error) {
      console.error('Error disconnecting from the database:', error);
    }
  }
}

module.exports = new Database(); 