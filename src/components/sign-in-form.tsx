"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import GoogleIcon from "./icons/google-icon";

export default function SignInForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (!res?.ok) {
        setError(
          res?.error === "CredentialsSignin"
            ? "Invalid email or password"
            : res?.error || "Failed to sign in",
        );
        setLoading(false);
        return;
      }

      window.location.href = "/dashboard";
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="
        relative
        w-full
        max-w-[1600px]
        mx-auto
        my-2
    px-6
    lg:px-8
      "
    >
      <div className="rounded-[32px] overflow-hidden bg-[#0a1929] grid grid-cols-1 xl:grid-cols-2">
      {/* LEFT IMAGE */}
      <div className="relative w-full h-64 xl:h-auto xl:min-h-full overflow-hidden">
        <Image
          src="/travel.jpg"
          alt="Travel"
          fill
          className="object-cover animate-kenburns"
          priority
        />
        <div className="absolute inset-0 bg-black/25" />
      </div>

      {/* RIGHT FORM */}
    <div className="flex items-center justify-center xl:pl-12 xl:pr-8 py-12">
        <div className="w-full max-w-[560px] px-8 lg:px-12">
          <div className="mb-8 text-center">
            <div className="text-white font-semibold text-2xl">
              ✈️ travellersmeet
            </div>

            <h1 className="mt-5 text-3xl font-bold text-white">Welcome Back</h1>

            <p className="mt-2 text-white/70 text-sm">
              Sign in to continue your travel journey.
            </p>
          </div>
          <div className="mx-8 rounded-xl border border-white/10 bg-[#122b45]/70 backdrop-blur-xl p-10 shadow-2xl flex flex-col justify-between">
            {/* Social Buttons */}
            <div className="space-y-2 mb-4">
              <button
                type="button"
                onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
                className="flex items-center justify-center gap-3 w-full h-[46px] rounded-xl bg-white text-gray-800 font-semibold"
              >
                <GoogleIcon />
                Continue with Google
              </button>

             
            </div>
            <div className="relative my-7">
              <div className="border-t border-white/10"></div>

              <span className="absolute left-1/2 -translate-x-1/2 -top-3 bg-[#122b45] px-3 text-xs text-white/50">
                OR
              </span>
            </div>

            {/* Form */}

            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-white/80">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="you@example.com"
                  className="mt-1 h-10 w-full rounded-xl bg-white/5 border border-white/15 px-4 text-white placeholder:text-white/40 outline-none focus:border-blue-400 transition"
                />
              </div>

              <div className="relative">
                <label className="block mb-2 text-sm font-medium text-white/80">
                  Password
                </label>
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={8}
                  className="mt-1 h-10 w-full rounded-xl bg-white/5 border border-white/15 px-4 text-white placeholder:text-white/40 outline-none focus:border-blue-400 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-4 top-7 flex items-center text-white/60 hover:text-white"
                >
                  {showPassword ? (
                    <FaEyeSlash size={18} />
                  ) : (
                    <FaEye size={18} />
                  )}
                </button>
              </div>

              {error && <p className="text-sm text-red-400">{error}</p>}
              <div className="flex justify-end">
                <Link
                  href="/forgot-password"
                  className="text-sm text-blue-300 hover:text-blue-200"
                >
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-6 w-full h-[46px] rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-bold transition disabled:opacity-60"
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </form>
          </div>

          <p className="mt-8 text-center text-sm text-white/70">
            No account yet?{" "}
            <Link
              href="/signup"
              className="font-semibold text-white hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
      </div>
</div>
  );
}

