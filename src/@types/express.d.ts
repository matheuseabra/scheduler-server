declare namespace Express {
  export interface IRequest {
    user: {
      id: string;
    };
  }
  // eslint-disable-next-line @typescript-eslint/interface-name-prefix
  export interface Request {
    user: {
      id: string;
    };
  }
}
