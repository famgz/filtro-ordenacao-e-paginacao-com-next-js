'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from './ui/badge';
import { ChevronDown, ChevronUp, ChevronsUpDown } from 'lucide-react';
import { Order } from '@/lib/types';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

interface OrdersTableProps {
  orders: Order[];
}

export default function OrdersTable({ orders }: OrdersTableProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams);

  const intl = Intl.NumberFormat('pt-br', {
    style: 'currency',
    currency: 'BRL',
  });

  function handleSortClick(sortType: string) {
    const currentURLSortParam = params.get('sort') ?? '';
    const sortTypeDesc = '-' + sortType;

    switch (currentURLSortParam) {
      case sortType:
        params.set('sort', sortTypeDesc);
        break;
      case sortTypeDesc:
        params.delete('sort');
        break;
      default:
        params.set('sort', sortType);
    }

    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  function getSortIcon(sortType: string) {
    const currentURLSortParam = params.get('sort') ?? '';
    const sortTypeDesc = '-' + sortType;

    switch (currentURLSortParam) {
      case sortType:
        return <ChevronUp className="w-4" />;
      case sortTypeDesc:
        return <ChevronDown className="w-4" />;
      default:
        return <ChevronsUpDown className="w-4" />;
    }
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="w-full">
          <TableHead className="table-cell">Cliente</TableHead>
          <TableHead className="table-cell">Status</TableHead>
          <TableHead
            className="hidden cursor-pointer items-center justify-end gap-1 md:table-cell"
            onClick={() => handleSortClick('order_date')}
          >
            <div className="flex items-center gap-1">
              Data
              {getSortIcon('order_date')}
            </div>
          </TableHead>
          <TableHead
            className="flex cursor-pointer items-center justify-end gap-1 text-right"
            onClick={() => handleSortClick('amount_in_cents')}
          >
            Valor
            {getSortIcon('amount_in_cents')}
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {orders?.length > 0 &&
          orders.map((o) => (
            <TableRow key={o.id}>
              <TableCell>
                <div className="font-medium">{o.customer_name}</div>
                <div className="hidden text-sm text-muted-foreground md:inline">
                  {o.customer_email}
                </div>
              </TableCell>
              <TableCell>
                <Badge className={`text-xs`} variant="outline">
                  {o.status === 'pending' ? 'Pendente' : 'Finalizado'}
                </Badge>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {new Date(o.order_date).toLocaleDateString('pt-br')}
              </TableCell>
              <TableCell className="text-right">
                {intl.format(o.amount_in_cents / 100)}
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}
