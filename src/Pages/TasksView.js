import React, { useEffect, useState } from 'react'
import TaskList from '../Components/TaskList'
import axiosInstance from '../APIs/APIService';
import AddTask from '../Components/AddTask';
import NavBar from '../Components/NavBar';
import SearchBar from '../Components/SearchBar';

function TasksView() {

    const [tasks, setTasks] = useState([]);
    const [originalTasks, setOriginalTasks] = useState([]);

    const fetchTasks = async () => {
        try {

            const response = await axiosInstance.get('/api/tasks/');
            console.log(response.data)
            setTasks(response.data);
            setOriginalTasks(response.data)

        } 
        catch (error) {

            console.error('Error fetching tasks:', error);
        
        }
    };

    useEffect(() => {
        
        fetchTasks();

    }, [])

    const deleteTask = async (data) => {
        try {
            await axiosInstance.delete(`/api/tasks/${data.id}`)
            .then(() => {
                fetchTasks();
            })
        }
        catch(error) {
            console.error(error)
        }
    }

    const handelAdd = async (data) => {

        try {
            await axiosInstance.post('/api/tasks/', {title: data.title, description: data.description, task_category: 1})
            .then((response) => {
                if(response.status === 201) {
                    fetchTasks()
                }
            })
        }
        catch(error) {
            console.error(error)
        }

    }

    const handleSearch = (value) => {

        if(value.term === '') {
            setTasks(originalTasks)
        }
        else {
            setTasks(
                originalTasks.filter((task) =>
                    task.title.toLowerCase().includes(value.term.toLowerCase())
                )
            );
        }

        // setTasks(tasks.filter((task) => task.title.toLowerCase().includes(value.term.toLowerCase())));

    }



    return (
        <>
            <NavBar />
            <AddTask handleSubmit={handelAdd} /><br />
            <div style={{ width: '20%', margin: 'auto' }}>
                <SearchBar handleSearch={handleSearch} />
            </div>
            <div className='task-list'>
                <TaskList data={tasks} reloadTasks={() => {fetchTasks()}} deleteTask={deleteTask} />
            </div>
        </>
    )
}

export default TasksView