export interface IOrmConfig {
  dbName: string;
  user: string;
  password: string;
  host: string;
  port: number;
  entities: Record<string, unknown>[];
}
export class OrmConfig implements IOrmConfig {
  dbName: string;
  user: string;
  password: string;
  host: string;
  port: number;
  entities: Record<string, unknown>[];

  constructor(config: IOrmConfig) {
    this.dbName = config.dbName;
    this.user = config.user;
    this.password = config.password;
    this.host = config.host;
    this.port = config.port;
    this.entities = config.entities;
  }
}
