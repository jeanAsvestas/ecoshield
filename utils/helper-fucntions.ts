//function that checks if the key is a valid key of the obj
export const isValidKey = <T extends object>(
  key: string | number | symbol,
  obj: T
): key is keyof T => {
  return key in obj;
};
