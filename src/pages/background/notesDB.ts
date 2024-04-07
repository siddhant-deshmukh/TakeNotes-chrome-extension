import { ICollection } from "@root/src/types";
import { dbPromise } from ".";

export function getAllFromCollection(sendResponse) {
  dbPromise.then(async (db) => {
    const transaction = db.transaction(["Collection", "CollectionList"], "readonly");
    const collectionListStore = transaction.objectStore("CollectionList");
    const collectionListReq = collectionListStore.get("collection_list")

    collectionListReq.onsuccess = () => {
      const collectionIdList = collectionListReq.result.list
      
      if (!Array.isArray(collectionIdList)) {
        sendResponse({ error: "Got invalid array from collection list objectStore" });
        return
      }
      const collectionStore = transaction.objectStore("Collection");
      
      const collectionsDataList = []
      let errorsCount = 0
      collectionIdList.forEach((id, index) => {
        const collectionReq = collectionStore.get(id);

        collectionReq.onsuccess = () => {
          collectionsDataList.push(collectionReq.result)
          if (collectionsDataList.length + errorsCount === collectionIdList.length) {
            sendResponse({ data: collectionsDataList, noFailedCases: errorsCount });
          }
        }

        collectionReq.onerror = () => {
          errorsCount += 1
          if (collectionsDataList.length + errorsCount === collectionIdList.length) {
            sendResponse({ data: collectionsDataList, noFailedCases: errorsCount });
          }
        }
      })
    }

    collectionListReq.onerror = () => {
      sendResponse({ error: "Failed to retrieve data of collection list from IndexedDB" });
    }

  }).catch((error) => {
    console.error("Error accessing IndexedDB:", error);
    sendResponse({ error: "Failed to open IndexedDB" });
  });
}

export function createCollection(newCollection: ICollection, sendResponse) {
  dbPromise.then((db) => {
    const transaction = db.transaction(["Collection", "CollectionList"], "readwrite");
    const collectionStore = transaction.objectStore("Collection");

    const request = collectionStore.get(newCollection.id);

    request.onsuccess = () => {
      console.log("Collection already exist", request.result)
      if (request.result) {
        console.error("Collection ID already exist")
        sendResponse({ data: request.result, msg: "Collection ID already exist", status: 409 });
      } else {
        // const listStore = transaction.collectionStore("CollectionList")
        collectionStore.add(newCollection)
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

export function updateCollectionListOrder({ listOrder, updatedAt }: { listOrder: number[], updatedAt: number }, sendResponse) {
  dbPromise.then((db) => {
    const transaction = db.transaction(["CollectionList"], "readwrite");
    const objectStore = transaction.objectStore("CollectionList");

    objectStore.put({ id: "collection_list", list: listOrder, updatedAt })
    sendResponse({ data: listOrder, status: 200 });

  }).catch((error) => {
    console.error("Createing Collection, Error accessing IndexedDB:", error);
    sendResponse({ status: 500, msg: "Failed to create IndexedDB" });
  });
}