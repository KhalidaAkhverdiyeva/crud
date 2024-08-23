"use client";
import { useRequestMutation } from "./_http/axiosFetcher";
import LoadingButton from "./components/loadingbutton";
import { useFormik } from "formik";
import { LoginValidationSchema } from "./_validator/LoginValidation";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import ErrorMessage from "./components/errormessage";
import { useState } from "react";
import { FaEye } from "react-icons/fa6";
import { TbEyeClosed } from "react-icons/tb";
import Link from "next/link";



export default function DefaulPage() {
  const router = useRouter();
  const {
    trigger: loginservice,
    isMutating: loaading,
    error: isErr,
  } = useRequestMutation("login", {
    method: "POST",
    module: "devApi",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const InitialForm = {
    username: "",
    password: "",
    expiresInMins: 30,
  };

  const formik = useFormik({
    initialValues: InitialForm,
    validationSchema: LoginValidationSchema,
    onSubmit: (values) => {
      loginservice({
        body: values,
      }).then((res) => {
        if (res?.token) {
          setCookie("token", res.token, {
            expires: new Date(Date.now() + values.expiresInMins * 60000),
          });

          router.push("/home");
        }
      });
    },
  });
  const [showPassword,setShowPassword] = useState(false)

  return (
    <main className="flex   flex-col items-center  justify-between p-24"
    >
      <img src="./noodle.png" alt="/"  className="h-[100px]"/>
      {isErr && <ErrorMessage message={isErr.message} />}
      <form
        id="login"
        onSubmit={formik.handleSubmit}
        className="max-w-[500px] w-full  my-7 rounded-[10px] px-5 py-7 bg-white shadow-lg border-gray-200 border-solid border-[1px]"
      >
        <input
          type="text"
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="username"
          placeholder="Username"
          className="w-full px-4 py-3 my-2 outline-none shadow-md rounded-md border border-gray-300"
        />{" "}
        {formik.errors.username && formik.touched.username ? (
          <p className="text-red-500 text-sm">{formik.errors.username}</p>
        ) : null}
         <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="password"
            placeholder="Password"
            className="w-full px-4 py-3 my-3 outline-none shadow-md rounded-md border border-gray-300"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 flex items-center px-3"
          >
            {showPassword ? (
              <FaEye  className="h-5 w-5 text-gray-500" />
            ) : (
              <TbEyeClosed className="h-5 w-5 text-gray-500" />
            )}
          </button>
        </div>
        {formik.errors.password && formik.touched.password ? (
          <p className="text-red-500 text-sm">{formik.errors.password}</p>
        ) : null}
        <button
          type="submit"
          id="login"
          className="w-full flex items-center justify-center gap-2 p-3 my-2 bg-[#E3411A] text-white rounded-sm shadow-md"
        >
          {loaading ? <LoadingButton /> : "Login"}
        </button>
        <div className="flex gap-[15px] items-center justify-center mt-[30px]">
          <div className="bg-gray-300 h-[1px] w-[100%]"></div>
          <div className="text-[14px]">OR</div>
          <div className="bg-gray-300 h-[1px] w-[100%]"></div>
        </div>

        <Link href={'/register'}>
          <div className="mt-[20px] text-center flex gap-[10px] justify-center cursor-pointer">
            <span>Don&apos;t have an account?</span> 
            <span className="text-[#E3411A] ">SignUp</span>
          </div>
        </Link>
        
      </form>
    </main>
  );
}
