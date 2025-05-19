import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from 'cmdk';
import React, { useState } from 'react';
import { Button } from './ui/button';
import { useLocationSearchQuery } from '@/utils/useWeather';
import { Search } from 'lucide-react';

const CitySearch = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const { data: location = [], isLoading } = useLocationSearchQuery(query);

  return (
    <div className="relative z-10">
      <Button
        variant="outline"
        className="relative w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-10 lg:w-64"
        onClick={() => setOpen(true)}
      >
        <Search className="mr-2 h-4 w-4" />
        City Search
      </Button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-md bg-white p-4 shadow-xl">
            <CommandDialog open={open} onOpenChange={setOpen}>
              <div className="mb-4">
                <CommandInput
                  placeholder="Search city..."
                  value={query}
                  onValueChange={setQuery}
                  className="w-full border rounded-md p-2 text-sm outline-none focus:ring focus:border-blue-500"
                />
              </div>
              <CommandList className="max-h-[60vh] overflow-y-auto">
                {query.length > 2 && (
                  <>
                    {!isLoading && location.length === 0 && (
                      <CommandEmpty>No results found.</CommandEmpty>
                    )}
                    <CommandGroup heading="Results">
                      {location.map((item, index) => (
                        <CommandItem key={index}>
                          {item.name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </>
                )}
                <CommandSeparator />
                <CommandGroup heading="Settings">
                  <CommandItem>Profile</CommandItem>
                  <CommandItem>Billing</CommandItem>
                  <CommandItem>Settings</CommandItem>
                </CommandGroup>
              </CommandList>
            </CommandDialog>
          </div>
        </div>
      )}
    </div>
  );
};

export default CitySearch;
