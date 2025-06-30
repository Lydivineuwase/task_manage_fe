import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useAuth } from '../context/AuthProvider';
import TaskItem from './TaskItem';
import TaskModal from './TaskModal';
import { useNavigate } from 'react-router-dom';

type Task = {
  id: string | number;
  [key: string]: string | number;
};

const Dashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate(); // for redirection after logout
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchTasks = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_BASE_URL;
        const response = await axios.get(`${baseUrl}/tasks`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTasks(response.data);
      } catch (err) {
        console.error('Error fetching tasks:', err);
      }
    };

    fetchTasks();
  }, [navigate]);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleEdit = (task: Task) => {
    setTaskToEdit(task);
    toggleModal();
  };

  // ✅ Handle logout
  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirect to login page
  };

  const handleDelete = async (task: Task) => {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'Do you really want to delete this task?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!',
      });
      if (!result.isConfirmed) return;

      try {
        const token = localStorage.getItem('token');
        const baseUrl = import.meta.env.VITE_API_BASE_URL;
        await axios.delete(`${baseUrl}/tasks/${task.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        Swal.fire({
          icon: 'success',
          title: 'Task deleted successfully',
          timer: 1500,
          showConfirmButton: false,
        });
        setTasks((prev) => prev.filter((t) => t.id !== task.id)); // remove from UI
      } catch (error) {
        console.error('Error deleting task:', error);
        Swal.fire({
          icon: 'error',
          title: 'Failed to delete task',
          text: 'An error occurred while deleting the task.',
        });
      }
  };


  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={toggleModal}
          className="p-2 bg-blue-500 text-white rounded-md"
        >
          Add Task
        </button>
        <button
          onClick={handleLogout}
          className="p-2 bg-red-500 text-white rounded-md"
        >
          Logout
        </button>
      </div>

      <div>
        {tasks.map((task: Task) => (
          <TaskItem key={task.id} task={task} onEdit={handleEdit} onDelete={handleDelete} />
        ))}
      </div>

      {isModalOpen && (
        <TaskModal
          toggleModal={toggleModal}
          task={
            taskToEdit
              ? {
                  id: String(taskToEdit.id),
                  title: String(taskToEdit.title ?? ''),
                  description: String(taskToEdit.description ?? ''),
                  deadline: String(taskToEdit.deadline ?? ''),
                }
              : undefined
          }
        />
      )}
    </div>
  );
};

export default Dashboard;
