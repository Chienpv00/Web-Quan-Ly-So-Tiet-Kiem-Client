import React from 'react';
import './styles.scss';
import { useForm } from 'react-hook-form';
import Input from '../../component/Input';
import { useLazyQuery } from '@apollo/client';
import { CHECK_LOGIN } from './graphql';
import { useSelector, useDispatch } from 'react-redux';
import { success } from '../../futures/login/loginSlice';
import {useNavigate} from 'react-router-dom'


const Login = () => {
    // create react hook form
    const {
        register,
        handleSubmit,
        formState: { errors },
        clearErrors,
    } = useForm();

    // get data from redux
    const loginData = useSelector((state) => state.login);
    const dispatch = useDispatch();
    
    React.useEffect(() => {
        if(loginData.success === true)
            navigate('/home')
    },[loginData.success])
    // create navigate func from hook
    const navigate = useNavigate();

    // fetch data
    const [submitDataToServer, { loading, error, data, called }] = useLazyQuery(CHECK_LOGIN);
     

    const onSubmit = handleSubmit((result) => {
        submitDataToServer({
            variables: {
                tenDangNhap: result.userName,
                matKhau: result.password,
            },
            onCompleted: (data) => {
                dispatch(success(data.checkLogin));
            },
        });
    });



    return (
        <main className="container">
            <form onSubmit={onSubmit} className="mx-auto d-grid gap-2">
                <h2 className="">Đăng nhập</h2>

                <div className="mb-2">
                    <Input
                        register={register}
                        name="userName"
                        type="text"
                        required
                        minLength={4}
                        pattern={/[a-zA-z0-9]/}
                        placeholder="Tên đăng nhập"
                        errors={errors?.userName}
                        clearErrors={clearErrors}
                    />
                </div>

                <Input
                    register={register}
                    name="password"
                    type="password"
                    required
                    minLength={6}
                    pattern={/[a-zA-z0-9]/}
                    placeholder="Mật khẩu"
                    errors={errors?.password}
                    clearErrors={clearErrors}
                />
                <button className="btn btn-primary mt-3">Đăng nhập</button>
            </form>
            {loading && <h2>Loading...</h2>}
            {error && <h2>Error...</h2>}
            
        </main>
    );
};

export default Login;
