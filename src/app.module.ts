import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { MembershipsModule } from './memberships/memberships.module';
import { RolesModule } from './roles/roles.module';
import { MembershipsTypeModule } from './memberships_type/memberships_type.module';
import { Membership } from './memberships/entities/membership.entity';
import { Role } from './roles/entities/role.entity';
import { MembershipsType } from './memberships_type/entities/memberships_type.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: [User, Membership, Role, MembershipsType],
        synchronize: true, // Usar solo en desarrollo
      }),
    }),
    UsersModule,
    AuthModule,
    MembershipsModule,
    RolesModule,
    MembershipsTypeModule,
  ],
})
export class AppModule {}
