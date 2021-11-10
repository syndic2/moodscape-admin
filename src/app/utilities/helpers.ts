export const checkFileType= (files: FileList, extensions: string[]): boolean => {
  if (!files.length || !files[0]) {
    return false;
  }

  const extension= files[0].name.split('.').pop().toLowerCase();
  if (!extensions.includes(extension)) {
    return false;
  }

  return true;
};

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

export const hexToRgb= (hexString: string) => {
  if (hexString.length != 6){ 
    //throw "Only six-digit hex colors are allowed.";
    return [];
  }

  const aRgbHex= hexString.match(/.{1,2}/g);
  const aRgb= [
    parseInt(aRgbHex[0], 16),
    parseInt(aRgbHex[1], 16),
    parseInt(aRgbHex[2], 16)
  ];

  return aRgb;
};

const colorToHex= (color: number) => {
  let hex= color.toString(16);

  return hex.length === 1 ? '0'+hex : hex;
};

export const rgbToHex= (rgb: number[]) => {
  if (rgb.length > 3) {
    return undefined;
  }

  return '#'+colorToHex(rgb[0])+colorToHex(rgb[1])+colorToHex(rgb[2]);
};

export const getColorShades= (rgb: number[], percent: number) => {
  if (rgb.length > 3) {
    return [];
  }

  //let shades= [];

  rgb[0]= Math.floor(rgb[0]*(100+percent)/100);
  rgb[1]= Math.floor(rgb[1]*(100+percent)/100);
  rgb[2]= Math.floor(rgb[2]*(100+percent)/100);

  rgb[0]= rgb[0] < 255 ? rgb[0] : 255;
  rgb[1]= rgb[1] < 255 ? rgb[1] : 255;
  rgb[2]= rgb[2] < 255 ? rgb[2] : 255;
  
  //for (let i = startContrast; i <= endContrast; i++) {
  //  shades.push([
  //    Math.floor(i*rgb[0]/10), 
  //    Math.floor(i*rgb[1]/10), 
  //    Math.floor(i*rgb[2]/10)
  //  ]);
  //}

  return rgb;
};
