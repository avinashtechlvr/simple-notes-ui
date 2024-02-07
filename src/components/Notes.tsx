import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { Note } from "type"
interface NotesProps{
    note: Note
}
export const  Notes:React.FC<NotesProps> = ({note}) => {
  return (
    <Card className="min-w-[40%] md:min-w-[20%] lg:min-w-[15%]">
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4 m-5">
            <div className="flex flex-col space-y-1.5">
             <h1 className="font-3xl font-bold">{note.title}</h1>
            </div>
            <div className="flex flex-col space-y-1.5">
              <h4 className="font-lg">{note.content}</h4>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
