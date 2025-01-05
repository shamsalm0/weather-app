import { Button } from '@/components/ui/button';
import { useGeoLocation } from '@/utils/geoLocation';
import axios from 'axios';
import { RefreshCw } from 'lucide-react';
import React, { useEffect, useState } from 'react';


const Dashboard = () => {
   const {coordinates, error,isLoading} = useGeoLocation();

    console.log(coordinates);
    return (
        <div className='space-y-4'>
            <div className='flex justify-between items-center '>
                <h1 className='flex items-center text-base'>Location</h1>
                <Button variant='outline' size={"icon"}>
                    <RefreshCw />
                </Button>
            </div>
        </div>
    );
};

export default Dashboard;
