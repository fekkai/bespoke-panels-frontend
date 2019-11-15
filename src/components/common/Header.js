import React from 'react'

export const Header = ({ title, children }) => {
  return (
    <header className="app-header">
      <div className="title">
        <h2>{title}</h2>
      </div>
      <nav>{children}</nav>
    </header>
  )
}
