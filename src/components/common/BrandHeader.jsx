import React from 'react'
import brandLogo from '../../assets/sidebar/logo.svg'
export const BrandHeader = () => {
  return (
    <div className='w-full flex items-center justify-start h-fit pt-[30px] pl-[33px]'>
        <img src={brandLogo}></img>
         
    </div>
  )
}
