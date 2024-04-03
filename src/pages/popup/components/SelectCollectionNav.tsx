import { useContext } from 'react'
import { PopupContext } from '../PopupContext'

export default function SelectCollectionNav() {
  const { collections, selectedCollectionId, setSelectedCollectionId, setCurrPage } = useContext(PopupContext)

  return (
    <header className="flex justify-between w-full bg-gray-800 space-x-2">
      <div className='flex items-end justify-start space-x-1 w-full'>
        {
          collections.map((collection) => {
            const selected = selectedCollectionId && collection.id === selectedCollectionId
            return <button onClick={() => { setSelectedCollectionId(collection.id) }} 
            key={collection.id} 
            className={`${selected?'bg-gray-50 border-gray-400':'bg-gray-700 text-white'} p-1.5 rounded-t-lg border`}>
              <h6 className={`${(selected) ? 'font-bold text-base text-black' : 'text-xs font-medium text-white'}`}>
                {collection.name}
              </h6>
            </button>
          })
        }
      </div>
      <div className='flex-nowrap w-fit'>
        <button onClick={() => { setCurrPage('allCollections') }} className="p-1.5 w-fit rounded-xl border bg-gray-50 border-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
        </button>
      </div>
    </header>
  )
}
