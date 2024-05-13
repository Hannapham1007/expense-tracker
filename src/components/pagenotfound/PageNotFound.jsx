import { useNavigate } from 'react-router-dom'

function PageNotFound() {
  const navigate = useNavigate();
  return (
    <div className='d-flex flex-column justify-content-center text-center mt-4 pushdown'>
    <h2 >Whoops... Page Not Found</h2>
    <div className='mt-2'>
    <button
      type="button" className='btn btn-bg' onClick={()=> navigate('/dashboard')}> Back To Home
    </button>
    </div>
  </div>
  )
}

export default PageNotFound