export default function Icon({ name, className, style }) {
  return (
    <svg aria-hidden="true" className={className} style={style}>
      <use href={`#${name}`} />
    </svg>
  );
}

export function IconSprite() {
  return (
    <svg aria-hidden="true" style={{ display: "none" }} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <symbol id="grid" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><path d="m17.5 13 4.5 4.5-4.5 4.5-4.5-4.5z" /></symbol>
        <symbol id="box" viewBox="0 0 24 24"><path d="m12 3 9 5v9l-9 5-9-5V8zM3 8l9 5 9-5M12 13v9" /></symbol>
        <symbol id="bill" viewBox="0 0 24 24"><path d="M5 3h14v19l-3-2-4 2-4-2-3 2zM8 8h8M8 12h8M8 16h4" /></symbol>
        <symbol id="pin" viewBox="0 0 24 24"><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></symbol>
        <symbol id="tag" viewBox="0 0 24 24"><path d="M3 3h8l10 10-8 8L3 11z" /><circle cx="7.5" cy="7.5" r="1" /><path d="m10 11 5 5m0-5-5 5" /></symbol>
        <symbol id="truck" viewBox="0 0 24 24"><path d="M1 5h13v12H1zM14 9h5l4 5v3h-9M19 9v5h4" /><circle cx="5" cy="18" r="2" /><circle cx="18" cy="18" r="2" /></symbol>
        <symbol id="search" viewBox="0 0 24 24"><circle cx="10.5" cy="10.5" r="7" /><path d="m16 16 5 5" /></symbol>
        <symbol id="arrow" viewBox="0 0 24 24"><path d="M20 12H4m6-6-6 6 6 6" /></symbol>
        <symbol id="help" viewBox="0 0 24 24"><path d="M4 14v-3a8 8 0 0 1 16 0v3M4 11H2v7h4v-7zM20 11h2v7h-4v-7zM20 18v3h-7" /></symbol>
        <symbol id="home" viewBox="0 0 24 24"><path d="m3 10 9-7 9 7v11h-7v-7h-4v7H3z" /></symbol>
      </defs>
    </svg>
  );
}
