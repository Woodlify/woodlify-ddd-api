import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './user-profile/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FurnitureDesignModule } from './furniture-design/furniture-design.module';
import { DesignManagerModule } from './furniture-manager/design-manager.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      url: `mysql://root:root@localhost:3306/woodlify`,
      name: 'default',
      migrationsRun: true,
      logging: true,
      timezone: '+00:00',
      bigNumberStrings: false,
      entities: [
        process.env.ENVIRONMENT == 'prod'
          ? '**/infrastructure/persistence/typeorm/entities/*{.ts,.js}'
          : 'dist/**/infrastructure/persistence/typeorm/entities/*{.ts,.js}',
      ],
      subscribers: [],
      migrations: [
        process.env.ENVIRONMENT == 'prod'
          ? 'common/infrastructure/persistence/typeorm/migrations/*{.ts,.js}'
          : 'dist/common/infrastructure/persistence/typeorm/migrations/*{.ts,.js}',
      ],
      migrationsTableName: 'migrations',
    }),
    UsersModule,
    FurnitureDesignModule,
    DesignManagerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
