declare namespace Shenjian {
  interface IHeaders {
    Accept: string;
    'User-Agent': string;
    Cookie: string;
    Referer: string;
    [key: string]: string;
  }
}
