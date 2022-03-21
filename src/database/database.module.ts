import { Module } from '@nestjs/common'
import {
  TypeOrmModule,
  TypeOrmModuleOptions
} from '@nestjs/typeorm'
import { join } from 'path'
import { DataSourceOptions } from 'typeorm'

export const databaseConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: Number(process.env.DATABASE_PORT || 5432),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [join(__dirname, '/entities/*.entity.{js,ts}')],
  synchronize: true
}

@Module({
  imports: [
    TypeOrmModule.forRootAsync({ useFactory: async (): Promise<TypeOrmModuleOptions> => databaseConfig })
  ]
})
export class DatabaseModule {}
