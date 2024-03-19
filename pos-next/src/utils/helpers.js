export const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// shorting name with initials
export const shortName = (name) => {
  return name.toUpperCase().split(' ').slice(0, 2).map(word => word.charAt(0)).join('');
}