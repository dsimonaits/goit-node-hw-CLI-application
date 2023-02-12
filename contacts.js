const fs = require("fs").promises;
const path = require("path");
const contactsPath = path.join(__dirname, "./db/contacts.json");
const nodeId = require("node-id");

async function getContacts() {
  return await fs
    .readFile(contactsPath, "utf8")
    .then((contacts) => JSON.parse(contacts));
}

async function listContacts() {
  const contacts = await getContacts();

  console.table(contacts);
}

async function getContactById(contactId) {
  await getContacts().then((contacts) => {
    const contactById = contacts.find(({ id }) => id === contactId);

    console.table(contactById);
  });
}

async function addContact(name, email, phone) {
  const newContact = { id: nodeId(), name, email, phone };
  await getContacts().then(
    (contacts) =>
      fs.writeFile(contactsPath, JSON.stringify([...contacts, newContact])),
    { encoding: "utf8" }
  );

  console.table(await getContacts());
}

async function removeContact(contactId) {
  await getContacts().then(
    (contacts) =>
      fs.writeFile(
        contactsPath,
        JSON.stringify(contacts.filter((contact) => contact.id !== contactId))
      ),
    { encoding: "utf8" }
  );

  console.table(await getContacts());
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
