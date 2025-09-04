import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useUserStore } from "@/stores/userStore";
function Dashboard() {
  const { currentUser } = useUserStore();
  return (
    <div className="h-screen w-screen flex  p-2">
      <Card className="w-screen">
        <CardHeader>
          <CardTitle>Hello {currentUser.name}</CardTitle>
          <CardDescription>Card Description</CardDescription>
          <CardAction>Card Action</CardAction>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Dashboard;
