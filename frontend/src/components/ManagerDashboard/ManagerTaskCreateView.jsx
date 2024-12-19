// TaskForm.js
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const ManagerTaskCreateView = () => {
  const userId = useSelector((state) => state.auth.userid);
  const profiles = useSelector((state) => state.profiles.profile_list);
  const projects_list = useSelector((state) => state.projects.project_list)
  console.log(profiles)


  const [formData, setFormData] = useState({
    title: '',
    description: '',
    project: '',
    assigned_to: [],
    priority: 'Medium',
    due_date: '',
  });
  
  const [projects, setProjects] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    setTeamMembers(profiles)
    setProjects(projects_list)
  }, []);

  // const fetchProjects = async () => {
  //   // Replace with your API call to fetch projects
  //   const response = await fetch('/api/projects');
  //   const data = await response.json();
  //   setProjects(data);
  // };

  // const fetchTeamMembers = async () => {
  //   // Replace with your API call to fetch team members
  //   const response = await fetch('/api/team-members');
  //   const data = await response.json();
  //   setTeamMembers(data);
  // };

  const handleChange = (e) => {
    const { name, value, type, multiple, selectedOptions } = e.target;
    if (type === 'select-multiple') {
      const selectedValues = [...selectedOptions].map(option => option.value);
      setFormData(prevState => ({
        ...prevState,
        [name]: selectedValues,
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add the created_by field to the form data
    const finalFormData = { ...formData, created_by: userId };

    try {
      const response = await axios.post(`http://localhost:8000/tasks/?created_by=${userId}`, finalFormData);
      if (response.status === 201) {
        console.log('Task created:', response.data);
        // Optionally, reset the form or handle success state
      } else {
        console.error('Error creating task:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="project">Project</label>
        <select
          id="project"
          name="project"
          value={formData.project}
          onChange={handleChange}
          required
        >
          <option value="">Select a project</option>
          {projects.map((proj) => (
            <option key={proj.id} value={proj.id}>
              {proj.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="assigned_to">Assigned To</label>
        <select
          id="assigned_to"
          name="assigned_to"
          multiple
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
      <div>
        <label htmlFor="priority">Priority</label>
        <select
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
      <div>
        <label htmlFor="due_date">Due Date</label>
        <input
          type="datetime-local"
          id="due_date"
          name="due_date"
          value={formData.due_date}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Create Task</button>
    </form>
  );
};

export default ManagerTaskCreateView;
