import type { SVGProps } from "react"

const Supabase = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    {...props}
  >
    <g fill="none">
      <g clipPath="url(#supabase-clip)">
        <path
          fill="url(#supabase-grad-1)"
          d="M144.757 223.193c-5.061 6.373-15.323 2.881-15.445-5.257l-1.783-119.029h80.035c14.496 0 22.581 16.744 13.567 28.097z"
        />
        <path
          fill="url(#supabase-grad-2)"
          fillOpacity={0.2}
          d="M144.757 223.193c-5.061 6.373-15.323 2.881-15.445-5.257l-1.783-119.029h80.035c14.496 0 22.581 16.744 13.567 28.097z"
        />
        <path
          fill="#3ecf8e"
          d="M112.207 31.666c5.061-6.375 15.323-2.882 15.445 5.256l.782 119.029H49.4c-14.497 0-22.582-16.744-13.567-28.097z"
        />
      </g>
      <defs>
        <linearGradient
          id="supabase-grad-1"
          x1={127.529}
          x2={198.661}
          y1={125.299}
          y2={155.132}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#249361" />
          <stop offset={1} stopColor="#3ecf8e" />
        </linearGradient>
        <linearGradient
          id="supabase-grad-2"
          x1={95.993}
          x2={128.433}
          y1={82.12}
          y2={143.187}
          gradientUnits="userSpaceOnUse"
        >
          <stop />
          <stop offset={1} stopOpacity={0} />
        </linearGradient>
        <clipPath id="supabase-clip">
          <path fill="#fff" d="M32 28h192.92v200H32z" />
        </clipPath>
      </defs>
    </g>
  </svg>
)

export { Supabase }
