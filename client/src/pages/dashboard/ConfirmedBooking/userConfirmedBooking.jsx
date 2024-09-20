import React, { useEffect, useState } from 'react'

import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Tooltip,
  Progress,
} from "@material-tailwind/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { authorsTableData, projectsTableData } from "@/data";
import { useGlobalData } from '@/hooks/GlobalData';
import { Button, ButtonGroup, Select, Stack } from '@chakra-ui/react';
import { Eye, Receipt, Ticket } from 'lucide-react';
import TableFlightQuery from '@/components/TableFlightQuery';
import Swal from 'sweetalert2';
import { Link, useNavigate, useRoutes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { getAllQueries } from '@/data/apis';
import makeRequest from '@/data/api';
export default function ConfirmedBooking() {
  const [selectedRow, setSelectedRow] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [queries, setqueries] = useState([])
  const navigate = useNavigate();
  const selector = useSelector(state => state);

  const token = "Bearer " + localStorage.getItem('token');

  const fetchAllQueries = async () => {
    try {
      await makeRequest({
        url: getAllQueries,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }

      })
        .then((response) => {
          console.log(response)
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
      toast.error('Error fetching flight query')
      return navigate('/auth/signin')

    }

  }
  useEffect(() => {
    if (token.length > 10) {
      fetchAllQueries();
    }
  }, [token]);
  console.log(selector.query)
  console.log(queries)
  const [activeComponent, setActiveComponent] = useState('Flight');

  // const [data,setdata]=useState(FlightQuery);
  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <TableFlightQuery isOpen={isOpen} data={selectedRow} isT={true} duplicate={selectedRow?.duplicate ?? null} onClose={() => {
        setIsOpen(false)
      }} handleSave={() => { }} />

      <Card>
        <CardHeader style={{ backgroundColor: "#1F50A2" }} variant="gradient" className=" p-6 flex justify-between">
          <Typography variant="h6" color="white" className='flex items-center'>
            {activeComponent} Confirmed Booking List
          </Typography>
          <ButtonGroup spacing="4">
            <Button onClick={() => setActiveComponent('Flight')} colorScheme="red">
              Flight Booking
            </Button>
            <Button onClick={() => setActiveComponent('Cab')} colorScheme="red">
              Cab Booking
            </Button>
            <Button onClick={() => setActiveComponent('Hotel')} colorScheme="red">
              Hotel Booking
            </Button>
          </ButtonGroup>
        </CardHeader>
        {
          activeComponent == "Flight" ?
            <CardBody className="overflow-x-scroll p-6">
              <table className="w-full min-w-[640px] table-auto">
                <thead>
                  <tr>
                    {["SL", "Passenger Name", "Status", "Flight Number", "Airline Name", "From", "To", "Travel Date", "Action"].map((el) => (
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
                  {queries
                    .filter(a => a.status === 1)
                    .filter(a => a.serviceType === 'Flight')
                    .map((row, index) => {
                      const className = `py-3 px-5 ${index === queries.length - 1
                        ? ""
                        : "border-b border-blue-gray-50"
                        }`;

                      return (
                        <tr key={1}>
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
                              {row.flightNumber}
                            </Typography>
                          </td>
                          <td className={className}>
                            <Typography className="text-xs font-semibold text-blue-gray-600">
                              {row.airlineName}
                            </Typography>
                          </td>
                          <td className={className}>
                            <Typography className="text-xs font-semibold text-blue-gray-600">
                            </Typography>
                          </td>
                          <td className={className}>
                            <Typography className="text-xs font-semibold text-blue-gray-600">
                            </Typography>
                          </td>

                          <td className={className}>
                            <Typography className="text-xs font-semibold text-blue-gray-600">
                            </Typography>
                          </td>
                          {/* <td className={className}>
                            <Typography className="text-xs font-semibold text-blue-gray-600">
                              {row?.duplicate.length > 0 ?
                                row?.duplicate.find(a => a?.FlightNumber == row?.confirmed)?.FlightNumber ?? row?.confirmed
                                :
                                row?.FlightNumber
                              }                      </Typography>
                          </td>
                          <td className={className}>
                            <Typography className="text-xs font-semibold text-blue-gray-600">
                              {row?.duplicate.length > 0 ?
                                row?.duplicate.find(a => a?.FlightNumber == row?.confirmed)?.airlineName ?? row?.airlineName
                                :
                                row?.airlineName
                              }
                            </Typography>
                          </td> */}
                          <td className={className}>
                            {row.status === 1 ?
                              (
                                <Stack direction="row" spacing={4}>
                                  <Ticket onClick={() => {
                                    navigate(`/ticket/${row._id}`)
                                  }} style={{ cursor: 'pointer' }} />

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
                                    status: row.status,
                                    FlightNumber: row.flightNumber,
                                    airlineNames: row.airlineName,
                                    staff: row.staff,
                                    id: row._id,
                                    departureFrom: row.departureFrom,
                                    OurCost: row.ourCost,
                                    Prf: row.prf,
                                    arrivalTo: row.arrivalTo,
                                    refundable: row.refundable,
                                    fareType: row.fareType,
                                    flightType: row.flightType,
                                    duplicate: row.duplicate,
                                    _id: row._id

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
            </CardBody> :
            activeComponent == "Cab" ?
              <CardBody className="overflow-x-scroll p-6">
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
                    {queries
                      .filter(a => a.serviceType === 'Cab')
                      .filter(a => a.status === 1)
                      .map((row, index) => {
                        const className = `py-3 px-5 ${index === queries.length - 1
                          ? ""
                          : "border-b border-blue-gray-50"
                          }`;

                        return (
                          <tr key={1}>
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
                                {row.duplicate.length > 0 ?
                                  row?.confirmed ?? 'No data found'
                                  :
                                  row.cabBookingType
                                }
                              </Typography>
                            </td>
                            <td className={className}>
                              <Typography className="text-xs font-semibold text-blue-gray-600">
                                {row.bookingDate}
                              </Typography>
                            </td>
                            <td className={className}></td>
                            <td className={className}></td>
                            <td className={className}>
                              {row.status === 1 ?
                                (
                                  <Stack direction="row" spacing={4}>
                                    {/* <Ticket onClick={()=>{
                        navigate(`/hotel/bill/${row._id}`)
                      }}  style={{cursor:'pointer'}} /> */}

                                    <Receipt style={{ cursor: 'pointer' }} onClick={() => {
                                      navigate(`/invoice/${row._id}`)
                                    }} />

                                  </Stack>
                                )
                                :
                                (
                                  <Eye
                                    style={{ cursor: 'pointer' }} onClick={() => {
                                      const data = {
                                        hotelName: row.hotelName,
                                        address: row.address,
                                        contact: row.contact,
                                        email: row.email,
                                        OurCost: row.ourCost,
                                        Prf: row.prf,
                                        duplicate: row.duplicate,
                                        _id: row._id
                                      }
                                      setSelectedRow(data)
                                      setIsOpen(true)
                                    }}
                                  />
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
              </CardBody> :
              activeComponent == "Hotel" ?
                <CardBody className="overflow-x-scroll p-6">
                  <table className="w-full min-w-[640px] table-auto">
                    <thead>
                      <tr>
                        {["SL", "Passenger Name", "Status", "Hotel Name", "Cheking In Date", "Cheking Out Date", "Action"].map((el) => (
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
                      {queries
                        .filter(a => a.serviceType === 'Hotel')
                        .filter(a => a.status === 1)
                        .map((row, index) => {
                          const className = `py-3 px-5 ${index === queries.length - 1
                            ? ""
                            : "border-b border-blue-gray-50"
                            }`;

                          return (
                            <tr key={1}>
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
                                  {row.duplicate.length > 0 ?
                                    row?.confirmed ?? 'No data found'
                                    :
                                    row.hotelName
                                  }
                                </Typography>
                              </td>
                              <td className={className}>
                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                  {row.checkInDate}
                                </Typography>
                              </td>
                              <td className={className}>
                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                </Typography>
                              </td>
                              <td className={className}>
                                {row.status === 1 ?
                                  (
                                    <Stack direction="row" spacing={4}>
                                      <Ticket onClick={() => {
                                        navigate(`/hotel/bill/${row._id}`)
                                      }} style={{ cursor: 'pointer' }} />

                                      <Receipt style={{ cursor: 'pointer' }} onClick={() => {
                                        navigate(`/invoice/${row._id}`)
                                      }} />

                                    </Stack>
                                  )
                                  :
                                  (
                                    <Eye
                                      style={{ cursor: 'pointer' }} onClick={() => {
                                        const data = {
                                          hotelName: row.hotelName,
                                          address: row.address,
                                          contact: row.contact,
                                          email: row.email,
                                          OurCost: row.ourCost,
                                          Prf: row.prf,
                                          duplicate: row.duplicate,
                                          _id: row._id
                                        }
                                        setSelectedRow(data)
                                        setIsOpen(true)
                                      }}
                                    />
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
                </CardBody> : ""
        }
      </Card>
    </div>
  )
}
