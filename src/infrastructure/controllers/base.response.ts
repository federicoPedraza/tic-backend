export interface HttpResponse<T> {
  message: string;
  data: T;
  status: number;
}
