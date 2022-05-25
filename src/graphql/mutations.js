const { gql } = require('@apollo/client');

export const ADD_RULES = gql`
    mutation Mutation($loaiTkInp: LoaiTietKiemInp!) {
        addLoaiTietKiem(loaiTKInp: $loaiTkInp) {
            code
            success
            message
            LoaiTietKiem {
                MaLoaiTietKiem
                TenLoaiTietKiem
                KyHan
                LaiSuatHienTai
                NgayApDung
            }
        }
    }
`;

export const DELETE_RULES = gql`
    mutation Mutation($ma: String!) {
        deleteLoaiTietKiem(ma: $ma) {
            code
            success
            message
            LoaiTietKiem {
                MaLoaiTietKiem
                TenLoaiTietKiem
                KyHan
                LaiSuatHienTai
                NgayApDung
            }
        }
    }
`;

export const UPDATE_RULES = gql`
    mutation Mutation($loaiTkInp: UpdateLTKInp!) {
        updateLoaiTietKiem(loaiTKInp: $loaiTkInp) {
            code
            success
            message
            LoaiTietKiem {
                MaLoaiTietKiem
                TenLoaiTietKiem
                KyHan
                LaiSuatHienTai
                NgayApDung
            }
        }
    }
`;
