"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  CalendarIcon,
  User,
  AtSign,
  Lock,
  Phone,
  Briefcase,
  MapPin,
} from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { addUser,getUser, updateUser } from "@/api/api";

export default function UserForm() {
  const [isUpdating, setIsUpdating] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
    date_of_birth: "",
    address: "",
    phone_number: "",
    role: "user",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addNewUser = async () => {
    await addUser(formData);
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
    navigate("/");
  };

  if (!(id === "add")) {
    const getUserDetail = async () => {
      const data = await getUser(id);
      setFormData(data);
      setIsUpdating(true);
    };
    useEffect(() => {
      getUserDetail();
    }, []);
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    if (isUpdating) {
      await updateUser(formData);
      setIsUpdating(false);
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
      navigate("/");
    } else {
      addNewUser();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold text-center">
            User Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="grid gap-6" onSubmit={onSubmit}>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label
                  htmlFor="name"
                  className="flex items-center space-x-2 text-sm font-medium text-gray-700"
                >
                  <User className="w-4 h-4" />
                  <span>Name</span>
                </Label>
                <Input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label
                  htmlFor="username"
                  className="flex items-center space-x-2 text-sm font-medium text-gray-700"
                >
                  <AtSign className="w-4 h-4" />
                  <span>Username</span>
                </Label>
                <Input
                  id="username"
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label
                  htmlFor="email"
                  className="flex items-center space-x-2 text-sm font-medium text-gray-700"
                >
                  <AtSign className="w-4 h-4" />
                  <span>Email</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label
                  htmlFor="phone"
                  className="flex items-center space-x-2 text-sm font-medium text-gray-700"
                >
                  <Phone className="w-4 h-4" />
                  <span>Phone Number</span>
                </Label>
                <Input
                  id="phone"
                  type="number"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="grid  gap-2">
              <Label
                htmlFor="date_of_birth"
                className="flex items-center space-x-2 text-sm font-medium text-gray-700"
              >
                Date of Birth
              </Label>
              <Input
                id="date_of_birth"
                name="date_of_birth"
                type="date"
                value={formData.date_of_birth}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label
                htmlFor="password"
                className="flex items-center space-x-2 text-sm font-medium text-gray-700"
              >
                <Lock className="w-4 h-4" />
                <span>Password</span>
              </Label>
              <Input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label
                htmlFor="role"
                className="flex items-center space-x-2 text-sm font-medium text-gray-700"
              >
                <Briefcase className="w-4 h-4" />
                <span>Role</span>
              </Label>

              <Select>
                <SelectTrigger id="role" className="w-1/2">
                  <SelectValue
                    name="role"
                    value={formData.role}
                    defaultValue={formData.role}
                    onChange={handleChange}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label
                htmlFor="address"
                className="flex items-center space-x-2 text-sm font-medium text-gray-700"
              >
                <MapPin className="w-4 h-4" />
                <span>Address</span>
              </Label>
              <Textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="h-24"
                required
              />
            </div>
            <Button className="w-full my-4" type="submit">
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
