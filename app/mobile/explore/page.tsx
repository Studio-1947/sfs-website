import { redirect } from "next/navigation";

// The old "Explore" grid was replaced by the chapter list on the mobile home screen.
export default function MobileExplorePage() {
  redirect("/mobile");
}
