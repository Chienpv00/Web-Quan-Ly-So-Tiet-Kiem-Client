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
        }
    }
`;
