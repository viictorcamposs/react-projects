import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

const getLocalStorage = () => {
  let list = localStorage.getItem('list');

  if(list) {
    return JSON.parse(localStorage.getItem('list'));
  } else {
    return [];
  }
};

function App() {
  const [name, setName] = useState('');
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({
    show: false,
    msg: '',
    type: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!name) {
      //display alert
      showAlert(true, 'danger', 'please enter value' );

    } else if(name && isEditing) {
      // deal with edit
      setList(list.map(task => {
        if(task.id === editID) return {...task, title: name}
        
        return task;
      }));

      setName('');
      setEditID(null);
      setIsEditing(false);
      showAlert(true, 'success', 'task edited')
    } else {
      // show alert
      showAlert(true, 'success', 'task added to the list')

      // create a new task
      const newTask = {
        id: new Date().getTime().toString(), 
        title: name
      };
      setList([...list, newTask]);
      setName('');
    }
  };

  const showAlert = (show=false, type='', msg='') => {
    setAlert({ show, type, msg })
  };

  const clearList = () => {
    showAlert(true, 'danger', 'empty list');
    setList([]);
  };

  const removeTask = (id) => {
    showAlert(true, 'danger', 'task removed');

    const newList = list.filter(task => task.id !== id);
    setList(newList);
  };
  
  const editTask = (id) => {
    const editedTask = list.find(task => task.id === id);
    
    setIsEditing(true);
    setEditID(id);
    setName(editedTask.title);
  };

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));
  }, [list]);

  return (
    <section className="section-center">
      <form 
        className="list-form"
        onSubmit={handleSubmit}  
      >
        {alert.show && <Alert {...alert} removeAlert={showAlert} />}
        <h3>todo list</h3>
        <div className="form-control">
          <input 
            type="text" 
            className="list" 
            placeholder="add a task you need to do"  
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit" className="submit-btn">
            {isEditing ? 'edit' : 'submit'}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="list-container">
          <List 
            tasks={list} 
            removeTask={removeTask} 
            editTask={editTask}  
          />
          <button 
            className="clear-btn"
            onClick={clearList}
          >
            clear list
          </button>
        </div>
      )}
    </section>
  );
}

export default App
