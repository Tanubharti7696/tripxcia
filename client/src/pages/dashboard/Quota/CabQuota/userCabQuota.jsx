import TableCabQuery from '@/components/TableCabQuery';
import makeRequest from '@/data/api';
import { getCabQueries } from '@/data/apis';
import { useGlobalData } from '@/hooks/GlobalData';
import { Card, CardBody, CardHeader, Select, Stack } from '@chakra-ui/react';
import { Typography } from '@material-tailwind/react';
import { Eye, Receipt } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import "./style.css"

export default function UserCabQuota() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const token = "Bearer " + localStorage.getItem('token');
  const navigate = useNavigate();
  const [queries, setqueries] = useState([]);
  const fetchCabQuery = async () => {
    try {
      await makeRequest({
        url: getCabQueries,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }

      })
        .then((response) => {
          // console.log(response)
          setqueries(response.result)
        }
        )
        .catch((error) => {
          if (error.response && error.response.status === 403) {
            toast.error('Token expired');
          } else {
            return navigate('/auth/signin')
          }
        })
    } catch (error) {
      toast.error('Error fetching cab query')
      return navigate('/auth/signin')
    }
  }
  useEffect(() => {
    if (token.length > 10) {
      fetchCabQuery();
    }
  }, [token]);

  console.log(' cab', queries);
  console.log('selected row', selectedRow)

  return (
    <div className="mb-8 flex flex-col gap-12">
      <TableCabQuery isOpen={isOpen} data={selectedRow} isT={true} duplicate={selectedRow?.duplicate ?? null} onClose={() => {
        setIsOpen(false)
      }} handleSave={() => { }} />
      <Card>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["SL", "Passenger Name", "Status", "Booking Type", "Booking Date", "From", "To", "Action"].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            {queries.length > 0 ? <tbody>
              {queries.filter(a => a?.stepFirst !== 1).map((row, index) => {
                const className = `py-3 px-5 ${index === queries.length - 1
                  ? ""
                  : "border-b border-blue-gray-50"
                  }`;

                return (
                  <tr key={index}>
                    <td className={className}>
                      <div className="flex items-center gap-4">
                        {index + 1}
                      </div>
                    </td>

                    <td className={className}>

                    </td>

                    <td className={className}>
                      {
                        row.status == "1" ?
                          <p className='outline outline-1 rounded-lg px-2 w-24 outline-[#1F50A2] text-[#1F50A2] bg-blue-50'>Confirmed</p>
                          :
                          <p className='outline outline-1 rounded-lg px-2 w-24 outline-[#EB4A47] text-[#EB4A47] bg-red-50'>Pending</p>
                      }
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {row.cabBookingType}
                      </Typography>
                    </td>

                    <td className={className}>
                      {row.bookingDate}
                    </td>

                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {row.city}
                      </Typography>
                    </td>
                    <td className={className}>

                    </td>

                    <td className={className}>
                      {row.status === 1 ?
                        (
                          <Stack direction="row" spacing={4}>

                            <Receipt style={{ cursor: 'pointer' }} onClick={() => {
                              navigate(`/invoice/${row._id}`)
                            }} />

                          </Stack>
                        )
                        :
                        (
                          <Eye style={{ cursor: 'pointer' }} onClick={() => {
                            setSelectedRow({
                              client: row.client,
                              serviceType: row.serviceType,
                              cabBookingType: row.cabBookingType,
                              tripStartDateTime: row.tripStartDateTime,
                              tripEndDateTime: row.tripEndDateTime,
                              cabType: row.cabType,
                              totalPassenger: row.totalPassenger,
                              OurCost: row.ourCost,
                              Prf: row.prf,
                              city: row.city,
                              cabExtraPerHours: row.cabExtraPerHours,
                              cabExtraKMS: row.cabExtraKMS,
                              cabParkingetc: row.cabParkingetc,
                              cabPerKmsrate: row.cabPerKmsrate,
                              cabTollPermit: row.cabTollPermit,
                              status: row.status,
                              _id: row._id,

                            });
                            setIsOpen(true);


                          }} />
                        )
                      }
                    </td>
                  </tr>
                );
              }
              )}
            </tbody> : <tbody>
              <tr>
                <td colSpan="8">
                  <Typography color="blue-gray" className="text-center">
                    No data found
                  </Typography>
                </td>
              </tr>
            </tbody>}

          </table>
        </CardBody>
      </Card>

    </div>
  )
}
