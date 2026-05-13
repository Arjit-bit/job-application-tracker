import React from "react";
import { useState } from "react";

function JobItem({ job, onDelete, onStatusChange, onEdit }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedCompany, setEditedCompany] = useState(job.company);
    const [editedPosition, setEditedPosition] = useState(job.position);
    const [editedStatus, setEditedStatus] = useState(job.status);

    if (isEditing) {
        return (
            <li className="bg-white p-4 rounded shadow mb-3">
                <div className="flex flex-col gap-2">
                    <input
                        value={editedCompany}
                        onChange={(e) => setEditedCompany(e.target.value)}
                        className="border p-2 rounded"
                    />

                    <input
                        value={editedPosition}
                        onChange={(e) => setEditedPosition(e.target.value)}
                        className="border p-2 rounded"
                    />

                    <select
                        value={editedStatus}
                        onChange={(e) => setEditedStatus(e.target.value)}
                        className="border p-2 rounded"
                    >
                        <option value="Applied">Applied</option>
                        <option value="Interview">Interview</option>
                        <option value="Rejected">Rejected</option>
                    </select>

                    <div className="flex gap-2">
                        <button
                            onClick={() => {
                                onEdit({
                                    ...job,
                                    company: editedCompany,
                                    position: editedPosition,
                                    status: editedStatus,
                                });
                                setIsEditing(false);
                            }}
                            className="bg-green-500 text-white px-3 py-1 rounded"
                        >
                            Save
                        </button>

                        <button
                            onClick={() => setIsEditing(false)}
                            className="bg-gray-300 px-3 py-1 rounded"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </li>
        );
    }

    return (
        <li className="bg-white p-4 rounded-xl shadow mb-4 flex justify-between items-center hover:shadow-md transition">
            <div>
                <h3 className="font-semibold text-lg">{job.company}</h3>
                <p className="text-sm text-gray-600">{job.position}</p>

                <span
                    className={`text-xs px-2 py-1 rounded ${job.status === "Applied"
                            ? "bg-blue-200 text-blue-800"
                            : job.status === "Interview"
                                ? "bg-yellow-200 text-yellow-800"
                                : "bg-red-200 text-red-800"
                        }`}>
                    {job.status}
                </span>
            </div>

            <div className="flex items-center gap-2">
                <select
                    value={job.status}
                    onChange={(e) =>
                        onStatusChange(job.id, e.target.value)
                    }
                    className="border p-1 rounded"
                >
                    <option value="Applied">Applied</option>
                    <option value="Interview">Interview</option>
                    <option value="Rejected">Rejected</option>
                </select>

                <button
                    onClick={() => setIsEditing(true)}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                    Edit
                </button>

                <button
                    onClick={() => onDelete(job.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                >
                    Delete
                </button>
            </div>
        </li>
    );
}

export default JobItem;