import { airlines } from '@/data/airlines';
import airports  from '@/data/airports';
import { Box, Checkbox, Divider, FormControl, FormLabel, Grid, Input, Select, Stack, StackDivider,Select as NormalSelect, Heading } from '@chakra-ui/react'
import React, { useState } from 'react'

const DuplicateFlightRoundWay = ({ index, onChange }) => {

  const [returnData,setReturnData]=useState({
    flightType: '',
    airlineNames: '',
    FlightNumber:'',
    fareType:'',
    departureFrom:'Select Airport',
    departureTime:'',
    arrivalTo:'Select Airport',
    arrivalTime:'',
    OurCost:0,
    Prf:0,
    refundable:false,
    via:{
      FlightNumber:'',
      departureFrom:'Select Airport',
      departureTime:'',
      arrivalTo:'Select Airport',
      arrivalTime:'',


    }
  })
  
    const [data,setdata]=useState({
        flightType: '',
        airlineNames: '',
        FlightNumber:'',
        fareType:'',
        departureFrom:'Select Airport',
        departureTime:'',
        arrivalTo:'Select Airport',
        arrivalTime:'',
        OurCost:0,
        Prf:0,
        refundable:false,
        returnFliight:returnData,
        via:{
          FlightNumber:'',
          departureFrom:'Select Airport',
          departureTime:'',
          arrivalTo:'Select Airport',
          arrivalTime:'',
    
    
        }
      })
     
    
      const handleChange = (e) => {
       
        if(e.target.name==='refundable'){
            const { name, checked } = e.target;
            setdata((prevData) => {
              const updatedData = { ...prevData, [name]: checked };
              onChange(index, updatedData);
              return updatedData;
            });
        }
        
        else{
        
            const { name, value } = e.target;
            setdata((prevData) => {
              const updatedData = { ...prevData, [name]: value };
              onChange(index, updatedData);
              return updatedData;
            });
          }

      };
      console.log('return data',returnData)
  return (
    <div>
      <>     
       <>
            <>     
              <Heading size='md' textTransform='uppercase' color={'blue.500'}>OnWard</Heading>

              <Grid templateColumns='repeat(3, 1fr)' gap={5}  >
        <FormControl>
         <FormLabel>Flight Type</FormLabel>
         <NormalSelect value={data.flightType} name='flightType' onChange={handleChange}>
          <option selected disabled value={''}>Select</option>
         <option value="Direct">Direct</option>
         <option value="Via">Via</option>
         </NormalSelect>
        </FormControl>
        <FormControl>
         <FormLabel>Airline Names</FormLabel>
        <Select 
        options={airlines.map((airline)=>({value:airline.name,label:airline.name}))}
        value={{value:data.airlineNames,label:data.airlineNames}}
        name='airlineNames' onChange={(e)=>{
          const {  value } = e;
          setdata((prevData) => {
            const updatedData = { ...prevData, airlineNames: value };
            onChange(index, updatedData);
            return updatedData;
          });
    
         }}
        isSearchable={true}
        />
        </FormControl>
        <FormControl>
         <FormLabel>Flight Number</FormLabel>
         <Input type="text" placeholder="Flight Number" value={data.FlightNumber}       name='FlightNumber' onChange={handleChange} />
        </FormControl>
        <FormControl>
         <FormLabel>Fare Type</FormLabel>
         <NormalSelect value={data.fareType} name='fareType' onChange={handleChange} >
                    <option selected disabled value={''}>Select</option>

         <option value="Normal">Normal</option>
       <option value={'SME Fare'} >SME Fare</option>
        <option value={'Corporate Fare'} >Corporate Fare</option>
        <option value={'Special Fare'} >Special Fare</option>
        <option value={'Other'} >Other</option>

         </NormalSelect>
        </FormControl>
        <FormControl>
         <FormLabel>Departure From</FormLabel>
         <Select 
         searchInputPlaceholder="Search for a Airport Name"
    
         formatOptionLabel={
          ({label,city})=>(
           <Stack divider={<StackDivider />} spacing='2' flexDir={'row'} justifyContent={'space-between'} cursor={'pointer'} my={5}>
             <Box>
        <Heading size='xs' textTransform='uppercase'>
          {city}
        </Heading>
        <Text pt='2' fontSize='sm'>
        {label}
        </Text>
      </Box>
      <Box>
        <Text pt='2'  fontWeight={'bold'} fontSize='sm'>
          {airports.find((item)=>item.name===label).code}
        </Text>
      </Box>
            </Stack>
          )
         } options={airports.map((airport)=>({value:airport.name,label:airport.name,city:airport.city}))} 
         value={{value:data.departureFrom,label:data.departureFrom,city:data.departureFrom}} name='departureFrom' onChange={(e)=>{
          const {  value } = e;
          setdata((prevData) => {
            const updatedData = { ...prevData, departureFrom: value };
            onChange(index, updatedData);
            return updatedData;
          });

         }} isSearchable={true} />
        </FormControl>
        <FormControl>
         <FormLabel>Departure Time</FormLabel>
         <Input type="time" placeholder="Departure Time" value={data.departureTime} name='departureTime' onChange={handleChange} />
        </FormControl>
        <FormControl>
         <FormLabel>Arrival To</FormLabel>
        <Select searchInputPlaceholder="Search for a Airport Name"
    
    formatOptionLabel={
     ({label,city})=>(
      <Stack divider={<StackDivider />} spacing='2' flexDir={'row'} justifyContent={'space-between'} cursor={'pointer'} my={5}>
      <Box>
 <Heading size='xs' textTransform='uppercase'>
   {city}
 </Heading>
 <Text pt='2' fontSize='sm'>
 {label}
 </Text>
</Box>
<Box>
 <Text pt='2' fontWeight={'bold'} fontSize='sm'>
   {airports.find((item)=>item.name===label).code}
 </Text>
</Box>
     </Stack>
     )
    } options={airports.map((airport)=>({value:airport.name,label:airport.name,city:airport.city}))}
    value={{value:data.arrivalTo,label:data.arrivalTo,city:data.arrivalTo}} name='arrivalTo'  onChange={(e)=>{
      const {  value } = e;
      setdata((prevData) => {
        const updatedData = { ...prevData, arrivalTo: value };
        onChange(index, updatedData);
        return updatedData;
      });

     }}
        isSearchable={true} />

        </FormControl>
        <FormControl>
         <FormLabel>Arrival Time</FormLabel>
         <Input type="time" placeholder="Arrival Time" value={data.arrivalTime} name='arrivalTime' onChange={handleChange} />
        </FormControl>
        </Grid>
        <Divider/>

        <Grid>
        {
          data.flightType==='Via'&&

          (
            <>
          <Grid templateColumns='repeat(3, 1fr)' gap={5}  >
          <FormControl >
             <FormLabel>Flight Number</FormLabel>
             <Input type="text" placeholder="Flight Number" value={data.via.FlightNumber} onChange={
              (e)=>{
                const {  value } = e.target;
                setdata((prevData) => {
                  const updatedData = { ...prevData, via:{...data.via,FlightNumber:value} };
                  onChange(index, updatedData);
                  return updatedData;
                });
              }
              
             } />
            </FormControl>
            <FormControl>
             <FormLabel>Departure From</FormLabel>
             <Select options={airports.map((airport)=>({value:airport.name,label:airport.name}))} value={{value:data.via.departureFrom,label:data.via.departureFrom}} 
            onChange={
              (e)=>{
                const {  value } = e;
                setdata((prevData) => {
                  const updatedData = { ...prevData, via:{...data.via,departureFrom:value} };
                  onChange(index, updatedData);
                  return updatedData;
                });
              }
              
             } 
             isSearchable={true} />
            </FormControl>
            <FormControl>
             <FormLabel>Departure Time</FormLabel>
             <Input type="time" placeholder="Departure Time" value={data.via.departureTime}        onChange={
              (e)=>{
                const {  value } = e.target;
                setdata((prevData) => {
                  const updatedData = { ...prevData, via:{...data.via,departureTime:value} };
                  onChange(index, updatedData);
                  return updatedData;
                });
              }
              
             }  />
            </FormControl>
            <FormControl>
             <FormLabel>Arrival To</FormLabel>
            <Select options={airports.map((airport)=>({value:airport.name,label:airport.name}))} value={{value:data.via.arrivalTo,label:data.via.arrivalTo}}        onChange={
              (e)=>{
                const {  value } = e;
                setdata((prevData) => {
                  const updatedData = { ...prevData, via:{...data.via,arrivalTo:value} };
                  onChange(index, updatedData);
                  return updatedData;
                });
              }
              
             }   isSearchable={true} />
    
            </FormControl>
            <FormControl>
             <FormLabel>Arrival Time</FormLabel>
             <Input type="time" placeholder="Arrival Time" value={data.via.arrivalTime}   onChange={
              (e)=>{
                const {  value } = e.target;
                setdata((prevData) => {
                  const updatedData = { ...prevData, via:{...data.via,arrivalTime:value} };
                  onChange(index, updatedData);
                  return updatedData;
                });
              }
              
             }   />
            </FormControl>
            </Grid>
        </>
          )
            
        }
       <Grid templateColumns='repeat(3, 1fr)' gap={5}  >
       <FormControl>
         <FormLabel>Our Cost</FormLabel>
         <Input type="number" placeholder="Our Cost" value={data.OurCost} name='OurCost' onChange={handleChange}/>
        </FormControl>
        <FormControl>
         <FormLabel>PRF</FormLabel>
         <Input type="number" placeholder="PRF" value={data.Prf} name='Prf' onChange={handleChange}/>
        </FormControl>
        <FormControl>
         <FormLabel>Total Cost</FormLabel>
         <Input disabled type="number" placeholder="PRF" value={Number(data.OurCost)+Number(data.Prf)} />
        </FormControl>
        </Grid>
        </Grid>
        <Grid templateColumns='repeat(3, 1fr)' gap={5}  >
        <FormControl>
         <FormLabel>Refundable</FormLabel>
        <Checkbox isChecked={data.refundable} name='refundable' onChange={handleChange} />
          
        </FormControl>
        </Grid>
 

        <Heading size='md' textTransform='uppercase' color={'blue.500'}>Return</Heading>

<Grid templateColumns='repeat(3, 1fr)' gap={5}  >
        <FormControl>
         <FormLabel>Flight Type</FormLabel>
         <NormalSelect value={returnData.flightType} onChange={(e)=>{
            setReturnData({...returnData,flightType:e.target.value})
         }}>
          <option selected disabled value={''}>Select</option>
         <option value="Direct">Direct</option>
         <option value="Via">Via</option>
         </NormalSelect>
        </FormControl>
        <FormControl>
         <FormLabel>Airline Names</FormLabel>
        <Select 
        options={airlines.map((airline)=>({value:airline.name,label:airline.name}))}
        value={{value:returnData.airlineNames,label:returnData.airlineNames}}
        onChange={(e)=>{
          setReturnData({...returnData,airlineNames:e.value})
        }}
        isSearchable={true}
        />
        </FormControl>
        <FormControl>
         <FormLabel>Flight Number</FormLabel>
         <Input type="text" placeholder="Flight Number" value={returnData.FlightNumber} onChange={(e)=>{
            setReturnData({...returnData,FlightNumber:e.target.value})
         }} />
        </FormControl>
        <FormControl>
         <FormLabel>Fare Type</FormLabel>
         <NormalSelect value={returnData.fareType} onChange={(e)=>{
            setReturnData({...returnData,fareType:e.target.value})
         }}>
                    <option selected disabled value={''}>Select</option>

         <option value="Normal">Normal</option>
       <option value={'SME Fare'} >SME Fare</option>
        <option value={'Corporate Fare'} >Corporate Fare</option>
        <option value={'Special Fare'} >Special Fare</option>
        <option value={'Other'} >Other</option>

         </NormalSelect>
        </FormControl>
        <FormControl>
         <FormLabel>Departure From</FormLabel>
         <Select 
         searchInputPlaceholder="Search for a Airport Name"
    
         formatOptionLabel={
          ({label,city})=>(
           <Stack divider={<StackDivider />} spacing='2' flexDir={'row'} justifyContent={'space-between'} cursor={'pointer'} my={5}>
             <Box>
        <Heading size='xs' textTransform='uppercase'>
          {city}
        </Heading>
        <Text pt='2' fontSize='sm'>
        {label}
        </Text>
      </Box>
      <Box>
        <Text pt='2'  fontWeight={'bold'} fontSize='sm'>
          {airports.find((item)=>item.name===label).code}
        </Text>
      </Box>
            </Stack>
          )
         } options={airports.map((airport)=>({value:airport.name,label:airport.name,city:airport.city}))} value={{value:returnData.departureFrom,label:returnData.departureFrom,city:returnData.departureFrom}} onChange={(e)=>{
          setReturnData({...returnData,departureFrom:e.value})
        }
        } isSearchable={true} />
        </FormControl>
        <FormControl>
         <FormLabel>Departure Time</FormLabel>
         <Input type="time" placeholder="Departure Time" value={returnData.departureTime} onChange={(e)=>{
            setReturnData({...returnData,departureTime:e.target.value})
         }} />
        </FormControl>
        <FormControl>
         <FormLabel>Arrival To</FormLabel>
        <Select searchInputPlaceholder="Search for a Airport Name"
    
    formatOptionLabel={
     ({label,city})=>(
      <Stack divider={<StackDivider />} spacing='2' flexDir={'row'} justifyContent={'space-between'} cursor={'pointer'} my={5}>
      <Box>
 <Heading size='xs' textTransform='uppercase'>
   {city}
 </Heading>
 <Text pt='2' fontSize='sm'>
 {label}
 </Text>
</Box>
<Box>
 <Text pt='2' fontWeight={'bold'} fontSize='sm'>
   {airports.find((item)=>item.name===label).code}
 </Text>
</Box>
     </Stack>
     )
    } options={airports.map((airport)=>({value:airport.name,label:airport.name,city:airport.city}))}
    value={{value:returnData.arrivalTo,label:returnData.arrivalTo,city:returnData.arrivalTo}} onChange={(e)=>{
          setReturnData({...returnData,arrivalTo:e.value})
        }
        } isSearchable={true} />

        </FormControl>
        <FormControl>
         <FormLabel>Arrival Time</FormLabel>
         <Input type="time" placeholder="Arrival Time" value={returnData.arrivalTime} onChange={(e)=>{
            setReturnData({...returnData,arrivalTime:e.target.value})
         }} />
        </FormControl>
        </Grid>
        <Divider/>

        <Grid>
        {
          returnData.flightType==='Via'&&

          (
            <>
          <Grid templateColumns='repeat(3, 1fr)' gap={5}  >
          <FormControl >
             <FormLabel>Flight Number</FormLabel>
             <Input type="text" placeholder="Flight Number" value={returnData.via.FlightNumber} onChange={(e)=>{
              setReturnData({...returnData,via:{...returnData.via,FlightNumber:e.target.value}})
             }} />
            </FormControl>
            <FormControl>
             <FormLabel>Departure From</FormLabel>
             <Select options={airports.map((airport)=>({value:airport.name,label:airport.name}))} value={{value:returnData.via.departureFrom,label:returnData.via.departureFrom}} 
              onChange={(e)=>{
              setReturnData({...returnData,via:{...returnData.via,departureFrom:e.value}})
             }} 
             isSearchable={true} />
            </FormControl>
            <FormControl>
             <FormLabel>Departure Time</FormLabel>
             <Input type="time" placeholder="Departure Time" value={returnData.via.departureTime}       onChange={(e)=>{
              setReturnData({...returnData,via:{...returnData.via,departureTime:e.target.value}})
             }}  />
            </FormControl>
            <FormControl>
             <FormLabel>Arrival To</FormLabel>
            <Select options={airports.map((airport)=>({value:airport.name,label:airport.name}))} value={{value:returnData.via.arrivalTo,label:returnData.via.arrivalTo}}       onChange={(e)=>{
              setReturnData({...returnData,via:{...returnData.via,arrivalTo:e.value}})
             }}  isSearchable={true} />
    
            </FormControl>
            <FormControl>
             <FormLabel>Arrival Time</FormLabel>
             <Input type="time" placeholder="Arrival Time" value={returnData.via.arrivalTime}       onChange={(e)=>{
              setReturnData({...returnData,via:{...returnData.via,arrivalTime:e.target.value}})
             }}  />
            </FormControl>
            </Grid>
        </>
          )
            
        }
       <Grid templateColumns='repeat(3, 1fr)' gap={5}  >
       <FormControl>
         <FormLabel>Our Cost</FormLabel>
         <Input type="number" placeholder="Our Cost" value={returnData.OurCost} onChange={(e)=>{
            setReturnData({...returnData,OurCost:e.target.value})
         }} />
        </FormControl>
        <FormControl>
         <FormLabel>PRF</FormLabel>
         <Input type="number" placeholder="PRF" value={returnData.Prf} onChange={(e)=>{
            setReturnData({...returnData,Prf:e.target.value})
         }} />
        </FormControl>
        <FormControl>
         <FormLabel>Total Cost</FormLabel>
         <Input disabled type="number" placeholder="PRF" value={Number(returnData.OurCost)+Number(returnData.Prf)} />
        </FormControl>
        </Grid>
        </Grid>
        <Grid templateColumns='repeat(3, 1fr)' gap={5}  >
        <FormControl>
         <FormLabel>Refundable</FormLabel>
        <Checkbox isChecked={returnData.refundable} onChange={(e)=>{
            setReturnData({...returnData,refundable:e.target.checked})
         }
          } />
          
        </FormControl>
        </Grid>
        
 

          </>
          </>
          </>
    </div>
  )
}

export default DuplicateFlightRoundWay
