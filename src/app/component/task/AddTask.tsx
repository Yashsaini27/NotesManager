import React, { useState, useEffect } from "react";
import ModalWrapper from "../ModelWrapper";
import { Dialog } from "@headlessui/react";
import Textbox from "../TextBox";
import { useForm, SubmitHandler } from "react-hook-form";
import SelectList from "../SelectList";
import Button from "../Button";
import axios from "axios";

const PRIORITY = ["high", "medium", "normal", "low"];
const TAGS = ["urgent", "medium", "normal"];

interface AddTaskProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  task?: Task; // Optional task prop for editing
  onUpdate?: () => void; // Callback to refresh the task list after update
}

interface Task {
  _id?: string; // Optional _id for editing
  title: string;
  description: string;
  priority: string;
  tag: string;
  deadline: string;
}

interface FormValues {
  title: string;
  deadline: string;
  description: string;
  tag: string;
  priority: string;
}

const AddTask: React.FC<AddTaskProps> = ({ open, setOpen, task, onUpdate }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      title: task?.title || "",
      deadline: task?.deadline || "",
      description: task?.description || "",
      tag: task?.tag || "urgent",
      priority: task?.priority || "medium",
    },
  });

  const [priority, setPriority] = useState<string>(task?.priority || "medium");
  const [tag, setTag] = useState<string>(task?.tag || "urgent");
  const [uploading, setUploading] = useState<boolean>(false);

  useEffect(() => {
    if (task) {
      setValue("title", task.title);
      setValue("description", task.description);
      setValue("deadline", task.deadline);
      setPriority(task.priority);
      setTag(task.tag);
    }
  }, [task, setValue]);

  const submitHandler: SubmitHandler<FormValues> = async (data) => {
    setUploading(true);
    try {
      if (task?._id) {
        // Update existing task
        await axios.put(`https://managerserver-4.onrender.com/task/${task._id}`, {
          title: data.title,
          description: data.description,
          priority,
          tag,
          deadline: data.deadline,
        });
      } else {
        // Create new task
        await axios.post('https://managerserver-4.onrender.com/task', {
          title: data.title,
          description: data.description,
          priority,
          tag,
          deadline: data.deadline,
        });
      }
      console.log('Task saved successfully');
      setOpen(false); // Close the modal on success
      if (onUpdate) onUpdate(); // Refresh the task list if provided
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error:', error.response?.data);
      } else {
        console.error('Error:', error);
      }
    } finally {
      setUploading(false);
    }
  };

  return (
    <ModalWrapper open={open} setOpen={setOpen}>
      <form onSubmit={handleSubmit(submitHandler)}>
        <Dialog.Title as="h2" className="text-base font-bold leading-6 text-gray-900 mb-4">
          {task ? 'Edit Task' : 'Add Task'}
        </Dialog.Title>

        <div className="mt-2 flex flex-col gap-6">
          <Textbox
            placeholder="Task Title"
            type="text"
            name="title"
            label="Task Title"
            className="w-full rounded"
            register={register("title", { required: "Title is required" })}
            error={errors.title ? errors.title.message : ""}
          />

          <Textbox
            placeholder="Description"
            type="text"
            name="description"
            label="Task Description"
            className="w-full rounded"
            register={register("description", { required: "Description is required" })}
            error={errors.description ? errors.description.message : ""}
          />

          <div className="flex gap-4">
            <SelectList
              label="Priority Level"
              lists={PRIORITY}
              selected={priority}
              setSelected={setPriority}
            />

            <SelectList
              label="Tag"
              lists={TAGS}
              selected={tag}
              setSelected={setTag}
            />
          </div>

          <div className="w-full">
            <Textbox
              placeholder="Date"
              type="date"
              name="deadline"
              label="Task Date"
              className="w-full rounded"
              register={register("deadline", { required: "Date is required!" })}
              error={errors.deadline ? errors.deadline.message : ""}
            />
          </div>

          <div className="bg-gray-50 py-6 sm:flex sm:flex-row-reverse gap-4">
            {uploading ? (
              <span className="text-sm py-2 text-red-500">Uploading Data</span>
            ) : (
              <Button
                label={task ? 'Update Task' : 'Add Task'}
                type="submit"
                className="bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700 sm:w-auto"
              />
            )}
          </div>
        </div>
      </form>
    </ModalWrapper>
  );
};

export default AddTask;
