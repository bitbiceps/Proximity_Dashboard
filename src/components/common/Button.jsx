import React from 'react'

export const Button = ({text, onClick}) => {
  return (
    <button onClick={onClick} className='px-[16px] py-[8px] rounded-[8px] bg-[#4D49F6] text-[18px] text-[#FFFFFF] '>{text}</button>
  )
}
