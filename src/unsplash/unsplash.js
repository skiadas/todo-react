import { useState, useEffect, useRef } from "react";

export default function Unsplash(props) {
  const imgRef = useRef(null);
  const [isOn, searchString, setIsOn, setSearchString] = useRandomUnsplash(
    (url) => (imgRef.current.src = url),
    5000
  );
  return (
    <div
      className="unsplash"
      style={{ width: "400px", display: "flex", "flex-direction": "column" }}
    >
      <button onClick={() => setIsOn(!isOn)}>{isOn ? "Stop" : "Start"}</button>
      <input
        className="search"
        type="text"
        value={searchString}
        onChange={(ev) => setSearchString(ev.target.value)}
      />
      <img ref={imgRef} className="result" src="" alt="" />
    </div>
  );
}

function useRandomUnsplash(handleNewUrl, frequency) {
  const [isOn, setIsOn] = useState(false);
  const [searchString, setSearchString] = useState("");
  useEffect(() => {
    if (isOn) {
      getResults(searchString).then(handleNewUrl);
      const id = setInterval(
        () => getResults(searchString).then(handleNewUrl),
        frequency
      );
      return () => clearInterval(id);
    }
  }, [isOn, searchString]);
  return [isOn, searchString, setIsOn, setSearchString];
}

function getResults(searchString) {
  return fetch(makeURL(searchString))
    .then((s) => s.json())
    .then((json) => json.urls.small);
}

function makeURL(searchString) {
  return `https://api.unsplash.com/photos/random?query=${encodeURIComponent(
    searchString
  )}&client_id=M8gkni-HSRbU0mPcw9qgY9FUttQi95NHfUD_O8CO-C8`;
}
