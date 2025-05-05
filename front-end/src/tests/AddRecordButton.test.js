import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AddRecordButton from "../components/AddRecordButton";

describe("AppRecordButton", () => {
    it("renders", () => {
        render(<AddRecordButton />)
    });

    it("button can be cliked", () => {
        render(<AddRecordButton />);
        const button = screen.getByRole("button");
        fireEvent.click(button);
        expect(screen.getByText("Add Record")).toBeInTheDocument();
    })
});