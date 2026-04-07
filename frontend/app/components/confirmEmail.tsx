'use client'
import { supabase } from "@/lib/supabaseClient";
import Buttons from "./buttons";

type ConfirmEmailProps = {
    userConfirmed: boolean;
};


const sendConfirmationEmail = async () => {
    // console.log("hi")
    const {
        data: {
            user
        }
    } = await supabase.auth.getUser()
    if (user && user.email) {
        const res = await fetch("/api/ConfirmEmail", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: user.id,
                email: user.email,
            }),
        });
        console.log(await res.json());
    }
}


export default function ConfirmEmail({ userConfirmed }: ConfirmEmailProps) {
    if (userConfirmed) return null;
    return (
        <div className=" flex text-center items-center justify-center top-0 left-0 w-full text-center py-2 z-20 theme-aware-background space-x-2">
            <p> A confirmation email has been sent to your email</p>
            <button className="flex cursor-pointer theme-aware-secondary-text-color text-sm underline "
                onClick={sendConfirmationEmail}
            > Send Email
            </button>
        </div>
    );
}