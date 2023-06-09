import { useState } from "react";
import { useSession } from "next-auth/client";
import AccessDenied from "../components/accessDenied";

export default function Page() {
  const [session, loading] = useSession();
  const [content, setContent] = useState();

  // When rendering client side don't display anything until loading is complete
  if (typeof window !== "undefined" && loading) return null;

  // If no session exists, display access denied message
  if (!session) {
    return <AccessDenied />;
  }

  // If session exists, display content
  return (
    <div>
      <h1 style={{fontFamily:"Lato"}}>Home</h1>
      <p style={{fontFamily:"Lato"}}>
        <strong>{content || "\u00a0"}</strong>
      </p>
    </div>
  );
}
