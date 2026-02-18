

"use client"

import { useState } from "react"

type SearchInputProps = {
  onSearch: (value: string) => void
}

export default function SearchInput({ onSearch }: SearchInputProps) {
  const [value, setValue] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setValue(val)
    onSearch(val) 
  }

  return (
<div className="  flex justify-center my-5 mb-10 lg:w-full">
  <input
    type="text"
    value={value}
    onChange={handleChange}
    placeholder="Search..."
    className="w-full md:w-1/2 p-1.5 mt-8 border border-gray-300 rounded-lg 
       focus:outline-none focus:ring-2 focus:ring-blue-400"
  />
</div>
  )
}
