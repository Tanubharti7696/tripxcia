import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Table, Tbody, Td, Tr } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const TableCabQuery = ({ isOpen, onClose,data,handleSave ,duplicate,isT}) => {

    const [isTable,setIsTable]=useState(isT? isT:false)
    const navigate=useNavigate();
      const copyToClipBoard = () => {
          const copyData=`<div style=\"font-family: Arial, sans-serif; line-height: 1.6; margin-bottom: 20px; background-color: #FFA500; padding: 15px; border-radius: 8px;\"><p><strong>Airline Name:</strong> ${data?.airlineNames}</p><p><strong>Fare Type:</strong> ${data?.fareType}</p><p><strong>Departure Time:</strong> ${data?.departureFrom}</p><p><strong>Arrival Time:</strong> ${data?.arrivalTo}</p><p><strong>Total Cost:</strong> ₹ ${(Number(data?.OurCost)+Number(data?.Prf)).toFixed(2)}</p><p><strong>Fare Refundable/Non-refundable:</strong> ${data?.refundable ? 'Refundable' : 'Non-Refundable'}</p></div>`;
                   
          window.navigator.clipboard.writeText(copyData)
          handleSave()
          onClose()
      }
  console.log(duplicate)
  const dispatch=useDispatch();

  return (
    <>
        <Modal isOpen={isOpen} onClose={()=>{
navigate('/dashboard/quota-cab')
          }} size={'5xl'}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Form Submitted Successfully</ModalHeader>
              
              <ModalCloseButton />
              <ModalBody >
                  <Table variant='simple' >
                     <Tbody>
                     <Tr bgColor={'#db2778'} textColor={'white'} gap={0}>
                          <Td borderRightColor={'white'} borderRightWidth={0.5}>Cab Booking Type</Td>
                          <Td borderRightColor={'white'} borderRightWidth={0.5}>Trip start Date</Td>
                          <Td borderRightColor={'white'} borderRightWidth={0.5}>Trip end Date</Td>
                          <Td borderRightColor={'white'} borderRightWidth={0.5}>Our Cast</Td>
               
                          <Td borderRightColor={'white'} borderRightWidth={0.5}>Total Cost</Td>
                          {isTable && <Td>Status</Td>}

                      </Tr>
                      <Tr>
                          <Td>{data?.cabBookingType}</Td>
                          <Td>{data?.tripStartDateTime}</Td>
                          <Td>{data?.tripEndDateTime}</Td>
                          <Td>{data?.OurCost}</Td>
                          
                          <Td>₹ {(Number(data?.OurCost)+Number(data?.Prf)).toFixed(2)}</Td>
                          {isTable && <Td><Button colorScheme='blue' 
                          onClick={()=>{
                            dispatch({type:'QUERY',payload:{
                              type:'Hotel',
                              query:data.hotelName,
                            }})
                            navigate('/dashboard/query-confirm/'+data?._id)

                          }}
                          >Confirm</Button></Td>}
                      </Tr>
                      {duplicate && <>
                        {duplicate.length>0 && duplicate.map((item,index)=>(
                      <Tr key={index} gap={0}>
                          <Td borderRightColor={'white'} borderRightWidth={0.5}>{item.cabBookingType}</Td>
                          <Td borderRightColor={'white'} borderRightWidth={0.5}>{item.tripStartDateTime}</Td>
                          <Td borderRightColor={'white'} borderRightWidth={0.5}>{item.tripEndDateTime}</Td>
                          <Td borderRightColor={'white'} borderRightWidth={0.5}>{item.OurCost}</Td>
                    
                          <Td borderRightColor={'white'} borderRightWidth={0.5}>₹ {(Number(data.OurCost)+Number(data.Prf)).toFixed(2)}</Td>
                          {isTable && <Td><Button onClick={()=>{
                            dispatch({type:'QUERY',payload:{
                              type:'CAB',
                              query:item.cabBookingType,
                            }})
                            navigate('/dashboard/query-confirm/'+data?._id)

                          }} colorScheme='blue' >Confirm</Button></Td>}
                      </Tr>
                    ))}
                      </>}
                     </Tbody>
                      </Table>
  
              </ModalBody>
    
              <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={copyToClipBoard}>
                  Copy to Clipboard
                </Button>
             
              </ModalFooter>
            </ModalContent>
          </Modal>
      </>
  )
}

export default TableCabQuery
