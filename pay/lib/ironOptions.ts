export const ironOptions = {
    cookieName: "siwe",
    password: process.env.SESSION_SECRET || "",
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  };