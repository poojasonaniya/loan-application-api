import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Put,
} from '@nestjs/common';
import { LoansService } from './loans.service';
import { AuthGuard } from '@nestjs/passport';
import { Loan } from './loan.entity';

@Controller('loans')
export class LoansController {
  constructor(private readonly loansService: LoansService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  createLoan(
    @Body('amount') amount: number,
    @Body('term') term: number,
    @Body('customerId') customerId: string,
  ): Loan {
    return this.loansService.createLoan(amount, term, customerId);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  getLoanById(@Param('id') id: number): Loan {
    return this.loansService.getLoanById(id);
  }

  @Get('customers/:customerId')
  @UseGuards(AuthGuard('jwt'))
  getLoansByCustomerId(@Param('customerId') customerId: string): Loan[] {
    return this.loansService.getLoansByCustomerId(customerId);
  }

  @Put(':id/approve')
  @UseGuards(AuthGuard('jwt'))
  //@Roles('admin')
  async approveLoan(@Param('id') id: number): Promise<void> {
    await this.loansService.approveLoan(id);
  }

  @Post(':loanId/repayments')
  @UseGuards(AuthGuard('jwt'))
  addRepayment(
    @Param('loanId') loanId: number,
    @Body('amount') amount: number,
  ): void {
    this.loansService.addRepayment(loanId, amount);
  }
}
