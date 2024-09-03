import { Package2Icon, PlusIcon } from "lucide-react"
import { Link } from "react-router-dom"
const Topbar = () => {
  return (
    <header className="bg-primary text-primary-foreground py-4 px-6 flex items-center  justify-between">
        <Link href="#" className="flex items-center gap-2" prefetch={false}>
          <Package2Icon className="w-6 h-6" />
          <span className="text-lg font-semibold hidden sm:block">User Management</span>
        </Link>
        <div className="flex gap-6 items-center">
            <Link to='/'>Home</Link>
            <Link to='/add/userform'>
            <PlusIcon className="w-4 inline-block h-4 mr-1" />
            AddUser</Link>

        </div>
      </header>
  )
}

export default Topbar