export const initFunction = () => {
  const storageTodos = localStorage.getItem('savedTodos');
  const parsedTodos = storageTodos ? JSON.parse(storageTodos) : [];
  return parsedTodos;
}


export function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}
export function stringAvatar(name: string) {
  const [firstInitial, secondInitial] = name.split(' ').map(name => name[0]);
  return {
    sx: { bgcolor: name ? stringToColor(name) : 'rgb(14 165 233)' },
    children: `${firstInitial ? firstInitial : ''}${secondInitial ? secondInitial : ''}`
  };
}

// export function stringAvatar(name: string) {
//   return {    
//     sx: {
//       bgcolor: stringToColor(name),
//     },
//     children: `${name.split(' ')?.[0]?.[0]}${name.split(' ')?.[1]?.[0]}`,
//   };
// }