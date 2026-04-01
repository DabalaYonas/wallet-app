export interface Transaction {
  id: number;
  type: 'Payment' | 'Credit';
  amount: number;
  name: string;
  description: string;
  date: string;
  pending: boolean;
  authorizedUser: string | null;
  icon: string;
  iconBg: string;
  cashback: number | null;
  status: string;
  paymentMethod: string;
}

export interface CardData {
  limit: number;
  balance: number;
}
