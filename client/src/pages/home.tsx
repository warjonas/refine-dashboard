import React from 'react'
import { useList } from '@pankod/refine-core';
import { Box, Typography, Stack} from '@pankod/refine-mui';

import { PieChart, TotalRevenue, TopAgent, PropertyCard, PropertyReferrals } from 'components';

const Home = () => {

  const { data, isLoading, isError } = useList({
    resource: 'properties',
    config: {
      pagination: {
        pageSize: 4
      }
    }
  })

  const latestProperties = data?.data ?? [];


  if (isLoading) <div>Loading</div>
  if (isError) <div>Error</div>

  return (
    <Box>
      <Typography fontSize={25} fontWeight={700} color="#41142d">Dashboard</Typography>
      <Box mt='20px' display='flex' flexWrap='wrap' gap={4}>
        <PieChart
          title='Properties for sale'
          value={668}
          series={[75, 25]}
          colors={['#475be8', '#bdd5ff']}
        />
        <PieChart
          title='Properties for rent'
          value={550}
          series={[60, 40]}
          colors={['#375ae8', '#bdd5ff']}
        />
        <PieChart
          title='Total Customers'
          value={5675}
          series={[75, 25]}
          colors={['#475be8', '#bdd5ff']}
        />
        <PieChart
          title='Total Cities'
          value={550}
          series={[75, 25]}
          colors={['#475be8', '#bdd5ff']}
        />

      </Box>
      <Stack
        mt='25px' width="100%" direction={{ xs: 'column', lg: 'row' }} gap={4}
      >
        <TotalRevenue
          
        />
        <PropertyReferrals />

      </Stack>

      <Box
        flex={1}
        borderRadius="15px"
        padding="20px"
        bgcolor="#fcfcfc"
        display="flex"
        flexDirection="column"
        minWidth="100%"
        mt="25px"
      >
        <Typography fontSize="18px" fontWeight={600} color="#11142d">
          Latest Properties
        </Typography>
        <Box mt={2.5} sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          {latestProperties.map((property) => (
            <PropertyCard
              key={property._id}
              id={property._id}
              title={property.title}
              location={property.location}
              price={property.price}
              photo={property.photo}
            />
          ))}
          
                
        </Box>

        
      </Box>
    </Box>
  )
};

export default Home
