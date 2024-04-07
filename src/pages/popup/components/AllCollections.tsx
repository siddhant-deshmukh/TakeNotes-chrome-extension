import { useContext } from "react"
import { PopupContext } from "../PopupContext"
import { BackSvg } from "./Loding"
import { useState } from "react"
import { ICollection } from "@root/src/types"
import { ReactSortable } from "react-sortablejs"

export function AllCollections() {

  const [editCollection, setEditCollection] = useState<null | ICollection>(null)
  const { setCollections, setCurrPage } = useContext(PopupContext)

  return (
    <div className="h-full relative rounded-xl bg-white">
      {
        editCollection &&
        <EditCollectionModal setEditCollection={setEditCollection} collection={editCollection} />
      }
      <div className="flex  items-center space-x-5">
        <button onClick={() => { console.log("Here to null"); setCurrPage(null) }} className="p-2">
          <BackSvg size={5} />
        </button>
        <h1 className="text-lg">
          All Collections List
        </h1>
      </div>
      <div className="flex justify-end">
        <button
          onClick={() => {
            const newCollection: ICollection = { id: Math.floor(Math.random() * 100000), name: "New Collection", description: "", num_notes: 0, pin_notes: [] }
            chrome.runtime.sendMessage({ action: "createCollection", payload: newCollection }, (response) => {
              console.log(response)
              if (response.error) {
                console.error(response.error);
              } else {
                const data = response.data;
                // Process the retrieved data
                // setCollections(data)
                setCollections((prev) => {
                  return prev.slice().concat([newCollection])
                })
                console.log(response, data);
              }
            });

          }}
          className="p-1.5 rounded-full bg-gray-800 text-white font-medium mr-2.5">
          Create new Collection
        </button>
      </div>
      <CollectionUl setEditCollection={setEditCollection} />
    </div>
  )
}

export function CollectionUl({ setEditCollection }: { setEditCollection: React.Dispatch<React.SetStateAction<ICollection>> }) {
  const { collections, setCollections } = useContext(PopupContext)

  return (
    <ul className="px-2 pt-3">
      <ReactSortable handle=".listHandle" list={collections} setList={setCollections}>
        {
          collections.map((collection) => {
            return <CollectionLi collection={collection} key={collection.id} setEditCollection={setEditCollection} />
          })
        }
      </ReactSortable>
    </ul>
  )
}
export function CollectionLi({ collection, setEditCollection }: { collection: ICollection, setEditCollection: React.Dispatch<React.SetStateAction<ICollection>> }) {
  const [expand, setExpand] = useState<boolean>(false)
  const { setCollections } = useContext(PopupContext)

  return (
    <div>
      <div className="flex items-center space-x-2.5 hover:bg-gray-100">
        <div className="cursor-move listHandle">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </div>

        <button
          onClick={() => { setExpand((prev) => !prev) }}
          className={`${!expand ? 'rotate-0' : 'rotate-90'} transition-all duration-200`}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </button>

        <div className="flex text-sm w-full flex-nowrap items-center">
          <h4 className="w-full">{collection.name}</h4>
          <span className="pr-2 flex-nowrap text-xs text-nowrap">{collection.num_notes} Notes</span>
        </div>

        <button
          onClick={() => {
            setEditCollection(collection)
          }}
          className="fill-green-700 p-1.5">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
          </svg>
        </button>
        <button
          onClick={() => {
            chrome.runtime.sendMessage({ action: "deleteCollection", payload: collection.id }, (response) => {
              console.log(response)
              if (response.error) {
                console.error(response.error);
              } else {
                const data = response.data;
                // Process the retrieved data
                // setCollections(data)
                setCollections((prev) => {
                  return prev.slice().filter((col) => col.id != collection.id)
                })
                console.log(response, data);
              }
            });

          }}
          className="fill-red-700 p-1.5">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className={`${expand ? 'block' : 'hidden'} transition-all duration-300`}>
        <p className="pl-[52px] pr-2.5 text-gray-700 italic">
          {collection.description.length === 0 && "No Description"}
          {collection.description}
        </p>
      </div>
    </div>
  )
}

export function EditCollectionModal({ collection, setEditCollection }: { collection: ICollection, setEditCollection: React.Dispatch<React.SetStateAction<ICollection>> }) {
  const { setCollections } = useContext(PopupContext)
  const [form, setForm] = useState<ICollection>(collection)

  function EditCollection(form: ICollection){
    chrome.runtime.sendMessage({ action: "updateCollection", payload: form }, (response) => {
      // console.log(response)
      if (response.error) {
        console.error(response.error);
      } else {
        const data = response.data;
        // Process the retrieved data
        // setCollections(data)
        setEditCollection(null)
        setCollections((prev) => {
          const new_ = prev.map((col) => {
            if (col.id != collection.id)
              return { ...col };
            else
              return { ...form }
          })
          return new_
        })
        console.log(response, data);
      }
    });
  }

  return (
    <div className="absolute w-full h-full bg-black bg-opacity-40 p-5 z-20">
      <div className="w-full h-full bg-white rounded-lg">
        <div className="flex items-center bg-gray-800 text-white px-2.5 py-1.5 justify-between">
          <h2 className="text-lg">
            Edit Collection
          </h2>
          <button
            onClick={() => { setEditCollection(null) }}
            className="text-xl font-extrabold px-2.5 py-1">
            X
          </button>
        </div>
        <div className="px-5 flex flex-col space-y-2.5 pt-2.5">
          <div>
            <label htmlFor="small-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
            <input
              value={form.name}
              onChange={(e) => {
                setForm((prev) => {
                  return { ...prev, name: e.target.value }
                })
              }}
              type="text" id="small-input" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          </div>
          <div className="">
            <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => {
                setForm((prev) => {
                  return { ...prev, description: e.target.value }
                })
              }}
              id="message" rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Leave a comment..."></textarea>
          </div>
          <button
            onClick={() => {
              // setEditCollection(null)
              // setCollections((prev) => {
              //   const new_ = prev.map((col) => {
              //     if (col.id != collection.id)
              //       return { ...col };
              //     else
              //       return { ...form }
              //   })
              //   return new_
              // })

              EditCollection(form)
            }}
            className="bg-gray-800 ml-auto text-white p-2 rounded-lg font-semibold">
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

export default AllCollections