import React, { useState } from 'react'
import {
  Card,
  CardHeader,
  CardBody,
  Typography,

} from "@material-tailwind/react";
import { Button, ButtonGroup } from '@chakra-ui/react';

export default function UserPayments() {

  const [activeComponent, setActiveComponent] = useState('Successful');


  return (
    <>
      <div className='mt-12 bg-white p-4 flex flex-wrap justify-between rounded-md'>
        <div className='flex items-center justify-center border-l  gap-6 w-64 p-6 cursor-pointer hover:shadow'
          onClick={() => setActiveComponent('Successful')}
        >
          <div className='bg-green-50 p-2 rounded-md'>
            <svg className='h-6 w-6' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="green">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </div>
          <div>
            <h1 className='font-semibold'>$72,000 USD</h1>
            <p className='text-sm '>Successful Payment</p>
          </div>
        </div>
        <div className='flex items-center justify-center border-l gap-6 w-64 p-6 cursor-pointer hover:shadow'
          onClick={() => setActiveComponent('Pending')}
        >
          <div className='bg-orange-50 p-2 rounded-md'>

            <svg className='h-6 w-6' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="orange" >
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>

          </div>
          <div>
            <h1 className='font-semibold'>$2,000 USD</h1>
            <p className='text-sm '>Pending Payment</p>
          </div>
        </div>
        <div className='flex items-center justify-center border-l gap-6 w-64 p-6 cursor-pointer hover:shadow'
          onClick={() => setActiveComponent('Refunded')}
        >
          <div className='bg-red-50 p-2 rounded-md'>
            <svg className='h-6 w-6' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="red" >
              <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
          </div>
          <div>
            <h1 className='font-semibold'>$10,000 USD</h1>
            <p className='text-sm '>Refunded Payment</p>
          </div>
        </div>
        <div className='flex items-center justify-center border-l gap-6 w-64 p-6 cursor-pointer hover:shadow'
          onClick={() => setActiveComponent('Initiated')}
        >
          <div className='bg-blue-gray-50 p-2 rounded-md'>

            <svg className='h-6 w-6' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="darkblue" >
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
            </svg>

          </div>
          <div>
            <h1 className='font-semibold'>$172,000 USD</h1>
            <p className='text-sm '>Initiated Payment</p>
          </div>
        </div>
      </div>

      <div className="mt-12 flex flex-col gap-12">
        <Card>
          <CardHeader style={{ backgroundColor: "#1F50A2" }} variant="gradient" className=" p-6 flex justify-between">
            <Typography variant="h6" color="white" className='flex items-center'>
              {activeComponent} Payment
            </Typography>
          </CardHeader>
          {
            activeComponent == "Pending" ?
              <CardBody className="overflow-x-scroll mt-5 px-0 pt-0 pb-2">
                {/* {renderComponent()} */}

                <table className="w-full min-w-[640px] table-auto">
                  <thead>
                    <tr>
                      {["SL", "Passenger Name", "Billing Mode", "Service", "Amount", "Date", "Due Date", "Actions"].map((el) => (
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
                  <tbody>
                    <tr key={1}>
                      <td className='py-3 px-5'>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          1
                        </Typography>
                      </td>
                      <td className='py-3 px-5'>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          Alpha
                        </Typography>
                      </td>
                      <td className='py-3 px-5'>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          Cash
                        </Typography>
                      </td>
                      <td className='py-3 px-5'>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          Flight
                        </Typography>
                      </td>

                      <td className='py-3 px-5'>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          $100
                        </Typography>
                      </td>
                      <td className='py-3 px-5'>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          08-11-2024
                        </Typography>
                      </td>
                      <td className='py-3 px-5'>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          21-11-2024
                        </Typography>
                      </td>
                      <td className='py-3 px-5 cursor-pointer' >
                        <Typography className="text-xs font-semibold text-blue-gray-600 flex gap-2">
                          <svg className='w-6 h-6' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
                          </svg>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-receipt"><path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"></path><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"></path><path d="M12 17.5v-11"></path></svg>
                        </Typography>
                      </td>
                    </tr>

                  </tbody>
                </table>
              </CardBody> :
              <CardBody className="overflow-x-scroll mt-5 px-0 pt-0 pb-2">
                {/* {renderComponent()} */}

                <table className="w-full min-w-[640px] table-auto">
                  <thead>
                    <tr>
                      {["SL", "Passenger Name", "Billing Mode", "Service", "Amount", "Date", "Actions"].map((el) => (
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
                  <tbody>
                    <tr key={1}>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>

                  </tbody>
                </table>
              </CardBody>
          }
        </Card>

      </div>
    </>
  )
}
