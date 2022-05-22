import { useEffect, useRef } from "react";

// /**
//  * @callback callbackFunc
//  * @param {any[]} args - arguments passed into callback
//  */
// /**
//  * Debounce function to reduce number executions
//  * @param {callbackFunc} cb - callback function to be executed
//  * @param {number} wait - number of milliseconds to delay function execution
//  * @param {any[]} deps - dependencies array
//  */
// const useDebounce = (cb, wait = 500, deps = []) => {
//   const timerRef = useRef(null);

//   useEffect(() => {
//     clearTimeout(timerRef.current);

//     timerRef.current = setTimeout(() => {
//       cb.apply(this, []);
//     }, wait);

//     return () => clearTimeout(timerRef.current);
//   }, [cb, wait, JSON.stringify(deps)]);
// };

export const debounce = (callback, wait) => {
  /**  @type {number} */
  let timer;

  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => callback(...args), wait);
  };
};

// export default useDebounce;
