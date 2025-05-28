const fs = require("fs");

const loadNotes = () => {
  try {
    const data = fs.readFileSync("./notes.json", "utf8");
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
};

const saveNotes = (notes) => {
  fs.writeFileSync("./notes.json", JSON.stringify(notes, null, 2), "utf8");
};

const command = process.argv[2];
const args = process.argv.slice(3);

if (command === "list") {
  const notes = loadNotes();
  console.log("Notes:");
  notes.forEach(note => {
    console.log(`- ${note.title}: ${note.content}`);
  });

} else if (command === "add") {
  const [title, ...contentParts] = args;
  const content = contentParts.join(" ");

  if (!title || !content) {
    console.log('Usage: node notes.js add "Title" "Content"');
    process.exit(1);
  }

  const notes = loadNotes();
  const duplicate = notes.find(n => n.title === title);

  if (duplicate) {
    console.log("Note title already exists.");
  } else {
    notes.push({ title, content });
    saveNotes(notes);
    console.log(`Note added: ${title}`);
  }

} else if (command === "delete") {
  const [title] = args;
  if (!title) {
    console.log('Usage: node notes.js delete "Title"');
    process.exit(1);
  }

  const notes = loadNotes();
  const filtered = notes.filter(note => note.title !== title);

  if (filtered.length === notes.length) {
    console.log("Note not found.");
  } else {
    saveNotes(filtered);
    console.log(`Note deleted: ${title}`);
  }

} else {
  console.log(`
  Commands:
  node notes.js list
  node notes.js add "Title" "Content"
  node notes.js delete "Title"
`);
}
