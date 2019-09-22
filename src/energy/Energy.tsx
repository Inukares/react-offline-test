import { Box } from "grommet";
import { isEmpty } from "lodash";
import * as React from "react";
import { IData, IResponse } from "../models/Energy/Response";
import HttpClient from "../utils/HttpClient";
import { Chart } from "./Chart";

const initialState = Object.freeze({
  data: [] as any, // TODO: Work on actually meaningful type!
  error: {},
  loading: false,
});

type State = typeof initialState;

// could be refactored to a hook
export default class Energy extends React.Component<{}, IResponse | State> {
  public readonly state: State = initialState;

  public componentDidMount = () => {
    this.getData();
  }

  private getData = async () => {
    const API = new HttpClient();
    // would refactor in the future to get url from config or sth similar
    const url = "https://api.carbonintensity.org.uk/generation";
    // below should be improved to change loading only
    this.setState((state) => ({ ...state, loading: true }));
    try {
      const response: IResponse = await API.get(url);
      this.setState(() => ({ data: response.data, loading: false, error: {} }));
    } catch (error) {
      console.error(error);
      this.setState((state) => ({ ...state, loading: false, error }));
    }
  }

  // tslint:disable:member-ordering
  public render() {
    return (
      <Box justify={"center"}>
        {!isEmpty(this.state.data) && <Chart {...this.state.data} />}
      </Box>
    );
  }
};