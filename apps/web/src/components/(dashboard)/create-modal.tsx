"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {   
  Dialog,   
  DialogContent,   
  DialogHeader,   
  DialogTitle,   
  DialogFooter, 
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {   
  Select,   
  SelectContent,   
  SelectItem,   
  SelectTrigger,   
  SelectValue, 
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from "lucide-react"
import { Task } from "@repo/drizzle/schema/tasks"
import { Switch } from "../ui/switch"

interface CreateTaskModalProps {   
  isOpen: boolean   
  onClose: () => void   
  onAddTask: (task: Omit<
    Task, 
    "id" | "createdAt" | "updatedAt" | "userId" | "deletedAt"
  >) => Promise<void> | void
  isCreatingTask: boolean
  editTask: (task:Omit<Task,
    "createdAt" | "updatedAt" | "userId" | "deletedAt"
  >
  ) => Promise<void> | void
  taskToEdit?: Task | null
  isUpdatingTask?: boolean
}

export function CreateTaskModal({ 
  isOpen, 
  onClose, 
  onAddTask,
  isCreatingTask,
  taskToEdit,
  editTask,
  isUpdatingTask
}: CreateTaskModalProps) {   
  const [title, setTitle] = useState("")   
  const [description, setDescription] = useState("")   
  const [priority, setPriority] = useState<"low" | "medium" | "high">("low")
  const [status, setStatus] = useState<string>("pending")

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title)
      setDescription(taskToEdit.description || "")
      setPriority((taskToEdit.priority as "low" | "medium" | "high") || "low")
      setStatus(taskToEdit.status || "pending")
    } else {
      setTitle("")
      setDescription("")
      setPriority("low")
      setStatus("pending")
    }
  }, [taskToEdit, isOpen])

  const handleSubmit = async (e: React.FormEvent) => {     
    e.preventDefault()   
    if (taskToEdit && taskToEdit.id != undefined) {
      await editTask({
        title,
        description,
        priority,
        status,
        id: taskToEdit.id
      })
    } else { 
        await onAddTask({       
            title,       
            description,       
            priority,
            status
        }) 
    }
     
    onClose()
    return  
  }    

  return (     
    <Dialog open={isOpen} onOpenChange={onClose}>       
      <DialogContent className="sm:max-w-1/2">         
        <DialogHeader>           
          <DialogTitle>
            {taskToEdit ? "Edit Task" : "Create New Task"}
          </DialogTitle>         
        </DialogHeader>         
        <form onSubmit={handleSubmit}>           
          <div className="grid gap-4 py-4">             
            <div className="grid grid-cols-4 items-center gap-4">               
              <Label htmlFor="title" className="text-right">                 
                Title               
              </Label>               
              <Input                 
                id="title"                 
                value={title}                 
                onChange={(e) => setTitle(e.target.value)}                 
                className="col-span-3"                 
                required
                disabled={isCreatingTask}               
              />             
            </div>             
            <div className="grid grid-cols-4 items-center gap-4">               
              <Label htmlFor="description" className="text-right">                 
                Description               
              </Label>               
              <Textarea                 
                id="description"                 
                value={description}                 
                onChange={(e) => setDescription(e.target.value)}                 
                className="col-span-3"
                disabled={isCreatingTask}               
              />             
            </div>             
            <div className="grid grid-cols-4 items-center gap-4">               
              <Label htmlFor="priority" className="text-right">                 
                Priority               
              </Label>               
              <Select 
                value={priority}
                onValueChange={(value: "low" | "medium" | "high") => setPriority(value)}
                disabled={isCreatingTask}
              >                 
                <SelectTrigger className="col-span-3">                   
                  <SelectValue placeholder="Select priority" />                 
                </SelectTrigger>                 
                <SelectContent>                   
                  <SelectItem value="low">Low</SelectItem>                   
                  <SelectItem value="medium">Medium</SelectItem>                   
                  <SelectItem value="high">High</SelectItem>                 
                </SelectContent>               
              </Select>             
            </div>
            <div className="grid grid-cols-4 items-center gap-4">               
              <Label htmlFor="status" className="text-right">                 
                Status               
              </Label>
              <div className="flex items-center space-x-2">
                <span className={`text-sm ${status === "pending" ? "font-bold text-primary" : "text-muted-foreground"}`}>
                Pending
                </span>
                <Switch
                id="status-toggle"
                checked={status === "completed"}
                disabled={isCreatingTask || isUpdatingTask}
                onCheckedChange={(checked: boolean) => {
                    setStatus(checked ? "completed" : "pending")
                }}
                />
                <span className={`text-sm ${status === "completed" ? "font-bold text-primary" : "text-muted-foreground"}`}>
                Completed
                </span>
            </div>            
            </div>
          </div>           
          <DialogFooter>             
            <Button 
              type="submit" 
              disabled={isCreatingTask || isUpdatingTask}
            >
              {isCreatingTask || isUpdatingTask ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {taskToEdit ? "Updating..." : "Adding Task..."}
                </>
              ) : (
                taskToEdit ? "Update Task" : "Add Task"
              )}
            </Button>           
          </DialogFooter>         
        </form>       
      </DialogContent>     
    </Dialog>   
  ) 
}