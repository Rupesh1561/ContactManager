/* eslint-disable react/prop-types */
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button
  } from '@chakra-ui/react'
import { useState } from "react";
import {
    FormControl,
    FormLabel,
    Input,
    RadioGroup,
    Radio,
    Textarea,
    Flex,
    Text
  } from "@chakra-ui/react";


function UpdateContactModal({isOpen,onClose,data,update_contact}) {


  // Validate email format using a regular expression
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  const [errorMessage,setErrorMessage] =useState('');
  const [formData,setFormData] = useState({'firstName':data.firstName,'lastName':data.lastName,'email':data.email,'mobileNo':data.mobileNo,'profile':data.profile,'gender':data.gender,'description':data.description})
  const [profile,setProfile] = useState()
  // Trigger the file input click
  const handleButtonClick = () => {
    document.getElementById('fileInput').click();
  };
  // Handle file change
  const handleFileChange = (e) => {
    setProfile(e.target.files[0]);
  };
  //Handle input change
  const handleInputChange = (e) =>{
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  //handle radio change
 const handleRadioChange = (value)=>{
  setFormData((prev) => ({ ...prev, gender: value }))
 };
  

  //handle submit
  const handleSubmit=()=>{
      // Check for  fields
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.gender || !formData.mobileNo ) {
        setErrorMessage('Required fields are missing.');
        return;
      }
  
      // Validate email format
      if (!isValidEmail(formData.email)) {
        setErrorMessage('Please enter a valid email address.');
        return;
      } 
  
      // Validate file type (e.g., only allow PDF and image files)
      const allowedTypes = ['image/jpeg', 'image/png'];
      if (profile && !allowedTypes.includes(profile.type)) {
        setErrorMessage('Only JPEG, and PNG files are allowed.');
        return;
      }
  
      // If validation passes, clear error and proceed
      setErrorMessage('');
      update_contact(formData,profile,data.id)
      handleClose()
  };

  //handle close and reset data
  const handleClose=()=>{
    setErrorMessage('');
    onClose();
  }

  return (
          <>
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Add Contact Details</ModalHeader>
                <ModalCloseButton onClick={handleClose} />
                <Text mx={'auto'} color={'red'} >{errorMessage}</Text>
                <ModalBody>
                  <Flex alignItems={'center'} gap={4}>
                    <FormControl >
                      <FormLabel>First Name<span style={{ color:'#FF6B6B',marginLeft:'4px'}}>*</span></FormLabel>
                      <Input  placeholder='Roopesh' type='text' name='firstName' onChange={handleInputChange} value={formData.firstName}></Input>
                    </FormControl>

                    <FormControl >
                      <FormLabel>Last Name<span style={{ color:'#FF6B6B',marginLeft:'4px'}}>*</span></FormLabel>
                      <Input  placeholder='Nallakukkala' type='text' name='lastName' onChange={handleInputChange} value={formData.lastName}></Input>
                    </FormControl>

                  </Flex>

                  <Flex direction={'column'} gap={4}>
                  <FormControl >
                      <FormLabel>Email<span style={{ color:'#FF6B6B',marginLeft:'4px'}}>*</span></FormLabel>
                      <Input  placeholder='nallakukkalarupesh@gmail.com' type='email' name='email' onChange={handleInputChange} value={formData.email}></Input>
                  </FormControl>

                  <FormControl >
                      <FormLabel>Mobile No<span style={{ color:'#FF6B6B',marginLeft:'4px'}}>*</span></FormLabel>
                      <Input  placeholder='9999999999' type='mobile' name='mobileNo' onChange={handleInputChange} value={formData.mobileNo}></Input>
                  </FormControl>

                  <Input type='file' id='fileInput' display={'none'} backgroundColor={'transparent'} name='profile' onChange={handleFileChange}></Input>
                  <Button colorScheme="teal" onClick={handleButtonClick}>Upload File</Button>
                  {profile instanceof File?
                  <Text>Selected File: {profile.name}</Text>:<Text>Selected File: {"previous profile pic"}</Text>
                   }
                  <FormLabel>Gender<span style={{ color:'#FF6B6B',marginLeft:'4px'}}>*</span></FormLabel>
                  <RadioGroup name='gender'  onChange={handleRadioChange}  >
                  <Flex gap={4}>
                    <Radio value='male' checked={formData.gender=='male'}>Male</Radio>
                    <Radio value='female' checked={formData.gender=='male'}>Female</Radio>
                    </Flex>
                  </RadioGroup>

                  <FormControl >
                      <FormLabel>Description</FormLabel>
                      <Textarea name='description' maxLength={100} placeholder='Enter text of 100 chars length' onChange={handleInputChange} value={formData.description}/>
                  </FormControl>

                  </Flex>
                </ModalBody>
                <ModalFooter>
                  <Button variant={'outline'} colorScheme='teal' mr={3} onClick={handleClose}>
                    Close
                  </Button>
                  <Button mr={3} colorScheme='blue' onClick={handleSubmit} type='submit'>Update</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </>
        )
}

export default UpdateContactModal