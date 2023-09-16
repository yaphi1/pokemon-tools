export function cleanQueryText(text: string) {
  const spacesOrUnderscores = /[\s_]+/g;
  const anythingExceptLettersOrHyphens = /[^a-z-]/g;
  return text
    .trim()
    .toLowerCase()
    .replace(spacesOrUnderscores, '-')
    .replace(anythingExceptLettersOrHyphens, '');
}
