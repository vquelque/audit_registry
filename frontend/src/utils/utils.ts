export const isValidAddress = function (hexAddress: string): boolean {
  if (typeof hexAddress !== 'string') {
    return false;
  }
  return /^0x[0-9a-fA-F]{40}$/.test(hexAddress);
};

export const hasDuplicateInArray = function <T>(array: Array<T>): boolean {
  let uniqueValues = new Set();

  return array.some((value) => {
    if (uniqueValues.has(value)) {
      return true;
    }

    uniqueValues.add(value);

    return false;
  });
};
