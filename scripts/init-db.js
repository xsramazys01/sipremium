const sqlite3 = require("sqlite3").verbose()
const fs = require("fs")
const path = require("path")

// Create database connection
const db = new sqlite3.Database("./sipremium.db", (err) => {
  if (err) {
    console.error("Error opening database:", err.message)
    process.exit(1)
  }
  console.log("Connected to SQLite database")
})

// Read and execute SQL files
const initSql = fs.readFileSync(path.join(__dirname, "init-database.sql"), "utf8")
const seedSql = fs.readFileSync(path.join(__dirname, "seed-data.sql"), "utf8")

// Execute initialization script
db.exec(initSql, (err) => {
  if (err) {
    console.error("Error initializing database:", err.message)
    process.exit(1)
  }
  console.log("Database schema created successfully")

  // Execute seed data script
  db.exec(seedSql, (err) => {
    if (err) {
      console.error("Error seeding database:", err.message)
      process.exit(1)
    }
    console.log("Database seeded successfully")

    // Close database connection
    db.close((err) => {
      if (err) {
        console.error("Error closing database:", err.message)
      } else {
        console.log("Database initialization complete!")
      }
    })
  })
})
