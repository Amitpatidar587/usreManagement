import { Package2Icon } from "lucide-react"
import { Link } from "react-router-dom"
import UserForm from "./UserForm"
const Topbar = () => {
  return (
    <header className="bg-primary text-primary-foreground py-4 px-6 flex items-center justify-between">
        <Link href="#" className="flex items-center gap-2" prefetch={false}>
          <Package2Icon className="w-6 h-6" />
          <span className="text-lg font-semibold">User Management</span>
        </Link>
        <div className="flex gap-4 items-center">
            <Link to='/'>Home</Link>
        <UserForm  />
        </div>
      </header>
  )
}

export default Topbar