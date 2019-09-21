import * as React from "react";
import { IData, IResponse } from "../models/Energy/Response";
import HttpClient from "../utils/HttpClient";

const initialState = Object.freeze({
  data: [],
  error: {},
});

type State = typeof initialState;

// could be refactored to a hook
export default class Energy extends React.Component<{}, IResponse | State> {
  public readonly state: State = initialState;

  public componentDidMount = async () => {
    const API = new HttpClient();
    // would refactor in the future to get url from config or sth similar
    const url = "https://api.carbonintensity.org.uk/generation";
    try {
      const data: IData = await API.get(url);
      this.setState({ data });
    } catch (error) {
      console.error(error);
      this.setState((state) => ({ ...state, error }));
    }
  }

  public render() {
    return (
      <div>
        Test if I render
      </div>
    );
  }
}
