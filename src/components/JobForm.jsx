import React from "react";
import { useState } from "react";

function JobForm({ onAddJob }) {
    const [company, setCompany] = useState("");
    const [position, setPosition] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const newJob = {
            id: Date.now(),
            company,
            position,
            status: "Applied",
        };

        onAddJob(newJob);

        setCompany("");
        setPosition("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
            />

            <input
                type="text"
                placeholder="Position"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
            />

            <button type="submit">Add Job</button>
        </form>
    );
}

export default JobForm;
