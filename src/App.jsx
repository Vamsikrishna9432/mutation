
import { useState } from 'react';
import ModelBox from './ModelBox';
import {Dna} from "react-loader-spinner";
import {useQuery, gql} from "@apollo/client" 
import './App.css'

function App() {
  const [show, setShow] = useState({boolean : false , id : ""})  

  const GET_MESSAGES = gql`
       query {
        messages {
            items {
              id
              subject 
              body 
            }
          }
       }
`;




// main component 
  const Home = () => {
    const {loading,error,data} = useQuery(GET_MESSAGES) ;
    
     
     if (loading) return (<div className='loading-container'>
        <Dna
          visible={true}
          height="100"
          width="100"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper"
        />
     </div>)  ;

    if (error) return (
        <div className='error-container'>
             <h2>{error.message}</h2>
        </div>
    ) ;

    

  return (
    <div className='home-app-container'>
      <div className='messages-container'>
        {data && 
            data.messages.items?.map((each, index) => 
              <div className='message-box' key={each.id}>
                <p><strong>id : </strong> {each.id}</p>
                <p><strong>Subject : </strong> {each.subject}</p>
                <p><strong>Body : </strong> {each.body.slice(0,150)}</p>
                <div className='btn-container'>
                      <button type="button" className="button-83" onClick={() => setShow({boolean : true, id : each.id})}>Show More</button>
                </div>
                </div>
            )
        }
        </div>
        <div className='m'>
          {show.boolean ? <ModelBox id={show.id} setShow={setShow}/> : null} 
      </div>
    </div>
    
  )
}




  return (
    <div className="app">
      <div className='h'>
         <h1 className='head'>Messages</h1>
      </div>
      <Home />
    </div>
  )
}

export default App
