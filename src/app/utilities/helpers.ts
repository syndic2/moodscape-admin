export const filterObjectProps= (object) => {
  let stringfiedObj= JSON.stringify(object, (key, value) => {
    return ['', null].includes(value) || (typeof value === 'object' && (value.length === 0 || Object.keys(value).length === 0)) ? undefined : value;
  });
  let cleanedObject = JSON.parse(stringfiedObj);
  let isEmptyProps = ['{}', '[]', '""', 'null'].some((key) => stringfiedObj.includes(key));

  if (isEmptyProps) return filterObjectProps(cleanedObject);

  return cleanedObject;
};

export const filterArrayByAnotherArray= (
  array1: { type: string, items: Object[] | [] },
  array2: { type: string, items: Object[] | [] },
  fieldToCompare?: { field1?: string, field2?: string },
  isFilter: boolean= true
) => {
  const checkType= (item1, item2) => {
    if (array1.type === 'none-object' && array2.type === 'none-object') return item2 === item1;
    else if (array1.type === 'object' && array2.type === 'object') return item2[fieldToCompare.field2] === item1[fieldToCompare.field1];
    else if (array1.type === 'none-object' && array2.type === 'object') return item2[fieldToCompare.field2] === item1;
    else if (array1.type === 'object' && array2.type === 'none-object') return item2 === item1[fieldToCompare.field1];
  };
  let filtered= [];

  filtered= array1.items.filter(item1 => {
    if (!isFilter) {
      return array2.items.find(item2 => {
        return checkType(item1, item2);
      });
    }

    return !array2.items.find(item2 => {
      return checkType(item1, item2);
    });
  });

  return filtered;
};

export const transformDateTime= (dateTime: Date) => {
  const months= [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];
  const days= ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

  const transformed= {
    date: dateTime.getDate() < 10 ? `0${dateTime.getDate()}` : dateTime.getDate(),
    day: days[dateTime.getDay()],
    month: dateTime.getMonth()+1 < 10 ? `0${dateTime.getMonth()+1}` : dateTime.getMonth()+1,
    year: dateTime.getFullYear(),
    hours: dateTime.getHours(),
    minutes: dateTime.getMinutes() < 10 ? `0${dateTime.getMinutes()}` : dateTime.getMinutes(),
    seconds: dateTime.getSeconds(),
    milliSeconds: dateTime.getMilliseconds(),
    meridiem: dateTime.getHours() >= 12 ? 'PM' : 'AM',
    'format::/': null,
    toISODate: null,
    toVeryShortDate: null,
    toShortDate: null,
    toDate: null,
    toTime: null
  };

  transformed['format::/']= (): string => {
    return `${transformed.date}/${transformed.month}/${transformed.year}`;
  };

  transformed.toISODate= (): string => {
    return `${transformed.year}-${transformed.month}-${transformed.date}`;
  };

  transformed.toShortDate= (): string => {
    return `${transformed.day}, ${transformed.date}/${transformed.month}/${transformed.year}`;
  };

  transformed.toDate= (): string => {
    return `${transformed.day}, ${transformed.date} ${months[dateTime.getMonth()]} ${transformed.year}`;
  };

  transformed.toTime= (): string => {
    return `${transformed.hours}:${transformed.minutes}`;
  };

  return transformed;
};
