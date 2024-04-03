import { ICollection } from "@root/src/types";
import { useRef } from "react";
import React, { useEffect, useState } from "react";

const defaultCollections: ICollection[] = [
  { id: 1, "name": "Folder 1", "num_notes": 0, "pin_notes": [], "description": "" },
  { id: 2, "name": "Folder 2", "num_notes": 0, "pin_notes": [], "description": "" },
  { id: 3, "name": "Folder 1", "num_notes": 0, "pin_notes": [], "description": "" },
  { id: 4, "name": "Folder 2", "num_notes": 0, "pin_notes": [], "description": "" }
]

export const PopupContext = React.createContext<{
  collections: ICollection[]
  setCollections: React.Dispatch<React.SetStateAction<ICollection[]>>
  selectedCollectionId: number
  setSelectedCollectionId: React.Dispatch<React.SetStateAction<number>>
  currPage: "allCollections"
  setCurrPage: React.Dispatch<React.SetStateAction<"allCollections">>
}>({
  collections: defaultCollections,
  setCollections: () => { },
  selectedCollectionId: 1,
  setSelectedCollectionId: () => { },
  currPage: null,
  setCurrPage: () => { },
})

export const PopupContextProvider = ({ children }: { children: React.ReactNode }) => {

  const [currPage, setCurrPage] = useState<null | 'allCollections'>(null)
  const [collections, setCollections] = useState<ICollection[]>(defaultCollections)
  const [selectedCollectionId, setSelectedCollectionId] = useState<number | undefined>()


  useEffect(() => {


  }, [])

  return (
    <PopupContext.Provider value={{ collections, setCollections, selectedCollectionId, setSelectedCollectionId, currPage, setCurrPage }}>
      {children}
    </PopupContext.Provider>
  )
}

