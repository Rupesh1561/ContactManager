import {Stack} from '@chakra-ui/react'
import Navbar from './components/Navbar'
import MainGrid from './components/MainGrid'
import { useState,useEffect } from 'react'


function App() {
  const [contacts,setContact] = useState([])
  const [fltcontacts,setFltcontact]=useState([])
  const [nodatafound,setNodatafound]=useState(false);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000');
        const result = await response.json();
        setContact(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);

  const searchQuery =(query)=>{
    if(!query){
      setFltcontact([]);
    }
    else{
    // Filter the contacts based on the query
    const filteredContacts = contacts.filter((item) =>
      `${item.firstName.toLowerCase()} ${item.lastName.toLowerCase()} ${item.mobileNo}`.includes(query.toLowerCase())
    );

      if (filteredContacts.length===0){
        setNodatafound(true);
        return
      }
      else{
      setFltcontact(filteredContacts)
      }
    }
    setNodatafound(false);
  }

  const update_contact= (formData,profile,id)=>{
    const formdata =new FormData();
    formdata.append("data",JSON.stringify(formData));
    formdata.append("profile",profile)

    fetch(`http://127.0.0.1:5000/update${id}`,{
      method: 'PATCH',
      body:formdata
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })

    .then((data) => {
      setContact(data)
    })
    .catch((error) => {
      console.error('Error:', error);
    });


  }
  
  const delete_contact= (id)=>{
    //delete
    fetch(`http://127.0.0.1:5000/delete${id}`,{
      method: 'DELETE',
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })

    .then((data) => {
      setContact(data)
    })
    .catch((error) => {
      console.error('Error:', error);
    });

  }
  
  const add_contact= (formData,profile)=>{
    const formdata =new FormData();
    formdata.append("data",JSON.stringify(formData));
    formdata.append("profile",profile)

    fetch("http://127.0.0.1:5000/add",{
      method: 'POST',
      body:formdata
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })

    .then((data) => {
      setContact(data)
    })
    .catch((error) => {
      console.error('Error:', error);
    });

  }

  return (
    <>
  <Stack>
    <Navbar add_contact={add_contact} searchQuery={searchQuery}/>{nodatafound?
    (<div style={{ textAlign: 'center' }}>
      <h2>No data Found</h2>
    </div>
    ):
    (<MainGrid contacts={fltcontacts.length>0?fltcontacts:contacts} update_contact={update_contact} delete_contact={delete_contact}/>)
    }
  </Stack>
    </>
  )
}

export default App
