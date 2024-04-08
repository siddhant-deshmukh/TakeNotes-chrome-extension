import { useContext } from "react"
import { PopupContext } from "../PopupContext"
import SelectCollectionNav from "./SelectCollectionNav"



export default function Home() {

  const { collections, selectedCollectionId, setSelectedCollectionId } = useContext(PopupContext)

  

  return (
    <div className="flex flex-col rounded-xl bg-white h-full">
      <h2 className="p-2.5 h-full">
        {
          JSON.stringify(collections)
        }
      </h2>
      <SelectCollectionNav />
    </div>
  )

}
