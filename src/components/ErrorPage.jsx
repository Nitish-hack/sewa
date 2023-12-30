import React from 'react'

const ErrorPage = () => {
  return (
    <div style={{minHeight:"90vh", display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"}}>
        
        <h1 className='bold' >Page Not Found</h1> 
      
        <h5>Go back to Homepage <a style={{color:"red"}} href="/" ><u>Home</u></a></h5>
        </div>
  )
}

export default ErrorPage