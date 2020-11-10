import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'

const List = ({ tasks, removeTask, editTask }) => {
  return (
    <div>
      {tasks.map(task => {
        const { id, title } = task;
        return (
          <article key={id} className="list-item">
            <p className="title">{title}</p>
            <div className="btn-container">
              <button 
                type="button" 
                className="edit-btn"
                onClick={() => editTask(id)}  
              >
                <FaEdit />
              </button>
              <button 
                type="button" 
                className="delete-btn"
                onClick={() => removeTask(id)}
              >
                <FaTrash />
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
}

export default List
