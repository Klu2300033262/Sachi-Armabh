export function Icon({ name, size = 24, ...props }) {
  const paths = {
    arrow: <><path d="M4 12h15M13 6l6 6-6 6" /></>,
    leaf: <><path d="M20 4C8 3 2 9 5 16s16 5 15-12Z" /><path d="M4 21 15 10M9 16v-5M9 16h5" /></>,
    heart: <path d="m12 20-8-8C-2 5 7 0 12 7c5-7 14-2 8 5Z" />,
    book: <><path d="M12 5v15M3 4c4-1 6 0 9 2 3-2 5-3 9-2v14c-4-1-6 0-9 2-3-2-5-3-9-2Z" /></>,
    shield: <><path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6Z" /><path d="m8 12 3 3 5-6" /></>,
    compass: <><circle cx="12" cy="12" r="9" /><path d="m16 8-2 6-6 2 2-6Z" /></>,
    chat: <><path d="M21 11a9 9 0 0 1-9 9H4l-2 2V11a9 9 0 0 1 19 0Z" /><path d="M7 9h10M7 13h7" /></>,
    lock: <><rect x="5" y="10" width="14" height="11" rx="3" /><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3" /></>,
    spark: <><path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5Z" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    menu: <path d="M4 6h16M4 12h16M4 18h16" />,
    close: <path d="m6 6 12 12M6 18 18 6" />,
    plus: <path d="M12 5v14M5 12h14" />,
  }

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      {paths[name] || paths.leaf}
    </svg>
  )
}

export function Botanical({ className = '' }) {
  return (
    <svg className={`botanical ${className}`} width="210" height="310" viewBox="0 0 210 310"
      fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
      <path d="M90 300C120 235 95 120 162 12M111 218C72 193 42 160 32 120M117 164C148 155 177 131 194 104M125 120C101 99 84 68 85 43M105 259C70 246 45 222 26 202" />
      <path d="M142 49c-1-26 13-38 31-43 4 22-9 38-31 43ZM127 81c-25-5-35-23-33-42 23 5 36 21 33 42ZM119 133c27-1 42-16 46-36-25-1-43 13-46 36ZM108 177c-29-3-47-21-46-43 27 3 45 19 46 43ZM102 223c29-1 45-16 49-36-28-1-44 13-49 36ZM82 196c-30 3-49-12-53-33 29-3 48 10 53 33ZM59 238c-26 5-45-5-51-24 26-5 44 5 51 24ZM111 269c27 2 45-9 53-29-25-4-44 6-53 29ZM176 124c-2-25 7-41 25-50 6 23-3 41-25 50Z" />
    </svg>
  )
}
