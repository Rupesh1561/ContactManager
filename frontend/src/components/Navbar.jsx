/* eslint-disable react/prop-types */
import { Box,Button,Container,Flex,useColorMode, useColorModeValue,Input} from "@chakra-ui/react"
import { MdDarkMode,MdOutlineLightMode } from "react-icons/md";
import {IoPersonAddOutline } from "react-icons/io5";
import { useDisclosure } from "@chakra-ui/react";
import AddContactModal from "./AddContactModal";
import { useState } from "react";

function Navbar({add_contact,searchQuery}) {
  const { colorMode, toggleColorMode } = useColorMode()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [query,setQuery]=useState("");
  const handleSearch=(e)=>{
    const v=e.target.value;
    setQuery(v);
    searchQuery(v);

  }
  return ( 
  <Container maxW={"900px"} >
    <Box borderRadius={"5px"} px={"5px"} my={"10px"} bg={useColorModeValue("gray.300","gray.700")}>
        <Flex h={10} alignItems={"center"} justifyContent={"space-between"} px={"10px"} >
            <Flex alignItems={"center"} justifyContent={"center"} gap={"10px"}>
              <img src="/assets/logo.png" width={"50px"} height={"50px"}/>
              <Input  onChange={handleSearch} value={query} variant='unstyled' placeholder='Search' id="search" mx={"20px"} />
            </Flex>
            <Flex alignItems={"center"} justifyContent={"center"} gap={"10px"}>
              <AddContactModal isOpen={isOpen} onClose={onClose} add_contact={add_contact}/>
              <Button background={"transparent"} onClick={onOpen} >
              <IoPersonAddOutline size={25}/>
              </Button>
              <Button onClick={toggleColorMode} backgroundColor={"transparent"}>
              {colorMode === 'light' ? <MdDarkMode  size={25}/> : <MdOutlineLightMode size={25}/>}
              </Button>
            </Flex>
        </Flex>
   </Box>
  </Container>
  )
}

export default Navbar