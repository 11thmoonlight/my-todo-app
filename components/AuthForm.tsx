"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { auth } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { FirebaseError } from "firebase/app";
import { useRouter } from "next/navigation";

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
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        router.push("/upcoming");
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        router.push("/upcoming");
      }
    } catch (error) {
      const err = error as FirebaseError;
      alert(err.message);
    }
  };

  return (
    <Card className="max-w-sm mx-auto bg-violet-100 border-none shadow-2xl">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Input
              type="email"
              placeholder="Email"
              {...register("email")}
              className="border-none bg-violet-200 focus:bg-violet-50"
            />
            {errors.email && (
              <p className="text-pink-500 text-sm mt-3">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <Input
              type="password"
              placeholder="Password"
              {...register("password")}
              className="border-none bg-violet-200 focus:bg-violet-50"
            />
            {errors.password && (
              <p className="text-pink-500 text-sm mt-3">
                {errors.password.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-violet-900 text-violet-50 cursor-pointer mt-6 transition-shadow duration-300 hover:shadow-lg hover:bg-violet-950 hover:shadow-violet-950/50 active:scale-95 active:shadow-none"
          >
            {isLogin ? "Login" : "Sign up"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="text-center flex flex-col justify-center items-center">
        <p
          className="text-sm text-blue-600 font-semibold cursor-pointer transition-transform duration-300 hover:scale-110 active:scale-95"
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
