import { jwtDecode } from "jwt-decode";

export const userJwtPayload = (token) => {
  const payload = jwtDecode(token);
  const customPayload = {
    ...payload,
    role: payload.role || null,
  };
  return customPayload;
};
