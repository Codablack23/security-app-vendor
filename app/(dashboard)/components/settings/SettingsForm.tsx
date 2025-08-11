"use client";

import { ChangeEventHandler, FormEventHandler, useEffect, useState } from "react";
import EditIcon from "@/app/icons/edit";
import { useAuthContext } from "@/contexts/Auth";
import { CommonProvider } from "@/services/Common";
import { App } from "antd";
import { CustomSpinner } from "@/app/shared";
import { VendorProvider } from "@/services/Vendor";

const appearanceOptions = [
  { label: "Light Mode", value: "light" },
  { label: "Dark Mode", value: "dark" },
  { label: "System", value: "system" },
];

// ---------- REUSABLE COMPONENTS ----------

const FieldRow = ({
  label,
  value = "",
  readOnly = true,
  onChange,
}: {
  label: string;
  value?: string;
  readOnly?: boolean;
  onChange?: (value: string) => void;
}) => {
  const [isEditable, setIsEditable] = useState(false);

  const toggleEdit = () => setIsEditable((prev) => !prev);

  return (
    <div className="flex items-center border-b border-[#E0E0E0] py-4">
      <p className="text-lg font-bold">{label}</p>
      <div className="border flex items-center gap-x-4 ml-auto py-2 rounded-lg p-4 border-[#E0E0E0]">
        <input
          onChange={(e) => onChange?.(e.target.value)}
          className="w-full outline-0"
          readOnly={!isEditable}
          value={value}
        />
        {!readOnly && (
          <button onClick={toggleEdit} type="button">
            <EditIcon />
          </button>
        )}
      </div>
    </div>
  );
};

const ImageUploadRow = ({ avatar, name, loading, handleChange }: {
  avatar: string;
  name?: string,
  loading: boolean,
  handleChange: ChangeEventHandler<HTMLInputElement>
}) => {



  return (
    <div className="flex items-center border-b border-[#E0E0E0] py-4">
      <p className="text-lg font-bold">Image</p>
      <div className="flex items-center gap-x-2 ml-auto py-2">
        <div className="h-10 w-10 rounded-full bg-[#e0e0e0] overflow-hidden">
          {avatar && <img className="h-10 w-10 rounded-full" src={avatar} alt={name} />}
        </div>
        <label
          htmlFor="changeProfilePicture"
          className="px-4 cursor-pointer py-2 rounded-md bg-[#E0E0E0]"
        >
          {loading ? <CustomSpinner color="#000000" /> : <>Change</>}
        </label>
        <input
          disabled={loading}
          onChange={handleChange}
          type="file"
          accept="image/png, image/jpeg, image/gif"
          className="hidden"
          id="changeProfilePicture"
        />
        <p className="text-[#555555] text-sm">JPG, GIF or PNG. 1MB Max.</p>
      </div>
    </div>
  );
};


const AppearanceDropdown = ({
  appearance,
  setAppearance,
}: {
  appearance: string;
  setAppearance: (value: string) => void;
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setDropdownOpen((prev) => !prev)}
        className="px-4 py-2 bg-[#E0E0E0] rounded-md cursor-pointer w-36 text-left"
      >
        {appearanceOptions.find((opt) => opt.value === appearance)?.label}
      </button>

      {dropdownOpen && (
        <ul className="absolute z-10 mt-2 w-36 rounded-md bg-white border border-gray-300 shadow-md">
          {appearanceOptions.map((option) => (
            <li
              key={option.value}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                setAppearance(option.value);
                setDropdownOpen(false);
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const PasswordRow = ({ onEdit }: { onEdit: () => void }) => (
  <div className="flex items-center border-b border-[#E0E0E0] py-4">
    <div>
      <p className="text-lg font-bold">Password</p>
      <p className="text-[#999999] text-sm">Set a password to protect your account.</p>
    </div>
    <div className="ml-auto">
      <button type="button" onClick={onEdit} className="px-4 py-2 rounded-md bg-[#E0E0E0]">
        Edit
      </button>
    </div>
  </div>
);

const PasswordModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) =>
  open && (
    <div
      onClick={onClose}
      className="fixed inset-0 z-20 flex items-center justify-center bg-[rgba(0,0,0,0.4)]"
    >
      <section
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-lg max-w-[550px] w-full px-4 min-h-[431px] py-20"
      >
        <form className="max-w-[400px] mx-auto">
          <p className="text-3xl text-center text-[rgba(16,24,40,1)] font-semibold">
            Set New Password
          </p>
          <p className="text-center text-[rgba(71,84,103,1)]">
            Set your new password and continue your experience.
          </p>
          <div className="space-y-5 py-8">
            <input
              type="password"
              className="border border-[rgba(208,213,221,1)] w-full h-11 p-2 rounded-lg"
              placeholder="Enter new password"
            />
            <input
              type="password"
              className="border border-[rgba(208,213,221,1)] w-full h-11 p-2 rounded-lg"
              placeholder="Confirm new Password"
            />
          </div>
          <button className="h-12 w-full text-white bg-[rgba(47,93,168,1)] rounded-[32px] shadow-lg">
            Reset Password
          </button>
        </form>
      </section>
    </div>
  );

// ---------- MAIN FORM ----------

export default function SettingsForm() {
  const { auth, updateAuth } = useAuthContext();
  const vendor = auth.user?.vendor;

  const [loading, setLoading] = useState(false)
  const [modalOpen, setModalOpen] = useState(false);
  const [appearance, setAppearance] = useState("light");

  const [avatar, setAvatar] = useState(auth.user?.avatar ?? "")

  const [phoneNumber, setPhoneNumber] = useState(auth.user?.phone ?? "");
  const [secondaryPhone, setSecondaryPhone] = useState(
    vendor?.secondary_phone ?? ""
  );

  const { notification } = App.useApp();

  const [uploading, setUploading] = useState(false);
  const handleChange: ChangeEventHandler<HTMLInputElement> = async (e) => {
    setUploading(true);
    try {
      if (!e.target.files) {
        throw new Error("Please select a file to upload.");
      }

      const file = e.target.files.item(0);
      if (!file) {
        throw new Error("Please select a file to upload.");
      }

      console.log({ file })

      const res = await CommonProvider.uploadFile(file);

      if (res.status !== "success") {
        throw new Error(res.message);
      }

      // Update avatar after successful upload
      setAvatar(res.data?.url ?? avatar);

      notification.open({
        type: "success",
        message: "Upload Successful",
        description: "Your profile picture has been updated successfully.",
        placement: "topRight",
      });
    } catch (error) {
      notification.open({
        type: "error",
        message: "Upload Failed",
        description: (error as Error)?.message ?? "Could not upload file. Please try again.",
        placement: "topRight",
      });
    } finally {
      setUploading(false);
      // Reset file input so user can upload the same file again if needed
      e.target.value = "";
    }
  };

  useEffect(() => {
    setPhoneNumber(auth.user?.phone ?? "")
    setSecondaryPhone(vendor?.secondary_phone ?? "")
    setAvatar(auth.user?.avatar ?? "")
  }, [auth])

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {

      if (!vendor || !auth.user) {
        throw new Error("Sorry you are not authorized to continue")
      }

      const res = await VendorProvider.updateVendor(vendor._id, {
        secondary_phone: secondaryPhone,
        logo: avatar,
        secondary_email: vendor.secondary_email,
        user: auth.user._id,
        company_name: vendor.company_name,
        address: vendor.address
      });

      if (res.status !== "success") {
        throw new Error(res.message);
      }

      updateAuth({
        ...auth,
        user: {
          ...auth.user,
          phone: phoneNumber,
          vendor: {
            ...vendor,
            secondary_phone: secondaryPhone
          },
          avatar
        }
      })

      notification.open({
        type: "success",
        message: "Profile Update Successful",
        description: "Your profile has been updated successfully.",
        placement: "topRight",
      });
    } catch (error) {
      notification.open({
        type: "error",
        message: "Upload Failed",
        description: (error as Error)?.message ?? "Could not update profile. Please try again.",
        placement: "topRight",
      });
    } finally {
      setLoading(false);
      // Reset file input so user can upload the same file again if needed
    }
  }

  if (!vendor) return null;

  return (
    <>
      {loading && (
        <div className="bg-[rgba(0,0,0,0.2)] fixed top-0 left-0 w-full h-full flex justify-center items-center">
          <div className="bg-white text-center space-y-4 h-[60px] flex items-center justify-center w-[60px] p-4 rounded-full">
            <CustomSpinner size="large" color="#000000" />
          </div>
        </div>
      )}
      <PasswordModal open={modalOpen} onClose={() => setModalOpen(false)} />

      <form onSubmit={handleSubmit} className="w-full bg-white p-8 rounded-md">
        {/* General Settings */}
        <header className="flex items-center border-b border-[#E0E0E0] py-4">
          <div>
            <p className="text-lg font-bold">General Settings</p>
            <p className="text-[#999999] text-sm">
              View and update your general settings
            </p>
          </div>
          <button className="ml-auto text-white bg-[#2F5DA8] px-8 py-3 text-sm rounded-[40px]">
            Save Changes
          </button>
        </header>

        {/* Vendor Profile */}
        <header className="flex items-center border-b border-[#E0E0E0] py-4">
          <div>
            <p className="text-lg font-bold">Vendor Profile</p>
            <p className="text-[#999999] text-sm">View and update your profile</p>
          </div>
        </header>

        <FieldRow label="Company Name" value={vendor.company_name} />
        <FieldRow label="Manager Name" value={vendor.company_name} />
        <FieldRow label="Address" value={vendor.address} />
        <FieldRow
          label="Contact Details"
          value={phoneNumber}
          onChange={setPhoneNumber}
          readOnly={false}
        />
        <FieldRow
          label="Secondary Contact Details"
          value={secondaryPhone}
          onChange={setSecondaryPhone}
          readOnly={false}
        />

        <ImageUploadRow
          avatar={avatar}
          loading={uploading}
          handleChange={handleChange}
          name={`${auth.user?.firstName} ${auth.user?.lastName}`}
        />

        {/* Appearance */}
        <div className="flex items-center border-b border-[#E0E0E0] py-4">
          <div>
            <p className="text-lg font-bold">Appearance</p>
            <p className="text-[#999999] text-sm">
              Customize how your themes look on your device
            </p>
          </div>
          <div className="ml-auto">
            <AppearanceDropdown
              appearance={appearance}
              setAppearance={setAppearance}
            />
          </div>
        </div>

        {/* Password */}
        <PasswordRow onEdit={() => setModalOpen(true)} />
      </form>
    </>
  );
}
