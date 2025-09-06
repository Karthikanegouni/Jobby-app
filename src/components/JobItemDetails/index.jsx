import { Component } from "react"
import Cookies from "js-cookie"
import { HiLocationMarker } from "react-icons/hi"
import { BsBriefcaseFill, BsStarFill } from "react-icons/bs"
import { BiLinkExternal } from "react-icons/bi"
import Header from "../Header"
import LoaderView from "../LoaderView"
import "./index.css"

const apiStatusConstants = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
}

class JobItemDetails extends Component {
  state = {
    jobData: {},
  }

  componentDidMount() {
    this.getJobData()
  }

  toCamel = (str) => str.replace(/_([a-z])/g, (_, c) => c.toUpperCase())

  convertKeys = (data) => {
    if (Array.isArray(data)) {
      return data.map((item) => this.convertKeys(item))
    }
    if (data && typeof data === "object") {
      const newObj = {}
      Object.keys(data).forEach((key) => {
        const camelKey = this.toCamel(key)
        newObj[camelKey] = this.convertKeys(data[key])
      })
      return newObj
    }
    return data
  }

  formatData = (apiResponse) => ({
    jobDetails: this.convertKeys(apiResponse.job_details),
    similarJobs: this.convertKeys(apiResponse.similar_jobs),
  })

  getJobData = async () => {
    const {
      match: {
        params: { id },
      },
    } = this.props
    try {
      this.setState({
        apiStatus: apiStatusConstants.inProgress,
      })
      const jwtToken = Cookies.get("jwt_token")
      const jobsApiUrl = `https://apis.ccbp.in/jobs/${id}`
      const options = {
        method: "GET",
        headers: {
          authorization: `Bearer ${jwtToken}`,
        },
      }
      const response = await fetch(jobsApiUrl, options)
      if (response.ok) {
        const data = await response.json()
        const formatedData = this.formatData(data)
        this.setState({
          jobData: formatedData,
          apiStatus: apiStatusConstants.success,
        })
      } else {
        this.setState({ apiStatus: apiStatusConstants.failure })
      }
    } catch (error) {
      this.setState({ apiStatus: apiStatusConstants.failure })
      console.log(error)
    }
  }

  renderSkills = (skills) => (
    <>
      <h1 className="sub-heading">Skills</h1>
      <ul className="skills-list-cnt">
        {skills.map((skill) => (
          <li key={skill.name} className="skill-item">
            <img src={skill.imageUrl} alt={skill.name} />
            <p className="skill-name">{skill.name}</p>
          </li>
        ))}
      </ul>
    </>
  )

  renderLifeAtCompany = (lifeAtCompany) => {
    const { description, imageUrl } = lifeAtCompany
    return (
      <div className="life-at-company-cnt">
        <h1 className="sub-heading">Life at Company</h1>

        <div className="company-life-text-cnt">
          <p>{description}</p>
          <img src={imageUrl} alt="life at company" />
        </div>
      </div>
    )
  }

  renderSimilarJobs = (similarJob) => {
    const {
      companyLogoUrl,
      employmentType,
      jobDescription,
      id,
      location,
      rating,
      title,
    } = similarJob

    return (
      <li className="job-card similar-job-item" key={id}>
        <div className="company-details-cnt">
          <div className="job-top-cnt">
            <img src={companyLogoUrl} alt="similar job company logo" />
            <div className="job-item-title-cnt">
              <h1 className="job-item-title">{title}</h1>
              <div className="rating-cnt">
                <BsStarFill color="#fbbf24" />
                <p>{rating}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="job-item-description-cnt">
          <h1 className="sub-heading">Description</h1>
          <p className="job-item-description">{jobDescription}</p>
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
        </div>
      </li>
    )
  }

  renderJobItemDetailedCard = () => {
    const { jobData } = this.state
    const { jobDetails, similarJobs } = jobData

    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
      skills,
      title,
    } = jobDetails

    console.log(lifeAtCompany)
    return (
      <>
        <div className="job-card">
          <div className="company-details-cnt">
            <div className="job-top-cnt">
              <img src={companyLogoUrl} alt="job details company logo" />
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
            <div className="detailed-item-link-cnt">
              <h1 className="sub-heading">Description</h1>
              <a
                href={companyWebsiteUrl}
                target="__blank"
                className="website-link-item"
              >
                Visit
                <BiLinkExternal />
              </a>
            </div>
            <p className="job-item-description">{jobDescription}</p>
          </div>

          {this.renderSkills(skills)}
          {this.renderLifeAtCompany(lifeAtCompany)}
        </div>

        <h1 className="similar-job-title">Similar Jobs</h1>
        <ul className="smilar-jobs-cnt">
          {similarJobs.map((similarJob) => this.renderSimilarJobs(similarJob))}
        </ul>
      </>
    )
  }

  renderFailureView = () => (
    <div className="job-failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button className="custom-btn" onClick={this.getJobData} type="button">
        Retry
      </button>
    </div>
  )

  renderJobs = () => {
    const { apiStatus } = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return (
          <div className="loader-cnt">
            <LoaderView />
          </div>
        )
      case apiStatusConstants.success:
        return this.renderJobItemDetailedCard()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="job-item-detailed-page">{this.renderJobs()}</div>
      </>
    )
  }
}

export default JobItemDetails
