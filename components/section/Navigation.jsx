import Image from "next/image";
import { LogOut } from "lucide-react";
import { logoutAction } from "@/data/actions/auth-actions";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const Navigation = () => (
  <nav className={`md:h-full bg-[#010019] rounded-b-none rounded-t-2xl p-3 md:flex md:rounded-2xl md:p-5`}>
    <div className="flex flex-row w-full h-full md:flex-col justify-between">
      <Image src="/images/logo.png" alt="logo" className="w-10 h-10" width={60} height={60} />
      <div className="rounded-full w-10 h-10 flex items-center justify-center bg-[#1a1931] text-white">
        <AlertDialog>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <AlertDialogTrigger>
                  <LogOut />
                </AlertDialogTrigger>
              </TooltipTrigger>
              <TooltipContent>
                <p>Logout</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
              <AlertDialogDescription>
                This action will end your current session and you will need to log in again to access your account.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>
                <form action={logoutAction}>
                  <button type="submit">Logout</button>
                </form>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  </nav>
);

export default Navigation;