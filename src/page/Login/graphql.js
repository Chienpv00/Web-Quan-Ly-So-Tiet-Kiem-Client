import { gql } from '@apollo/client';

const CHECK_LOGIN = gql`
    query CheckLogin($tenDangNhap: String!, $matKhau: String!) {
        checkLogin(TenDangNhap: $tenDangNhap, MatKhau: $matKhau) {
            code
            success
            message
            TenDangNhap
            MaNhom
            PhanQuyen {
                MaNhom {
                    MaNhom
                    TenNhom
                }
                MaChucNang {
                    MaChucNang
                    TenChucNang
                    TenManHinhDuocLoad
                }
            }
        }
    }
`;

export { CHECK_LOGIN };
