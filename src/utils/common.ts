import { RadarDataProps } from "../components/RadarData";

export const IMG_URL_PREFIX = "https://weather.rshu.ru/radar/data/P_100_26061_";

export function setZeroPrefix(number: number) {
  return number < 10 ? `0${number}` : `${number}`;
}

export function getHourFromMinutes(dayMinutes: number) {
  return Math.floor(dayMinutes / 60);
}

export function getHourMinutes(dayMinutes: number, hour: number) {
  return +dayMinutes - hour * 60;
}

export function getImgUrlByMoment(moment: RadarDataProps["moment"]) {
  const year = setZeroPrefix(moment.year);
  const month = setZeroPrefix(moment.month);
  const day = setZeroPrefix(moment.day);
  const hour = setZeroPrefix(moment.hour);
  const minutes = setZeroPrefix(moment.minutes);

  return `${IMG_URL_PREFIX}${year}_${month}_${day}_${hour}${minutes}_MRL.PNG`;
}
