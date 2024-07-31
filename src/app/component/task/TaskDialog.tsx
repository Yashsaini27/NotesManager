import React, { Fragment, useState } from "react";
import { useRouter } from "next/navigation";
import { BsThreeDots } from "react-icons/bs";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Menu, Transition } from "@headlessui/react";
import AddTask from "./AddTask";
import axios from "axios";

export interface Task {
  _id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  tag: string;
  deadline: string;
}

interface TaskDialogProps {
  task: Task;
  onDelete: () => void;
  onEdit: () => void;
}

const TaskDialog: React.FC<TaskDialogProps> = ({ task, onDelete, onEdit }) => {
  const [openEdit, setOpenEdit] = useState(false);
  const router = useRouter();

  const deleteClick = async () => {
    try {
      if (!task._id) {
        console.error('No task ID provided');
        return;
      }
      await axios.delete(`https://managerserver-4.onrender.com/task/${task._id}`);
      alert('Task deleted successfully');
      onDelete();
      router.refresh();
    } catch (error) {
      console.error('Error deleting task:', error);
      alert('Failed to delete task');
    }
  };

  const editClick = async (data: Partial<Task>) => {
    try {
      if (!task._id) {
        console.error('No task ID provided');
        return;
      }
      await axios.put(`https://managerserver-4.onrender.com/task/${task._id}`, data);
      alert('Task updated successfully');
      onEdit();
      setOpenEdit(false);
      router.refresh();
    } catch (error) {
      console.error('Error updating task:', error);
      alert('Failed to update task');
    }
  };

  const items = [
    {
      label: "Edit",
      icon: <MdOutlineEdit className='mr-2 h-5 w-5' aria-hidden='true' />,
      onClick: () => setOpenEdit(true),
    },
  ];

  return (
    <>
      <div>
        <Menu as='div' className='relative inline-block text-left'>
          <Menu.Button className='inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-medium text-gray-600 '>
            <BsThreeDots />
          </Menu.Button>

          <Transition
            as={Fragment}
            enter='transition ease-out duration-100'
            enterFrom='transform opacity-0 scale-95'
            enterTo='transform opacity-100 scale-100'
            leave='transition ease-in duration-75'
            leaveFrom='transform opacity-100 scale-100'
            leaveTo='transform opacity-0 scale-95'
          >
            <Menu.Items className='absolute p-4 right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none'>
              <div className='px-1 py-1 space-y-2'>
                {items.map((el) => (
                  <Menu.Item key={el.label}>
                    {({ active }) => (
                      <button
                        onClick={el?.onClick}
                        className={`${
                          active ? "bg-blue-500 text-white" : "text-gray-900"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        {el.icon}
                        {el.label}
                      </button>
                    )}
                  </Menu.Item>
                ))}
              </div>

              <div className='px-1 py-1'>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={deleteClick}
                      className={`${
                        active ? "bg-blue-500 text-white" : "text-red-900"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      <RiDeleteBin6Line
                        className='mr-2 h-5 w-5 text-red-400'
                        aria-hidden='true'
                      />
                      Delete
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>

      {openEdit && (
        <AddTask
          open={openEdit}
          setOpen={setOpenEdit}
          task={task}
          // onSave={editClick}
          key={new Date().getTime()}
        />
      )}
    </>
  );
};

export default TaskDialog;
