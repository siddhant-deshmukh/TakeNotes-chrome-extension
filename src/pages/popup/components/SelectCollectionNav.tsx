import { useContext } from 'react'
import { PopupContext } from '../PopupContext'
import { useRef } from 'react'

export default function SelectCollectionNav() {

  const navRef = useRef<HTMLDivElement | null>(null)
  const { collections, selectedCollectionId, setSelectedCollectionId, setCurrPage } = useContext(PopupContext)

  return (
    <div className='bg-gray-800  text-white'>
      <nav ref={navRef} className="flex w-full justify-between overflow-hidden scroll-smooth space-x-2">
        <div  className='flex items-start justify-start space-x-1 whitespace-nowrap'>
          {
            collections.map((collection) => {
              const selected = selectedCollectionId && collection.id === selectedCollectionId
              return <button onClick={() => { setSelectedCollectionId(collection.id) }}
                key={collection.id}
                className={`flex-nowrap ${selected ? 'bg-gray-50 text-gray-900 hover:bg-gray-100 p-1.5 pt-2.5' : 'bg-gray-700 text-white hover:bg-gray-600 mt-1 p-1.5'}  rounded-b-lg `}>
                <h6 className={`${(selected) ? 'font-medium text-xs text-black' : 'text-xs font-medium text-white'}`}>
                  {collection.name}
                </h6>
              </button>
            })
          }
        </div>
      </nav>
      <div className='flex w-full justify-between pt-1'>
        <button className='px-2.5 py-1 rounded-full hover:bg-slate-700' onClick={() => { setCurrPage('allCollections') }}>
          View All / Edit Collection
        </button>

        <div className='flex space-x-2.5 '>
          <button 
            onClick={()=>{
              if(navRef.current){
                navRef.current.scrollLeft -= 400
              }
            }}
            className='flex items-center space-x-2 px-2.5 py-1 rounded-full hover:bg-slate-700'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
            {/* <span>prev</span> */}
          </button>
          <button 
            onClick={()=>{
              if(navRef.current){
                navRef.current.scrollLeft += 400
              }
            }}
            className='flex items-center space-x-2 px-2.5 py-1 rounded-full hover:bg-slate-700'>
            {/* <span>next</span> */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 rotate-180">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
          </button>
        </div>


      </div>
    </div>
  )
}
