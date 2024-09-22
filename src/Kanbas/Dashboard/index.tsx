import { Link } from "react-router-dom";
export default function Dashboard() {
    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
            <h2 id="wd-dashboard-published">Published Courses (7)</h2> <hr />
            <div id="wd-dashboard-courses">
                <div className="wd-dashboard-course">
                    <Link className="wd-dashboard-course-link"
                        to="/Kanbas/Courses/1234/Home">
                        <img src="/images/dashboard-course-img.jpg" width={200} />
                        <div>
                            <h5>
                                CS4550 Web Development
                            </h5>
                            <p className="wd-dashboard-course-title">
                                Fall 2024 Semester
                            </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course">
                    <Link className="wd-dashboard-course-link"
                        to="/Kanbas/Courses/1234/Home">
                        <img src="/images/dashboard-course-img.jpg" width={200} />
                        <div>
                            <h5>
                                CS4550 Web Development
                            </h5>
                            <p className="wd-dashboard-course-title">
                                Fall 2024 Semester
                            </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course">
                    <Link className="wd-dashboard-course-link"
                        to="/Kanbas/Courses/1234/Home">
                        <img src="/images/dashboard-course-img.jpg" width={200} />
                        <div>
                            <h5>
                                CS4550 Web Development
                            </h5>
                            <p className="wd-dashboard-course-title">
                                Fall 2024 Semester
                            </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course">
                    <Link className="wd-dashboard-course-link"
                        to="/Kanbas/Courses/1234/Home">
                        <img src="/images/dashboard-course-img.jpg" width={200} />
                        <div>
                            <h5>
                                CS4550 Web Development
                            </h5>
                            <p className="wd-dashboard-course-title">
                                Fall 2024 Semester
                            </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course">
                    <Link className="wd-dashboard-course-link"
                        to="/Kanbas/Courses/1234/Home">
                        <img src="/images/dashboard-course-img.jpg" width={200} />
                        <div>
                            <h5>
                                CS4550 Web Development
                            </h5>
                            <p className="wd-dashboard-course-title">
                                Fall 2024 Semester
                            </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course">
                    <Link className="wd-dashboard-course-link"
                        to="/Kanbas/Courses/1234/Home">
                        <img src="/images/dashboard-course-img.jpg" width={200} />
                        <div>
                            <h5>
                                CS4550 Web Development
                            </h5>
                            <p className="wd-dashboard-course-title">
                                Fall 2024 Semester
                            </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course">
                    <Link className="wd-dashboard-course-link"
                        to="/Kanbas/Courses/1234/Home">
                        <img src="/images/dashboard-course-img.jpg" width={200} />
                        <div>
                            <h5>
                                CS4550 Web Development
                            </h5>
                            <p className="wd-dashboard-course-title">
                                Fall 2024 Semester
                            </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
