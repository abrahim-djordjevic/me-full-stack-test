import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import DeleteRecordModal from "../components/DeleteRecordModal";

var dummyData = {
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
  }

describe("DeleteRecordModal", () => {
    it("renders", () => {
        render(<DeleteRecordModal record={dummyData} cancelMethod={() => {}} submitMethod={null} />)
    });

    it("Correct Text is rendered", () => {
        render(<DeleteRecordModal record={dummyData} cancelMethod={() => {}} submitMethod={null} />)
        expect(screen.getByText("Delete Record")).toBeInTheDocument();
    });

    it("Cancel Button can be clicked", () => {
        render(<DeleteRecordModal record={dummyData} cancelMethod={() => {}} submitMethod={null} />)
        const button = screen.getByText("Cancel");
        fireEvent.click(button);
    });

    it("Delete Button can be clicked", () => {
        render(<DeleteRecordModal record={dummyData} cancelMethod={() => {}} submitMethod={null} />)
        const button = screen.getByText("Delete");
        fireEvent.click(button);
    });
});