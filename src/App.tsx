import React, { useState } from "react";
import "./App.css";
import { RadarData } from "./components/RadarData";
import { DataSelector, SelectorData } from "./components/DataSelector";

function App() {
  const [moment, setMoment] = useState({
    year: 0,
    month: 0,
    day: 0,
    hour: 0,
    minutes: 0,
  });

  function handleDataChange({ date, hour, minutes }: SelectorData) {
    setMoment({
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
      hour,
      minutes,
    });
  }

  return (
    <>
      <header className="header">Данные радара РГГМУ</header>
      <main className="h-full grid grid-rows-[minmax(496px,_1fr)_min-content] w-full px-2 justify-center">
        <div className="">
          <RadarData moment={moment}></RadarData>
        </div>
        <DataSelector onChange={handleDataChange}></DataSelector>
      </main>
    </>
  );
}

export default App;
