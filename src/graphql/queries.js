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

