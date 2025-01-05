
import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/theme-provider';
import { Moon, Sun } from 'lucide-react';

const Header = () => {
    const {theme, setTheme} = useTheme();
    const dark = theme === "dark"
    return (
        <div className='sticky z-50 py-2 top-0 border-b w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
            <div className='mx-auto container flex justify-between items-center h-16 px-4'>
               <Link to="/">
               <img src="/public/logo.jpg" className='h-14' alt="" srcset="" />
               </Link>
               <div onClick={()=> setTheme(dark? "light" : "dark")} className={`flex items-center cursor-pointer transition-transform duration-500 ${dark ? `rotate-180`:`rotate-0`}`}>
                {
                    dark ?
                    <Sun className='h-6 w-6 text-yellow-300 rotate-0 transition-all'/>
                    :
                    <Moon className='h-6 w-6 text-blue-300 rotate-0 transition-all'/>
                }
                </div>
            </div>
            {/* search 
            mode */}
            
        </div>
    );
};

export default Header;