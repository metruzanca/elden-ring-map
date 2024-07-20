import "leaflet/dist/leaflet.css";
import * as L from "leaflet";
import { onMount } from "solid-js";

const FEXTRA_URL = "https://eldenring.wiki.fextralife.com/file/Elden-Ring";
const COORDS = "{z}/{x}/{y}.jpg";

const MAP_ID = "map";

const PARAMS = {
  area: "area",
} as const;

type Area = "main" | "ashen" | "scadu" | "sofia";

const AREA: Record<Area, string> = {
  // TODO Save these in repo
  main: `${FEXTRA_URL}/map-50be4728-3907-4f33-8857-7f063e0d24eb/map-tiles.4/{z}/{x}/{y}.jpg`,
  scadu: `${FEXTRA_URL}/map-9d02bccc-081b-4a1d-b26e-a363f366fb40/map-tiles.2/${COORDS}`,
  sofia: `${FEXTRA_URL}/map-c5431314-6159-4599-9668-0ccf4e1f8e9a/map-tiles.4/${COORDS}`,
  ashen: `${FEXTRA_URL}/map-96747699-d8a3-44b4-b2d6-cf6b45c579c6/map-tiles.1/${COORDS}`,
};

export default function App() {
  onMount(() => {
    const params = new URLSearchParams(location.search);
    const areaName = (params.get(PARAMS.area) as Area) ?? "main";
    const mapUrl = AREA[areaName];

    const map = L.map(MAP_ID).setView([0, 0], 1);

    L.tileLayer(mapUrl, {
      maxZoom: 7,
      noWrap: true,
    }).addTo(map);
  });

  return (
    <div class="bg-black w-screen h-screen">
      <div id={MAP_ID} class="h-screen "></div>
    </div>
  );
}
