import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { LoansModule } from './loan/loans.module';

@Module({
  imports: [AuthModule, LoansModule],
})
export class AppModule {}
