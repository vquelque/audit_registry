export const isValidAddress = function (hexAddress: string): boolean {
  if (typeof hexAddress !== "string") {
    return false;
  }
  return /^0x[0-9a-fA-F]{40}$/.test(hexAddress);
};
