import {TypeOrmModuleOptions} from '@nestjs/typeorm'

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3307,
  username: 'root',
  password: '123',
  database: 'training',
  entities: [__dirname + '/../**/*.entity.ts'],
  synchronize: true,
};