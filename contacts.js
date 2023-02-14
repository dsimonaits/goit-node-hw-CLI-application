const fs = require("fs").promises;
const path = require("path");
const contactsPath = path.join(__dirname, "./db/contacts.json");
const nodeId = require("node-id");

async function getContacts() {
  try {
    const contacts = await fs.readFile(contactsPath, "utf8");
    return JSON.parse(contacts);
  } catch (error) {
    console.log(error);
  }
}

async function listContacts() {
  try {
    const contacts = await getContacts();

    console.table(contacts);
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await getContacts();

    const contactById = contacts.find(({ id }) => id === contactId);

    console.table(contactById);
  } catch (error) {
    console.log(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const newContact = { id: nodeId(), name, email, phone };

    const contacts = await getContacts();

    await fs.writeFile(contactsPath, JSON.stringify([...contacts, newContact])),
      { encoding: "utf8" };
  } catch (error) {
    console.log(error);
  } finally {
    console.table(await getContacts());
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await getContacts();

    if (contacts.some(({ id }) => id === contactId)) {
      console.table(contacts.find(({ id }) => id === contactId));
      await fs.writeFile(
        contactsPath,
        JSON.stringify(contacts.filter((contact) => contact.id !== contactId))
      ),
        { encoding: "utf8" };
    } else {
      console.log("Contact not found");
    }
  } catch (error) {
    console.log(error);
  } finally {
    console.table(await getContacts());
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
