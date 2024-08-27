import { Card } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "./ui/button";
import { FilePenIcon, TrashIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
const UserTableList = ({ userData, handleEditUser, handleDeleteUser }) => {
  const navigate = useNavigate();
  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Username</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Updated At</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {userData.map((user) => (
            <TableRow
              className="cursor-pointer"
              onClick={() => {
                navigate(`/${user.id}`);
              }}
              key={user.id}
            >
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.phone_number}</TableCell>
              <TableCell>{user.created_at}</TableCell>
              <TableCell>{user.updated_at}</TableCell>
              <TableCell className="text-right">
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    handleEditUser(user);
                  }}
                  variant="outline"
                  size="icon"
                  className="mr-2"
                >
                  <FilePenIcon className="w-4 h-4" />
                </Button>
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    handleDeleteUser(user);
                  }}
                  variant="outline"
                  size="icon"
                  className="text-red-500"
                >
                  <TrashIcon className="w-4 h-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default UserTableList;
