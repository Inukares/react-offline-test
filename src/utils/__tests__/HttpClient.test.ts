import axios from "axios";
import HttpClient from "../HttpClient";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>; // support for autocomplete

const mockSuccessFetch = (returnedData: unknown) => mockedAxios.get.mockResolvedValueOnce({
  data: returnedData,
  status: 200,
});

const mockRejectedFetch = (data: unknown) => mockedAxios.get.mockRejectedValueOnce({
  response: {
    data,
  },
  status: 400,
});

describe("HttpClient", () => {
  const API = new HttpClient();

  const mockData = {
    data: "someImportantThing",
    status: 200,
  };

  const mockError = {
    response: {
      data: "some data inside error",
    },
  };

  const mockEmptyError = {
    error: "Uncaught Exception",
  };

  it("Should perform GET request", async () => {
    mockSuccessFetch(mockData);
    const data = await API.get("/successful-fetch");
    expect(data).toBe(mockData);
  });

  it("Given error with data should reject with data", async () => {
    mockRejectedFetch(mockError);

    try {
      await API.get("/failed-fetch");
    } catch (error) {
      expect(error).toBe(mockError);
    }
  });

  it("Given error without data should reject with error object", async () => {
    mockRejectedFetch(mockEmptyError);

    try {
      await API.get("/failed-operation"); // should think of better name probably
    } catch (error) {
      expect(error).toBe(mockEmptyError);
    }
  });
});
