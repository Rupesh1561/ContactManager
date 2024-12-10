/* eslint-disable react/prop-types */
import { Grid, GridItem } from '@chakra-ui/react'
import Usercard from './Usercard';


function MainGrid({contacts,update_contact,delete_contact}) {
  return (
  <Grid  templateColumns="repeat(auto-fit,minmax(300px,400px))" gap={"20px"} justifyContent={"center"} m="15px">
    { contacts.map((item)=>(
      
     <GridItem key={item.id}>
      <Usercard data={item} update_contact={update_contact} delete_contact={delete_contact}/>
      </GridItem>
    ))}
</Grid>
  )
}

export default MainGrid
