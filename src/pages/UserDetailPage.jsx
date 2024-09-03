import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Calendar,
  TrashIcon,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteUser, getUser } from "@/api/api";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@radix-ui/react-dialog";
import { DialogFooter, DialogHeader } from "@/components/ui/dialog";

const calculateAge = (dob) => {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
};

export default function UserDetailPage() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const { id } = useParams();

  const handleUpdateUser = (user) => {
    navigate(`/${user}/userform`);
  };

  const handleDeleteUser = async  (user) => {
    await deleteUser(user);
    navigate('/');
  };

  
  const getUserDetail = async () => {
    try {
      const data = await getUser(id);
      setUser(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserDetail();
  }, []);

  const maskPassword = (password) => {
    return "*".repeat(password?.length);
  };

  return (
    <div className="flex flex-col h-full">
      <main className="w-screen px-5  flex justify-center">
        <Card className="w-full max-w-3xl pb-3 mx-auto  m-5   bg-gradient-to-br from-primary/5 to-secondary/5">
          <div className="relative h-32 bg-gradient-to-r from-blue-600 to-secondary">
            <div className="absolute -bottom-12 left-6">
              <Avatar className="w-40 h-40 bg-cover bg-center bg-no-repeat border-4 border-background">
                <AvatarImage
                  src="https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=600&h=600"
                  alt={user.name}
                  className=" bg-cover mx-auto my-auto  bg-no-repeat"
                />
              </Avatar>
            </div>
          </div>
          <CardContent className="mt-16 grid gap-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div>
                <h2 className="text-2xl font-bold">{user.name}</h2>
                <p className="text-sm text-blue-700 text-muted-foreground">
                  @{user.username}
                </p>
              </div>
              <div className="mt-2 sm:mt-0  text-green-600 flex items-center text-sm text-muted-foreground">
                <Briefcase className="w-4 h-4 mr-2" />
                {user.role}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium flex items-center gap-2"
                >
                  <Mail className="w-4 h-4 text-primary" />
                  Email
                </Label>
                <p id="email" className="bg-background/50">
                  {user.email}
                </p>
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="phone"
                  className="text-sm font-medium flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-primary" />
                  Phone
                </Label>
                <p id="phone" className="bg-background/50">
                  {" "}
                  {user.phone_number}
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                Date of Birth
              </Label>
              <div className="flex gap-3 items-center bg-background/50 rounded-md p-2">
                <span className="text-sm">{user.date_of_birth}</span>
                <span className="text-sm font-medium bg-primary/10 text-primary px-2 py-1 rounded-full">
                  Age: {calculateAge(user.date_of_birth)}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="address"
                className="text-sm font-medium flex items-center gap-2"
              >
                <MapPin className="w-4 h-4 text-primary" />
                Address
              </Label>
              <p id="address" className="bg-background/50">
                {" "}
                {user.address}
              </p>
            </div>

            <div className="space-y-2 ">
              <Label
                htmlFor="password"
                className="text-sm font-medium flex items-center gap-2"
              >
                Password
              </Label>
              <p id="password" className="overflow-auto w-40 sm:w-auto ">
                {maskPassword(user.password)}
              </p>
            </div>
            <div className=" flex  justify-left gap-2">
              <Button id={user.id} onClick={() => handleUpdateUser(user.id)}>
                Update{" "}
              </Button>
              <Button
                id={user.id}
                variant="destructive"
                onClick={() => handleDeleteUser(user)}
              >
                <TrashIcon className="w-4 h-4 pr-1" />
                Delete{" "}
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
      {/* <Dialog open='true' onOpenChange={setIsDeleteDialog} >
        <DialogContent className="sm:max-w-[425px] mx-auto bg-white p-4 rounded-md shadow-lg">
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogDescription>Are you sure you want to delete this user?</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              onClick={confirmDelete}
              className="w-1/2"
              variant="destructive"
            >
              Yes
            </Button>
            <Button onClick={() => setIsDeleteDialog(false)} className="w-1/2">
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog> */}
    </div>
  );
}
