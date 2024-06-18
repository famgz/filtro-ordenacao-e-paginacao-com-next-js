import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "./ui/badge";
import { ChevronsUpDown } from "lucide-react";
import { Order } from "@/lib/types";

interface OrdersTableProps {
  orders: Order[];
}

export default function OrdersTable({ orders }: OrdersTableProps) {
  const intl = Intl.NumberFormat("pt-br", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <Table>
      <TableHeader>
        <TableRow className="w-full">
          <TableHead className="table-cell">Cliente</TableHead>
          <TableHead className="table-cell">Status</TableHead>
          <TableHead className="hidden md:table-cell cursor-pointer justify-end items-center gap-1">
            <div className="flex items-center gap-1">
              Data
              <ChevronsUpDown className="w-4" />
            </div>
          </TableHead>
          <TableHead className="text-right cursor-pointer flex justify-end items-center gap-1">
            Valor
            <ChevronsUpDown className="w-4" />
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {orders?.length > 0 &&
          orders.map((o) => (
            <TableRow key={o.id}>
              <TableCell>
                <div className="font-medium">{o.customer_name}</div>
                <div className="hidden md:inline text-sm text-muted-foreground">
                  {o.customer_email}
                </div>
              </TableCell>
              <TableCell>
                <Badge className={`text-xs`} variant="outline">
                  {o.status === "pending" ? "Pendente" : "Finalizado"}
                </Badge>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {new Date(o.order_date).toLocaleDateString("pt-br")}
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
