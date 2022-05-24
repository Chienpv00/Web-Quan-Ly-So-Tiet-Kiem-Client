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
