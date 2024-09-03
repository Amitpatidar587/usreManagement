import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  CalendarIcon,
  AtSignIcon,
  UserIcon,
  ClockIcon,
  ArrowRightIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function UserCardList({ userData }) {
    const navigate=useNavigate();
  return (
    <div className="flex gap-6 flex-wrap">
      {userData.map((user) => (
        <Card key={user.id} className='w-full mx-auto overflow-hidden  max-w-sm'>
          <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-1">
            <CardHeader className="flex flex-col items-center gap-1 text-white">
              <Avatar className={`w-40 h-40 border-4 flex justify-center items-center border-white`}>
                <AvatarImage src="https://images.pexels.com/photos/2182969/pexels-photo-2182969.jpeg?auto=compress&cs=tinysrgb&w=600&h=600" className='mx-auto '   alt={user.name} />
              </Avatar>
              <div className="flex flex-col items-center">
                <CardTitle className={`text-2xl font-bold`}>
                  {user.name}
                </CardTitle>
                <p className={`text-sm opacity-75`}>@{user.username}</p>
              </div>
            </CardHeader>
          </div>
          <CardContent
            className={`grid gap-4 p-4 bg-gradient-to-b from-gray-100 to-white`}
          >
            <div className="flex items-center gap-3">
              <AtSignIcon className={`w-5 h-5 text-blue-500`} />
              <span className={`text-sm text-gray-700`}>{user.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <UserIcon className={`w-5 h-5 text-green-500`} />
              <span className={`text-sm text-gray-700`}>
                Created: {user.created_at}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <ClockIcon className={`w-5 h-5 text-yellow-500`} />
              <span className={`text-sm text-gray-700`}>
                Updated: {user.updated_at}
              </span>
            </div>
          </CardContent>
          <div className="flex items-center mx-3 mb-3 mt-1">
            <Button
              onClick={() => {
                navigate(`/${user.id}`);
              }}
            >
              show full profile
              <ArrowRightIcon className={`ml-2 w-4 h-4`} />
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
