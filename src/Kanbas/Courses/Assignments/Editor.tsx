export default function AssignmentEditor() {
    return (
        <div id="wd-assignments-editor">
            <h3>
                <label htmlFor="wd-name">Assignment Name</label>
            </h3>
            <input id="wd-name" value="A1 - ENV + HTML" /><br /><br />
            <textarea id="wd-description" rows={10} cols={50}>
                The assignment is available online Submit a link to the landing page of your Web application running on Netlify.
            </textarea>
            <br />
            <table>
                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-points">Points</label>
                    </td>
                    <td>
                        <input id="wd-points" value={100} />
                    </td>
                </tr>
                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-group">Assignment Group</label>
                    </td>
                    <td>
                        <select id="wd-group">
                            <option selected value="ASSIGNMENTS">ASSIGNMENTS</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-display-grade-as">Display Grade As</label>
                    </td>
                    <td>
                        <select id="wd-display-grade-as">
                            <option selected value="PERCENTAGE">Percentage</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-submission-type">Submission Type</label>
                    </td>
                    <td>
                        <select id="wd-display-grade-as">
                            <option selected value="ONLINE">Online</option>
                        </select>

                        <br /><br />
                        <label>Online Entry Options:</label><br />

                        <input type="checkbox" name="check-text-entry" id="wd-text-entry" />
                        <label htmlFor="wd-text-entry">Text Entry</label><br />

                        <input type="checkbox" name="check-website-url" id="wd-website-url" />
                        <label htmlFor="wd-website-url">Website URL</label><br />

                        <input type="checkbox" name="check-media-recordings" id="wd-media-recordings" />
                        <label htmlFor="wd-media-recordings">Media Recordings</label><br />

                        <input type="checkbox" name="check-student-annotation" id="wd-student-annotation" />
                        <label htmlFor="wd-student-annotation">Student Annotation</label><br />

                        <input type="checkbox" name="check-file-upload" id="wd-file-upload" />
                        <label htmlFor="wd-file-upload">File Uploads</label><br />
                    </td>
                </tr>
                <tr>
                    <td align="right" valign="top">
                        <label>Assign</label>
                    </td>
                    <td>
                        <label htmlFor="wd-assign-to">Assign to</label><br />
                        <input id="wd-assign-to" value="Everyone" /><br />

                        <br />

                        <label htmlFor="wd-due-date">Due</label><br />
                        <input type="date" id="wd-due-date" value="2024-05-13" /><br />

                        <br />

                        <div>
                            <div>
                                <label htmlFor="wd-available-from">Available from</label><br />
                                <input type="date" id="wd-available-from" value="2024-05-06" /><br />
                            </div>
                            <div>
                                <label htmlFor="wd-available-until">Until</label><br />
                                <input type="date" id="wd-available-until" value="2024-05-20" /><br />
                            </div>
                        </div>
                    </td>
                </tr>
            </table>

            <hr/>

            <div>
                <button>Cancel</button>
                <button>Save</button>
            </div>
        </div>
    );
}
