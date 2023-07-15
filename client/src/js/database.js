import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// To accept some content and adds it to the database
export const putDb = async (id, content) => {
  try {
    console.log("PUT to the database");
    const jateDb = await openDB("jate", 1);
    const tx = jateDb.transaction("jate", "readwrite");
    const store = tx.objectStore("jate");
    const request = store.put({ id: id, content: content });
    const result = await request;
    console.log("🚀 - data saved to the database", result);
  } catch (error) {
    console.error("putDb not implemented");
    throw new Error("putDb not implemented");
  }
};

// To get all the content from the database
export const getDb = async () => {
  try {
    console.log("GET all from the database");
    const jateDb = await openDB("jate", 1);
    const tx = jateDb.transaction("jate", "readonly");
    const store = tx.objectStore("jate");
    const request = store.getAll();
    const result = await request;
    console.log("results: ", result);
    return result.length ? result.map((entry) => entry.content) : null;
  } catch (error) {
    console.error("getDb not implemented");
    throw new Error("getDb not implemented");
  }
};
initdb();
