
// todo: change naming so that it is more meaningful

interface IGas {
  fuel: string;
  perc: number;
}

interface IData {
  from: Date;
  to: Date;
  generationmix: IGas[];
}

interface IResponse {
  data: IData;
}

export { IData, IResponse, IGas };
