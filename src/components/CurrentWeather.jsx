import React from 'react';
import { Card, CardContent, CardHeader } from './ui/card';

const CurrentWeather = ({data,location}) => {
    return (
        <div>
           <Card className="w-[350px]">
      <CardContent>
     <h1> {data?.name} </h1>
     <h1> {location} </h1>
      </CardContent>
   
    </Card>
        </div>
    );
};

export default CurrentWeather;