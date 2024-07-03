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

export const checkIfExists = (element:string, dataType:string) => {
  let data = [];
  const isEditMode = localStorage.getItem(dataType+'Edit');
  const json = localStorage.getItem(dataType);
  data = json ? JSON.parse(json) : [];

  const searchValue = element.toLowerCase();
  const filteredData = data.filter((row:any) =>
    Object.values(row).some(value =>
      // String(value).toLowerCase().includes(searchValue)
      String(value).toLowerCase() === searchValue
    )
  );
  if(!isEditMode &&filteredData.length >0) {
    return true;
  } else {
    return false;
  }
};

export function formatDate(dateInput: string | Date) {
  if (typeof dateInput === 'string') {    
    const dateObject = new Date(dateInput);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    }).format(dateObject);
  } else if (dateInput instanceof Date) {
    // Input is already a Date object, format it directly
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    }).format(dateInput);
  }
}

export const labelColors = {
  html: 'red',
  css: 'blue',
  jquery: 'green',
  nodejs: 'black',
};