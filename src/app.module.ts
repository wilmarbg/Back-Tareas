import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module'
import configg from './config/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersModule } from './users/users.module'
import { JwtModule } from '@nestjs/jwt'
import { config } from 'dotenv';
import { TareasModule } from './tareas/tareas.module';
import * as path from 'path';

// Determina qué archivo .env cargar
const envFile = process.env.NODE_ENV === 'prod' ? '.prod.env' : '.env';
const envPath = path.resolve(__dirname, '..', envFile);

// Carga el archivo de entorno apropiado
config({ path: envPath });

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configg],
      isGlobal: true,
      envFilePath: envPath,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      port: parseInt(process.env.DATABASE_PORT),
      host: process.env.DATABASE_HOST,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE,
      autoLoadEntities: true,
      synchronize: false,
    }),
    AuthModule,
    UsersModule,
    JwtModule.register({
      global: true,
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '1h' },
    }),
    TareasModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
