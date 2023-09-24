export default function DesignGrid() {
  const cols = 12;

  return (
    <div className="pl-[350px] fixed top-0 left-0 w-full h-screen z-20 pointer-events-none">
      <div className="px-8">
        <div style={{
          gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
        }} className="w-full h-screen grid border-x border-red-300 divide-x divide-red-300">
          {(new Array(cols).fill('')).map((col, key) => {
            return (<div key={key}></div>);
          })}
        </div>
      </div>
    </div>
  );
}
