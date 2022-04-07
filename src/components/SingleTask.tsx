import React, { useState, useRef, useEffect } from "react";
import { Draggable } from "react-beautiful-dnd";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { Task } from "../models";
import "./styles.css";

interface SingleTaskProps {
  index: number;
  task: Task;
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const SingleTask: React.FC<SingleTaskProps> = ({
  index,
  task,
  tasks,
  setTasks,
}) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTask, setEditTask] = useState<string>(task.task);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    
  }, [edit]);

  const handleDone = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isDone: !task.isDone } : task
      )
    );
  };

  const handleDelete = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };
  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();

    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, task: editTask } : task))
    );
    setEdit(false);
  };

  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided, snapshot) => (
        <form
          className={`tasks__single ${snapshot.isDragging ? 'drag' : ''}`}
          onSubmit={(e) => handleEdit(e, task.id)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {edit ? (
            <input
              ref={inputRef}
              value={editTask}
              onChange={(e) => setEditTask(e.target.value)}
              className="tasks__single--text"
            />
          ) : task.isDone ? (
            <s className="tasks__single--text">{task.task}</s>
          ) : (
            <span className="tasks__single--text">{task.task}</span>
          )}

          <div>
            <span className="icon">
              <AiFillEdit
                onClick={() => {
                  if (!edit && !task.isDone) {
                    setEdit(!edit);
                  }
                }}
              />
            </span>
            <span className="icon">
              <AiFillDelete onClick={() => handleDelete(task.id)} />
            </span>
            <span className="icon">
              <MdDone onClick={() => handleDone(task.id)} />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default SingleTask;
