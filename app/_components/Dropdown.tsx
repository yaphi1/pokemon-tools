type TextInputProps = {
  values: string[];
  handleInput: (value: string) => void;
};

function formatName(name: string) {
  return name[0].toUpperCase() + name.slice(1);
}

export default function Dropdown({ values, handleInput }: TextInputProps) {
  return (
    <select
      className="bg-white w-full p-2 outline outline-1 outline-slate-400 shadow-inner rounded-sm hover:outline-2 focus:outline-cyan-500 focus:outline-2"
      onInput={(event) => {
        handleInput(event.currentTarget.value);
      }}
    >
      <option value=""></option>
      {values.map((value, index) => {
        return (<option key={index} value={value}>{formatName(value)}</option>);
      })}
    </select>
  );
}
