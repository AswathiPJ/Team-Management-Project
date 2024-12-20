import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";

import { TopBar } from "../Dashboard/TopBar";

const ManagerTaskCreateView = () => {
  const userId = useSelector((state) => state.auth.userid);
  const profiles = useSelector((state) => state.profiles.profile_list);
  const projects_list = useSelector((state) => state.projects.project_list);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    project: "",
    assigned_to: [],
    priority: "Medium",
    due_date: "",
  });

  const [projects, setProjects] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    setTeamMembers(profiles);
    setProjects(projects_list);
  }, [profiles, projects_list]);

  const handleChange = (e) => {
    const { name, value, type, multiple, selectedOptions } = e.target;
    if (type === "select-multiple") {
      const selectedValues = [...selectedOptions].map((option) => option.value);
      setFormData((prevState) => ({
        ...prevState,
        [name]: selectedValues,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalFormData = { ...formData, created_by: userId };

    try {
      const response = await axios.post(
        `http://localhost:8000/tasks/?created_by=${userId}`,
        finalFormData
      );
      if (response.status === 201) {
        console.log("Task created:", response.data);
        setFormData({
          title: "",
          description: "",
          project: "",
          assigned_to: [],
          priority: "Medium",
          due_date: "",
        });
        toast.success("Task Assigned");
      } else {
        console.error("Error creating task:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="bg-white rounded-lg pb-4 shadow">
      <TopBar />
      <form onSubmit={handleSubmit}>
        <div className="p-2">
          <label className="p-2" htmlFor="title">
            Title
          </label>
          <input
            className="ml-14 input input-bordered w-80"
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="p-2">
          <label className="p-2" htmlFor="description">
            Description
          </label>
          <textarea
            className="ml-1.5 textarea textarea-bordered w-80"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="p-2">
          <label className="p-2" htmlFor="project">
            Project
          </label>
          <select
            className="ml-9 select select-bordered w-full max-w-xs"
            id="project"
            name="project"
            value={formData.project}
            onChange={handleChange}
            required
          >
            <option disabled selected value="">
              Select a project
            </option>
            {projects.map((proj) => (
              <option key={proj.id} value={proj.id}>
                {proj.name}
              </option>
            ))}
          </select>
        </div>
        <div className="p-2">
          <label className="p-2" htmlFor="assigned_to">Assign To</label>
          <select
            className="ml-5 select select-bordered w-full max-w-xs"
            multiple
            size={profiles.length}
            id="assigned_to"
            name="assigned_to"
            value={formData.assigned_to}
            onChange={handleChange}
            required
          >
            {teamMembers.map((member) => (
              <option key={member.id} value={member.id}>
                {member.username}
              </option>
            ))}
          </select>
        </div>
        <div className="p-2">
          <label className="p-2" htmlFor="priority">Priority</label>
          <select
          className="ml-8 select select-bordered w-full max-w-xs"
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            required
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
        <div className="p-2">
          <label className="p-2" htmlFor="due_date">Due Date</label>
          <input
            className="ml-4 input input-bordered w-80"
            type="datetime-local"
            id="due_date"
            name="due_date"
            value={formData.due_date}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="ml-4 my-2 btn btn-primary">Create</button>
      </form>
    </div>
  );
};

export default ManagerTaskCreateView;
