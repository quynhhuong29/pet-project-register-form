import React from "react";
import { useForm } from "react-hook-form";
import CheckboxHook from "../checkbox/CheckboxHook";
import DropdownHook from "../dropdown/DropdownHook";
import RadioHook from "../radio/RadioHook";
import InputHook from "./input/InputHook";

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
    formState: { errors },
    control,
    setValue,
    getValues,
  } = useForm();
  const onSubmitHandler = (values) => {
    console.log(
      "🚀 ~ file: RegisterHook.js ~ line 11 ~ onSubmitHandler ~ values",
      values
    );
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      className="max-w-[300px] mx-auto my-10"
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
        <p className="text-red-500 text-sm">Please enter your username</p>
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
        <p className="text-red-500 text-sm">Please enter your username</p>
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
      </div>
      <div className="flex flex-col gap-3 mb-5">
        <label className="cursor-pointer">Gender</label>
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-x-3">
            <RadioHook control={control} name="gender" value="male"></RadioHook>
            <span className="cursor-pointer">Male</span>
          </div>
          <div className="flex items-center gap-x-3">
            <RadioHook
              control={control}
              name="gender"
              value="female"
            ></RadioHook>
            <span className="cursor-pointer">Female</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3 mb-5">
        <label className="cursor-pointer">Are you</label>
        <DropdownHook control={control} setValue={setValue} name="job" data={dropdownData}></DropdownHook>
      </div>
      <div className="flex flex-col gap-3 mb-5">
        <CheckboxHook
          control={control}
          text="I accept the terms and conditions"
          name="terms"
        ></CheckboxHook>
      </div>
      <button className="w-full p-5 bg-[#2979FF] text-white rounded-lg mt-5 font-semibold">
        Submit
      </button>
    </form>
  );
};

export default RegisterHook;
