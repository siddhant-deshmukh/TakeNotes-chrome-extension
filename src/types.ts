export interface IAppSettings {
  default_size: 'large' | 'small' | 'medium' | 'compact'
}

export interface ICollection {
  id: number
  name: string
  description: string
  num_notes: number
  pin_notes: number[]
}


export interface INote {
  id: number
  collection_id: number

  name: string
  description: string
  last_updated: number
  
  content: string
}


type operations = 
  'GET_COLLECTIONS'
  | 'ADD_COLLECTION'
  | 'REMOVE_COLLECTION'
  | 'CHANGE_COLLECTION_SETTING'
  | 'GET_NOTES'
  | 'GET_ALL_NOTES'
  | 'ADD_NOTE'
  | 'CHANGE_NOTE_SETTING'
  | 'CHANGE_NOTE_CONTENT'