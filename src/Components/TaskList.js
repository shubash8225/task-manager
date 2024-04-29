import React, { useRef, useState } from 'react'
import TaskItem from './TaskItem'
import { Button, Form, Modal } from 'react-bootstrap';
import axiosInstance from '../APIs/APIService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function TaskList({ data, reloadTasks, deleteTask }) {

  const [selectedItem, setSelectedItem] = useState(null);
  const title = useRef();
  const desc = useRef();
  const completed = useRef();

  const handleEdit = (id) => {
    const editItem = data.find(item => item.id === id);
    setSelectedItem(editItem);
  }

  const handleCloseEdit = () => {
    setSelectedItem(null);
  }

  const handleTaskUpdate = async (id) => {
    try {
      const now = new Date();
      if(!completed.current.checked) {
        await axiosInstance.patch(`/api/tasks/${id}/`, { title: title.current.value, description: desc.current.value, completed: completed.current.checked, completed_at: null })
        .then(() => {
          handleCloseEdit()
          reloadTasks();
        })
      }
      else {
        await axiosInstance.patch(`/api/tasks/${id}/`, { title: title.current.value, description: desc.current.value, completed: completed.current.checked, completed_at: now.toISOString() })
        .then(() => {
          handleCloseEdit()
          reloadTasks();
        })
      }
    }
    catch(error) {
      console.error(error)
    }
  }

  const handleComplete = async (id, completed) => {

    try {

      if(!completed) {
        const now = new Date();
        await axiosInstance.patch(`/api/tasks/${id}/`, { completed: true, completed_at: now.toISOString() })
        .then(() => {
          reloadTasks()
        })
        
      }
      else {
        await axiosInstance.patch(`/api/tasks/${id}/`, { completed: false, completed_at: null })
        .then(() => {
          reloadTasks()
        })
      }
      
    
    }
    catch(error) {
     
      console.error('Error fetching tasks:', error);
    
    }
  }

  const handleDelete = (id) => {

    deleteTask({ id: id })
    handleCloseEdit()
    
  }

  return (
    <div>
      <h1>Task List</h1>
      {data.length !== 0 ? 
      <>
      {data.map(item => {
        return (
          <TaskItem
            key={item.id}
            title={item.title}
            desc={item.description}
            completed={item.completed}
            created_at={item.created_at}
            completed_at={item.completed_at}
            onEdit={() => {handleEdit(item.id)}}
            toggleComplete={() => {handleComplete(item.id, item.completed)}}
          />
        )
      })}
      {selectedItem && (
        <Modal show={selectedItem !== null} onHide={() => handleCloseEdit()}>
            <Modal.Header closeButton>
                <Modal.Title>{selectedItem.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control ref={title} name='task_title' placeholder='Add a Task Title...' defaultValue={selectedItem.title} /><br />
                    <Form.Control ref={desc} as='textarea' placeholder='Add a Description...' name='task_desc' defaultValue={selectedItem.description} /><br />
                    <Form.Check
                      type='switch'
                      name='task_completed'
                      label='Task Completed?'
                      defaultChecked={selectedItem.completed}
                      ref={completed}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={() => handleDelete(selectedItem.id)} variant='danger'><FontAwesomeIcon icon={faTrash} /></Button>
              <Button variant='secondary' onClick={() => handleCloseEdit()}>Cancel</Button>
              <Button onClick={() => handleTaskUpdate(selectedItem.id)}>Save</Button>
            </Modal.Footer>
        </Modal>
      )}
      </>
      : (<div style={{ color: 'grey' }}><i>Your Task List looks empty....</i></div>)}
    </div>
  )
}

export default TaskList