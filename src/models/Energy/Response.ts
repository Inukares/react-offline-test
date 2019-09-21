
interface IGas {
  fuel: string;
  perc: number;
}

interface IData {
  from: Date;
  to: Date;
  "generationMix": IGas[];
}

interface IResponse {
  data: IData;
}

export { IData, IResponse };
