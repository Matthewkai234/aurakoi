"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function ConfirmEmailPage() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
    const [message, setMessage] = useState("");

    useEffect(() => {
        const verifyEmail = async () => {
            if (!token) {
                setStatus("error");
                setMessage("Invalid confirmation link.");
                return;
            }

            try {
                const res = await fetch(
                    `http://localhost:5257/api/ConfirmEmail/verify?token=${token}`
                );

                const data = await res.json();

                if (res.ok) {
                    setStatus("success");
                } else {
                    setStatus("error");
                }

                setMessage(data.message);
            } catch (err) {
                setStatus("error");
                setMessage("Something went wrong.");
            }
        };

        verifyEmail();
    }, [token]);

    return (
        <div className="flex min-h-screen items-center justify-center theme-aware-background z-20">
            <div className="p-6 rounded-xl shadow-lg text-center max-w-md">
                {status === "loading" && <p>Verifying your email...</p>}

                {status === "success" && (
                    <>
                        <h2 className="text-xl font-bold text-green-600">
                            ✅ Email Confirmed
                        </h2>
                        <p className="mt-2">{message}</p>
                    </>
                )}

                {status === "error" && (
                    <>
                        <h2 className="text-xl font-bold text-red-600">
                            ❌ Verification Failed
                        </h2>
                        <p className="mt-2">{message}</p>
                    </>
                )}
            </div>
        </div>
    );
}