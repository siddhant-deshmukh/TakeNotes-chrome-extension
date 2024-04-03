import { dbPromise } from ".";

export function getAllFromCollection(sendResponse) {
  dbPromise.then((db) => {
    const transaction = db.transaction(["Collection"], "readonly");
    const objectStore = transaction.objectStore("Collection");
    const request = objectStore.getAll();

    request.onsuccess = () => {
      console.log(request.result)
      sendResponse({ data: request.result });
    };

    request.onerror = () => {
      sendResponse({ error: "Failed to retrieve data from IndexedDB" });
    };
  }).catch((error) => {
    console.error("Error accessing IndexedDB:", error);
    sendResponse({ error: "Failed to open IndexedDB" });
  });
}