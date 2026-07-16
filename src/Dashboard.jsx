import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

import { 
  db, 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  onSnapshot, 
  query, 
  orderBy,
  auth,
  signOut
} from './firebase';
import './Dashboard.css';

// jspdf jspdf-autotable
// npm install -g firebase-tools

const Dashboard = () => {
  const [activities, setActivities] = useState([]);
  const [formData, setFormData] = useState({ title: '', subtitle: '', description: '' });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Get current user from Firebase Auth
  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      if (!currentUser) {
        navigate('/login');
      }
    });
    return () => unsubscribeAuth();
  }, [navigate]);

  // 🔥 Real‑time listener for activities
  useEffect(() => {
    const q = query(collection(db, 'activities'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetched = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setActivities(fetched);
    });

    return () => unsubscribe();
  }, []);

  // Handle input changes #putting data in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Reset form #clearing the form after submission
  const resetForm = () => {
    setFormData({ title: '', subtitle: '', description: '' });
    setEditingId(null);
  };

  // ➕ Add or ✏️ Update activity #submiting the data from the form 
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim()) {
      alert('Title and description are required.');
      return;
    }

    setLoading(true);
    try {
      if (editingId) {
        await updateDoc(doc(db, 'activities', editingId), {
          title: formData.title,
          subtitle: formData.subtitle || '',
          description: formData.description,
          updatedAt: new Date().toISOString(),
        });
        alert('Activity updated!');
      } else {
        await addDoc(collection(db, 'activities'), {
          title: formData.title,
          subtitle: formData.subtitle || '',
          description: formData.description,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          userId: user ? user.uid : null,
        });
        alert('Activity added!');
      }
      resetForm();
    } catch (error) {
      console.error('Error saving activity:', error);
      alert('Failed to save. Check console.');
    } finally {
      setLoading(false);
    }
  };

  // ✏️ Edit
  const handleEdit = (activity) => {
    setFormData({
      title: activity.title,
      subtitle: activity.subtitle || '',
      description: activity.description,
    });
    setEditingId(activity.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 🗑️ Delete
  const handleDelete = async (id) => {
    if (!window.confirm('Delete this activity permanently?')) return;
    try {
      await deleteDoc(doc(db, 'activities', id));
      alert('Activity deleted.');
    } catch (error) {
      console.error('Delete error:', error);
      alert('Failed to delete.');
    }
  };

  // 🚪 Logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      alert('Failed to log out.');
    }
  };

  // 📄 Export PDF
  const exportPDF = () => {
    if (activities.length === 0) {
      alert('No activities to export.');
      return;
    }
  
    const doc = new jsPDF('p', 'mm', 'a4');
    const pageWidth = doc.internal.pageSize.getWidth();
  
    // Title
    doc.setFontSize(18);
    doc.setTextColor('#1e6f9f');
    doc.text('Internship Logbook', pageWidth / 2, 20, { align: 'center' });
  
    // Subtitle
    doc.setFontSize(11);
    doc.setTextColor('#4a627a');
    const dateStr = new Date().toLocaleDateString();
    doc.text(`Activities Report - ${dateStr}`, pageWidth / 2, 30, { align: 'center' });
    if (user) {
      doc.text(`User: ${user.displayName || user.email || 'User'}`, pageWidth / 2, 36, { align: 'center' });
    }
  
    // Table data
    const tableData = activities.map((act) => [
      act.title || '',
      act.subtitle || '',
      act.description || '',
      act.createdAt ? new Date(act.createdAt).toLocaleDateString() : '',
    ]);
  
    // Use autoTable as a function
    autoTable(doc, {
      startY: 45,
      head: [['Title', 'Subtitle', 'Description', 'Date']],
      body: tableData,
      theme: 'striped',
      styles: { fontSize: 9, cellPadding: 3 },
      headStyles: { fillColor: '#1e6f9f', textColor: '#fff', fontSize: 10, fontStyle: 'bold' },
      alternateRowStyles: { fillColor: '#f8fafc' },
      margin: { top: 10, bottom: 10, left: 14, right: 14 },
      columnStyles: {
        0: { cellWidth: 30 },
        1: { cellWidth: 30 },
        2: { cellWidth: 60 },
        3: { cellWidth: 25 },
      },
      didDrawPage: (data) => {
        const pageCount = doc.internal.getNumberOfPages();
        const currentPage = data.pageNumber;
        doc.setFontSize(8);
        doc.setTextColor('#94a3b8');
        doc.text(`Page ${currentPage} of ${pageCount}`, pageWidth / 2, doc.internal.pageSize.getHeight() - 10, { align: 'center' });
      },
    });
  
    doc.save('internship-logbook.pdf');
  };

  if (!user) {
    return <div className="dashboard-loading">Loading...</div>;
  }

  return (
    <div className="dashboard">
      {/* Top Bar with Logout */}
      <div className="dashboard-topbar">
        <div className="topbar-left">
          <span className="topbar-logo">StratCom</span>
          <span className="topbar-greeting">Hello, {user.displayName || user.email || 'User'}</span>
        </div>
        <button className="topbar-logout" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="dashboard-container">
        {/* Header */}
        <div className="dashboard-header">
          <span className="dashboard-badge">Internship Logbook</span>
          <h1>My <span className="highlight">Activities</span></h1>
          <p>Track your daily internship progress</p>
        </div>

        {/* Form Card */}
        <div className="form-card">
          <h3>{editingId ? '✏️ Edit Activity' : '➕ Add New Activity'}</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title *</label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder="e.g., Daily Stand-up"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="subtitle">Subtitle</label>
              <input
                type="text"
                id="subtitle"
                name="subtitle"
                placeholder="e.g., Team Sync"
                value={formData.subtitle}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description *</label>
              <textarea
                id="description"
                name="description"
                rows="3"
                placeholder="What did you do or learn?"
                value={formData.description}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? 'Saving...' : editingId ? 'Update Activity' : 'Add Activity'}
              </button>
              {editingId && (
                <button type="button" className="btn-secondary" onClick={resetForm}>
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Activities List */}
        <div className="activities-section">   
          <div className="activities-header">
            <h3>Your Logbook ({activities.length})</h3>
            <button className="btn-export" onClick={exportPDF}>
              📄 Export PDF
            </button>
          </div>
          {activities.length === 0 ? (
            <div className="empty-state">No activities yet. Start logging!</div>
          ) : (
            <div className="activities-grid">
              {activities.map((act) => (
                <div key={act.id} className="activity-card">
                  <div className="activity-content">
                    <h4>{act.title}</h4>
                    {act.subtitle && <span className="act-subtitle">{act.subtitle}</span>}
                    <p className="act-description">{act.description}</p>
                    <small className="act-date">
                      {act.createdAt ? new Date(act.createdAt).toLocaleDateString() : ''}
                    </small>
                  </div>
                  <div className="activity-actions">
                    <button className="btn-edit" onClick={() => handleEdit(act)}>
                    edit
                    </button>
                    <button className="btn-delete" onClick={() => handleDelete(act.id)}>
                      delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;