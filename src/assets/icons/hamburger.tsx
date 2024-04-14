import React from 'react'

const HamburgerOpen = ({ className }: { className: string }) => {
  return (
    <svg
      className={className}
      width="100%"
      height="100%"
      viewBox="0 0 24 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0.5 2H23.5" stroke="currentColor" strokeWidth="3" />
      <path d="M0 26.5H23" stroke="currentColor" strokeWidth="3" />
      <path d="M8 10.5L23 10.5" stroke="currentColor" strokeWidth="3" />
      <path d="M8 18.5L23 18.5" stroke="currentColor" strokeWidth="3" />
      <path d="M1 14.5L4.75 11.9019V17.0981L1 14.5Z" fill="currentColor" />
    </svg>
  )
}

export default HamburgerOpen
