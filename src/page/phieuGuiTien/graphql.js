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

const GET_LOAITK = gql`
    query GetLoaitk {
        getLoaitk {
            MaLoaiTietKiem
            TenLoaiTietKiem
            KyHan
            LaiSuatHienTai
            NgayApDung
        }
    }
`;

const CREATE_PGT = gql`
    mutation Mutation($maLoaiTietKiem: String!, $soTienGoi: Float!, $maKhachHang: String!) {
        createPhieuGuiTien(MaLoaiTietKiem: $maLoaiTietKiem, SoTienGoi: $soTienGoi, MaKhachHang: $maKhachHang) {
            code
            success
            message
            PhieuGoiTien {
                MaPhieuGoi
                SoTienGoi
                NgayGoi
                NgayRut
                TienLaiPhatSinh
                SoDu
                NgayDaoHanKeTiep
                LaiSuatApDung
                TrangThai
                MaKhachHang {
                    MaKhachHang
                    TenKhachHang
                    DiaChi
                    CMND
                    SDT
                }
                MaLoaiTietKiem {
                    MaLoaiTietKiem
                    TenLoaiTietKiem
                    KyHan
                    LaiSuatHienTai
                    NgayApDung
                }
            }
        }
    }
`;
module.exports = { GET_KH_BY_CMND, CREATE_CUSTOMER, GET_LOAITK, CREATE_PGT };
