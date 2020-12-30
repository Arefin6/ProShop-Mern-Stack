import React,{ useState } from 'react';
import {Form,Button} from 'react-bootstrap';
import {useHistory} from 'react-router-dom';

const SearchBox = () => {
    const [keyword,setKeyword] = useState('')
     const history = useHistory()

    const searchHandler = (e) =>
    {
      e.preventDefault()
       if(keyword.trim()){
         history.push(`/search/${keyword}`) 
       }
       else{
         history.push('/')
        } 
    }
    

    return (
       <Form onSubmit={searchHandler} inline>
        <Form.Control
        type='text'
        name='q'
        placeholder='Search Products...'
        onChange={(e) => setKeyword(e.target.value)}
        className='mr-sm-2 ml-sm-5'
        >
            
        </Form.Control> 
         <Button type='submit' variant='outline-success' className='p-2'>
             Search
         </Button>
       </Form>
    );
};

export default SearchBox;