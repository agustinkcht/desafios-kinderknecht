import { config } from "dotenv";
import argsUtil from "./args.util.js";

const { env } = argsUtil;

const path = env === "prod" ? "./.env.prod" : "./.env.dev";
// si env del argsUtil es prod, entonces usá el .env.prod, de otra forma usa el de dev
// el resultado de este condicional es asignado a path
// habría que inhabilitar que env sea diferente de env o prod

config({ path });

const environment = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  PUBLIC_STRIPE: process.env.PUBLIC_STRIPE,
  SECRET_COOKIE: process.env.SECRET_COOKIE,
  SECRET_SESSION: process.env.SECRET_SESSION,
  SECRET_JWT: process.env.SECRET_JWT,
  SECRET_STRIPE: process.env.SECRET_STRIPE,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  GOOGLE_EMAIL: process.env.GOOGLE_EMAIL,
  GOOGLE_PASSWORD: process.env.GOOGLE_PASSWORD
};
// .env devuelve da acceso a las variables de entorno del proceso actual 

export default environment;
// es el objeto entero con las variables de entorno y su valor

