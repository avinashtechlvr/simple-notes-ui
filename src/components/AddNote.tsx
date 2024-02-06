import { Button } from "./ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
const AddNote = () => {
    return (
    <Button variant="default" size="icon" className="rounded-full">
        <PlusIcon className="h-8 w-8 rounded-full" />
    </Button>
    );
}

export default AddNote;