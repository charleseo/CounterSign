import { redirect } from 'next/navigation';

export default function RatesPage() {
  redirect('/platforms?tab=rates');
}
