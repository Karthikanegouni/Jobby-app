import { Component } from "react"
import Cookies from "js-cookie"
import { BsSearch } from "react-icons/bs"
import Header from "../Header"
import Profile from "../Profile"
import JobItem from "../JobItem"
import LoaderView from "../LoaderView"
import "./index.css"

const employmentTypesList = [
  {
    label: "Full Time",
    employmentTypeId: "FULLTIME",
  },
  {
    label: "Part Time",
    employmentTypeId: "PARTTIME",
  },
  {
    label: "Freelance",
    employmentTypeId: "FREELANCE",
  },
  {
    label: "Internship",
    employmentTypeId: "INTERNSHIP",
  },
]

const salaryRangesList = [
  {
    salaryRangeId: "1000000",
    label: "10 LPA and above",
  },
  {
    salaryRangeId: "2000000",
    label: "20 LPA and above",
  },
  {
    salaryRangeId: "3000000",
    label: "30 LPA and above",
  },
  {
    salaryRangeId: "4000000",
    label: "40 LPA and above",
  },
]

const apiStatusConstants = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
}

class Jobs extends Component {
  state = {
    searchInput: "",
    employmentType: [],
    salaryRange: "",
    apiStatus: apiStatusConstants.initial,
    jobsData: [],
  }

  componentDidMount() {
    this.getJobsData()
  }

  formatData = (data) =>
    data.map((job) => ({
      companyLogoUrl: job.company_logo_url,
      employmentType: job.employment_type,
      id: job.id,
      jobDescription: job.job_description,
      location: job.location,
      packagePerAnnum: job.package_per_annum,
      rating: job.rating,
      title: job.title,
    }))

  getJobsData = async () => {
    try {
      this.setState({
        apiStatus: apiStatusConstants.inProgress,
      })
      const { searchInput, employmentType, salaryRange } = this.state
      const employmentFilter = employmentType.join()
      const jwtToken = Cookies.get("jwt_token")
      const jobsApiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentFilter}&minimum_package=${salaryRange}&search=${searchInput}`
      const options = {
        method: "GET",
        headers: {
          authorization: `Bearer ${jwtToken}`,
        },
      }
      const response = await fetch(jobsApiUrl, options)
      if (response.ok) {
        const data = await response.json()
        const { jobs } = data
        const formatedData = this.formatData(jobs)
        this.setState({
          jobsData: formatedData,
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

  handleSearchUpdate = (event) => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  handleEmploymentSelect = (event) => {
    const { value, checked } = event.target
    this.setState((prevState) => {
      if (checked) {
        return {
          employmentType: [...prevState.employmentType, value],
        }
      }

      return {
        employmentType: prevState.employmentType.filter(
          (item) => item !== value
        ),
      }
    }, this.getJobsData)
  }

  handleSalarySelect = (event) => {
    this.setState(
      {
        salaryRange: event.target.value,
      },
      this.getJobsData
    )
  }

  renderTypesofEmployment = () => (
    <>
      <h1>Type Of Employment</h1>
      <ul className="list-item-cnt">
        {employmentTypesList.map((type) => (
          <li key={type.employmentTypeId}>
            <input
              type="checkbox"
              name="employment type"
              id={type.employmentTypeId}
              value={type.employmentTypeId}
              onChange={this.handleEmploymentSelect}
            />
            <label htmlFor={type.employmentTypeId}>{type.label}</label>
          </li>
        ))}
      </ul>
    </>
  )

  renderSalaryRanges = () => (
    <>
      <h1>Salary Range</h1>
      <ul className="list-item-cnt">
        {salaryRangesList.map((salary) => (
          <li key={salary.salaryRangeId}>
            <input
              type="radio"
              name="salary"
              value={salary.salaryRangeId}
              id={salary.salaryRangeId}
              onChange={this.handleSalarySelect}
            />
            <label htmlFor={salary.salaryRangeId}>{salary.label}</label>
          </li>
        ))}
      </ul>
    </>
  )

  renderSuccessView = () => {
    const { jobsData } = this.state

    if (jobsData.length !== 0) {
      return (
        <ul className="job-list-items-cnt">
          {jobsData.map((job) => (
            <JobItem key={job.id} jobData={job} />
          ))}
        </ul>
      )
    }
    return (
      <div className="no-jobs-found">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
        />
        <h1>No Jobs Found</h1>
        <p>We could not find any jobs. Try other filters.</p>
      </div>
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
      <button className="custom-btn" onClick={this.getJobsData} type="button">
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
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    const { searchInput } = this.state

    return (
      <>
        <Header />
        <div className="jobs-page-wrapper">
          <div className="search-cnt-sm">
            <input
              type="search"
              placeholder="search"
              value={searchInput}
              onChange={this.handleSearchUpdate}
            />
            <button
              className="search-jobs-btn"
              type="button"
              data-testid="searchButton"
              onClick={this.getJobsData}
            >
              <BsSearch size={20} />
            </button>
          </div>

          <div className="left-cnt">
            <Profile />
            <hr />
            {this.renderTypesofEmployment()}
            <hr />
            {this.renderSalaryRanges()}
          </div>

          <div className="right-cnt">
            <div className="search-cnt-lg">
              <input
                type="search"
                placeholder="search"
                value={searchInput}
                onChange={this.handleSearchUpdate}
              />
              <button
                className="search-jobs-btn"
                type="button"
                data-testid="searchButton"
                onClick={this.getJobsData}
              >
                <BsSearch size={20} />
              </button>
            </div>
            {this.renderJobs()}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
