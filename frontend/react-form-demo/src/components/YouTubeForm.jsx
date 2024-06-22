import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useRef } from "react";

export const YouTubeForm = () => {
  const form = useForm(); // it return object;
  const { register, control, handleSubmit, formState } = form;
  //destruct it register has 4 field
  //isn't it is difficult to write all these for each field
  //  const { name, ref, onChange, onBlur} = register('username');

 //when you work with react component every control elements re-render when you stroke ,but in react-form this is the feature it uncontrols the behaviour of react re-render while stroking
 let renderCount = useRef(1);
 renderCount.current++; 

  //--For handleSubmit we have to pass submit ---
  const submit = async (data) => {
    try {
      const formData = new FormData();
  
      // Append each key-value pair from data to formData
      for (const key in data) {
        formData.append(key, data[key]);
      }
  console.log("formData", formData);
      // Submit formData
      let response = await fetch("http://localhost:8082/form/postform", {
        method: 'POST',
        body: formData  // Use formData directly here
        // Note: No need to set Content-Type header for FormData, fetch will set it automatically
      });
  
      let responseData = await response.json();
      console.log("Form Submitted", responseData);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  

  let { errors } = formState;

  return (
    <div>
      <h2>YouTube Form {renderCount.current / 2}</h2>
      <form
        encType="multipart/form-data"
        onSubmit={handleSubmit(submit)}
        noValidate
        action="/form/postform" //route path 
        method="POST"
      >
        <div>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            name="username"
            {...register("username", {
              required: {
                value: true,
                message: "Username is required!",
              },
            })}
          />
          <p className="error">{errors.username?.message}</p>
        </div>

        {/* when we use destructing way then each field has to use like it */}
        {/* <input id="username" type='text' name='username' name = {name} ref={ref} onChange={onChange} onBlur={onBlur} /> */}
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            {...register("email", 
            //   {
            //   pattern: {
            //     value: /^[a-zA-Z0-9 ]+@[a-zA-Z0-9 ]*$/,
            //     message: "Invalid email address"
            //   },
            // }
          )}
          />
          <p>{errors.email?.message}</p>
        </div>

        <div>
          <label htmlFor="number">Phone Number</label>
          <input
            id="number"
            type="tel"
            name="phoneNumber"
            {...register("phoneNumber", {
              required: "Phone Number is required",
            })}
          />
          <p>{errors.number?.message}</p>
        </div>

        <div>
          <label htmlFor="channel">Channel</label>
          <input
            id="channel"
            type="text"
            name="channel"
            {...register("channel", { required: "Channel is required" })}
          />
          <p>{errors.channel?.message}</p>
        </div>
        <div>
          <label htmlFor="upload_img">Upload Image</label>
          <input
            id="upload_img"
            type="file"
            name="uploadFile"
            accept="image/*"
            {...register("uploadFile", {
              require: {
                message: "Please upload image",
              },
            })}
          />
          <p>{errors.uploadFile?.message}</p>
        </div>
        <button type="submit">Submit</button>
      </form>
      <DevTool control={control} />
    </div>
  );
};
