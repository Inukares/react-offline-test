// // __tests__/fetch.test.js
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, waitForElement } from "@testing-library/react";
import * as React from "react";
import { IData, IGas } from "../../models/Energy/Response";
import { mockedAxios } from "../../utils/mockAxios";
import { Chart } from "../Chart";

jest.mock("axios");

test("Check if generation mix data is rendered and time is rendered correctly", () => {
  const exampleTime = "Sun Sep 22 2019 20:47:06 GMT+0200"; // should be 22/09/2019
  const times = {
    from: new Date(exampleTime),
    to: new Date(exampleTime),
  };

  const generationmix: IGas[] = [{
    fuel: "oil",
    perc: 0.3,
  }, {
    fuel: "coal",
    perc: 5.4,
  }];

  const allRequiredProps: IData = { ...times, generationmix };
  const { container, getByText, queryByText } = render(<Chart {...allRequiredProps} />);

  expect(queryByText("oil")).toBeDefined();
  expect(queryByText("0.3")).toBeDefined();
  expect(queryByText(`22/09/2019`)).toBeDefined();

});