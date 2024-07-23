import Image from "next/image";
import { LogOut } from "lucide-react";
import { logoutAction } from "@/data/actions/auth-actions";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const Navigation = () => (
  <nav className={`md:h-full bg-[#010019] rounded-b-none rounded-t-2xl  p-3 md:flex md:rounded-2xl md:p-5`}>
    <div className="flex flex-row w-full h-full md:flex-col justify-between">
      <Image src="/logo.png" alt="logo" className="w-10 h-10" width={60} height={60} />
      <div className="rounded-full w-10 h-10 flex items-center justify-center bg-[#1a1931] text-white">
        <form action={logoutAction}>
        <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button type="submit"><LogOut/></button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Logout</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
        </form>
      </div>
    </div>
  </nav>
);

export default Navigation;
