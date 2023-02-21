import React, {useState} from 'react'
import {useQuery,gql,useMutation} from "@apollo/client";


const GET_PARTICULAR_MESSAGE = gql`
query me($id : String!){
    message (id : $id) {
        id
        subject
        body 
        author {
            login
        }
        view_href
        post_time 
        language

    }
  }
`;

const UPDATE_MUTATION = gql`
mutation UPDATE($input : updateMessageInput!) {
  updateMessage(input: $input) {
    id
    subject
    body
  }
}

`

const ModelBox = (props) => { 
  const {id,setShow} = props ;

     const [formData,setFormData] = useState({}) ;
     const [showMessage, setShowMessage] = useState(false);

    const {data,error} = useQuery(GET_PARTICULAR_MESSAGE,{
        variables : {
            id : id
        },
        onCompleted : (data) => {
          setFormData(data.message)
        }
    })
   
    const [updateData,myname] = useMutation(UPDATE_MUTATION,{
      onCompleted : (data) => {
        console.log("data updated succesfully", data)
        setShowMessage(true)
      } 
    }
      );

    const onChangehandler = (key,value) => {
      setFormData({
        ...formData ,
        [key] : value
      })
    }
     

  return (
    <form className='modal-box' onSubmit={(e) => {
      e.preventDefault()
    
      updateData({variables : {
        input : {
          id : formData.id,
          subject : formData.subject,
          body : formData.body,
        }
      }})

      
    }}>
        <h1 className='up-head'>Update Message </h1>
        <p><strong>Note :</strong> You can only update Subject and Body</p>
        <div className='input-fields-container'>
          <div className='mini'>
             <div>
                <h4>Id </h4>
                <input type="text"  value={formData.id} readOnly/>
             </div>
             <div >
                <h4>Language</h4>
                <input type="text" value={formData.language} readOnly />
             </div>
             </div>
             <div className='mini'>
             <div>
                <h4>subject </h4>
                <textarea type="text"  value={formData.subject} onChange={(e) => onChangehandler("subject", e.target.value)}/>
             </div>
             <div >
                <h4>Body </h4>
                <textarea type="text" value={formData.body} onChange={(e) => onChangehandler("body", e.target.value)} />
             </div>
             </div>
             <div className='mini'>
             <div>
                <h4>Post_time </h4>
                <input type="text"  value={formData.post_time} readOnly/>
             </div>
             <div >
                <h4>view_href </h4>
                <input type="text" value={formData.view_href} readOnly />
             </div>
             </div>
             <div className='buttons-container'>
              <button type="submit" className='button-83'>Update</button>
              <button type="button" className="button-83" onClick={() => setShow({boolean : false})}>Close</button>
             </div>
             {showMessage ? <p className='success'>Updated Sucessfully check the console to see the response</p> : "" }
        </div>
    </form>
  )
}

export default ModelBox