export const getIndex = (value: Array<any>, k: string): number => {
  if(!value || value === undefined || value === null){
    throw new Error("Object is expected in getIndex");
  }
  let i = -1
  for (let index = 0; index < value.length; index++) {
    if(value[index].key == k) {
      i = index;
      break
    }
  }
  return i;
}

export const removeDuplicates = (arr : any[], key? : string) : Promise<Array<any | string>> => new Promise((resolve) => {
  if(key){
    const remove = arr.filter((val, index, array) => array.findIndex((find) => find[key] === val[key]) === index);
    resolve(remove);
  } else {
    const remove = arr.filter((val, index, array) => array.findIndex((find) => find === val) === index);
    resolve(remove);
  }
  
});