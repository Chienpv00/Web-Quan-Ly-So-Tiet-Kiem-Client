const { gql } = require('@apollo/client');

const GET_KH_BY_CMND = gql`
    query Query($cmnd: String!) {
        getKhachHangByCmnd(CMND: $cmnd) {
            MaKhachHang
            TenKhachHang
            DiaChi
            CMND
            SDT
        }
    }
`;

const CREATE_CUSTOMER = gql`
    mutation Mutation($tenKhachHang: String!, $diaChi: String!, $cmnd: String!, $sdt: String!) {
        createKhachHang(TenKhachHang: $tenKhachHang, DiaChi: $diaChi, CMND: $cmnd, SDT: $sdt) {
            code
            success
            message
            khachhang {
                MaKhachHang
                TenKhachHang
                DiaChi
                CMND
                SDT
            }
        }
    }
`;


module.exports = { GET_KH_BY_CMND, CREATE_CUSTOMER };
