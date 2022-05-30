import React from "react";

const Input = ({ type,onKeyDown, placeholder, register, name, required, minLength, pattern, errors, clearErrors}) => {
    
    const onChange = () => {
        clearErrors(name)
    }

    return (
        <div>
            <input
                onKeyDown={onKeyDown}
                onChange={onChange}
                className="form-control"
                type={type}
                placeholder={placeholder}
                {...register(
                    name,
                    {
                        required: {
                            value: required,
                            message: "Trường này là bắt buộc!",
                        },
                        minLength: {
                            value: minLength,
                            message: `Trường này yêu cầu tối thiểu ${minLength} ký tự!`
                        },
                        pattern: {
                            value: pattern,
                            message: `Không được nhập các ký tự đặc biệt!`
                        }
                    }
                )}
            />
            <span style={{color: 'red'}}>{errors?.message}</span>
        </div>
    );
};

export default Input;
