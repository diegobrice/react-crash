import { AiOutlineDelete } from 'react-icons/ai';

const Task = ({ task, onDelete, onToggle }) => {
  return (
    <div 
      className={task.reminder ? 'task reminder' : 'task'}
      onDoubleClick={() => onToggle(task.id)}
    >
      <div className="task-info">
        <h3>{task.id}: {task.text}</h3>
        <p>{task.day}</p>
        <p>{task.reminder}</p>
      </div>
      <AiOutlineDelete 
        style={iconStyle} 
        onClick={() => onDelete(task.id)}
      />
    </div>
  );
};

const iconStyle = {
  fontSize: '25px',
  color: 'tomato',
  cursor: 'pointer',
};

export default Task;
