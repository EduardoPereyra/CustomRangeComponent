import { getMinMax, getPosibleValues } from "../api-util";

jest.mock("axios");

describe("getMinMax function", () => {
  test("fetches data correctly", async () => {
    const mockData = { min: 0, max: 100 };
    global.fetch = jest.fn().mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockData),
    });

    const data = await getMinMax();
    expect(fetch).toHaveBeenCalledWith("http://demo0534446.mockable.io/minMax");
    expect(data).toEqual(mockData);
  });
});

describe("getPosibleValues function", () => {
  test("fetches data correctly", async () => {
    const mockData = { rangeValues: [10, 20, 30] };
    global.fetch = jest.fn().mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockData),
    });

    const data = await getPosibleValues();
    expect(fetch).toHaveBeenCalledWith(
      "http://demo0534446.mockable.io/posibleValues"
    );
    expect(data).toEqual(mockData);
  });
});
