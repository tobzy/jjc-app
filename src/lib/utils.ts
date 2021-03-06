import lightgreen from "../assets/other assets/svgs/lightgreen.svg";
import darkgreen from "../assets/other assets/svgs/darkgreen.svg";
import purple from "../assets/other assets/svgs/purple.svg";
import orange from "../assets/other assets/svgs/orange.svg";

export const debouncePromise = (fn:any, time:number) => {
  let timerId:any = null;
  let resolveFns:any[] = [];

  return function debounced(...args:any) {
    clearTimeout(timerId);

    timerId = setTimeout(() => {
      // @ts-ignore
      resolveFns.forEach((resolve) => resolve(fn(...args)));
      resolveFns = [];
    }, time);

    return new Promise((resolve) => resolveFns.push(resolve));
  };
}

/**
 * Returns the date value formatted like MM-DD-YYYY
 * @param date to be formatted
 * @returns
 */
// TODO: Replace with Intl.DateTimeFormat
export const formatDate = (date: Date): string => {
  const year = `${date.getFullYear()}`;
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');

  return [month, day, year].join('-');
};

export const getIcon = (color:string = '') => {
  if(color.includes('lightgreen')){
    return lightgreen
  }

  if(color.includes('darkgreen')){
    return darkgreen
  }

  if(color.includes('purple')){
    return purple
  }

  if(color.includes('orange')){
    return orange
  }
}

export const getStatusColor = (status:string):string => {
 switch (status){
   case "verified":
     return "green"
   case "pending":
     return "orange"
   case "denied":
     return "red"
 }

 return "green"

}

const size = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '425px',
  tablet: '768px',
  laptop: '1024px',
  laptopL: '1440px',
  desktop: '2560px'
}

export const device = {
  mobileS: `(max-width: ${size.mobileS})`,
  mobileM: `(max-width: ${size.mobileM})`,
  mobileL: `(max-width: ${size.mobileL})`,
  tablet: `(max-width: ${size.tablet})`,
  laptop: `(max-width: ${size.laptop})`,
  laptopL: `(max-width: ${size.laptopL})`,
  desktop: `(max-width: ${size.desktop})`,
  desktopL: `(max-width: ${size.desktop})`
};