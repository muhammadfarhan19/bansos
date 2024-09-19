import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";
import CustomInputField from "@/components/CustomInputField";

interface FormData {
  name: string;
  nik: number;
  familyCardNumber: number;
  idPhoto: FileList;
  familyCardPhoto: FileList;
  age: number;
  gender: "Laki-laki" | "Perempuan";
  province: string;
  city: string;
  district: string;
  village: string;
  address: string;
  rt: string | number;
  rw: string | number;
  prePandemicIncome: number;
  postPandemicIncome: number;
  reason: string;
  declaration: boolean;
}

const Home = () => {
  const [selectedProvinceId, setSelectedProvinceId] = useState<string>("");
  const [selectedCityId, setSelectedCityId] = useState<string>("");
  const [selectedDistrictId, setSelectedDistrictId] = useState<string>("");
  const [isDeclarationChecked, setIsDeclarationChecked] =
    useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setLoading(true);

    const { idPhoto, familyCardPhoto, ...rest } = data;

    const success = Math.random() > 0.5;
    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (success) {
      localStorage.setItem("idPhoto", idPhoto[0].name);
      localStorage.setItem("familyCardPhoto", familyCardPhoto[0].name);

      router.push({
        pathname: "/preview",
        query: { ...rest },
      });
    } else {
      alert("Submission failed. Please try again.");
    }

    setLoading(false);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsDeclarationChecked(event.target.checked);
  };

  return (
    <main className="w-full h-auto p-6 lg:p-12">
      <div className="max-w-screen-lg lg:p-6 h-full mx-auto rounded-lg shadow-md">
        <h1 className="text-2xl lg:text-4xl lg:mb-10 font-bold mb-4">
          Formulir Bantuan Sosial
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Name */}
          <div className="mb-4">
            <label>Nama</label>
            <input
              {...register("name", { required: true })}
              className="mt-1 block w-full p-2 border rounded-md border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.name && (
              <span className="text-red-500">Nama wajib diisi</span>
            )}
          </div>

          {/* NIK & KK */}
          <div className="grid grid-cols sm:grid-cols-2 sm:gap-x-4">
            <div className="mb-4 w-full">
              <label>NIK</label>
              <input
                type="text"
                inputMode="numeric"
                {...register("nik", { required: true })}
                className="mt-1 block w-full p-2 border rounded-md border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.nik && (
                <span className="text-red-500">NIK wajib diisi</span>
              )}
            </div>

            <div className="mb-4 w-full">
              <label>Nomor KK</label>
              <input
                type="text"
                inputMode="numeric"
                {...register("familyCardNumber", { required: true })}
                className="mt-1 block w-full p-2 border rounded-md border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.familyCardNumber && (
                <span className="text-red-500">Nomor KK wajib diisi</span>
              )}
            </div>
          </div>

          {/* Photo Upload */}
          <div className="grid grid-cols sm:grid-cols-2 sm:gap-x-4">
            <div className="mb-4 border p-2 grid">
              <label>Foto KTP (Max 2MB)</label>
              <input
                type="file"
                {...register("idPhoto", { required: true })}
                accept=".jpg,.jpeg,.png,.bmp"
              />
              {errors.idPhoto && (
                <span className="text-red-500">Foto KTP wajib diisi</span>
              )}
            </div>

            <div className="mb-4 border p-2 grid">
              <label>Foto KK (Max 2MB)</label>
              <input
                type="file"
                {...register("familyCardPhoto", { required: true })}
                accept=".jpg,.jpeg,.png,.bmp"
              />
              {errors.familyCardPhoto && (
                <span className="text-red-500">Foto KK wajib diisi</span>
              )}
            </div>
          </div>

          {/* Age & Gender */}
          <div className="grid grid-cols sm:grid-cols-2 sm:gap-x-4">
            <div className="mb-4 w-full">
              <label>Usia</label>
              <input
                type="text"
                inputMode="numeric"
                {...register("age", { required: true })}
                className="mt-1 block w-full p-2 border rounded-md border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.age && (
                <span className="text-red-500">Usia wajib diisi</span>
              )}
            </div>

            <div className="mb-4 w-full">
              <label
                htmlFor="gender"
                className="block text-sm font-medium text-gray-700"
              >
                Jenis Kelamin
              </label>
              <select
                id="gender"
                {...register("gender", { required: true })}
                className="mt-1 block w-full p-2 border rounded-md border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Pilih Jenis Kelamin</option>
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
              {errors.gender && (
                <span className="text-red-500">
                  Jenis kelamin wajib dipilih
                </span>
              )}
            </div>
          </div>

          {/* Location Fields */}
          <div className="grid grid-cols sm:grid-cols-2 sm:gap-x-4">
            <div className="mb-4 w-full">
              <CustomInputField
                formMode="province"
                onSelect={(id) => {
                  setSelectedProvinceId(id);
                  setValue("province", id);
                }}
              />
            </div>
            {selectedProvinceId && (
              <div className="mb-4 w-full">
                <CustomInputField
                  formMode="city"
                  parentId={selectedProvinceId}
                  onSelect={(id) => {
                    setSelectedCityId(id);
                    setValue("city", id);
                  }}
                />
              </div>
            )}
            {selectedCityId && (
              <div className="mb-4 w-full">
                <CustomInputField
                  formMode="district"
                  parentId={selectedCityId}
                  onSelect={(id) => {
                    setSelectedDistrictId(id);
                    setValue("district", id);
                  }}
                />
              </div>
            )}
            {selectedDistrictId && (
              <div className="mb-4 w-full">
                <CustomInputField
                  formMode="village"
                  parentId={selectedDistrictId}
                  onSelect={(id) => setValue("village", id)}
                />
              </div>
            )}
          </div>

          {/* Address Fields */}
          <div className="mb-4">
            <label>Alamat</label>
            <input
              {...register("address", { required: true })}
              className="mt-1 block w-full p-2 border rounded-md border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.address && (
              <span className="text-red-500">Alamat wajib diisi</span>
            )}
          </div>

          <div className="grid grid-cols sm:grid-cols-2 sm:gap-x-4">
            <div className="mb-4">
              <label>RT</label>
              <input
                type="text"
                {...register("rt", { required: true })}
                className="mt-1 block w-full p-2 border rounded-md border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.rt && (
                <span className="text-red-500">RT wajib diisi</span>
              )}
            </div>

            <div className="mb-4">
              <label>RW</label>
              <input
                type="text"
                {...register("rw", { required: true })}
                className="mt-1 block w-full p-2 border rounded-md border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.rw && (
                <span className="text-red-500">RW wajib diisi</span>
              )}
            </div>
          </div>

          {/* Financial Info */}
          <div className="grid grid-cols sm:grid-cols-2 sm:gap-x-4">
            <div className="mb-4 w-full">
              <label>Pendapatan Sebelum Pandemi</label>
              <input
                type="text"
                inputMode="numeric"
                {...register("prePandemicIncome", { required: true })}
                className="mt-1 block w-full p-2 border rounded-md border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.prePandemicIncome && (
                <span className="text-red-500">
                  Pendapatan sebelum pandemi wajib diisi
                </span>
              )}
            </div>

            <div className="mb-4 w-full">
              <label>Pendapatan Setelah Pandemi</label>
              <input
                type="text"
                inputMode="numeric"
                {...register("postPandemicIncome", { required: true })}
                className="mt-1 block w-full p-2 border rounded-md border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.postPandemicIncome && (
                <span className="text-red-500">
                  Pendapatan setelah pandemi wajib diisi
                </span>
              )}
            </div>
          </div>

          {/* Reason */}
          <div className="mb-4">
            <label>Alasan</label>
            <textarea
              {...register("reason", { required: true })}
              className="mt-1 block w-full p-2 border rounded-md border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.reason && (
              <span className="text-red-500">Alasan wajib diisi</span>
            )}
          </div>

          {/* Declaration */}
          <div className="mb-4 flex gap-1.5">
            <input
              type="checkbox"
              {...register("declaration", { required: true })}
              onChange={handleCheckboxChange}
            />
            <label>Saya menyatakan bahwa data yang diisikan adalah benar</label>
            {errors.declaration && (
              <span className="text-red-500">Deklarasi harus dicentang</span>
            )}
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white rounded px-4 py-2 disabled:bg-gray-300"
            disabled={!isDeclarationChecked || loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </main>
  );
};

export default Home;
