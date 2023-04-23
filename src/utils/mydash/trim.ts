export const trim = (string: string, template?: string) => {
  if (string && !template) {
    return string.trim();
  }

  const regExp = new RegExp(`(^[${template}]*)|([${template}]*$)`, 'g');
  return string.replace(regExp, '');
};
