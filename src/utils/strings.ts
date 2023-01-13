export function capitalize(str: string) {
  return str.toLowerCase().split(' ').map((word) => {
    return word[0].toUpperCase() + word.slice(1);
  }).join(' ');
}
