import 'dotenv/config';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DB_URL,
  extra: {
    sslmode: 'require',
    connect_timeout: 10000,
  },
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
  migrationsTableName: '_migrations',
  synchronize: false,
  logging: process.env.NODE_ENV !== 'production',
});
