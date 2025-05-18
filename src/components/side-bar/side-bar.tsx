import {Box, Typography} from '@mui/material';
import { ReactNode } from 'react';


interface SideBarProps {
    children?: ReactNode;
  }

const SideBar = ({ children }: SideBarProps) => {
    
   return( 
    <>
    <Box
        sx={{
             position: "fixed",
        top: "4.5rem",
            width: 400,
            height: '180vh',
            overflowY: 'auto',
         
            p: 2,
            backgroundColor: "#FFFFF6",
            borderRight: '1px solid #ddd',
            '&::-webkit-scrollbar': {
                width: '6px',
            },
            '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#FF885B',
                borderRadius: 3,
            },
            '&::-webkit-scrollbar-thumb:hover': {
                backgroundColor: '#FF885B',
            },
        }}>
            {children}
    
      

    </Box>
    </>
);
    };

export default SideBar;