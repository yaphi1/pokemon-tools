import { CSSProperties } from "react";

type IconProps = {
  className: string;
  style?: CSSProperties;
  strokeColorClass?: string;
  fillColorClass?: string;
  thickness?: number;
};

export const Pokeball = ({ className, fillColorClass, style }: IconProps) => {
  return (
    <svg className={className} style={style} viewBox="0 0 256 256">
      <metadata>Icon credit: https://www.onlinewebfonts.com/icon/174253</metadata>
      <path className={fillColorClass} d="M128,10C62.9,10,10,62.9,10,128c0,65.1,52.9,118,118,118c65.1,0,118-52.9,118-118C246,62.8,193.1,10,128,10z M128,92.7c19.5,0,35.4,15.8,35.4,35.3s-15.8,35.4-35.4,35.4S92.6,147.5,92.6,128S108.5,92.7,128,92.7z M28,135.6h49.4c3.7,24.6,24.9,43.5,50.6,43.5c25.6,0,46.9-18.9,50.6-43.5H228c-3.9,51.8-47.2,92.7-100,92.7C75.2,228.3,31.9,187.4,28,135.6z"/>
    </svg>
  );
};

// Subsequent icons are from https://heroicons.com/
// Icon default thickness is 1.5, not 2.5
export const ChevronDown = ({ className, strokeColorClass, thickness = 2.5, style }: IconProps) => {
  return (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={thickness} className={className} style={style}>
      <path className={strokeColorClass} strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  );
};

export const MagnifyingGlass = ({ className, strokeColorClass, thickness = 2.5, style }: IconProps) => {
  return (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={thickness} className={className} style={style}>
      <path className={strokeColorClass} strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
  );
};

export const Tag = ({ className, strokeColorClass, thickness = 2, style }: IconProps) => {
  return (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={thickness} className={className} style={style}>
      <path className={strokeColorClass} strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
      <path className={strokeColorClass} strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
    </svg>
  );
};

export const Swatch = ({ className, strokeColorClass, thickness = 2, style }: IconProps) => {
  return (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={thickness} className={className} style={style}>
      <path className={strokeColorClass} strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z" />
    </svg>
  );
};

export const Trophy = ({ className, strokeColorClass, thickness = 2, style }: IconProps) => {
  return (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={thickness} className={className} style={style}>
      <path className={strokeColorClass} strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" />
    </svg>
  );
};

export const Gift = ({ className, strokeColorClass, thickness = 2, style }: IconProps) => {
  return (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={thickness} className={className} style={style}>
      <path className={strokeColorClass} strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
    </svg>
  );
};
