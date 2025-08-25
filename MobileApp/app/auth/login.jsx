import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { TextInput } from "react-native-web";
import { useState } from "react";
import axios from "axios";

const login = () => {
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleLogin= async ()=>{
    const emailRegex=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if(!formData.email || !formData.password){
        setError("Both fields are required.");
        return;
    }
    if(!emailRegex.test(formData.email)){
        setError("Invalid Credentials")
        return;
    }

    try {
        const response= await axios.post("",formData);
        if(response.status ===200){
            console.log(response.data)
        }
    } catch (error) {
        setError(error.response.data.message);
    }
  };
  return (
    <View className="flex-1 flex-col items-center gap-4">
      <Text className="text-xl font-semibold">Welcome Back!</Text>
      <View className="flex flex-col gap-2 w-full ">
        <Text className="text-lg">Email</Text>
        <TextInput
          className="border p-2 rounded-md"
          placeholder="Email"
          autoCapitalize={false}
          keyboardType="email-address"
          onChangeText={(text) =>
            setformData((prev) => ({ ...prev, email: text }))
          }
        ></TextInput>

        <Text className="text-lg">Password</Text>
        <TextInput
          className="border p-2 rounded-md"
          placeholder="********"
          autoCapitalize={false}
          secureTextEntry={true}
          onChangeText={(text) =>
            setformData((prev) => ({ ...prev, password: text }))
          }
        ></TextInput>
        {error && <Text className="text-red-600">{error}</Text>}
      
      </View>

      <TouchableOpacity onPress={handleLogin}className="bg-black p-2 w-full rounded-md">
        <Text className="text-white text-center">Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default login;








