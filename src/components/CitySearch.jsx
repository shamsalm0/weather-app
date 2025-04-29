import { CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from 'cmdk'
import { Command } from 'lucide-react'
import React, { useState } from 'react'
import { Button } from './ui/button'
import { useLocationSearchQuery } from '@/utils/useWeather'

const CitySearch = () => {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');
    const {data:loacation, isLoading} = useLocationSearchQuery(query);
    return (
        <div>
            <Button variant="outline" className="relaitve w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-10 lg:w-64">
                City Search
            </Button>
            <Command>
                <CommandInput placeholder="Search your city..." value={query} onValueChange={setQuery} />
                <CommandList>
                    {query.length>2 && <CommandEmpty>No results found</CommandEmpty>}
                    <CommandGroup heading="Suggestions">
                        <CommandItem>Calendar</CommandItem>
                        <CommandItem>Search Emoji</CommandItem>
                        <CommandItem>Calculator</CommandItem>
                    </CommandGroup>
                    <CommandSeparator />
                    <CommandGroup heading="Settings">
                        <CommandItem>Profile</CommandItem>
                        <CommandItem>Billing</CommandItem>
                        <CommandItem>Settings</CommandItem>
                    </CommandGroup>
                </CommandList>
            </Command>

        </div>
    )
}

export default CitySearch