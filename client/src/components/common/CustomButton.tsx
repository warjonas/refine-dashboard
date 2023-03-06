import React from 'react'
import { Button, capitalize } from '@pankod/refine-mui'

import { CustomButtonProps } from 'interfaces/common'


const CustomButton = ({title,backgroundColor, handleClick,type, color, fullWidth, icon, disabled }:CustomButtonProps) => {
  return (
    <Button
      disabled={disabled}
      type={type === 'submit' ? 'submit' : 'button'}
      sx={{
        flex: fullWidth ? 1 : 'unset',
        padding: '10px 15px',
        width: fullWidth ? '100%' : 'fit-content',
        minWidth: 130,
        backgroundColor: disabled ? 'transparent' : backgroundColor,
        color,
        border: disabled ? 'solid' : 'none',
        borderWidth: disabled ? '1px' : '0px',
        fontSize: 16,
        fontWeight:600,
        textTransform: "capitalize",
        '&:hover': {
          opacity: 0.9,
          backgroundColor
        }
      }}
      onClick={handleClick}
    >
      {icon}
      {title}
    </Button>
  )
}

export default CustomButton
