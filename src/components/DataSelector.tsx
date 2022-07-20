import { useEffect, useMemo, useState } from "react";
import { getHourFromMinutes, getHourMinutes } from "../utils/common";

export interface SelectorData {
  date: Date;
  hour: number;
  minutes: number;
}

export interface DataSelectorProps {
  onChange: (data: SelectorData) => void;
}

export function DataSelector({ onChange }: DataSelectorProps) {
  const [state, setState] = useState({
    date: new Date(),
    hour: 0,
    minutes: 0,
  });

  const formattedDate = useMemo(
    () => state.date.toISOString().substring(0, 10),
    [state.date]
  );

  function handleDateChange(event: React.ChangeEvent<HTMLInputElement>) {
    setState({
      ...state,
      date: event.target.valueAsDate || new Date(),
    });
  }

  function handleMinutesChange(event: React.ChangeEvent<HTMLInputElement>) {
    const hour = getHourFromMinutes(+event.target.value);
    const minutes = getHourMinutes(+event.target.value, hour);

    setState({
      ...state,
      hour,
      minutes,
    });
  }

  useEffect(() => {
    onChange(state);
  }, [state]);

  return (
    <div className="flex justify-center">
      <input
        type="date"
        defaultValue={formattedDate}
        onChange={handleDateChange}
      />
      <input
        type="range"
        min="0"
        max="1430"
        step="10"
        defaultValue="0"
        onChange={handleMinutesChange}
      />
    </div>
  );
}
