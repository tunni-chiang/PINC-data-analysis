export function tempDisplay(sec: number, data: any, default_data: any, cb: (x: any) => void): void {
  cb(data);
  setTimeout(() => {
    cb(default_data);
  }, sec);
}

export function getTime(time: number) {
  return Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2);
}

export function calcWidth(length: number, full_length: number) {
  if (length >= full_length) {
    return "100";
  }

  if (length == 0) {
    return "10";
  }

  let x = length / full_length;
  x = x * 100;
  return x.toString();
}
