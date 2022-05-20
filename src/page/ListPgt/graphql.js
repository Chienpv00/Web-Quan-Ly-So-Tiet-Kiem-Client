import { gql } from '@apollo/client';
const GET_LOAI_TIET_KIEM = gql`
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

const FILTER_LIST_PGT = gql`
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

export { GET_LOAI_TIET_KIEM, FILTER_LIST_PGT };
