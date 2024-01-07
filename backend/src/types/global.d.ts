declare namespace NodeJS {
  interface ProcessEnv {
    PORT: string;
    DB_CONN_STRING: string;
    DB_NAME: string;
  }
}