import { Dispatch, FC, SetStateAction } from "react";
import { TextInput, StyleSheet } from "react-native";

type CustomInputProps = {
  placeholder: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  isPassword?: boolean;
  customStyle?: StyleSheet;
};

//FC -> functional component
export const CustomInput: FC<CustomInputProps> = ({
  placeholder,
  value,
  setValue,
  isPassword = false,
  customStyle = {},
}) => {
  return (
    <TextInput
      style={{ ...styles.input, ...customStyle }}
      placeholder={placeholder}
      value={value}
      onChangeText={setValue}
      secureTextEntry={isPassword}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    width: "100%",
    borderColor: "slategray",
    borderWidth: 1,
    marginBottom: 30,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});
