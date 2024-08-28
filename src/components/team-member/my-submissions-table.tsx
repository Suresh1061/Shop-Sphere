'use client';

import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Eye } from "lucide-react";
import { reviewResponseType } from "@/types";
import { PreviewProductCard } from "../preview-product-card";

interface MySubmissionsTableProps {
    reviewProducts: reviewResponseType[];
}

export const MySubmissionsTable: React.FC<MySubmissionsTableProps> = ({ reviewProducts }) => {
    const statusColorMap: Record<'pending' | 'approved' | 'rejected', string> = {
        pending: "text-orange-500",
        approved: "text-green-500",
        rejected: "text-red-500"
    };

    // Function to format the date
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return <p>{date.toLocaleDateString()}</p>
    };

    return (
        <div className="border rounded-lg overflow-hidden capitalize">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Product Name</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>View</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {reviewProducts && reviewProducts.length ? (
                        reviewProducts.map((item: reviewResponseType) => (
                            <TableRow key={item.id}>
                                <TableCell>
                                    {item.review_status === "pending" ? formatDate(item.createdAt!) : formatDate(item.updatedAt!)}
                                </TableCell>
                                <TableCell>{item.productName}</TableCell>
                                <TableCell >
                                    <div className="bg-indigo-200 inline-block rounded-full px-2 py-0.5 text-sm capitalize">
                                        {item.department}
                                    </div>
                                </TableCell>
                                <TableCell className={statusColorMap[item.review_status as keyof typeof statusColorMap]}>
                                    {item.review_status}
                                </TableCell>
                                <TableCell>
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button variant="outline" className="px-2 hover:border-blue-500 hover:text-blue-500 max-sm:text-blue-500 max-sm:border-blue-500"><Eye /></Button>
                                        </DialogTrigger>
                                        <DialogContent className="max-w-md flex flex-col justify-center items-center py-12">
                                            <DialogHeader>
                                                <DialogTitle className="font-medium text-muted-foreground">View your edited product</DialogTitle>
                                            </DialogHeader>
                                            <PreviewProductCard  {...item} />
                                        </DialogContent>
                                    </Dialog>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center">No data found</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
};
