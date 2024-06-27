import React, { useContext, useState } from 'react';
import styles from './CButton.module.scss'

type Props = { 
  title: string, 
  icon?: React.ReactNode,
  handleClick?: (param?: any) => void,
}

export default function CButton({ title, icon, handleClick }: Props) {
  
  return (
    <button className={`${styles.wrapper}`} onClick={handleClick}>
      {icon}
      <span className={styles.text}>
        {title}
      </span>
    </button>
  )
}
