export function timeParts(
   distance: number
): [days: number, hours: number, minutes: number, seconds: number] {
   const days = Math.floor(distance / DAY);
   const hours = Math.floor((distance % DAY) / HOUR);
   const minutes = Math.floor((distance % HOUR) / MINUTE);
   const seconds = Math.floor(distance % MINUTE);
   return [days, hours, minutes, seconds];
}

export function dailyTimeString(distance: number) {
   const [, hours, minutes, seconds] = timeParts(distance);
   return `${hours}:${minutes}:${seconds}`;
}

export function isReset(reinvests: number, checkpoint: number, reinvestCheckPoint: number) {
   let totalDays = Math.floor((new Date().getTime() / 1000 - checkpoint) / DAY);
   let passedDays = totalDays % 21;
   if (reinvestCheckPoint < checkpoint + 21 * Math.floor(totalDays / 21) * DAY) {
      reinvests = 0;
   }
   return (reinvests & (2 ** passedDays - 1)) !== 2 ** passedDays - 1;
}

export const MINUTE = 60;
export const HOUR = 60 * MINUTE;
export const DAY = 24 * HOUR;
export const now = () => Math.floor(new Date().getTime() / 1000);

export function days(distance: number) {
   return Math.floor(distance / DAY);
}
