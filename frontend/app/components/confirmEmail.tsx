'use client';
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "./authProvider";
import toast, { Toaster } from "react-hot-toast";

export default function ConfirmEmail() {
  const { user } = useAuth();
  const [userConfirmed, setUserConfirmed] = useState<boolean | null>(null);

  useEffect(() => {
    if (!user) return;

    const fetchUserConfirmed = async () => {
      try {
        const res = await fetch(`/api/profiles/${user.id}`);
        if (res.ok) {
          const data = await res.json();
          setUserConfirmed(!!data.UserConfirmed);
          console.log("Fetched userConfirmed:", data.UserConfirmed);
        } else {
          console.error("Failed to fetch confirmation status", res.status);
        }
      } catch (err) {
        console.error("Error fetching confirmation status", err);
      }
    };

    fetchUserConfirmed();
  }, [user]);

  const sendConfirmationEmail = async () => {
    if (!user || !user.email) return;

    const loadingToast = toast.loading("Sending confirmation email...");

    try {
      const res = await fetch("/api/ConfirmEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: user.id, email: user.email }),
      });

      const data = await res.json();
      if (res.ok) toast.success("Confirmation email sent!", { id: loadingToast });
      else toast.error(data.message || "Failed to send email", { id: loadingToast });
    } catch (err) {
      toast.error("An error occurred. Check your connection.", { id: loadingToast });
    }
  };

  // Only render if user is logged in and NOT confirmed
  if (!user || userConfirmed === null || userConfirmed) return null;

  return (
    <div className="flex justify-center items-center w-full py-2 theme-aware-background space-x-2 z-40">
      <p>You have not confirmed your email yet.</p>
      <button
        className="text-sm underline theme-aware-secondary-text-color cursor-pointer"
        onClick={sendConfirmationEmail}
      >
        Send Email
      </button>

      <Toaster
        position="top-center"
        toastOptions={{ className: "theme-aware-toast", duration: 3000 }}
        
      />
    </div>
  );
}