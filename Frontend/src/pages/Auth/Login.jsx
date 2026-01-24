import React from 'react'

const Login = () => {
  return (
    <div className='h-screen bg-cyan-50 overflow-hidden relative'>
      <div className="container h-screen flex items-center justify-center px-20 mx-auto">
        <div className="w-2/4 h-[90vh] flex items-end bg-login-bg-img bg-cover bg-center rounded-lg p-10 z-50">
        
          <div>
            <h4 className='text-[15px] text-white leading-6 pr-7 mt-4'> Capture Your <br/> Journeys</h4>
            <p className=''>
              Record your travel experience and memories in your personal travel journal. 
            </p>
          </div>
        </div>
        <div className=''>
          <form onSubmit={()=>{}}>
            <h4 className='text-2xl font-semibold mb-7'>Login</h4>
            <input type='text' placeholder='Email' className='input-box'/>
            <button type='submit' className='btn-primary'>Login</button>
            <p className=''>Or</p>
            <button type='submit' className='' onClick={()=>{
              navigator("/signUp")
            }}>CREATE ACCOUNT</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
