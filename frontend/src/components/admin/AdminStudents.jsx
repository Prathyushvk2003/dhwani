import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminStudents.css';

const AdminStudents = () => {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    registrationNumber: '',
    team: 'BTECH1'
  });
  const [editingStudent, setEditingStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('/api/students');
      setStudents(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching students:', error);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingStudent) {
        // Update existing student
        await axios.put(`/api/students/${editingStudent._id}`, formData);
        setEditingStudent(null);
      } else {
        // Create new student
        await axios.post('/api/students', formData);
      }
      
      // Reset form and fetch updated students
      setFormData({
        name: '',
        registrationNumber: '',
        team: 'BTECH1'
      });
      fetchStudents();
    } catch (error) {
      console.error('Error saving student:', error);
    }
  };

  const handleEdit = (student) => {
    setFormData({
      name: student.name,
      registrationNumber: student.registrationNumber,
      team: student.team
    });
    setEditingStudent(student);
  };

  const handleDelete = async (studentId) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await axios.delete(`/api/students/${studentId}`);
        fetchStudents();
      } catch (error) {
        console.error('Error deleting student:', error);
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingStudent(null);
    setFormData({
      name: '',
      registrationNumber: '',
      team: 'BTECH1'
    });
  };

  return (
    <div className="admin-students">
      <h2 className="section-title">{editingStudent ? 'Edit Student' : 'Add New Student'}</h2>
      <form onSubmit={handleSubmit} className="student-form card">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">Full Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="registrationNumber">Registration Number *</label>
            <input
              type="text"
              id="registrationNumber"
              name="registrationNumber"
              value={formData.registrationNumber}
              onChange={(e) => setFormData({...formData, registrationNumber: e.target.value.toUpperCase()})}
              required
            />
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="team">Team *</label>
          <select
            id="team"
            name="team"
            value={formData.team}
            onChange={handleChange}
            required
          >
            <option value="BTECH1">BTECH 1st Year</option>
            <option value="BTECH2">BTECH 2nd Year</option>
            <option value="BTECH3">BTECH 3rd Year</option>
            <option value="BTECH4">BTECH 4th Year</option>
            <option value="MCA">MCA</option>
          </select>
        </div>
        
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {editingStudent ? 'Update Student' : 'Add Student'}
          </button>
          {editingStudent && (
            <button type="button" onClick={handleCancelEdit} className="btn btn-secondary">
              Cancel
            </button>
          )}
        </div>
      </form>

      <h2 className="section-title">Manage Students</h2>
      {loading ? (
        <div className="loading">Loading students...</div>
      ) : (
        <div className="students-list">
          {students.length > 0 ? (
            students.map(student => (
              <div key={student._id} className="student-item card">
                <div className="student-info">
                  <h3>{student.name}</h3>
                  <p><strong>Registration Number:</strong> {student.registrationNumber}</p>
                  <p><strong>Team:</strong> {student.team}</p>
                </div>
                <div className="student-actions">
                  <button onClick={() => handleEdit(student)} className="btn btn-secondary">Edit</button>
                  <button onClick={() => handleDelete(student._id)} className="btn btn-secondary danger">Delete</button>
                </div>
              </div>
            ))
          ) : (
            <p>No students found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminStudents;