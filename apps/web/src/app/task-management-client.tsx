"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { PlusCircle, Trash2 } from 'lucide-react'
import { DataTable } from "@/components/(dashboard)/data-table"
import { columns } from "@/components/(dashboard)/columns"
import { CreateTaskModal } from "@/components/(dashboard)/create-modal"
import { Task } from "@repo/drizzle/schema/tasks"
import { trpc } from "@repo/trpc/react"
import { useToast } from "@/hooks/use-toast"

export default function TaskManagement({task}: {task: Task[]}) {
  const [tasks, setTasks] = useState<Task[]>(task)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedRows, setSelectedRows] = useState<Task[]>([])
  const [rowClicked, setRowClicked] = useState<Task | null>(null)
  const { toast } = useToast()

  const { mutateAsync: createTask , isLoading: isCreatingTask } = trpc.task.createNote.useMutation({
    onSuccess: () => {
      toast({
        description: "Task created successfully",
        duration: 3000,
      })
    },
  })

  const { mutateAsync: updateTask, isLoading: isUpdatingTask } = trpc.task.updateTask.useMutation({
    onSuccess: () => {
      toast({
        description: "Task updated successfully",
        duration: 3000,
      })
    },
  })

  useEffect(() => {
    if (rowClicked) {
      setIsModalOpen(true)
    }
  }, [rowClicked])


  const addTask = async (newTask: Omit<Task, "id" | "userId" | "createdAt" | "updatedAt" | "endTime">) => {
    try {
      const createdTask = await createTask({
        title: newTask.title,
        description: newTask.description,
        priority: newTask.priority || "",
        status: newTask.status || ""
      })

      if (createdTask) {
        setTasks([...tasks, createdTask[0]])
      }
    } catch (error) {
       toast({
        description: "Failed to create task",
        duration: 3000,
        variant: "destructive",
       })
       console.error('Failed to create task', error)
      }
  }

  const editTask = async (taskToUpdate: Omit<Task, "userId" | "createdAt" | "updatedAt" | "endTime">) => {
    try {
      const updatedTask = await updateTask({
        id: taskToUpdate.id,
        title: taskToUpdate.title,
        description: taskToUpdate.description,
        priority: taskToUpdate.priority || "",
        status: taskToUpdate.status || ""
      })

      if (updatedTask) {
        setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task))
      }
    } catch (error) {
       toast({
        description: "Failed to update task",
        duration: 3000,
        variant: "destructive",
       })
       console.error('Failed to update task', error)
      }
  }


  const deleteSelectedTasks = () => {
    const selectedIds = new Set(selectedRows.map(row => row.id))
    setTasks(tasks.filter(task => !selectedIds.has(task.id)))
    setSelectedRows([])
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Tasks </h1>
        <div className="space-x-2">
          <Button onClick={() => setIsModalOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add Task
          </Button>
          {selectedRows.length > 0 && (
          <Button 
            variant="destructive" 
            onClick={deleteSelectedTasks}
            disabled={selectedRows.length === 0}
          >
            <Trash2 className="mr-2 h-4 w-4" /> Delete Selected
          </Button>
          )}
        </div>
      </div>


      <DataTable 
        columns={columns} 
        data={tasks} 
        onRowsSelected={setSelectedRows}
        setRowClicked={setRowClicked}
      />

      <CreateTaskModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setRowClicked(null)
        }}
        onAddTask={addTask}
        editTask={editTask}
        isUpdatingTask={isUpdatingTask}
        isCreatingTask={isCreatingTask}
        taskToEdit={rowClicked}
      />
    </div>
  )
}

