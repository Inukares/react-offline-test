import Axios, { AxiosResponse } from "axios";


// a lot more could be added there, like other methods (e.g. POST), some actual logging when err happens etc.
// should also add more advanced types for errors and therefore improve error type while fetching API call
export default class HttpClient {

  public get = async <T>(endpoint: string): Promise<T> => new Promise(
    async (resolve, reject): Promise<void> => {
      try {
        const res: AxiosResponse = await Axios.get<T>(endpoint);
        resolve(res.data);
      } catch (error) {
        const err = error.response ? error.response.data : error;
        reject(err);
      }
    },
  )

}
