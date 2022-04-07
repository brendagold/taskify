import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { Task } from "../models";
import SingleTask from "./SingleTask";
import "./styles.css";

interface TaskListProps {
  tasks: Task[];
  completedTasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  setCompletedTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  setTasks,
  completedTasks,
  setCompletedTasks,
}) => {
  return (
    <div className="container">
      <Droppable droppableId="TaskList">
        {(provided, snapshot) => (
          <div className={`tasks ${snapshot.isDraggingOver ? 'dragactive': ''}`} ref={provided.innerRef} {...provided.droppableProps}>
            <span className="tasks__heading">Active Tasks</span>
            {tasks.map((task, index) => (
              <SingleTask
              index={index}
                task={task}
                key={task.id}
                tasks={tasks}
                setTasks={setTasks}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId="TaskRemove">
        {(provided, snapshot) => (
          <div className={`tasks remove ${snapshot.isDraggingOver ? 'dragcomplete': ''}`} ref={provided.innerRef} {...provided.droppableProps}>
        <span className="tasks__heading">Completed Tasks</span>
        {completedTasks.map((task, index) => (
          <SingleTask
          index={index}
            task={task}
            key={task.id}
            tasks={completedTasks}
            setTasks={setCompletedTasks}
          />
        ))}
        {provided.placeholder}
      </div>
        )}
      </Droppable>

      
    </div>
  );
};

export default TaskList;
