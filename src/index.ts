import dotenv from 'dotenv';
import Server from "./models/server";

dotenv.config();                                                                //configura dotenv para poder usar las variables de .env

const server = new Server();