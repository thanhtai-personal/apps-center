const fs = require('fs-extra');
const path = require('path');

// Function to recursively delete all 'node modules' folders
async function cleanNodeModule(dir) {
  const entries = await fs.readdir(dir);
  for (const entry of entries) {
    const entryPath = path.join(dir, entry);
    const stats = await fs.stat(entryPath);
    if (stats.isDirectory()) {
      try {
        if (entry === "node_modules") {
        } else {
          await cleanNodeModule(entryPath);
        }
      } catch (error) {
        console.log("Error", error)
      }
    } else {
      if (entryPath === "package-lock.json" || entryPath === "pnpm-lock.yaml") {
        console.log("DELETING", entryPath)
        await fs.remove(entryPath);
      }
    }
  }
}

// Start cleaning 'dist' folders from the current directory
cleanNodeModule('./').catch(err => console.error(err));