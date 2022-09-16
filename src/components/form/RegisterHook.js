import React from "react";
import { useForm } from "react-hook-form";
import CheckboxHook from "../checkbox/CheckboxHook";
import DropdownHook from "../dropdown/DropdownHook";
import RadioHook from "../radio/RadioHook";
import InputHook from "./input/InputHook";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object({
    username: yup.string().required("Please enter your username"),
    email: yup
      .string()
      .email("Please enter valid email address")
      .required("Please enter your email address"),

    password: yup
      .string()
      .min(8, "Password must be at least 8 characters or greater")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        {
          message:
            "Password must be at least one uppercase letter, one lowercase letter, one number and one special character",
        }
      )
      .required("Please enter your password"),
    gender: yup
      .string()
      .required("Please select your gender")
      .oneOf(["male", "female"], "You can only select male or female"),
    job: yup.string().required("Please select your job"),
    terms: yup.boolean().required("Please accept the terms and conditions"),
  })
  .required();

const dropdownData = [
  {
    id: 1,
    value: "teacher",
    text: "Teacher",
  },
  {
    id: 2,
    value: "developer",
    text: "Developer",
  },
  {
    id: 3,
    value: "doctor",
    text: "Doctor",
  },
];

const RegisterHook = () => {
  const {
    handleSubmit,
    formState: { errors, isValid, isSubmitting, isSubmitSuccessful },
    control,
    setValue,
    getValues,
    reset,
    watch
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      gender: "male",
    }
  });

  const onSubmitHandler = (values) => {
    if (!isValid) return;
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
        console.log("🚀 ~ values", values);
        reset({
          username: "",
          email: "",
          password: "",
          gender: "male",
          job: "",
          terms: false,
        });
      }, 3000);
    });
  };

  const watchGender = watch("gender");
  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      className="max-w-[300px] mx-auto my-10"
      autoComplete="off"
    >
      <div className="flex flex-col gap-3 mb-5">
        <label htmlFor="username" className="cursor-pointer">
          Username
        </label>
        <InputHook
          id="username"
          name="username"
          placeholder="Enter your username"
          control={control}
          type="text"
        ></InputHook>
        <p className="text-red-500 text-sm">{errors.username?.message}</p>
      </div>
      <div className="flex flex-col gap-3 mb-5">
        <label htmlFor="email" className="cursor-pointer">
          Email address
        </label>
        <InputHook
          id="email"
          name="email"
          placeholder="Enter your email address"
          control={control}
          type="email"
        ></InputHook>
        <p className="text-red-500 text-sm">{errors.email?.message}</p>
      </div>
      <div className="flex flex-col gap-3 mb-5">
        <label htmlFor="password" className="cursor-pointer">
          Password
        </label>
        <InputHook
          id="password"
          name="password"
          placeholder="Enter your password"
          control={control}
          type="password"
        ></InputHook>
        <p className="text-red-500 text-sm">{errors.password?.message}</p>
      </div>
      <div className="flex flex-col gap-3 mb-5">
        <label className="cursor-pointer">Gender</label>
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-x-3">
            <RadioHook
              control={control}
              name="gender"
              value="male"
              checked = {watchGender === 'male'}
            ></RadioHook>
            <span className="cursor-pointer">Male</span>
          </div>
          <div className="flex items-center gap-x-3">
            <RadioHook
              control={control}
              name="gender"
              value="female"
              checked = {watchGender === 'female'}
            ></RadioHook>
            <span className="cursor-pointer">Female</span>
          </div>
        </div>
        <p className="text-red-500 text-sm">{errors.gender?.message}</p>
      </div>
      <div className="flex flex-col gap-3 mb-5">
        <label className="cursor-pointer">Are you</label>
        <DropdownHook
          control={control}
          setValue={setValue}
          name="job"
          data={dropdownData}
          dropdownLabel="Select your job"
        ></DropdownHook>
        <p className="text-red-500 text-sm">{errors.job?.message}</p>
      </div>
      <div className="flex flex-col gap-3 mb-5">
        <CheckboxHook
          control={control}
          text="I accept the terms and conditions"
          name="terms"
        ></CheckboxHook>
        <p className="text-red-500 text-sm">{errors.terms?.message}</p>
      </div>
      <button
        className={`w-full p-5 bg-[#2979FF] text-white rounded-lg mt-5 font-semibold ${
          isSubmitting ? "opacity-50" : ""
        }`}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <div className="w-5 h-5 rounded-full border-2 border-white border-t-2 border-t-transparent mx-auto animate-spin"></div>
        ) : (
          "Submit"
        )}
      </button>
    </form>
  );
};

export default RegisterHook;
