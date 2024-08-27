import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import axios from "axios"
import { CalendarIcon, UserIcon, MailIcon, LockIcon, MapPinIcon, PhoneIcon, UserCircleIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export default function UserDetailPage() {

  
  const [user,setUser]=useState({})

  const {id}=useParams();

  const getUserDetail=async()=>{
        try {
            const {data} = await axios.get(`https://apnaorganicstore.in/crud_api/user.php?id=${id}`)
            setUser(data);
            console.log(data);
        } catch (error) {
            console.log(error)
        }
  }
  useEffect(()=>{
    getUserDetail();
  },[])

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">User Details</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <UserIcon className="h-4 w-4" />
              Username
            </Label>
            <p className="text-sm font-medium">{user.username}</p>
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <MailIcon className="h-4 w-4" />
              Email
            </Label>
            <p className="text-sm font-medium">{user.email}</p>
          </div>
        </div>
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <LockIcon className="h-4 w-4" />
            Password
          </Label>
          <p className="text-sm font-medium">{user.password}</p>
        </div>
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <UserCircleIcon className="h-4 w-4" />
            Name
          </Label>
          <p className="text-sm font-medium">{user.name}</p>
        </div>
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <CalendarIcon className="h-4 w-4" />
            Date of Birth
          </Label>
          <p className="text-sm font-medium">{user.date_of_birth}</p>
        </div>
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <MapPinIcon className="h-4 w-4" />
            Address
          </Label>
          <p className="text-sm font-medium">{user.address}</p>
        </div>
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <PhoneIcon className="h-4 w-4" />
            Phone Number
          </Label>
          <p className="text-sm font-medium">{user.phone_number}</p>
        </div>
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <UserIcon className="h-4 w-4" />
            Role
          </Label>
          <p className="text-sm font-medium capitalize">{user.role}</p>
        </div>
      </CardContent>
    </Card>
  )
}