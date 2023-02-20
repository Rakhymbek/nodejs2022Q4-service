import { DataSource } from 'typeorm';
import ormConfig from './orm.config';

export const DataSourceOptions = new DataSource(ormConfig);
