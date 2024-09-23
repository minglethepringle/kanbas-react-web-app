import { Link } from "react-router-dom";
export default function Dashboard() {
    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
            <h2 id="wd-dashboard-published">Published Courses (7)</h2> <hr />
            <div id="wd-dashboard-courses">
                <div className="wd-dashboard-course">
                    <Link className="wd-dashboard-course-link"
                        to="/Kanbas/Courses/1/Home">
                        <img src="/images/dashboard-course-img-1.jpg" width={200} />
                        <div>
                            <h5>
                                CS2800 Logic & Computation
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
                        to="/Kanbas/Courses/2/Home">
                        <img src="/images/dashboard-course-img-2.jpg" width={200} />
                        <div>
                            <h5>
                                CS4400 Programming Languages
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
                        to="/Kanbas/Courses/3/Home">
                        <img src="/images/dashboard-course-img-3.jpg" width={200} />
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
                        to="/Kanbas/Courses/4/Home">
                        <img src="/images/dashboard-course-img-4.jpg" width={200} />
                        <div>
                            <h5>
                                CS4700 Networks
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
                        to="/Kanbas/Courses/5/Home">
                        <img src="/images/dashboard-course-img-5.jpg" width={200} />
                        <div>
                            <h5>
                                EECE2310 Digital Design
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
                        to="/Kanbas/Courses/6/Home">
                        <img src="/images/dashboard-course-img-6.jpg" width={200} />
                        <div>
                            <h5>
                                EECE2311 Lab for Digital Design
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
                        to="/Kanbas/Courses/7/Home">
                        <img src="/images/dashboard-course-img-7.jpg" width={200} />
                        <div>
                            <h5>
                                CS2500 Fundamentals of Computer Science 1
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
