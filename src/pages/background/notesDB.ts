import { ICollection } from "@root/src/types";
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

export function createCollection(newCollection: ICollection, sendResponse) {
  dbPromise.then((db) => {
    const transaction = db.transaction(["Collection"], "readwrite");
    const objectStore = transaction.objectStore("Collection");
    const request = objectStore.get(newCollection.id);

    request.onsuccess = () => {
      console.log("Collection already exist", request.result)
      if (request.result) {
        console.error("Collection ID already exist")
        sendResponse({ data: request.result, msg: "Collection ID already exist", status: 409 });
      } else {
        objectStore.add(newCollection)
        sendResponse({ data: request.result, status: 201 });
      }
    };

    request.onerror = () => {
      sendResponse({ status: 500, msg: "Failed to Create Collection retrieve data from IndexedDB" });
    };
  }).catch((error) => {
    console.error("Createing Collection, Error accessing IndexedDB:", error);
    sendResponse({ status: 500, msg: "Failed to create IndexedDB" });
  });
}

export function deleteCollectionByID(id: number, sendResponse) {
  dbPromise.then((db) => {
    const request = db
      .transaction(["Collection"], "readwrite")
      .objectStore("Collection")
      .delete(id);
    // const objectStore = transaction.objectStore("Collection");
    
    request.onsuccess = () => {
      console.log("Collection deleted", request.result)
      sendResponse({ data: request.result, status: 200 });
    };

    request.onerror = () => {
      sendResponse({ status: 500, msg: "Failed to Delete Collection retrieve data from IndexedDB" });
    };
  }).catch((error) => {
    console.error("Deleteing Collection, Error accessing IndexedDB:", error);
    sendResponse({ status: 500, msg: "Failed to Delete IndexedDB" });
  });
}

export function updateCollection(editCollection: ICollection, sendResponse) {
  dbPromise.then((db) => {
    const transaction = db.transaction(["Collection"], "readwrite");
    const objectStore = transaction.objectStore("Collection");
    const request = objectStore.get(editCollection.id);

    request.onsuccess = () => {
      // console.log("Collection already exist", request.result)
      if (!request.result) {
        console.error("Collection ID doesn't exist")
        sendResponse({ data: request.result, msg: "Collection does not exist", status: 404 });
      } else {
        objectStore.put(editCollection)
        sendResponse({ data: request.result, status: 200 });
      }
    };

    request.onerror = () => {
      sendResponse({ status: 500, msg: "Failed to Create Collection retrieve data from IndexedDB" });
    };
  }).catch((error) => {
    console.error("Createing Collection, Error accessing IndexedDB:", error);
    sendResponse({ status: 500, msg: "Failed to create IndexedDB" });
  });
}