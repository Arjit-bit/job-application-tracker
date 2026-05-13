import React from "react";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import JobForm from "./components/JobForm";
import JobList from "./components/JobList";
import Stats from "./components/Stats";

function App() {
  const [jobs, setJobs] = useState(() => {
    const savedJobs = localStorage.getItem("jobs");
    return savedJobs ? JSON.parse(savedJobs) : [];
  });

  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");

  useEffect(() => {
    localStorage.setItem("jobs", JSON.stringify(jobs));
  }, [jobs]);

  // 🔥 COMBINED FILTER + SEARCH
  const filteredJobs = jobs
    .filter((job) =>
      filter === "All" ? true : job.status === filter
    )
    .filter((job) =>
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.position.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) =>
      sortOrder === "newest" ? b.id - a.id : a.id - b.id
    );

  const handleAddJob = (newJob) => {
    setJobs((prev) => [...prev, newJob]);
  };

  const handleDelete = (id) => {
    setJobs((prev) => prev.filter((job) => job.id !== id));
  };

  const handleStatusChange = (id, newStatus) => {
    setJobs((prev) =>
      prev.map((job) =>
        job.id === id ? { ...job, status: newStatus } : job
      )
    );
  };

  const handleEdit = (updatedJob) => {
    setJobs((prev) =>
      prev.map((job) =>
        job.id === updatedJob.id ? updatedJob : job
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto">
        <Header />
        <JobForm onAddJob={handleAddJob} />
        <Stats jobs={jobs} />

        {/* 🔍 SEARCH BAR */}
        <input
          type="text"
          placeholder="Search by company or position..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />

        {/* FILTERS */}
        <div className="flex gap-2 mb-6">
          {["All", "Applied", "Interview", "Rejected"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1 rounded-full text-sm ${filter === f
                ? "bg-blue-500 text-white"
                : "bg-white border"
                }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="mb-4 flex justify-end">
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>

        <JobList
          jobs={filteredJobs}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
          onEdit={handleEdit}
        />
      </div>
    </div >
  );
}

export default App;