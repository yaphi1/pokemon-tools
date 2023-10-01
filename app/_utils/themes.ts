function generateTransparentTableHead({ bodyBg, tableHeaderBg }: { bodyBg: string, tableHeaderBg:string }) {
  const bottomLayerBg = `${bodyBg} before:-z-1 before:block before:w-screen before:h-screen before:absolute before:-top-8 before:-right-8 before:pointer-events-none`;
  const topLayerBg = `${tableHeaderBg} after:absolute after:block after:w-full after:h-full after:top-0 after:left-0 after:pointer-events-none`;
  const framing = 'overflow-hidden relative';

  return `${bottomLayerBg} ${topLayerBg} ${framing}`;
}

const originalTheme = {
  sidebar: 'bg-slate-200',
  sidebarGroup: 'bg-slate-300',
  body: 'bg-slate-100 text-slate-600',
  table: 'shadow-lg',
  tableHead: 'bg-white',
  tableRow: 'bg-white odd:bg-slate-200',
  button: 'bg-cyan-950 hover:bg-cyan-700 text-slate-200',
  link: 'text-cyan-600 hover:text-cyan-500',
  input: 'bg-white text-slate-600 border-slate-400 outline-slate-400 focus:border-cyan-500 focus:outline-cyan-500',
  logoIcon: 'fill-slate-600',
  icon: 'stroke-slate-400',
};

const plain = {
  sidebar: 'bg-white',
  sidebarGroup: 'bg-transparent px-0',
  body: 'bg-white text-slate-600',
  table: '',
  tableHead: 'bg-white',
  tableRow: 'bg-white odd:bg-white',
  button: 'bg-gray-700 hover:bg-gray-600 text-slate-200',
  link: 'text-slate-600 hover:text-slate-500',
  input: 'bg-white text-slate-600 border-slate-400 outline-slate-400 focus:border-cyan-500 focus:outline-cyan-500',
  logoIcon: 'fill-slate-600',
  icon: 'stroke-slate-400',
};

const spacious = {
  // sidebar: 'bg-slate-100',
  // sidebar: 'bg-white border-r',
  sidebar: 'bg-white',
  sidebarGroup: 'bg-transparent px-0',
  body: 'bg-slate-50 text-slate-600',
  table: '',
  tableHead: 'bg-slate-50',
  tableRow: 'bg-slate-50',
  button: 'bg-gray-700 hover:bg-gray-600 text-slate-200',
  link: 'text-slate-600 hover:text-slate-500',
  input: 'bg-white text-slate-600 border-slate-400 outline-slate-400 focus:border-cyan-500 focus:outline-cyan-500',
  logoIcon: 'fill-slate-600',
  icon: 'stroke-slate-400',
};

const dark = {
  sidebar: 'bg-neutral-900',
  sidebarGroup: 'bg-transparent px-0',
  body: 'bg-neutral-800 text-neutral-200',
  table: '',
  tableHead: 'bg-neutral-700',
  tableRow: 'bg-neutral-600 even:bg-neutral-700',
  button: 'bg-neutral-700 hover:bg-neutral-600 text-neutral-200',
  link: 'text-neutral-400 hover:text-neutral-300',
  input: 'bg-neutral-700 text-neutral-300 border-neutral-400 outline-neutral-400 focus:border-neutral-300 focus:outline-neutral-300',
  logoIcon: 'fill-neutral-300',
  icon: 'stroke-neutral-400',
};

const theme = {
  sidebar: 'bg-neutral-900/20',
  // sidebarGroup: 'bg-transparent px-0',
  sidebarGroup: 'bg-neutral-800/20 shadow-md border-t border-white/30',
  // body: 'bg-gradient-to-r from-cyan-500 to-blue-500 text-neutral-200',
  // body: 'bg-gradient-to-r from-purple-800 to-indigo-700 text-neutral-200',
  // body: 'bg-gradient-to-r from-rose-700 to-rose-500 text-neutral-200',
  // body: 'bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 text-neutral-200',
  // body: 'bg-gradient-to-r from-rose-700 via-rose-500 to-rose-700 text-neutral-200',
  // body: 'bg-gradient-to-r from-neutral-700 via-neutral-600 to-neutral-700 text-neutral-200',
  body: 'bg-gradient-to-br from-indigo-500 to-purple-700 text-neutral-200',
  table: 'shadow-lg',
  // tableHead: 'bg-neutral-700',
  // tableHead: 'bg-white/20 mb-px py-2',
  // tableHead: 'after:bg-white/20 after:absolute after:block after:w-full after:h-full after:top-0 after:left-0 after:pointer-events-none mb-px py-2 overflow-hidden relative before:content-[""] before:-z-1 before:block before:w-screen before:h-screen before:bg-red-500 before:bg-gradient-to-br before:from-indigo-500 before:to-purple-700 before:absolute before:-top-8 before:-right-8 before:pointer-events-none',
  tableHead: `mb-px py-2 bt border-t border-white/30 ${generateTransparentTableHead({
    bodyBg: 'before:bg-gradient-to-br before:from-indigo-500 before:to-purple-700',
    tableHeaderBg: 'after:bg-white/20',
  })}`,
  // tableHead: `mb-px py-2 bt border-t border-white/30 bg-white-20`,
  // tableHead: 'bg-gradient-to-r from-purple-500 to-indigo-500 mb-px',
  // tableRow: 'bg-neutral-600/80 even:bg-neutral-700/80',
  tableRow: 'bg-white/10 even:bg-white/20 mb-px py-2 border-t border-white/30',
  button: 'bg-neutral-700/40 hover:bg-neutral-400/40 text-neutral-200 border-t border-white/30',
  link: 'text-neutral-300 hover:text-neutral-100',
  input: 'bg-white/10 text-neutral-300 border-neutral-400 outline-neutral-400 focus:border-neutral-300 focus:outline-neutral-300',
  logoIcon: 'fill-neutral-300',
  icon: 'stroke-neutral-100/60',
};

// export default originalTheme;
// export default plain;
// export default spacious;
// export default dark;
export default theme;
