import NavBar from "./NavBar";
import AddNote from "./AddNote";
const Dashboard = () => {
    return (
        <div className="flex flex-col h-screen">
            <NavBar />
            <div className="flex-grow overflow-auto">

            </div>
            <div className="grid m-4 justify-items-end">
                <AddNote />
            </div>

        </div>
    );
}

export default Dashboard;