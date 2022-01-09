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