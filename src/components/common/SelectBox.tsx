import React, { useEffect, useState } from 'react'
import '../../css/selectBox.css'

interface SelectBoxProps {
  selectList: string[]
  labelWidth: string
  onChange: (selected: string) => void
}

const SelectBox = (props: SelectBoxProps) => {
  const selectList = props.selectList
  const [selectedItem, setSelectedItem] = useState<string>(selectList[0])
  const [optionShow, setOptionShow] = useState<boolean>(false)

  useEffect(() => {
    setSelectedItem(selectList[0])
  }, [JSON.stringify(selectList)])

  const onChangeSelect = (item: string) => {
    setSelectedItem(item)
    setOptionShow(false)
    props.onChange(item)
  }

  return (
    <div className="select_box">
      <label onClick={() => setOptionShow(!optionShow)} style={{ width: props.labelWidth }}>
        {selectedItem}
      </label>
      {optionShow && (
        <ul>
          {selectList.map((data) => (
            <li key={data} onClick={() => onChangeSelect(data)}>
              {data}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default SelectBox
