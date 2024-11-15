import axios from "axios";

export class Request {
  static config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  static async post<T>(url: string, data: T) {
    const res = await axios.post(url, data, this.config);

    return res?.data;
  }

  static async put<T>(url: string, data: T) {
    const res = await axios.put(url, data, this.config);

    return res?.data;
  }

  static async delete(url: string) {
    const res = await axios.delete(url, this.config);

    return res?.data;
  }

  static async get(url: string) {
    const res = await axios.get(url);

    return res?.data;
  }
}
