import React from 'react'
import stats from '../component/dashboard/statdata'
import StatCard from '../component/dashboard/statcard';

 function dashboard() {
  return (
    <>
   
      <h1 className='text -2xl font-bold text-grey-950'>Dashboard Overview</h1>
      <div className='flex items-center justify-between'>
        {stats.map((item,index) => {
          return(
            <StatCard
            key={index}
            title={item.title}
            count={item.count}
            icon={<item.icon/>}
            color={item.color}
            />
          );
        
      })}
      </div>
  </>  
  )
}


export default dashboard
