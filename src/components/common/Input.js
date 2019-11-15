import React from 'react'
import { Container } from './index'
export const Input = ({ name, value, type, label, onChange, placeholder }) => {
  return (
    <Container classname="form-input">
      <label>{label}</label>
      <input
        type={type}
        name={name}
        defaultValue={value}
        onChange={e => onChange(e)}
        placeholder={placeholder}
      />
    </Container>
  )
}
