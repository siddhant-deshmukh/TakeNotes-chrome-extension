import { createCollection, deleteCollectionByID, getAllFromCollection, updateCollection } from "./notesDB";
import { storeDefaultData } from "./store";

// background.js
console.log("bg script")

let db: undefined | IDBDatabase;
export const dbPromise = new Promise((resolve: (db: IDBDatabase) => void, reject: (error: DOMException) => void) => {
  const request = self.indexedDB.open("TakeNotesDB", 1);

  request.onupgradeneeded = (event) => {
    db = request.result;
    const objectStore = db.createObjectStore("Collection", { keyPath: "id" });
    // objectStore.createIndex("pin_notes", "pin_notes", { unique: false, multiEntry: true });

    const notesStore = db.createObjectStore("Notes", { autoIncrement: true });
    notesStore.createIndex("collection_id", "collection_id", { unique: false });
  };

  request.onsuccess = (event) => {
    db = request.result;
    resolve(db);
  };

  request.onerror = (event) => {
    reject(request.error);
  };
});



chrome.runtime.onInstalled.addListener(() => {
  console.log("Installed!")
  dbPromise.then((db) => {
    storeDefaultData(db);
  }).catch((error) => {
    console.error("Error initializing IndexedDB:", error);
  });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "getAllFromCollection") {
    getAllFromCollection(sendResponse);
    return true; // Keep the message channel open for asynchronous response
  }
  if (message.action === "createCollection"){
    createCollection(message.payload, sendResponse)
    return true;
  }
  if (message.action === "deleteCollection"){
    deleteCollectionByID(message.payload, sendResponse)
    return true;
  }
  if (message.action === "updateCollection"){
    updateCollection(message.payload, sendResponse)
    return true;
  }
  
  if (message.action === "getData") {
    dbPromise.then((db) => {
      // Perform IndexedDB operations to retrieve data
      sendResponse({ data: "Retrieved data" });
    }).catch((error) => {
      console.error("Error accessing IndexedDB:", error);
      sendResponse({ error: "Failed to retrieve data" });
    });
  }
  return true; // Keep the message channel open for asynchronous responses
});