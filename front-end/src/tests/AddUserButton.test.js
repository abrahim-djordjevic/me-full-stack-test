import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AddUserButton from "../components/AddUserButton";

describe("AppUserButton", () => {
    it("renders", () => {
        render(<AddUserButton />)
    });

    it("button can be cliked", () => {
        render(<AddUserButton />);
        const button = screen.getByRole("button");
        fireEvent.click(button);
        expect(screen.getByText("Add User")).toBeInTheDocument();
    })
});