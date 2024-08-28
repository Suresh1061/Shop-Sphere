import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from "@/components/ui/table";
import { pendingRequestsType } from "@/types";
import Link from "next/link";

interface PendingRequestsTableProps {

    pendingRequests: pendingRequestsType[];
}

const PendingRequestTable: React.FC<PendingRequestsTableProps> = ({ pendingRequests }) => {

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return <p>{date.toLocaleDateString()}</p>
    };

    return (
        <div>
            <div className="border bg-white rounded-lg overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="!text-sm font-medium !text-gray-950">
                            <TableHead>Date</TableHead>
                            <TableHead>Member&apos;s email</TableHead>
                            <TableHead>Product Name</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {pendingRequests && pendingRequests.length ? (
                            pendingRequests.map((item: pendingRequestsType) => (
                                <TableRow key={item.id}>
                                    <TableCell>{formatDate(item.createdAt)}</TableCell>
                                    <TableCell>{item.product_updated_author}</TableCell>
                                    <TableCell className="capitalize">{item.productName}</TableCell>
                                    <TableCell >
                                        <div className="bg-indigo-200 inline-block rounded-full px-2 py-0.5 text-sm capitalize">
                                            {item.department}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Link href={`/pending-requests/${item.id}`}>
                                            <button
                                                className="px-4 py-2 bg-green-600 text-white rounded-full">
                                                Approve Now
                                            </button>
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))) : (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center">No data found</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default PendingRequestTable