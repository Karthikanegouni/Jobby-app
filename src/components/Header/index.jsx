import { Link, withRouter } from "react-router-dom"
import Cookies from "js-cookie"
import { FiLogOut } from "react-icons/fi"
import { BsBriefcaseFill } from "react-icons/bs"
import { AiFillHome } from "react-icons/ai"
import "./index.css"

const Header = ({ history }) => {
  const handleLogout = () => {
    Cookies.remove("jwt_token")
    history.replace("/login")
  }

  return (
    <div className="header-cnt">
      <Link to="/" className="logo-cnt link-item">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
        />
      </Link>

      <ul className="sm-device-header">
        <li>
          <Link to="/" className="link-item">
            <AiFillHome size={30} />
          </Link>
        </li>
        <li>
          <Link to="/jobs" className="link-item">
            <BsBriefcaseFill size={30} />
          </Link>
        </li>
        <li>
          <button
            className="logout-logo-btn"
            onClick={handleLogout}
            type="button"
          >
            <FiLogOut size={30} />
          </button>
        </li>
      </ul>

      <ul className="lg-device-header">
        <div className="lg-nav-items">
          <li>
            <Link to="/" className="link-item">
              Home
            </Link>
          </li>
          <li>
            <Link to="/jobs" className="link-item">
              Jobs
            </Link>
          </li>
        </div>
        <li>
          <button className="logout-btn" onClick={handleLogout} type="button">
            Logout
          </button>
        </li>
      </ul>
    </div>
  )
}

export default withRouter(Header)
