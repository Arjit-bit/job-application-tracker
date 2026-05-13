import React from "react";
import JobItem from "./JobItem";

function JobList({ jobs, onDelete, onStatusChange, onEdit }) {
    if (jobs.length === 0) {
        return (
            <div className="text-center text-gray-500 mt-10">
                <p className="text-lg">No jobs found 🚫</p>
                <p className="text-sm">Try adding or searching differently</p>
            </div>
        );
    }

    return (
        <ul>
            {jobs.map((job) => (
                <JobItem
                    key={job.id}
                    job={job}
                    onDelete={onDelete}
                    onStatusChange={onStatusChange}
                    onEdit={onEdit}
                />
            ))}
        </ul>
    );
}

export default JobList;