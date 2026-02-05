"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function FinancePage() {
    const transactions = [
        { id: 1, user: "Jane Smith", plan: "Premium Monthly", amount: "$29.00", status: "success", date: "2024-01-20" },
        { id: 2, user: "John Doe", plan: "Premium Yearly", amount: "$290.00", status: "failed", date: "2024-01-18" },
        { id: 3, user: "Alice Cooper", plan: "Premium Monthly", amount: "$29.00", status: "success", date: "2024-01-15" },
    ];

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Finance & Transactions</h1>

            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                    </CardHeader>
                    <CardContent><div className="text-2xl font-bold">$12,234.00</div></CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Pending</CardTitle>
                    </CardHeader>
                    <CardContent><div className="text-2xl font-bold">$290.00</div></CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Refunds</CardTitle>
                    </CardHeader>
                    <CardContent><div className="text-2xl font-bold">$0.00</div></CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Recent Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>User</TableHead>
                                <TableHead>Plan</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {transactions.map(tx => (
                                <TableRow key={tx.id}>
                                    <TableCell className="font-medium">{tx.user}</TableCell>
                                    <TableCell>{tx.plan}</TableCell>
                                    <TableCell>{tx.date}</TableCell>
                                    <TableCell>{tx.amount}</TableCell>
                                    <TableCell>
                                        <Badge variant={tx.status === 'success' ? 'default' : 'destructive'} className="capitalize">
                                            {tx.status}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
