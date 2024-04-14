import React from 'react'

const HamburgerClose = ({ className }: { className: string }) => {
  return (
    <svg
      className={className}
      width="100%"
      height="100%"
      viewBox="0 0 23 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 2H23" stroke="currentColor" strokeWidth="3" />
      <path d="M0 26.5H23" stroke="currentColor" strokeWidth="3" />
      <path d="M0 10.5L15 10.5" stroke="currentColor" strokeWidth="3" />
      <path d="M0 18.5L15 18.5" stroke="currentColor" strokeWidth="3" />
      <path d="M23 14L19.25 16.5981V11.4019L23 14Z" fill="currentColor" />
    </svg>
  )
}

export default HamburgerClose
