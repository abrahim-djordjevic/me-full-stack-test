import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ExportJSONButton from "../components/ExportJSONButton";

var dummyData = [
    {
      "id": 1,
      "from": "2018-01-20T17:00Z",
      "to": "2018-01-20T17:30Z",
      "intensity_forecast": 270,
      "intensity_actual": 268,
      "index": "moderate",
      "gas": 35.6,
      "coal": 12.7,
      "biomass": 5.2,
      "nuclear": 14.6,
      "hydro": 3.1,
      "imports": 11.5,
      "wind": 12.8,
      "solar": 19.1,
      "other": 2.3,
      "total": 116.9
    },
    {
      "id": 2,
      "from": "2018-01-20T17:30Z",
      "to": "2018-01-20T18:00Z",
      "intensity_forecast": 260,
      "intensity_actual": 258,
      "index": "low",
      "gas": 45.6,
      "coal": 6.7,
      "biomass": 3.2,
      "nuclear": 11.6,
      "hydro": 4.1,
      "imports": 9.5,
      "wind": 10.8,
      "solar": 17.1,
      "other": 1.3,
      "total": 109.9
    },
    {
      "id": 3,
      "from": "2018-01-20T18:00Z",
      "to": "2018-01-20T18:30Z",
      "intensity_forecast": 250,
      "intensity_actual": 248,
      "index": "low",
      "gas": 55.6,
      "coal": 4.7,
      "biomass": 2.2,
      "nuclear": 9.6,
      "hydro": 3.1,
      "imports": 8.5,
      "wind": 8.8,
      "solar": 15.1,
      "other": 0.3,
      "total": 107.9
    }
];

describe("ExportJSONButton", () => {
    it("renders", () => {
        render(<ExportJSONButton records={dummyData}/>)
    });

    it("button can be cliked", () => {
        render(<ExportJSONButton records={dummyData}/>);
        const button = screen.getByRole("button");
        fireEvent.click(button);
        expect(screen.getByText("Export Records")).toBeInTheDocument();
    })
});