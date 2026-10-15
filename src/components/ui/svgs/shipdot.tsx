import type { SVGProps } from "react"

/** shipdot wordmark (dark variant). The letters follow `currentColor`; the dot keeps the brand orange. */
const Shipdot = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="-2 -147 581 194"
    {...props}
  >
    <path
      fill="currentColor"
      d="M73.6 -87.2A38 28.8 0 1 0 40 -45A22 15.8 0 1 1 20.6 -21.9L4.7 -15A40 33 0 1 0 40 -63.5A20 11.5 0 1 1 57.7 -80.4ZM93 -145H113V0H93ZM93 -48.2A49 52.5 0 1 1 191 -48.2L171 -48.7A29 36.5 0 1 0 113 -48.7ZM171 -50H191V0H171ZM209 -100H229V0H209ZM206.5 -128A12.5 12.5 0 1 1 231.5 -128A12.5 12.5 0 1 1 206.5 -128ZM247 -100H267V-77.7A58.5 58.5 0 0 0 267 -22.3V45H247ZM370 -145H390V0H370V-22.3A58.5 58.5 0 0 0 370 -77.7ZM403 -50A52.5 52.5 0 1 1 508 -50A52.5 52.5 0 1 1 403 -50ZM421 -50A34.5 36.5 0 1 0 490 -50A34.5 36.5 0 1 0 421 -50ZM532 -128H552V0H532ZM517 -100H576V-84H517Z"
    />
    <path fill="#ee4423" d="M266 -50A52.5 52.5 0 1 1 371 -50A52.5 52.5 0 1 1 266 -50Z" />
  </svg>
)

export { Shipdot }
