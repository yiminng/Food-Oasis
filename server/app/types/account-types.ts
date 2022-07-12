export interface User {
  firstName: string;
  lastName: string;
  email: string;
  tenantId: number;
}

export interface Account extends User {
  id: number;
  emailConfirmed: boolean;
  passwordHash: string;
  dateCreated: string;
  isGlobalAdmin: boolean;
  isGlobalReporting: boolean;
  isAdmin: boolean;
  isSecurityAdmin: boolean;
  isDataEntry: boolean;
  isCoordinator: boolean;
}

export interface RegisterFields extends User {
  password: string;
  clientUrl: string;
}

type ResponseCode =
  | "REG_SUCCESS"
  | "REG_DUPLICATE_EMAIL"
  | "REG_EMAIL_FAILED"
  | "REG_ACCOUNT_NOT_FOUND"
  | "FORGOT_PASSWORD_SUCCESS"
  | "FORGOT_PASSWORD_ACCOUNT_NOT_FOUND"
  | "FORGOT_PASSWORD_EMAIL_FAILED";

export interface AccountResponse {
  isSuccess: boolean;
  code: ResponseCode;
  newId: string | null;
  message: string;
}
