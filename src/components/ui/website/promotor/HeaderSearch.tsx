'use client'

import { Search } from "lucide-react";
import { Button } from "../../button";
import { Input } from "../../input";
import { useState } from "react";

export default function HeaderSearch() {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSubmit = (e:any) => {
        e.preventDefault();
        console.log("Searching for:", searchTerm);
        // Add navigation or API call logic here
    };

    return (
        <form onSubmit={handleSubmit} className="flex w-full max-w-sm rounded-full  bg-white overflow-hidden ">
            <Input
                type="text"
                placeholder="Search here"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-grow text-gray-500 text-xl py-7 pl-8 border-none focus-visible:ring-0 focus-visible:ring-offset-0 rounded-r-none rounded-l-full border-2"
            />
            <Button
                type="submit"
                className="bg-secondary hover:bg-orange-700 text-white px-6 h-auto rounded-l-none rounded-r-full w-20 flex items-center justify-center "
            >
                <Search className="h-8 w-8" />
            </Button>
        </form>
    );
}