import { gql } from '@apollo/client';

// query kiem tra danh sach phieu goi tien cua khach hang
const CHECK_KHACH_HANG = gql`
    query Query($cmnd: String!) {
        checkKhachHangExists(CMND: $cmnd) {
            code
            success
            exists
            KhachHang {
                MaKhachHang
                TenKhachHang
                DiaChi
                CMND
                SDT
            }
        }
    }
`;

// query lay ds phieu goi tien cua khach hang
const GET_DS_PGT = gql`
    query Query($maKhachHang: String!) {
        getDSPGTbyMaKH(MaKhachHang: $maKhachHang) {
            MaPhieuGoi
            MaKhachHang
            MaLoaiTietKiem
            SoTienGoi
            NgayGoi
            NgayRut
            TienLaiPhatSinh
            SoDu
            NgayDaoHanKeTiep
            LaiSuatApDung
            TrangThai
        }
    }
`;

export { CHECK_KHACH_HANG, GET_DS_PGT };
