export const parseJSON = (value: string) => {
  try {
    const data = JSON.parse(value);
    return { data };
  } catch (error) {
    return { error };
  }
};
