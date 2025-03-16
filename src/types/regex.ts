// Minimum six characters, at least 1 letter, 1 number, and allows special characters
export const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/;
