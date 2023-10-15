import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('Post to the database');
  const jateDB = await openDB('jate', 1);
  const jateData = jateDB.transaction('jate', 'readwrite');
  const storeData = jateData.objectStore('jate');
  const request = storeData.put({ id: 1, value: content });
  const result = await request;
  console.log('Data saved', result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET from the database');
  const jateDb = await openDB('jate', 1);
  const jateData = jateDb.transaction('jate', 'readonly');
  const storeData = jateData.objectStore('jate');
  // const request = storeData.get(1);
  const request = storeData.getAll();
  const result = await request;
  console.log("result.value", result);
  return result?.value;
};

initdb();
