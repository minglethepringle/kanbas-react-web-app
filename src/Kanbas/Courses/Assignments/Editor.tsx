import { useParams } from "react-router";
import * as db from "../../Database";
import { Link } from "react-router-dom";

export default function AssignmentEditor() {
    const { cid, aid } = useParams();
    const assignment = db.assignments.find((assignment: any) => assignment._id === aid);

    if (!assignment)
        return <div>Assignment not found!</div>;

    return (
        <div id="wd-assignments-editor">
            <div className="mb-3">
                <label htmlFor="wd-name" className="form-label">Assignment Name</label>
                <input className="form-control" id="wd-name" value={assignment.title} />
            </div>

            <div className="mb-3">
                <textarea className="form-control" id="wd-description" rows={10} cols={50}>
                    {assignment.description}
                </textarea>
            </div>

            <div>
                <div className="row mb-3">
                    <div className="col-2">
                        <label className="form-label float-end" htmlFor="wd-points">Points</label>
                    </div>
                    <div className="col-8">
                        <input className="form-control" id="wd-points" value={assignment.points} />
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-2">
                        <label className="form-label float-end" htmlFor="wd-group">Assignment Group</label>
                    </div>
                    <div className="col-8">
                        <select className="form-select" id="wd-group">
                            <option selected value="ASSIGNMENTS">ASSIGNMENTS</option>
                        </select>
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-2">
                        <label className="form-label float-end" htmlFor="wd-display-grade-as">Display Grade As</label>
                    </div>
                    <div className="col-8">
                        <select className="form-select" id="wd-display-grade-as">
                            <option selected value="PERCENTAGE">Percentage</option>
                        </select>
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-2">
                        <label className="form-label float-end" htmlFor="wd-submission-type">Submission Type</label>
                    </div>
                    <div className="col-8">
                        <div className="border border-dark rounded p-3">
                            <select className="form-select mb-3" id="wd-display-grade-as">
                                <option selected value="ONLINE">Online</option>
                            </select>
                            <b>Online Entry Options</b>
                            <div className="form-check my-3">
                                <input className="form-check-input" type="checkbox" name="check-text-entry" id="wd-text-entry" />
                                <label className="form-check-label" htmlFor="wd-text-entry">Text Entry</label>
                            </div>
                            <div className="form-check my-3">
                                <input className="form-check-input" type="checkbox" name="check-website-url" id="wd-website-url" />
                                <label className="form-check-label" htmlFor="wd-website-url">Website URL</label>
                            </div>
                            <div className="form-check my-3">
                                <input className="form-check-input" type="checkbox" name="check-media-recordings" id="wd-media-recordings" />
                                <label className="form-check-label" htmlFor="wd-media-recordings">Media Recordings</label>
                            </div>
                            <div className="form-check my-3">
                                <input className="form-check-input" type="checkbox" name="check-student-annotation" id="wd-student-annotation" />
                                <label className="form-check-label" htmlFor="wd-student-annotation">Student Annotation</label>
                            </div>
                            <div className="form-check my-3">
                                <input className="form-check-input" type="checkbox" name="check-file-upload" id="wd-file-upload" />
                                <label className="form-check-label" htmlFor="wd-file-upload">File Uploads</label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-2">
                        <label className="form-label float-end">Assign</label>
                    </div>
                    <div className="col-8">
                        <div className="border border-dark rounded p-3">
                            <div className="row mb-3">
                                <div className="col">
                                    <label className="form-label" htmlFor="wd-assign-to"><b>Assign to</b></label>
                                    <input className="form-control" id="wd-assign-to" value="Everyone" />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col">
                                    <label className="form-label" htmlFor="wd-due-date"><b>Due</b></label>
                                    <input className="form-control" type="date" id="wd-due-date" value={assignment.dueDate} />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-6">
                                    <label className="form-label" htmlFor="wd-available-from"><b>Available from</b></label>
                                    <input className="form-control" type="date" id="wd-available-from" value={assignment.availableDate} />
                                </div>
                                <div className="col-6">
                                    <label className="form-label" htmlFor="wd-available-until"><b>Until</b></label>
                                    <input className="form-control" type="date" id="wd-available-until" value="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-2">

                    </div>
                    <div className="col-8">
                        <div>
                            <hr />
                            <Link to={`/Kanbas/Courses/${cid}/Assignments`} id="wd-assignment-editor-save" className="btn btn-lg btn-danger me-1 float-end">
                                Save
                            </Link>
                            <Link to={`/Kanbas/Courses/${cid}/Assignments`} id="wd-assignment-editor-cancel" className="btn btn-lg btn-secondary me-1 float-end">
                                Cancel      
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
