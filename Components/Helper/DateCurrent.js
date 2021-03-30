export function getCurrentDate(){

  let curTime = new Date().toLocaleString();
  curTime = curTime.replace('/','-')
  curTime = curTime.replace('/','-')
  return curTime;
  }