type TokenPayloadType = {
  sub: number ;
  user: string;
  iat: number;
  exp?: number;
};
export default TokenPayloadType;