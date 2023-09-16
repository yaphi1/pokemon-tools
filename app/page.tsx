import PokeFinder from "./_components/PokeFinder";

export default function Home() {
  return (
    <main className="text-xl font-serif text-slate-600">
      {/* Tailwind test
      <div className="flex m-4 gap-4">
        {new Array(3).fill(1).map((_, i) => (
          <div key={i} className="flex-1 p-4 bg-white shadow-md rounded-md">Card example</div>
        ))}
      </div> */}

      <PokeFinder />
    </main>
  );
}
