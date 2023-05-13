export interface Loan {
  id: number;
  amount: number;
  term: number;
  customerId: string;
  repayments: Repayment[];
  status: 'PENDING' | 'APPROVED' | 'PAID';
}

export interface Repayment {
  date: Date;
  amount: number;
  status: string;
}

export interface RepaymentStatus {
  PENDING: 'Pending';
  PAID: 'Paid';
}
