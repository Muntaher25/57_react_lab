import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form, Button, ListGroup } from 'react-bootstrap';

function TaskManager() {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);
  const [editedTaskTitle, setEditedTaskTitle] = useState('');
  const [editedTaskDescription, setEditedTaskDescription] = useState('');

  const handleTitleChange = (event) => {
    setTaskTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setTaskDescription(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (taskTitle.trim() !== '' && taskDescription.trim() !== '') {
      setTasks([...tasks, { title: taskTitle, description: taskDescription }]);
      setTaskTitle('');
      setTaskDescription('');
    }
  };

  const handleDelete = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    setEditIndex(-1);
  };

  const handleEdit = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].title = editedTaskTitle;
    updatedTasks[index].description = editedTaskDescription;
    setTasks(updatedTasks);
    setEditedTaskTitle('');
    setEditedTaskDescription('');
  };

  return (
    <Container className="mt-5">
      <h1 className="mb-4">Task Manager</h1>
      <Form onSubmit={handleSubmit} className="mb-3">
        <Form.Group controlId="taskTitleInput">
          <Form.Control
            type="text"
            placeholder="Enter a task title"
            value={taskTitle}
            onChange={handleTitleChange}
          />
        </Form.Group>
        <Form.Group controlId="taskDescriptionInput">
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter a task description"
            value={taskDescription}
            onChange={handleDescriptionChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Add Task
        </Button>
      </Form>
      <ListGroup>
        {tasks.map((task, index) => (
          <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
            {editIndex === index ? (
              <>
                <div className="mb-3">
                  <Form.Control
                    type="text"
                    value={editedTaskTitle}
                    onChange={(e) => setEditedTaskTitle(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={editedTaskDescription}
                    onChange={(e) => setEditedTaskDescription(e.target.value)}
                  />
                </div>
              </>
            ) : (
              <>
                <div>
                  <h5>{task.title}</h5>
                  <p>{task.description}</p>
                </div>
              </>
            )}
            <div>
              {editIndex === index ? (
                <>
                  <Button
                    variant="success"
                    className="mr-2"
                    onClick={() => {
                      handleEdit(index);
                      setEditIndex(-1);
                    }}
                  >
                    Save
                  </Button>
                  <Button variant="secondary" onClick={() => setEditIndex(-1)}>
                    Cancel
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="primary"
                    className="mr-2"
                    onClick={() => {
                      setEditIndex(index);
                      setEditedTaskTitle(task.title);
                      setEditedTaskDescription(task.description);
                    }}
                  >
                    Edit
                  </Button>
                  <Button variant="danger" onClick={() => handleDelete(index)}>Delete</Button>
                </>
              )}
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
}

export default TaskManager;
