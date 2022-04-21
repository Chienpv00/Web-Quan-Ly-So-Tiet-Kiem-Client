import { createSlice } from '@reduxjs/toolkit';

const initState = {
    success: false,
    TenDangNhap: null,
    MaNhom: null,
    TenNhom: null,
    ChucNang: [
        {
            MaChucNang: null,
            TenChucNang: null,
            TenManHinhDuocLoad: null,
        },
    ],
};

// loginSlice tra ve 2 object: reducer va actions
// obj reducer dung de configure store
// obj actions dung de dispatch trong component
export const loginSlice = createSlice({
    name: 'login',
    initialState: initState,
    reducers: {
        // action login/success cap nhat state state.login
        success(state, action) {
            return {
                ...state,
                success: action.payload.success,
                TenDangNhap: action.payload.TenDangNhap,
                MaNhom: action.payload?.MaNhom,
                TenNhom: action.payload?.PhanQuyen?.MaNhom?.TenNhom,
                ChucNang: action.payload?.PhanQuyen?.MaChucNang
            }
        },
    },
});

export const { success } = loginSlice.actions;

export default loginSlice.reducer;
