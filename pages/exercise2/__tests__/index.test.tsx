import React from "react";
import { render, waitFor } from "@testing-library/react";
import FixedRange from "../index";
import { getPosibleValues } from "../../../helpers/api-util";

jest.mock("../../../helpers/api-util", () => ({
  getPosibleValues: jest.fn(() =>
    Promise.resolve({ rangeValues: [10, 20, 30] })
  ),
}));

test("renders FixedRange component correctly", async () => {
  const { container, debug } = render(<FixedRange />);
  await waitFor(() => expect(getPosibleValues).toHaveBeenCalled());
  expect(container).toMatchSnapshot();
});
