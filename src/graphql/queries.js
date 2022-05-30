const { gql } = require('@apollo/client');

export const GET_REPORT_DAY = gql`
    query Query($date: Date!) {
        getReportDay(date: $date) {
            LoaiTietKiem
            TongThu
            TongChi
        }
    }
`;

export const GET_REPORT_OC_MONTH = gql`
    query GetReportDay($month: String!, $year: String!) {
        getReportOCMonth(month: $month, year: $year) {
            day
            open
            close
        }
    }
`;

export const GET_LOAI_TIET_KIEM = gql`
    query Query {
        getLoaitk {
            MaLoaiTietKiem
            TenLoaiTietKiem
            KyHan
            LaiSuatHienTai
            NgayApDung
            TrangThai
        }
    }
`;

export const GET_LOAI_TIET_KIEM_THEO_MA = gql`
    query Query($ma: String!) {
        getLoaitkWithma(ma: $ma) {
            MaLoaiTietKiem
            TenLoaiTietKiem
            KyHan
            LaiSuatHienTai
            NgayApDung
            TrangThai
        }
    }
`;

export const FILTER_LIST_PGT = gql`
    query Query($input: filterListPGT!) {
        filterPGT(input: $input) {
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

export const GET_KH_BY_CMND = gql`
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

export const CHECK_LOGIN = gql`
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
