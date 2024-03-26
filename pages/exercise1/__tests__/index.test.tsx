import React from "react";
import "@testing-library/jest-dom";
import NormalRange from "../index";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { getMinMax } from "../../../helpers/api-util";

jest.mock("../../../helpers/api-util", () => ({
  getMinMax: jest.fn(() => Promise.resolve({ min: 10, max: 100 })),
}));

describe("NormalRange component", () => {
  it("renders loading state initially", async () => {
    const { getByText } = render(<NormalRange />);
    waitFor(() => expect(getByText(/Loading/i)).toBeInTheDocument());
    waitFor(() => expect(getMinMax).toHaveBeenCalledTimes(1));
  });

  it("renders with fetched min/max values", async () => {
    const { getByText } = render(<NormalRange />);
    await waitFor(() => expect(getByText(/Range values/)).toBeInTheDocument());
  });

  it("updates selected values on input change", async () => {
    const { getByLabelText } = render(<NormalRange />);
    await waitFor(() => {
      const minInput = getByLabelText("Min Value") as HTMLInputElement;
      const maxInput = getByLabelText("Max Value") as HTMLInputElement;
      fireEvent.change(minInput, { target: { value: "20" } });
      fireEvent.change(maxInput, { target: { value: "80" } });
      expect(minInput.value).toBe("20");
      expect(maxInput.value).toBe("80");
    });
  });
});
