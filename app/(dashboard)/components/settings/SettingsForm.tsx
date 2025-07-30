"use client";

import { useAuthContext } from "@/contexts/Auth";
import { useState } from "react";

const appearanceOptions = [
  { label: "Light Mode", value: "light" },
  { label: "Dark Mode", value: "dark" },
  { label: "System", value: "system" },
];

export default function SettingsForm() {
  const [modalOpen, setModalOpen] = useState(false);
  const [appearance, setAppearance] = useState("light");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const { auth } = useAuthContext();
  const user = auth.user;

  const FieldRow = ({ label, value }: { label: string; value?: string }) => (
    <div className="flex items-center border-b border-[#E0E0E0] py-4">
      <p className="text-lg font-bold">{label}</p>
      <div className="border ml-auto py-2 rounded-lg p-4 border-[#E0E0E0]">
        <input className="w-full outline-0" readOnly value={value || ""} />
      </div>
    </div>
  );

  const ImageUploadRow = () => (
    <div className="flex items-center border-b border-[#E0E0E0] py-4">
      <p className="text-lg font-bold">Image</p>
      <div className="flex items-center gap-x-2 ml-auto py-2">
        <div className="h-10 w-10 rounded-full bg-[#e0e0e0]"></div>
        <label htmlFor="changeProfilePicture" className="px-4 cursor-pointer py-2 rounded-md bg-[#E0E0E0]">
          Change
        </label>
        <input type="file" className="hidden" id="changeProfilePicture" />
        <p className="text-[#555555] text-sm">JPG, GIF or PNG. 1MB Max.</p>
      </div>
    </div>
  );

  const AppearanceDropdown = () => (
    <div className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="px-4 py-2 bg-[#E0E0E0] rounded-md cursor-pointer w-36 text-left"
      >
        {appearanceOptions.find(opt => opt.value === appearance)?.label}
      </button>

      {dropdownOpen && (
        <ul className="absolute z-10 mt-2 w-36 rounded-md bg-white border border-gray-300 shadow-md">
          {appearanceOptions.map(option => (
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

  const PasswordRow = () => (
    <div className="flex items-center border-b border-[#E0E0E0] py-4">
      <div>
        <p className="text-lg font-bold">Password</p>
        <p className="text-[#999999] text-sm">Set a password to protect your account.</p>
      </div>
      <div className="ml-auto">
        <button onClick={openModal} className="px-4 py-2 rounded-md bg-[#E0E0E0]">
          Edit
        </button>
      </div>
    </div>
  );

  const PasswordModal = () =>
    modalOpen && (
      <div
        onClick={closeModal}
        className="fixed inset-0 z-20 flex items-center justify-center bg-[rgba(0,0,0,0.4)]"
      >
        <section
          onClick={e => e.stopPropagation()}
          className="bg-white rounded-lg max-w-[550px] w-full px-4 min-h-[431px] py-20"
        >
          <form className="max-w-[400px] mx-auto">
            <p className="text-3xl text-center text-[rgba(16,24,40,1)] font-semibold">Set New Password</p>
            <p className="text-center text-[rgba(71,84,103,1)]">Set your new password and continue your experience.</p>
            <div className="space-y-5 py-8">
              <input type="password" className="border border-[rgba(208,213,221,1)] w-full h-11 p-2 rounded-lg" placeholder="Enter new password" />
              <input type="password" className="border border-[rgba(208,213,221,1)] w-full h-11 p-2 rounded-lg" placeholder="Confirm new Password" />
            </div>
            <button className="h-12 w-full text-white bg-[rgba(47,93,168,1)] rounded-[32px] shadow-lg">Reset Password</button>
          </form>
        </section>
      </div>
    );

  return (
    <>
      <PasswordModal />
      <form className="w-full bg-white p-8 rounded-md">
        <header className="flex items-center border-b border-[#E0E0E0] py-4">
          <div>
            <p className="text-lg font-bold">General Settings</p>
            <p className="text-[#999999] text-sm">View and update your general settings</p>
          </div>
          <button className="ml-auto text-white bg-[#2F5DA8] px-8 py-3 text-sm rounded-[40px]">Save Changes</button>
        </header>

        <header className="flex items-center border-b border-[#E0E0E0] py-4">
          <div>
            <p className="text-lg font-bold">Vendor Profile</p>
            <p className="text-[#999999] text-sm">View and update your profile</p>
          </div>
        </header>

        <FieldRow label="Company Name"  />
        <FieldRow label="Manager Name" />
        <FieldRow label="Address"/>
        <FieldRow label="Contact Details" />
        <FieldRow label="Secondary Contact Details" />

        <ImageUploadRow />

        <div className="flex items-center border-b border-[#E0E0E0] py-4">
          <div>
            <p className="text-lg font-bold">Appearance</p>
            <p className="text-[#999999] text-sm">Customize how your themes look on your device</p>
          </div>
          <div className="ml-auto">
            <AppearanceDropdown />
          </div>
        </div>

        <PasswordRow />
      </form>
    </>
  );
}
