import crypto from "node:crypto";

type Response<T> = {
  statusCode: number;
  message: string;
  data?: T;
};

export const primaryKey = () => {
  return crypto.randomUUID();
};

export const hashPassword = (password: string) => {
  return crypto.createHash("sha256").update(password).digest("hex");
};

export const comparePassword = (password: string, hash: string) => {
  return hashPassword(password) === hash;
};

export const response = <T>(
  statusCode: number,
  message: string,
  data?: T
): Response<T> => {
  return { statusCode, message, data };
};

export class ErrorResponse extends Error {
  statusCode: number;
  data?: any;
  constructor(statusCode: number, message: string, data?: any) {
    super(message);
    this.statusCode = statusCode;
    this.data = data;
    this.name = "ErrorResponse";
  }
}
