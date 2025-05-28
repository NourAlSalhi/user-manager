const fs = require("fs");

// Load users from JSON file
const loadUsers = () => {
  const data = fs.readFileSync("./data.json", "utf8");
  return JSON.parse(data);
};

// Save users to JSON file
const saveUsers = (users) => {
  fs.writeFileSync("./data.json", JSON.stringify(users, null, 2), "utf8");
};

const command = process.argv[2];
const args = process.argv.slice(3); 

if (command === "list") {
  const users = loadUsers();
  console.log("Users:");
  users.forEach(user => {
    console.log(`- ID: ${user.id} | Name: ${user.name} | Role: ${user.role} | Skills: ${user.skill.join(", ")}`);
  });

} else if (command === "add") {
  const [name, role, skillString] = args;

  if (!name || !role || !skillString) {
    console.log('Usage: node app.js add "Name" "Role" "Skill1, Skill2"');
    process.exit(1);
  }

  const users = loadUsers();
  const id = users.length ? users[users.length - 1].id + 1 : 1;

  const skillArray = skillString.split(",").map(s => s.trim());

  users.push({ id, name, role, skill: skillArray });
  saveUsers(users);
  console.log(`Added: ${name} as ${role}, skills: ${skillArray.join(", ")}`);

} else if (command === "delete") {
  const id = parseInt(args[0]);
  if (isNaN(id)) {
    console.log('Usage: node app.js delete id');
    process.exit(1);
  }

  const users = loadUsers();
  const filtered = users.filter(user => user.id !== id);
  if (filtered.length === users.length) {
    console.log(`No user found with ID ${id}`);
  } else {
    saveUsers(filtered);
    console.log(`User with ID ${id} deleted`);
  }

} else {
  console.log(`
  Commands:
  node app.js list
  node app.js add "Name" "Role" "Skill1,Skill2"
  node app.js delete <id>
`);
}
