import fetch from "cross-fetch";

import { routes_config } from "../../../config/routes-config";
import { Request, Response, NextFunction } from "express";

export const Authenticator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.musvibeToken;
  if (!token) return res.status(401).json("Error: Access denied");
  try {
    const userResponse = await fetch(`${routes_config.AUTH_URL}/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        cookie: `musvibeToken=${token}`,
      },
      credentials: "same-origin",
    });

    if (userResponse.status === 401) {
      const response = await userResponse.json();
      return next(new Error(`${response}`));
    } else {
      const response = await userResponse.json();
      req.user = response;
      return next();
    }
  } catch (err) {
    return next(err);
  }
};
