import { useContext } from "react"
import { PopupContext } from "../PopupContext"
import SelectCollectionNav from "./SelectCollectionNav"



export default function Home() {

  const { collections, selectedCollectionId, setSelectedCollectionId } = useContext(PopupContext)

  // useEffect(() => {
  //   chrome.runtime.sendMessage({ action: "getAllFromCollection" }, (response) => {
  //     if (response.error) {
  //       console.error(response.error);
  //     } else {
  //       const data = response.data;
  //       // Process the retrieved data
  //       setCollections(data)
  //       console.log(data);
  //     }
  //   });
  // }, [])

  return (
    <div className="rounded-xl bg-white h-full">
      <SelectCollectionNav />
      <h2 className="p-2.5">
        {
          JSON.stringify(collections)
        }
      </h2>
    </div>
  )

}
