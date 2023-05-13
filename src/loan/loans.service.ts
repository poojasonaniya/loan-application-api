import { Injectable, NotFoundException } from '@nestjs/common';
import { Loan, Repayment } from './loan.entity';

@Injectable()
export class LoansService {
  private readonly loans: Loan[] = [];

  createLoan(amount: number, term: number, customerId: string): Loan {
    const loan: Loan = {
      id: this.loans.length + 1,
      amount,
      term,
      customerId,
      repayments: [],
      status: 'PENDING',
    };

    this.calculateScheduledRepayments(loan);

    this.loans.push(loan);

    return loan;
  }

  private calculateScheduledRepayments(loan: Loan): void {
    const { amount, term } = loan;
    const repaymentAmount = amount / term;

    const startDate = new Date(); // Set start date as today's date
    const scheduledRepayments: Repayment[] = [];

    for (let i = 0; i < term; i++) {
      const repaymentDate = new Date(
        startDate.getTime() + 7 * i * 24 * 60 * 60 * 1000,
      ); // Add 7 days for each repayment
      const formattedRepaymentAmount = parseFloat(repaymentAmount.toFixed(2));

      const scheduledRepayment: Repayment = {
        date: repaymentDate,
        amount: formattedRepaymentAmount,
        status: 'PENDING',
      };

      scheduledRepayments.push(scheduledRepayment);
    }

    loan.repayments = scheduledRepayments;
  }

  async approveLoan(id: number): Promise<void> {
    const loan = this.getLoanById(id);
    if (!loan) {
      throw new NotFoundException('Loan not found');
    }

    loan.status = 'APPROVED';
  }

  getLoanById(id: number): Loan {
    console.log(this.loans);
    return this.loans.find((loan) => loan.id == id);
  }

  getLoansByCustomerId(customerId: string): Loan[] {
    return this.loans.filter((loan) => loan.customerId == customerId);
  }

  addRepayment(loanId: number, amount: number): void {
    const loan = this.getLoanById(loanId);

    if (!loan) {
      throw new Error('Loan not found');
    }

    const scheduledRepayment = loan.repayments.find(
      (repayment) => repayment.status == 'PENDING',
    );

    if (!scheduledRepayment) {
      throw new Error('No pending repayments found for the loan');
    }

    if (amount >= scheduledRepayment.amount) {
      scheduledRepayment.status = 'PAID';

      const allRepaymentsPaid = loan.repayments.every(
        (repayment) => repayment.status == 'PAID',
      );

      if (allRepaymentsPaid) {
        loan.status = 'PAID';
      }
    } else {
      throw new Error(`Payment should be equa to ${scheduledRepayment.amount}`);
    }
  }
}
