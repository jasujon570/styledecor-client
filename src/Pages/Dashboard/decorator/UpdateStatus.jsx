const UpdateStatus = () => {
  const projects = [
    {
      id: "P001",
      service: "Wedding Bliss",
      client: "Mr. A",
      status: "Pending",
    },
    {
      id: "P002",
      service: "Home Makeover",
      client: "Ms. B",
      status: "In Progress",
    },
    {
      id: "P003",
      service: "Office Setup",
      client: "Tech Corp",
      status: "Completed",
    },
  ];

  const handleStatusChange = (projectId, newStatus) => {
    console.log(`Updating project ${projectId} to status: ${newStatus}`);
    alert(`Status for ${projectId} updated to ${newStatus}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-secondary mb-8">
        Update Project Status 🔄
      </h1>
      <p className="text-gray-600 mb-6">
        Manage and update the progress status of your currently assigned
        projects.
      </p>

      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="table w-full">
          <thead>
            <tr className="bg-base-200">
              <th>Project ID</th>
              <th>Service</th>
              <th>Client</th>
              <th>Current Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id}>
                <td className="font-mono">{project.id}</td>
                <td>{project.service}</td>
                <td>{project.client}</td>
                <td>
                  <span
                    className={`badge ${
                      project.status === "Completed"
                        ? "badge-success"
                        : project.status === "In Progress"
                        ? "badge-info"
                        : "badge-warning"
                    }`}
                  >
                    {project.status}
                  </span>
                </td>
                <td>
                  <select
                    className="select select-sm select-bordered"
                    defaultValue={project.status}
                    onChange={(e) =>
                      handleStatusChange(project.id, e.target.value)
                    }
                  >
                    <option>Pending</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UpdateStatus;
