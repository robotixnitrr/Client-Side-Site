import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Login from "./Login";
import Signup from "./SignUp";

export default function Auth() {
  return (
    <div className="mt-12">
      <Tabs defaultValue="login" className="w-[500px] mx-auto">
        <TabsList className="grid w-full grid-cols-2 bg-black h-15">
          <TabsTrigger value="login" className="text-lg">
            Login
          </TabsTrigger>
          <TabsTrigger value="signup" className="text-lg">
            SignUp
          </TabsTrigger>
        </TabsList>
        <TabsContent value="login" className="">
          <Login />
        </TabsContent>
        <TabsContent value="signup">
          <Signup />
        </TabsContent>
      </Tabs>
    </div>
  );
}
