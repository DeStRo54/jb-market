export const formatPhoneNumber = (phoneNumber: string) =>
  phoneNumber.replace("+7", "8").replace(/ /g, "").replace(/\(|\)/g, "");
