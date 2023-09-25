type IconProps = {
  svgClass: string;
  fillClass: string;
};

export const Pokeball = ({ svgClass, fillClass }: IconProps) => {
  return (
    <svg className={svgClass} viewBox="0 0 256 256">
      <metadata>Icon credit: https://www.onlinewebfonts.com/icon/174253</metadata>
      <path className={fillClass} d="M128,10C62.9,10,10,62.9,10,128c0,65.1,52.9,118,118,118c65.1,0,118-52.9,118-118C246,62.8,193.1,10,128,10z M128,92.7c19.5,0,35.4,15.8,35.4,35.3s-15.8,35.4-35.4,35.4S92.6,147.5,92.6,128S108.5,92.7,128,92.7z M28,135.6h49.4c3.7,24.6,24.9,43.5,50.6,43.5c25.6,0,46.9-18.9,50.6-43.5H228c-3.9,51.8-47.2,92.7-100,92.7C75.2,228.3,31.9,187.4,28,135.6z"/>
    </svg>
  );
};
