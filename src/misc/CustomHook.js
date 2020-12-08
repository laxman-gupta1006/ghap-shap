import {useCallback,useState} from 'react'

export function useModalState(defaultValue=false){
   const [isopen, setIsOpen] = useState(defaultValue)
   const open =useCallback(
      () => {
         setIsOpen(true)
      },
      [],
   )
   const close =useCallback(
      () => {
         setIsOpen(false)
      },
      [],
   )
   return {isopen,open,close}
}