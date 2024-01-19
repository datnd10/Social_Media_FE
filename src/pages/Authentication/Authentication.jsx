import React from 'react'
import {Card, Grid} from '@mui/material'
import Login from './Login'
import Register from './Register'
const Authentication = () => {
  return (
    <div>
        <Grid container>
            <Grid className='h-screen overflow-hidden' item xs={7}>
                <img className='h-full w-full' src="https://www.thesportsman.com/media/images/admin/football/original/Ronaldo2.jpg" alt="" />
            </Grid>
            <Grid item xs={5}>
                <div className='px-20 flex flex-col justify-center h-full'>
                  <Card className='card p-8'>
                    <div className='flex flex-col items-center mb-5 space-y-1'>
                    <h1 className='log'>Dat Social</h1>
                    <p className='text-center text-sm w-[70&]'>Connecting Lives, Sharing Stories: Your social World, Your Way</p>
                    </div>
                    {/* <Login/> */}
                    <Register/>
                  </Card>
                </div>
            </Grid>
        </Grid>
    </div>
  )
}

export default Authentication