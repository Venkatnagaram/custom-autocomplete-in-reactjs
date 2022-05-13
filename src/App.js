import React, { useEffect, useState } from 'react'
import './App.css'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import closeIcon from './assets/images/png/close.png'
import downArrowIcon from './assets/images/png/down-arrow.png'
const inputformat = [
  {
    group: 'Document',
    supportedFormats: [
      { value: 'doc', label: 'doc' },
      { value: 'txt', label: 'txt' },
      { value: 'pdf', label: 'pdf' },
    ],
  },
  {
    group: 'Ebook',
    supportedFormats: [
      { value: 'doc', label: 'doc' },
      { value: 'txt', label: 'txt' },
      { value: 'pdf', label: 'pdf' },
    ],
  },
]

function App() {
  const [search, setSearch] = useState('')
  const [showFilter, setShowFilter] = useState("searchResultsArea")
  let [updatedInputFormates, setUpdatedInputFormates] = useState([])
  const [searchResultsArea, setSearchResultsArea] = useState('searchResults')
  const [removeFormat, setRemoveFormat] = useState('display-hide')
  const [dropdownToggle, setDropdownToggle] = useState(false)

  const handleInputSearch = (e) => {
    setSearchResultsArea('searchResults')
    setShowFilter("searchResultsArea")
    setDropdownToggle(false)
    setSearch(e.target.value)
    if(!e.target.value){
      setRemoveFormat("display-hide")
    }
  }

  const matches = (word) => {
    return word.toLowerCase().indexOf(search.toLowerCase()) > -1
  }

  const searchItemHandler = (name) => { // search results dropdowwn
    setSearch(name)
    setDropdownToggle(false)
    setSearchResultsArea("display-hide")
    setShowFilter("display-hide")
    setRemoveFormat("removeFormatClass")
  }

  const selectedFormat = (val) => { // close dropdown if format is seleced
    setSearch(val)
    setDropdownToggle(false)
    setSearchResultsArea('display-hide')
    setShowFilter("display-hide")
    setRemoveFormat("removeFormatClass")
  }

  const handleDropdownFormats = () => { // showing formates using dropdown 
    if (!dropdownToggle) {
      if(search){
        setSearchResultsArea("display-hide")
        setShowFilter("display-hide")
        setRemoveFormat("display-hide")
      }
      setDropdownToggle(true)
    }
    else {
      setDropdownToggle(false)
    }
  }

  useEffect(() => {
    const loadFormates = () => { // get all formates list while component loading
      inputformat.map((formatGroup) =>
        formatGroup.supportedFormats.map((inFormat) =>
          updatedInputFormates.push(inFormat),
        ),
      )
      setUpdatedInputFormates(updatedInputFormates)
    }
    loadFormates()
  }, [updatedInputFormates])

  const removeFormatHandler = () => { // remove selected format
    setSearch('')
    setRemoveFormat("display-hide")
  }

  // const closeDropdownFormats = () => {
  //   setDropdownToggle(false)
  //   setRemoveFormat("display-hide")
  //   setSearchResultsArea("display-hide")
  //   setShowFilter("display-hide")
  //   if(search){
  //     setRemoveFormat("removeFormatClass")
  //   }else{
  //     setRemoveFormat("display-hide")
  //   }
  // }
  
  return (
    <div className="auto-area">
      <Button 
        variant="text" 
        className="dropDownBtn"
        onClick={handleDropdownFormats}
        //onBlur={closeDropdownFormats}
      >
      <img src={downArrowIcon} alt="select format" />
      </Button>

      <TextField
        id="outlined-basic"
        label="InputFormat"
        variant="outlined"
        value={search}
        name={'search'}
        onChange={handleInputSearch}
        className={'searchiInput'}
        //onBlur={closeDropdownFormats}
      />
      <span className={removeFormat} onClick={removeFormatHandler}>
        <img src={closeIcon} alt="remove" />
      </span>
      {search ? (
        <div className={showFilter}>
          {updatedInputFormates
            .filter((inputformats) => matches(inputformats.value))
            .map((inputformats, index) => (
              <div
                key={index}
                onClick={() => searchItemHandler(inputformats.value)}
                className={searchResultsArea}
              >
                <p>{inputformats.value}</p>
              </div>
            ))}
        </div>
      ) : null}
      <div className={dropdownToggle ? 'input-formats-area' : 'display-hide'}>
        {inputformat.map((iformatsList, index) => (
          <div className="input-formats-area-group" key={index}>
            <p>{iformatsList.group}</p>
            {iformatsList.supportedFormats.map(
              (iformatsListItems, itemsIndex) => (
                <div
                  key={itemsIndex}
                  onClick={() => selectedFormat(iformatsListItems.value)}
                >
                  {iformatsListItems.value}
                </div>
              ),
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
