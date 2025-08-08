import { Module } from '@nestjs/common';
import { Bcrypt } from './bcrypt/Bcrypt';
@Module({
  imports: [],
  providers: [Bcrypt],
  controllers: [],
  exports: [Bcrypt],
})
export class AuthModule {}
