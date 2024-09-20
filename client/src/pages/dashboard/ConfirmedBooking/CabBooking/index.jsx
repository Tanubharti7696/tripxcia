import React from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
} from "@material-tailwind/react";
import { Select, Stack } from '@chakra-ui/react';
import { Eye, Receipt, Ticket } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function UserCabBooking({ queries }) {
    const navigate = useNavigate();

    return (
        <Card>
            <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
                <Typography variant="h6" color="white">
                    Cab Confirmed Booking List
                </Typography>
            </CardHeader>
            <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
                <table className="w-full min-w-[640px] table-auto">
                    <thead>
                        <tr>
                            {["SL", "ID", "Client Name", "Service", "Status", "Booking Type", "Booking Date", "Action"].map((el) => (
                                <th key={el} className="border-b border-blue-gray-50 py-3 px-5 text-left">
                                    <Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400">
                                        {el}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {queries.length > 0 ? (
                            queries.map((row, index) => (
                                <tr key={row._id}>
                                    <td className="py-3 px-5">{index + 1}</td>
                                    <td className="py-3 px-5">{row._id}</td>
                                    <td className="py-3 px-5">{row.client}</td>
                                    <td className="py-3 px-5">{row.serviceType}</td>
                                    <td className="py-3 px-5">{row.bookingType}</td>
                                    <td className="py-3 px-5">{row.bookingDate}</td>
                                    <td className="py-3 px-5">
                                        <Stack direction="row" spacing={4}>
                                            <Receipt onClick={() => navigate(`/invoice/${row._id}`)} style={{ cursor: 'pointer' }} />
                                        </Stack>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8">
                                    <Typography color="blue-gray" className="text-center">
                                        No data found
                                    </Typography>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </CardBody>
        </Card>
    );
}
