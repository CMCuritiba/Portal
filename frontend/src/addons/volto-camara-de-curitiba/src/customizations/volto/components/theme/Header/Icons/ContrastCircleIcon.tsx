import * as React from 'react';

const ContrastCircleIcon = (props: { className: String }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="25"
    fill="none"
    viewBox="0 0 24 25"
  >
    <mask
      id="mask0_2410_42646"
      width="24"
      height="25"
      x="0"
      y="0"
      maskUnits="userSpaceOnUse"
      style={{ maskType: 'alpha' }}
    >
      <path fill="#D9D9D9" d="M0 .5h24v24H0z"></path>
    </mask>
    <g mask="url(#mask0_2410_42646)">
      <path
        fill="#1C1B1F"
        d="M12 22.5a9.7 9.7 0 0 1-3.9-.788 10.1 10.1 0 0 1-3.175-2.137q-1.35-1.35-2.137-3.175A9.7 9.7 0 0 1 2 12.5q0-2.075.788-3.9a10.1 10.1 0 0 1 2.137-3.175q1.35-1.35 3.175-2.137A9.7 9.7 0 0 1 12 2.5q2.075 0 3.9.788a10.1 10.1 0 0 1 3.175 2.137q1.35 1.35 2.137 3.175A9.7 9.7 0 0 1 22 12.5a9.7 9.7 0 0 1-.788 3.9 10.1 10.1 0 0 1-2.137 3.175q-1.35 1.35-3.175 2.137a9.7 9.7 0 0 1-3.9.788m0-2q3.35 0 5.675-2.325T20 12.5a7.85 7.85 0 0 0-.613-3.062A8 8 0 0 0 17.65 6.85l-11.3 11.3q1.125 1.125 2.588 1.738A7.85 7.85 0 0 0 12 20.5m0-4V15h5v1.5zM8 12h1.5v-2h2V8.5h-2v-2H8v2H6V10h2z"
      ></path>
    </g>
  </svg>
);

export default ContrastCircleIcon;
