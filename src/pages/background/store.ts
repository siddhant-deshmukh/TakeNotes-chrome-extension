
export function storeDefaultData(db: undefined | IDBDatabase) {
  const folderData = [
    { id: 1, name: "Collection 1", num_notes: 0, pin_notes: [], description: "" },
    { id: 2, name: "Collection 2", num_notes: 0, pin_notes: [], description: "" },
    { id: 3, name: "Collection 3", num_notes: 0, pin_notes: [], description: "" },

  ];

  // const noteData = [
  //   { id: 1, name: "Note 1", description: "", content: "Some content", folder_id: 1 },
  //   { id: 2, name: "Note 2", description: "", content: "Some content", folder_id: 1 },
  //   { id: 3, name: "Note 3", description: "", content: "Some content", folder_id: 1 },
  //   { id: 4, name: "Note 4 for folder 2", description: "", content: "Some content", folder_id: 2 },
  //   { id: 3, name: "Note 5", description: "", content: "Some content", folder_id: 1 },
  // ];

  const collectionTransaction = db.transaction(["Collection"], "readwrite");
  const collectionStore = collectionTransaction.objectStore("Collection");
  folderData.forEach((folder) => collectionStore.put(folder));

  const collectionListTransaction = db.transaction(["CollectionList"], "readwrite");
  const collectionListStore = collectionListTransaction.objectStore("CollectionList");
  collectionListStore.put({ id: "collection_list", list: folderData.map(({ id }) => id) })

  // const notesTransaction = db.transaction(["Notes"], "readwrite");
  // const notesStore = notesTransaction.objectStore("Notes");
  // noteData.forEach((note) => notesStore.put(note));
}