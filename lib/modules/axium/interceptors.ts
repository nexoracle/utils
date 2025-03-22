import { Interceptor } from "./types";

export class InterceptorManager<T> {
  private interceptors: Interceptor<T>[] = [];

  add(interceptor: Interceptor<T>) {
    this.interceptors.push(interceptor);
  }

  async apply(value: T): Promise<T> {
    let result = value;
    for (const interceptor of this.interceptors) {
      result = await interceptor(result);
    }
    return result;
  }
}
