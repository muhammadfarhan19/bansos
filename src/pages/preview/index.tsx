import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Preview = () => {
  const router = useRouter();
  const data = router.query;

  const [idPhotoName, setIdPhotoName] = useState("");
  const [familyCardPhotoName, setFamilyCardPhotoName] = useState("");

  useEffect(() => {
    setIdPhotoName(localStorage.getItem("idPhoto") || "");
    setFamilyCardPhotoName(localStorage.getItem("familyCardPhoto") || "");
  }, []);

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Preview Data</h1>
      <table className="w-full border-collapse border border-gray-300">
        <tbody>
          <tr>
            <td className="border p-2 font-semibold">Nama</td>
            <td className="border p-2">{data.name || "Not provided"}</td>
          </tr>
          <tr>
            <td className="border p-2 font-semibold">NIK</td>
            <td className="border p-2">{data.nik || "Not provided"}</td>
          </tr>
          <tr>
            <td className="border p-2 font-semibold">Nomor KK</td>
            <td className="border p-2">
              {data.familyCardNumber || "Not provided"}
            </td>
          </tr>
          <tr>
            <td className="border p-2 font-semibold">Usia</td>
            <td className="border p-2">{data.age || "Not provided"}</td>
          </tr>
          <tr>
            <td className="border p-2 font-semibold">Jenis Kelamin</td>
            <td className="border p-2">{data.gender || "Not provided"}</td>
          </tr>
          <tr>
            <td className="border p-2 font-semibold">Alamat</td>
            <td className="border p-2">{data.address || "Not provided"}</td>
          </tr>
          <tr>
            <td className="border p-2 font-semibold">RT</td>
            <td className="border p-2">{data.rt || "Not provided"}</td>
          </tr>
          <tr>
            <td className="border p-2 font-semibold">RW</td>
            <td className="border p-2">{data.rw || "Not provided"}</td>
          </tr>
          <tr>
            <td className="border p-2 font-semibold">
              Pendapatan Sebelum Pandemi
            </td>
            <td className="border p-2">
              {data.prePandemicIncome || "Not provided"}
            </td>
          </tr>
          <tr>
            <td className="border p-2 font-semibold">
              Pendapatan Setelah Pandemi
            </td>
            <td className="border p-2">
              {data.postPandemicIncome || "Not provided"}
            </td>
          </tr>
          <tr>
            <td className="border p-2 font-semibold">Alasan</td>
            <td className="border p-2">{data.reason || "Not provided"}</td>
          </tr>
          <tr>
            <td className="border p-2 font-semibold">Provinsi</td>
            <td className="border p-2">{data.province || "Not provided"}</td>
          </tr>
          <tr>
            <td className="border p-2 font-semibold">Kota/Kabupaten</td>
            <td className="border p-2">{data.city || "Not provided"}</td>
          </tr>
          <tr>
            <td className="border p-2 font-semibold">Kecamatan</td>
            <td className="border p-2">{data.district || "Not provided"}</td>
          </tr>
          <tr>
            <td className="border p-2 font-semibold">Desa/Kelurahan</td>
            <td className="border p-2">{data.village || "Not provided"}</td>
          </tr>
          <tr>
            <td className="border p-2 font-semibold">Foto KTP</td>
            <td className="border p-2">{idPhotoName || "Not provided"}</td>
          </tr>
          <tr>
            <td className="border p-2 font-semibold">Foto Kartu Keluarga</td>
            <td className="border p-2">
              {familyCardPhotoName || "Not provided"}
            </td>
          </tr>
        </tbody>
      </table>
      <button
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => {
          localStorage.clear();
          router.push("/");
        }}
      >
        Kembali ke Form
      </button>
    </div>
  );
};

export default Preview;
