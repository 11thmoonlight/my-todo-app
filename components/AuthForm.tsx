"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";
import Cookie from "js-cookie";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { auth } from "@/lib/firebase";

function getFriendlyFirebaseError(code: string): string {
  switch (code) {
    case "auth/invalid-credential":
      return "Invalid password or email";
    case "auth/too-many-requests":
      return "Too many failed attempts. Please try again later.";
    default:
      return "An unexpected error occurred. Please try again.";
  }
}

const authSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email")
    .nonempty("Email is required"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .nonempty("Password is required"),
});

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [firebaseError, setFirebaseError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(authSchema),
  });

  const onSubmit = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    setFirebaseError("");
    setLoading(true);
    try {
      if (isLogin) {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const token = await userCredential.user.getIdToken();
        Cookie.set("token", token);
        router.push("/upcoming");
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        router.push("/upcoming");
      }
    } catch (error) {
      const err = error as FirebaseError;
      setFirebaseError(getFriendlyFirebaseError(err.code));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-sm mx-auto bg-violet-100 border-none shadow-2xl">
      <CardContent className="sm:p-6 p-4">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Input
              type="email"
              placeholder="Email"
              {...register("email")}
              className="border-none bg-violet-200 text-xs sm:text-base"
            />
            {errors.email && (
              <p className="text-pink-500 sm:text-sm text-xs mt-3">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="flex items-center bg-violet-200 rounded-md pr-2">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              {...register("password")}
              className="flex-1 border-none bg-violet-200 shadow-none pr-10 text-xs sm:text-base"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-violet-500"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          <Button
            type="submit"
            className="w-full bg-violet-900 text-violet-50 cursor-pointer mt-8 transition-shadow duration-300 hover:shadow-lg hover:bg-violet-950 hover:shadow-violet-950/50 active:scale-95 active:shadow-none flex items-center justify-center gap-2"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin w-4 h-4" />
                <span>Loading...</span>
              </>
            ) : isLogin ? (
              "Login"
            ) : (
              "Sign up"
            )}
          </Button>

          {firebaseError && (
            <p className="text-pink-500 text-sm mt-4 text-center">
              {firebaseError}
            </p>
          )}
        </form>
      </CardContent>
      <CardFooter className="text-center flex flex-col justify-center items-center">
        <p
          className="sm:text-sm text-xs text-blue-600 font-semibold cursor-pointer transition-transform duration-300 hover:scale-110 active:scale-95"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin
            ? "Don't have an account? Sign up"
            : "Already have an account? Login"}
        </p>
      </CardFooter>
    </Card>
  );
}
