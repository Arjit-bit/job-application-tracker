import React from "react";

function Stats({ jobs }) {
    const applied = jobs.filter(j => j.status === "Applied").length;
    const interview = jobs.filter(j => j.status === "Interview").length;
    const rejected = jobs.filter(j => j.status === "Rejected").length;

    return (
        <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-100 p-3 rounded text-center">
                <p className="text-sm text-gray-600">Applied</p>
                <h2 className="text-xl font-bold">{applied}</h2>
            </div>

            <div className="bg-yellow-100 p-3 rounded text-center">
                <p className="text-sm text-gray-600">Interview</p>
                <h2 className="text-xl font-bold">{interview}</h2>
            </div>

            <div className="bg-red-100 p-3 rounded text-center">
                <p className="text-sm text-gray-600">Rejected</p>
                <h2 className="text-xl font-bold">{rejected}</h2>
            </div>
        </div>
    );
}

export default Stats;