const fs = require("fs");
const path = require("path");

// ✅ absolute-safe path (fixes Ubuntu + Docker issues)
const filePath = path.resolve(__dirname, "../data/tasks.json");

console.log("📁 FILE STORAGE PATH:", filePath);

// ensure file exists
function ensureFile() {
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, "[]", "utf-8");
        console.log("📁 Created tasks.json");
    }
}

// READ
function readTasks() {
    try {
        ensureFile();

        const raw = fs.readFileSync(filePath, "utf-8");

        console.log("📖 RAW FILE CONTENT:", raw); // DEBUG

        return JSON.parse(raw || "[]");
    } catch (err) {
        console.error("❌ READ ERROR:", err.message);
        return [];
    }
}

// WRITE
function writeTasks(tasks) {
    const fs = require("fs");

    console.log("🔥 WRITE FUNCTION CALLED");
    console.log("DATA:", tasks);

    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));

    console.log("✅ FILE ACTUALLY WRITTEN");
}

module.exports = {
    readTasks,
    writeTasks
};