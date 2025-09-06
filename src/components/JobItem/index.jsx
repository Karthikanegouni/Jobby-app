import { Link } from "react-router-dom"
import { BsBriefcaseFill, BsStarFill } from "react-icons/bs"
import { HiLocationMarker } from "react-icons/hi"
import "./index.css"

const JobItem = ({ jobData }) => {
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobData

  return (
    <li className="job-card">
      <Link to={`/jobs/${id}`} className="link-item">
        <div className="company-details-cnt">
          <div className="job-top-cnt">
            <img src={companyLogoUrl} alt="company logo" />
            <div className="job-item-title-cnt">
              <h1 className="job-item-title">{title}</h1>
              <div className="rating-cnt">
                <BsStarFill color="#fbbf24" />
                <p>{rating}</p>
              </div>
            </div>
          </div>
          <div className="job-type-cnt">
            <div className="location-cnt">
              <HiLocationMarker />
              <p>{location}</p>
            </div>
            <div className="type-cnt">
              <BsBriefcaseFill />
              <p>{employmentType}</p>
            </div>
            <p className="package">{packagePerAnnum}</p>
          </div>
        </div>
        <hr className="line-break-rule" />
        <div className="job-item-description-cnt">
          <h1 className="sub-heading">Description</h1>
          <p className="job-item-description">{jobDescription}</p>
        </div>
      </Link>
    </li>
  )
}

export default JobItem
