
interface TaskItemProps {
  task: any;
  onEdit: (task: any) => void;
  onDelete: (task: any) => void; // ✅ new prop
}

const TaskItem = ({ task, onEdit, onDelete }: TaskItemProps) => {
  return (
    <div className="p-4 border-b">
      <h3 className="font-semibold">{task.title}</h3>
      <p>{task.description}</p>
      <div className="mt-2 flex justify-between">
        <button className="bg-green-500 text-white px-4 py-2 rounded-md">Complete</button>
        <button
          onClick={() => onEdit(task)}
          className="bg-yellow-500 text-white px-4 py-2 rounded-md"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task)} // ✅ call the prop
          className="bg-red-500 text-white px-4 py-2 rounded-md"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
