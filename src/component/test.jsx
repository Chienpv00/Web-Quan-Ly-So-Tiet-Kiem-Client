import React from "react";
import { useQuery, gql } from "@apollo/client";

const GET_KH = gql`
    query Query($maKhachHang: String!) {
        getKhachHang(MaKhachHang: $maKhachHang) {
            MaKhachHang
            TenKhachHang
            DiaChi
            CMND
            SDT
        }
    }
`;

function Test({ maKhachHang }) {
    const { loading, error, data } = useQuery(GET_KH, {
        variables: { maKhachHang },
    });
    if (loading)
        return (
            <div class="spinner-border text-primary" role="status">
                <span class="sr-only"></span>
            </div>
        );
    console.log(data.getKhachHang);
    return <div>{}</div>;
}

export default Test;
