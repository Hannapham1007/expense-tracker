import { Link } from 'react-router-dom'

function PageNotFound() {
  return (
    <div className='center'>
    <h2 className='page-not-found-title'>Whoops... Page Not Found</h2>
    <Link to="/dashboard">
    <button
      type="button" className='btn'> Back To Home
    </button>
  </Link>
  </div>
  )
}

export default PageNotFound