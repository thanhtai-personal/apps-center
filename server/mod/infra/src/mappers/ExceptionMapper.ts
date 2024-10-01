export class ExceptionMapper<From = unknown> {
  constructor(private readonly errMapper: Record<string, Error>) {}

  map(
    source: From,
    options?: {
      mappedBy?: From extends Record<string, unknown> ? keyof From : string;
    },
  ): Error {
    const mappedBy = options?.mappedBy?.toString() ?? "errCode";
    const errCode = Object.prototype.hasOwnProperty.call(source, mappedBy)
      ? (source as object)[mappedBy]
      : undefined;
    if (!errCode) {
      return source instanceof Error
        ? source
        : new Error("'error' is not instance of Error");
    }
    return this.errMapper[errCode] ?? new Error(`errCode: ${errCode}`);
  }
}
