import {
  getHourFromMinutes,
  getHourMinutes,
  getImgUrlByMoment,
  setZeroPrefix,
} from "../utils/common";
import { useMemo, useRef, useState } from "react";

export interface RadarDataProps {
  moment: {
    year: number;
    month: number;
    day: number;
    hour: number;
    minutes: number;
  };
}

export function RadarData({ moment }: RadarDataProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [errorImages, setErrorImages] = useState<{ [k: string]: boolean }>({});

  const preparedMoment = useMemo(() => {
    const { year, month, day, hour, minutes } = moment;

    return {
      year: setZeroPrefix(year),
      month: setZeroPrefix(month),
      day: setZeroPrefix(day),
      hour: setZeroPrefix(hour),
      minutes: setZeroPrefix(minutes),
    };
  }, [moment]);

  const imgUrl = useMemo(() => getImgUrlByMoment(moment), [moment]);

  function setImageError(url: string) {
    setErrorImages((prevState) => ({
      ...prevState,
      [url]: true,
    }));
  }

  const hiddenImages = useMemo(() => {
    let hour = 0;
    let minutes = 0;
    const imageNodes = [];

    for (; minutes <= 1430; minutes = minutes + 10) {
      hour = getHourFromMinutes(+minutes);
      const hourMinutes = getHourMinutes(+minutes, hour);
      const imgUrlByMinutes = getImgUrlByMoment({
        ...moment,
        hour,
        minutes: hourMinutes,
      });

      imageNodes.push(
        <img
          className="h-0 w-0"
          key={minutes}
          src={imgUrlByMinutes}
          alt=""
          onError={() => setImageError(imgUrlByMinutes)}
        />
      );
    }

    return imageNodes;
  }, [moment]);

  const imgAltText = `Снимок за ${preparedMoment.day}.${preparedMoment.month}.${preparedMoment.year} ${preparedMoment.hour}:${preparedMoment.minutes}.`;

  return (
    <div className="flex items-center justify-center h-full">
      {!errorImages[imgUrl] && (
        <img
          className="object-fit min-h-max"
          src={imgUrl}
          alt={imgAltText}
          ref={imgRef}
        />
      )}
      {errorImages[imgUrl] && (
        <div className="container flex justify-center items-center accent-red-400">
          {imgAltText} не найден
        </div>
      )}
      {hiddenImages.map((img) => img)}
    </div>
  );
}
