import React, { useState } from 'react';
import axios from 'axios';

interface TaskModalProps {
  toggleModal: () => void;
  task?: { id: string; title: string; description: string; deadline: string };
  onTaskSaved?: () => void; // Optional callback to refresh tasks
}

const TaskModal = ({ toggleModal, task, onTaskSaved }: TaskModalProps) => {
  const [title, setTitle] = useState(task ? task.title : '');
  const [description, setDescription] = useState(task ? task.description : '');
  const [deadline, setDeadline] = useState(task ? task.deadline : '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const taskData = {
      title,
      description,
      deadline: new Date(deadline),
    };

    try {
      const token = localStorage.getItem('token');
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const baseUrl = import.meta.env.VITE_API_BASE_URL;

      if (task) {
        // 🔄 Update existing task
        await axios.patch(`${baseUrl}/tasks/${task.id}`, taskData, { headers });
      } else {
        // 🆕 Create new task
        await axios.post(`${baseUrl}/tasks`, taskData, { headers });
      }

      // 🔁 Refresh list and close modal
      if (onTaskSaved) onTaskSaved();
      toggleModal();
    } catch (error) {
      console.error('Task submission failed:', error);
      alert('An error occurred while saving the task.');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-amber-100 bg-opacity-75">
      <div className="bg-white rounded-lg shadow-xl w-96 p-6">
        <h2 className="text-2xl font-semibold text-center">
          {task ? 'Edit Task' : 'Add Task'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <input
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
          <textarea
            placeholder="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            rows={4}
            required
          />
          <input
            type="datetime-local"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
          <div className="flex justify-between">
            <button
              type="button"
              onClick={toggleModal}
              className="w-1/3 p-2 bg-gray-500 text-white rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-1/3 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              {task ? 'Save Changes' : 'Add Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
