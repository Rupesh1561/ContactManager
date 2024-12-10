/* eslint-disable react/prop-types */
import { RiDeleteBin5Line } from "react-icons/ri";
import { TiPencil } from "react-icons/ti";
import { Flex,Box } from "@chakra-ui/react";
import { useColorModeValue,useDisclosure } from "@chakra-ui/react";
import UpdateContactModal from "./UpdateContactModal"



function Usercard({data,update_contact,delete_contact}) {
    const bgcolor=useColorModeValue("gray.300",'rgb(11, 25, 44)')
    const { isOpen, onOpen, onClose } = useDisclosure()


  return (
    <Flex className="contact_card" h={"180px"} bg={bgcolor} direction={"column"} borderRadius={"10px"} _hover={{border:'solid 2px red'}}>
        <Flex className="header"  h={"55%"} m={"3px"} justifyContent={"space-between"}>
            <Flex className="profile"  h={"80px"} w={"80px"} borderRadius={"50%"} m={"5px"} backgroundImage={`url(${"http://127.0.0.1:5000/"+data.profile})`} backgroundSize={'cover'} backgroundPosition={'center'} >
            </Flex>
            <Flex className="personalInfo"  direction={"column"} w={"55%"} gap={'0px'}>
                <Box fontSize={"20px"} fontWeight={'bold'}>{data.firstName+" "+data.lastName}</Box>
                <Box fontWeight={'5px'} fontSize={'13px'}>{data.email}</Box>
                <Box fontWeight={'5px'} fontSize={'13px'}>{data.mobileNo}</Box>
            </Flex>
            <Flex className="tool"  w={"17%"} justifyContent={"start"} gap={"15px"} pt={'7px'}>
                <UpdateContactModal isOpen={isOpen} onClose={onClose} data={data} update_contact={update_contact}/>
               <Box><button onClick={onOpen}><TiPencil size={20}/></button></Box>
               <Box><button onClick={()=>delete_contact(data.id)}><RiDeleteBin5Line size={20}/></button></Box>
            </Flex>
        </Flex>
        <Flex className="description"  h={"45%"} m={"3px"} mx={'10px'} fontSize={'15px'} whiteSpace="normal" wordBreak="break-word" overflow="hidden">
            {data.description}
        </Flex>
    </Flex>
  )
}
export default Usercard
