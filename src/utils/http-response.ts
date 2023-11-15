export interface HttpResponseInterface {
  success?: boolean;
  data?: unknown;
  message?: string;
  total?: number;
}

export class HttpReturn {
  public static build(
    { success, data, message, total }: HttpResponseInterface = {
      success: true,
      data: {},
      message: '',
      total: 0,
    },
  ) {
    return {
      success: success ?? true,
      data: data ?? {},
      message: message ?? '',
      total: total ?? 0,
    };
  }
}
