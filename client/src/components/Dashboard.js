import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDashboard, addWidget, deleteWidget } from '../redux/widgetSlice';

const Dashboard = () => {
  const { categories = [] } = useSelector((state) => state.widget || {});
  const dispatch = useDispatch();

  const [newWidget, setNewWidget] = useState({
    categoryId: '',
    name: '',
    text: '',
  });

  useEffect(() => {
    dispatch(fetchDashboard());
  }, [dispatch]);

  const handleAddWidget = () => {
    const { categoryId, name, text } = newWidget;

    if (categoryId && name && text) {
      dispatch(
        addWidget({
          categoryId: parseInt(categoryId),
          widget: { name, text },
        })
      );
      setNewWidget({ categoryId: '', name: '', text: '' }); // reset form
    } else {
      alert('Please fill all fields.');
    }
  };

  const handleDeleteWidget = (categoryId, widgetName) => {
    dispatch(deleteWidget({ categoryId, widgetName }));
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>📊 Dashboard</h1>

      {/* Add Widget Form */}
      <div style={styles.addWidgetSection}>
        <select
          value={newWidget.categoryId}
          onChange={(e) =>
            setNewWidget({ ...newWidget, categoryId: e.target.value })
          }
          style={styles.input}
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Widget Name"
          value={newWidget.name}
          onChange={(e) =>
            setNewWidget({ ...newWidget, name: e.target.value })
          }
          style={styles.input}
        />

        <input
          type="text"
          placeholder="Widget Text"
          value={newWidget.text}
          onChange={(e) =>
            setNewWidget({ ...newWidget, text: e.target.value })
          }
          style={styles.input}
        />

        <button onClick={handleAddWidget} style={styles.addButton}>
          + Add Widget
        </button>
      </div>

      {/* Category Cards */}
      {categories.map((category) => (
        <div key={category.id} style={styles.categorySection}>
          <h2 style={styles.categoryHeading}>{category.name}</h2>
          <div style={styles.widgetsContainer}>
            {category.widgets.map((widget) => (
              <div key={widget.name} style={styles.widgetCard}>
                <h3>{widget.name}</h3>
                <p>{widget.text}</p>
                <button
                  onClick={() =>
                    handleDeleteWidget(category.id, widget.name)
                  }
                  style={styles.removeButton}
                >
                  ❌ Remove
                </button>
              </div>
            ))}
            {category.widgets.length === 0 && <p>No widgets yet</p>}
          </div>
        </div>
      ))}
    </div>
  );
};

const styles = {
  container: {
    padding: '30px',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '2.5rem',
  },
  addWidgetSection: {
    display: 'flex',
    gap: '10px',
    marginBottom: '30px',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  input: {
    padding: '10px',
    fontSize: '1rem',
    borderRadius: '6px',
    border: '1px solid #ccc',
    minWidth: '200px',
  },
  addButton: {
    backgroundColor: '#28a745',
    color: 'white',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '1rem',
  },
  categorySection: {
    marginBottom: '40px',
  },
  categoryHeading: {
    fontSize: '1.8rem',
    marginBottom: '15px',
  },
  widgetsContainer: {
    display: 'flex',
    gap: '20px',
    flexWrap: 'wrap',
  },
  widgetCard: {
    backgroundColor: '#f8f9fa',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    width: '220px',
    position: 'relative',
  },
  removeButton: {
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '6px 10px',
    fontSize: '0.9rem',
    cursor: 'pointer',
    position: 'absolute',
    top: '10px',
    right: '10px',
  },
};

export default Dashboard;
