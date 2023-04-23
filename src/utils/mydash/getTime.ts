export const getTime = (time: string) => {
  if (time === '') {
    return null;
  }

  const date = new Date(time);
  const mins = date.getMinutes();
  const hours = date.getHours();
  const minutes = mins < 10 ? `0${mins}` : mins;

  return `${hours}:${minutes}`;
};
