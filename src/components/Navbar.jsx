import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = ({ auth, setAuth }) => {
  return (
    <nav className="navbar navbar-expand-lg bg-dark  d-flex justify-content-around">
      <div className="container-fluid">
        <img src="https://static.wixstatic.com/media/7d30dc_9f9850a051db49cf914269e1eaa28140~mv2.png/v1/fill/w_76,h_115,al_c,q_95,enc_auto/Picture1.png" alt="Logo GTC" height="70px" />
        <button className="navbar-toggler bg-primary" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse " id="navbarNavAltMarkup">
          <div className="navbar-nav d-flex justify-content-end w-100">
            {
              auth ?
                <NavLink
                  className='nav-item nav-link text-primary'
                  onClick={() => {
                    setAuth(false)
                    localStorage.removeItem('Authorization')
                  }}
                >
                  Logout
                </NavLink>
                :
                <>
                  <NavLink
                    to='/login'
                    className={e => e.isActive ? 'nav-item nav-link text-white' : 'nav-item nav-link text-primary'}
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to='/registro'
                    className={e => e.isActive ? 'nav-item nav-link text-white' : 'nav-item nav-link text-primary'}
                  >
                    Registro
                  </NavLink>
                </>
            }
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar