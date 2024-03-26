import React from "react";
import "@testing-library/jest-dom";
import { render, waitFor } from "@testing-library/react";
import FixedRange from "../index";
import { getPosibleValues } from "../../../helpers/api-util";

jest.mock("../../../helpers/api-util", () => ({
  getPosibleValues: jest.fn(() =>
    Promise.resolve({ rangeValues: [10, 20, 30] })
  ),
}));

describe("FixedRange component", () => {
  it("renders loading state initially", async () => {
    const { getByText } = render(<FixedRange />);
    waitFor(() => expect(getByText(/Loading/i)).toBeInTheDocument());
    waitFor(() => expect(getPosibleValues).toHaveBeenCalledTimes(1));
  });

  it("renders with fetched min/max values", async () => {
    const { getByText } = render(<FixedRange />);
    await waitFor(() => expect(getByText(/Values:/)).toBeInTheDocument());
  });
});
