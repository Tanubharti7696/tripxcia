import React, { useEffect, useState } from 'react'

import {
    Card,
    CardHeader,
    CardBody,
    Typography,
} from "@material-tailwind/react";
import { Button, ButtonGroup } from '@chakra-ui/react';
import UserCabQuota from './CabQuota/userCabQuota';
import UserFlightQuota from './FlightQuota/userFlightQuota';
import UserHotelQuota from './HotelQuota/userHotelQuota';

export default function UserQuota() {

    const [activeComponent, setActiveComponent] = useState('Flight');

    const renderComponent = () => {
        switch (activeComponent) {
            case 'Flight':
                return <UserFlightQuota />;
            case 'Cab':
                return <UserCabQuota />;
            case 'Hotel':
                return <UserHotelQuota />;
            default:
                return <UserFlightQuota />;
        }
    };

    return (
        <div className="mt-12 flex flex-col gap-12">
            <Card>
                <CardHeader style={{ backgroundColor: "#1F50A2" }} variant="gradient" className=" p-6 flex justify-between">
                    <Typography variant="h6" color="white" className='flex items-center'>
                        {activeComponent} Quota List
                    </Typography>
                    <ButtonGroup spacing="4">
                        <Button onClick={() => setActiveComponent('Flight')} colorScheme="red">
                            Flight Quota
                        </Button>
                        <Button onClick={() => setActiveComponent('Cab')} colorScheme="red">
                            Cab Quota
                        </Button>
                        <Button onClick={() => setActiveComponent('Hotel')} colorScheme="red">
                            Hotel Quota
                        </Button>
                    </ButtonGroup>
                </CardHeader>
                <CardBody>
                    {renderComponent()}
                </CardBody>

            </Card>

        </div>
    )
}
