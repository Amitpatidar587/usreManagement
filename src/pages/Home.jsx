import { useState, useMemo, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Pagination } from "@/components/ui/pagination"
import UserTableList from "../components/UserTableList"
import Topbar from "../components/Topbar"
import { ArrowUpDownIcon } from "lucide-react"
import axios from "axios"
import UserForm from "@/components/UserForm"

export default function Home() {
  const [users, setUsers] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("username")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [isEditUser, setIsEditUser] = useState(false)
  const [isDeleteDialog, setIsDeleteDialog] = useState(false)
  const [selectedUser, setSelectedUser] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const handlePageChange = (page) => {
    setCurrentPage(page)
  }
  const handleItemsPerPageChange = (limit) => {
    setItemsPerPage(limit)
    setCurrentPage(1)
  }



  const getUserData = async()=>{
    const {data} = await axios.get(`https://apnaorganicstore.in/crud_api/users.php?search=${searchTerm}&sort_by=${sortBy}`)
    setUsers(data)
    setIsLoading(false)
  }

  useEffect(() => {
    getUserData()
  }, [searchTerm,sortBy])


  const handleEditUser=(user)=>{
    setSelectedUser(user)
    setIsEditUser(true)
  }

  const handleDeleteUser=(user)=>{
    setSelectedUser(user)
    setIsDeleteDialog(true)
  }
  const confirmDelete=async()=>{
    try {
      const {data} = await axios.delete(`https://apnaorganicstore.in/crud_api/delete.php?id=${selectedUser.id}`)
      console.log(data)
      setSelectedUser({})
    } catch (error) {
      console.log(error)
    }
  }

  if(isLoading){
    return "Loading..."
  }

  return (
    <div className="flex flex-col h-full">
    
      <main className="flex-1 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="relative w-full max-w-md">
            <div className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <ArrowUpDownIcon className="w-4 h-4 mr-2" />
                Sort by
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent onValueChange={(value)=>setSortBy(value)} value={sortBy} align="end">
              <DropdownMenuItem onClick={() => setSortBy("username")}>Username</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("email")}>Email</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("createdAt")}>Created At</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("updatedAt")}>Updated At</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <UserTableList userData={users} handleEditUser={handleEditUser} handleDeleteUser={handleDeleteUser}/>
        {/* <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <span>Show</span>
            <Select
              value={itemsPerPage.toString()}
              onValueChange={(e) => handleItemsPerPageChange(parseInt(e.target.value))}
            >
              <SelectTrigger className="w-16">
                <SelectValue>{itemsPerPage}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
            <span>entries</span>
          </div>
          <Pagination
            currentPage={currentPage}
            totalItems={users.length}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
          />
        </div> */}
      </main>
      {isEditUser && <UserForm isUpdating={true} defaultUser={selectedUser} setIsUpdateOpen={setIsEditUser}  />}
      <Dialog open={isDeleteDialog} onOpenChange={setIsDeleteDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogDescription>
            Are You Sure to Delete User ?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={confirmDelete} className='w-1/2' variant="destructive">Yes</Button>
            <Button onClick={()=>setIsDeleteDialog(false)} className='w-1/2' >Cancel</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}