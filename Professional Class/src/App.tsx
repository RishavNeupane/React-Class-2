import { Input } from "./components/ui/input"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { useState } from "react"
import { ChevronDownIcon } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

function App() {  
    const [open, setOpen] = useState(false)
    const [date, setDate] = useState<Date | undefined>(undefined)

  return (
    <div className="min-h-screen">
     <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold"> Task Manager</h1></div>


      <div className="grid frid-cols-2 gap-3"> <Input placeholder="Task title.."/> </div>
      <div> 
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="w-48 justify-between font-normal"
          >
            {date ? date.toLocaleDateString() : "Select date"}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            onSelect={(date) => {
              setDate(date)
              setOpen(false)
            }}
          />
        </PopoverContent>
      </Popover>
      </div>
     
      <Textarea placeholder="Task details..."/>
       <div> 
         <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Priority" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Select priority</SelectLabel>
          <SelectItem value="Low">Low</SelectItem>
          <SelectItem value="Medium">Medium</SelectItem>
          <SelectItem value="High">High</SelectItem>

        </SelectGroup>
      </SelectContent>
    </Select>
    <button className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">Add Task</button>
      </div>
    </div>
  )
}

export default App