import { useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { PlusIcon } from "lucide-react";

const UserForm = ({isUpdating=false,setIsUpdateOpen, defaultUser={}}) => {
  const [showAddUserDialog, setShowAddUserDialog] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
    date_of_birth: "",
    address: "",
    phone_number: "",
    role: "user",
    ...defaultUser
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
   if (isUpdating) {
    try {
      const response = await axios.put(
        "https://apnaorganicstore.in/crud_api/add_update.php",
        formData,
        // {
        //   headers:{
        //     "Content-Type":"multipart/form-data"
        //   }
        // }
      );
      console.log(response.data);
      setShowAddUserDialog(false);
      // Reset form data
      setFormData({
        username: "",
        email: "",
        password: "",
        name: "",
        date_of_birth: "",
        address: "",
        phone_number: "",
        role: "user",
      });
      // You might want to add a success message or update your user list here
    } catch (error) {
      console.error("Error adding user:", error);
    }
   }else{
     // const userFormData = new FormData();
    // userFormData.append("username", formData.username);
    // userFormData.append("email", formData.email);
    // userFormData.append("name", formData.name);
    // userFormData.append("password", formData.password);
    // userFormData.append("date_of_birth", formData.date_of_birth);
    // userFormData.append("address", formData.address);
    // userFormData.append("phone_number", formData.phone_number);
    // userFormData.append("role", formData.role);
    try {
      const response = await axios.post(
        "https://apnaorganicstore.in/crud_api/add_update.php",
        formData,
        // {
        //   headers:{
        //     "Content-Type":"multipart/form-data"
        //   }
        // }
      );
      console.log(response.data);
      setShowAddUserDialog(false);
      // Reset form data
      setFormData({
        username: "",
        email: "",
        password: "",
        name: "",
        date_of_birth: "",
        address: "",
        phone_number: "",
        role: "user",
      });
      // You might want to add a success message or update your user list here
    } catch (error) {
      console.error("Error adding user:", error);
    }
   }
  };

  return (
    <div>
      {!isUpdating&&<Button size="sm" onClick={() => setShowAddUserDialog(true)}>
        <PlusIcon className="w-4 h-4 mr-2" />
        Add User
      </Button>}
      <Dialog open={showAddUserDialog || isUpdating} onOpenChange={isUpdating?setIsUpdateOpen:setShowAddUserDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{isUpdating?"Update User":"Add New User"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={onSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid items-center grid-cols-4 gap-4">
                <Label htmlFor="username" className="text-right">
                  Username
                </Label>
                <Input
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid items-center grid-cols-4 gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid items-center grid-cols-4 gap-4">
                <Label htmlFor="password" className="text-right">
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid items-center grid-cols-4 gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid items-center grid-cols-4 gap-4">
                <Label htmlFor="date_of_birth" className="text-right">
                  Date of Birth
                </Label>
                <Input
                  id="date_of_birth"
                  name="date_of_birth"
                  type="date"
                  value={formData.date_of_birth}
                  onChange={handleChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid items-center grid-cols-4 gap-4">
                <Label htmlFor="address" className="text-right">
                  Address
                </Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid items-center grid-cols-4 gap-4">
                <Label htmlFor="phone_number" className="text-right">
                  Phone Number
                </Label>
                <Input
                  id="phone_number"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid items-center grid-cols-4 gap-4">
                <Label htmlFor="role" className="text-right">
                  Role
                </Label>
                <Input
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save</Button>
              <Button type="button" onClick={() => isUpdating?setIsUpdateOpen(false):setShowAddUserDialog(false)}>
                Cancel
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserForm;
