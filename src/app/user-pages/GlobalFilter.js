  
import React, { useState } from 'react'
import { useAsyncDebounce } from 'react-table'

export const GlobalFilter = ({ filter, setFilter }) => {
  const [value, setValue] = useState(filter)
  const onChange = useAsyncDebounce(value => {
    setFilter(value || undefined)
  }, 1000)
  return (
    <span  style={{color:"white"}}>
      
      <input
      style={{ width:"100%" ,color:"black" , border:"none", borderRadius:"5px"}}
      
        value={value || ''}
        placeholder="Filtre Global"
        onChange={e => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
      />
    </span>
  )
}