import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ArrowUpDownIcon } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@radix-ui/react-dropdown-menu";
import { deleteUser, getAllUsersData } from "@/api/api";
import UserCardList from "@/components/UserCardList";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("username");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [isLoading, setIsLoading] = useState(true);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleLimitChange = (limit) => {
    setItemsPerPage(limit);
  };

  useEffect(() => {
    async function getUsersData() {
      let data = await getAllUsersData({
        searchTerm,
        sortBy,
        sortOrder,
        currentPage,
        itemsPerPage,
      });
      setUsers(data);
      setIsLoading(false);
      setRender[false];
    }
    getUsersData();
  }, [searchTerm, sortBy, sortOrder, currentPage, itemsPerPage]);

  if (isLoading) {
    return "Loading...";
  }

  return (
    <div className="flex flex-col h-full">
      <main className="flex-1 p-4">
        <div className="flex items-center gap-2 justify-end  mb-4">
          <div className="relative w-full max-w-md">
            <div className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="ms-auto"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <ArrowUpDownIcon className="w-4 h-4 mr-2" />
                Sort by
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent value={sortBy}>
              <DropdownMenuItem value="asc" onClick={() => setSortOrder("asc")}>
                Ascending
              </DropdownMenuItem>
              <DropdownMenuItem
                value="desc"
                onClick={() => setSortOrder("desc")}
              >
                Descending
              </DropdownMenuItem>
              <DropdownMenuItem
                value="username"
                onClick={() => setSortBy("username")}
              >
                username
              </DropdownMenuItem>
              <DropdownMenuItem
                value="email"
                onClick={() => setSortBy("email")}
              >
                email
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <UserCardList userData={users} />

        <div className="flex flex-col md:flex-row sm:flex-row gap-2  mt-4">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="outline" className="ml-4">
                <ArrowUpDownIcon className="h-4 w-4 mr-2" />
                {itemsPerPage} per page
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[200px]" align="end">
              <DropdownMenuRadioGroup value={itemsPerPage.toString()}>
                <DropdownMenuRadioItem
                  value="1"
                  onClick={() => handleLimitChange(1)}
                >
                  1 per page
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem
                  value="2"
                  onClick={() => handleLimitChange(2)}
                >
                  2 per page
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem
                  value="10"
                  onClick={() => handleLimitChange(5)}
                >
                  10 per page
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <Pagination className="  overflow-hidden justify-center sm:pr-36">
            <PaginationContent>
              <PaginationItem className="hidden sm:inline-block">
                <PaginationPrevious
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                />
              </PaginationItem>
              {[1, 2, 3, 4].map((pageNumber) => (
                <PaginationItem key={pageNumber}>
                  <PaginationLink
                    href="#"
                    onClick={() => handlePageChange(pageNumber)}
                    isActive={pageNumber === currentPage}
                  >
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem className="hidden sm:inline-block">
                <PaginationNext
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === 3}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </main>
    </div>
  );
}
