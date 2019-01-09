let arr = [
  1,
  1,
  'true',
  'true',
  true,
  true,
  15,
  15,
  false,
  false,
  undefined,
  undefined,
  null,
  null,
  NaN,
  NaN,
  'NaN',
  0,
  0,
  'a',
  'a', {}, {}
];

/* 1. set */

  // function unique(arr) {
  //   return Array.from(new Set(arr))
  // }




/* 2. for for */


  // function unique(arr) {
  //   if (!Array.isArray(arr)) {
  //     console.log('type error');
  //     return
  //   }
  //   for (let i = 0; i < arr.length; i++) {
  //     for (let j = i + 1; j < arr.length; j++) {
  //       if (arr[i] === arr[j]) {
  //         arr.splice(j,1)
  //         j--
  //       }
        
  //     }
      
  //   }
  //   return arr
  // }







/* 3. indexOf */

  // function unique(arr) {
  //   if (!Array.isArray(arr)) {
  //     console.log('type error');
  //     return
  //   }
  //   let array = [];
  //   for (let i = 0; i < arr.length; i++) {
  //     if (array.indexOf(arr[i]) === -1) {
  //       array.push(arr[i])
  //     }
      
  //   }
  //   return array
  // }







/* 4. sort */
  // function unique(arr) {
  //   if (!Array.isArray(arr)) {
  //     console.log('type error');
  //     return
  //   }
  //   arr.sort()
  //   let array = [arr[0]];
  //   for (let i = 1; i < arr.length; i++) {
      
  //     if (arr[i] !== arr[i-1]) {
  //       array.push(arr[i])
  //     }
      
  //   }
  //   return array
  // }



/* 5. obj */
  // function unique(arr) {
  //   if (!Array.isArray(arr)) {
  //     console.log('type error');
  //     return
  //   }
  //   let array = [];
  //   let obj = {};
  //   for (let i = 0; i < arr.length; i++) {
  //     if (!obj[arr[i]]) {
  //       array.push(arr[i]);
  //       obj[arr[i]] = 1;
  //     }else{
  //       obj[arr[i]] ++
  //     }
      
  //   }
  //   return array
  // }





/* 6. includes */
  // function unique(arr) {
  //   if (!Array.isArray(arr)) {
  //     console.log('type error');
  //     return
  //   }
  //   let array = [];
  //   for (let i = 0; i < arr.length; i++) {
  //     if (!array.includes(arr[i])) {
  //       array.push(arr[i])
  //     }
      
  //   }
  //   return array
  // }







/* 7. set */

  // function unique(arr) {
  //   return [...new Set(arr)]
  // }


console.log((unique(arr)).length);