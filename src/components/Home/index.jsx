import { Link } from "react-router-dom/cjs/react-router-dom.min"
import Header from "../Header"
import "./index.css"

const Home = () => (
  <div className="bg-wrapper">
    <Header />
    <div className="home-cnt">
      <h1>Find The Job That Fits Your Life</h1>
      <p>
        Millions of people are searching for jobs, salary information, company
        reviews. Find the job that fits your abilities and potential.
      </p>
      <Link to="/jobs" className="link-items">
        <button className="find-jobs-btn" type="button">
          Find Jobs
        </button>
      </Link>
    </div>
  </div>
)

export default Home
