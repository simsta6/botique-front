export const axiosConfig = {
  credentials: "include",
  headers: {
    "content-type": "application/json"
  },
  validateStatus: (status: number): boolean => {
    return status >= 200 && status < 500;
  },
};
