import React from "react";

const ClientsIcon = ({ className }: { className: string }) => {
  return (
    <svg
      className={className}
      width="100%"
      height="100%"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.75 8.75H11.25C9.86929 8.75 8.75 9.86929 8.75 11.25V18.75C8.75 20.1307 9.86929 21.25 11.25 21.25H18.75C20.1307 21.25 21.25 20.1307 21.25 18.75V11.25C21.25 9.86929 20.1307 8.75 18.75 8.75Z"
        stroke="white"
        stroke-width="1.5"
      />
      <path
        d="M16.25 12.5H13.75"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M27.5 15C27.5 21.9035 21.9035 27.5 15 27.5C10.9104 27.5 7.2796 25.5361 4.99909 22.5M2.5 15C2.5 8.09644 8.09644 2.5 15 2.5C19.0895 2.5 22.7204 4.46389 25.0009 7.5"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <path
        d="M5 22.5L3.75 26.25"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <path
        d="M25 7.5L26.25 3.75"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
      />
    </svg>
  );
};

export default ClientsIcon;
