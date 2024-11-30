import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import { selectedAddressCoCo } from "../../asset/data/data";
import { pickUpTimeLieferung } from "../../asset/data/data";
import { pickUpTimeAbholung } from "../../asset/data/data";

import { pickUpDate } from "../../asset/data/data";
import { pickUpQuantity } from "../../asset/data/data";
import "./CollectionForm.css";
import CheckIcon from "../../asset/checkIcon.png";
import { data } from "autoprefixer";
import moment from "moment";
/* eslint-disable */


const CustomerForm = () => {

  const [listOrder, setListOrder] = useState();
  const [loading, setLoading] = useState(false);
  const [discount, setDiscount] = useState(false);
  const [formData, setFormData] = useState({
    user: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      pickupQuantity:"",
      branch:"" ,

// Abholung :
      wählenSieDieAdresseDesAbholung : "",
      gewünschterLieferterminAbholung: "",
      gewünschteLieferzeitAbholung: "",

// liferung :
      titel: "",
      vornameLieferung: "",
      nachnameLieferung: "",
      startBeLieferung: "",
      hausnrLieferung: "",
      adresszusatzLieferung: "",
      gewünschterLieferterminLieferung:"" ,
      gewünschteLieferzeitLieferung: "",
      plzLieferung: "",
      ortLieferung: "",
    },
    agreement: false,
  });
  const [boxAdd, setBoxAdd] = useState(false);
  // const [selectedRadio, setSelectedRadio] = useState(""); // Lưu trữ radio đã chọn (A, B hoặc C)
  // const [selectedAddress, setSelectedAddress] = useState(""); // Lưu trữ địa chỉ đã chọn
  // const [branches, setBranches] = useState([
  //   {
  //     name: "Breuninger Haus - Click & Collect",
  //     addresses: [
  //       "thành phố",
  //       "Địa chỉ A2",
  //       "Địa chỉ A3",
  //     ],
  //   },
  //   {
  //     name: "An Rechnungsadresse",
  //     addresses: [
  //       "Địa chỉ B1",
  //       "Địa chỉ B2",
  //       "Địa chỉ B3",
  //     ],
  //   },
  // ]);
  const [discountErrorMessage, setDiscountErrorMessage] = useState("");

  const handleVoucher = () => {
    const discountCode = formData.user.discount.toLowerCase();
    if (discountCode === "weihnacht2023") {
      setDiscountErrorMessage("");
      setDiscount(true);
    } else {
      setDiscountErrorMessage(
        "Bitte geben Sie einen gültigen Gutscheincode ein."
      );
      setDiscount(false);
    }
  };

  const branches = [
    {
      name: "Abholung", addresses: ["CôCô Indochine - Augustinerstraße 1, 90403 Nürnberg", " CôCô Sushi and Grill - Obstmarkt 3, 90762 Fürth", "CôCô Erlangen - Nürnberger Str. 31, 91052 Erlangen"]
    },{
      name: "Lieferung",
    }

  ];

  // const handleRadioChange = (value) => {
  //   setSelectedRadio(value);
  //   if (value !== "other") {
  //     const branch = branches.find((b) => b.name === value);
  //     setSelectedBranch(branch);
  //     setSelectedAddress(""); // Reset địa chỉ dropdown
  //     setCustomAddress(""); // Reset input text
  //   } else {
  //     setSelectedBranch(null);
  //     setSelectedAddress("");
  //   }
  // };
  // const handleAddressChange = (e) => {
  //   setSelectedAddress(e.target.value); // Cập nhật địa chỉ đã chọn
  // };
  // const selectedBranch = branches.find(branch => branch.name === selectedRadio);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    console.log("Check target:", e.target); // Log để kiểm tra thông tin input
    console.log("Current name:", name); // Log tên trường (name) của input
    console.log("Current value:", value);
    if (name === "agreement") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        user: {
          ...prevData.user,
          [name]: type === "checkbox" ? checked : value,
        },
      }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.agreement) {
      // Handle the case when the agreement is not accepted
      console.log("Please accept all terms and conditions.");
      return;
    }
    setLoading(true);
    // console.log('data :' ,data)
    console.log("data :", formData);
    // test

    try {
      const { data } = await axios.post(
        "https://quang-be.vercel.app/create-customer",
        {
          firstName: formData.user.first_name,
          lastName: formData.user.last_name,
          email: formData.user.email,
          phone: formData.user.phone,
          pickupQuantity: formData.user.pickupQuantity,

          // option branch 
          branch: formData.user.branch,

          // Abholung :

          wählenSieDieAdresseDesAbholung: formData.user.wählenSieDieAdresseDesAbholung,
          gewünschterLieferterminAbholung:formData.user.gewünschterLieferterminAbholung,
          gewünschteLieferzeitAbholung:formData.user.gewünschteLieferzeitAbholung,

          // liferung :
          titel:formData.user.titel ,
          vornameLieferung:formData.user.vornameLieferung ,
          nachnameLieferung:formData.user.nachnameLieferung ,
          startBeLieferung:formData.user.startBeLieferung ,
          hausnrLieferung:formData.user.hausnrLieferung ,
          adresszusatzLieferung:formData.user.adresszusatzLieferung ,
          gewünschterLieferterminLieferung:formData.user.gewünschterLieferterminLieferung ,
          gewünschteLieferzeitLieferung:formData.user.gewünschteLieferzeitLieferung ,
          plzLieferung:formData.user.plzLieferung ,
          ortLieferung:formData.user.ortLieferung ,


        },{
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true, // Nếu bạn đang sử dụng cookie hoặc yêu cầu xác thực
          })
      console.log(data);

      setBoxAdd(true);
      setListOrder(data);

      setTimeout(() => {
          setBoxAdd(false);
          window.location.reload();
      }, 3000);
    } catch (error) {
      // Handle error
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div
      className="bg-backGround opacity-95 flex flex-col w-full h-auto relative
        mobileSmall:px-4 mobileSmall:gap-5 mobileSmall:justify-center mobileSmall:items-center
        tablet:justify-start tablet:items-start tablet:w-full tablet:px-12
        laptop:justify-center laptop:items-center
        "
    >
      <div
        className="w-full text-center font-bold text-textTitle text-[50px] font-DancingScript gap-10 mt-10 relative
        mobileSmall:text-[35px]
        mobileLarge:text-[45px]
        tablet:text-[60px]
        desktop:text-[70px] desktop:gap-4
        desktopLarge:text-[100px] desktopLarge:gap-10

            "
      >
        Bestellformular
      </div>
      <div
        className="w-full text-center font-bold text-textColor font-Montserrat relative italic
                mobileSmall:text-[12px]
                tablet:text-[15px]
                laptop:text-[15px]
                desktop:text-[15px]
                desktopLarge:text-[15px]
            "
      >
        Bitte bestellen Sie Ihr Gänsepaket spätestens 2 Tage vor Abhol-oder
        Liefertermin.
      </div>
      <div
        className="w-full flex flex-col justify-center items-center font-Changa text-textColor
            "
      >
        <p
          className="font-bold
                    mobileSmall:text-[22px]
                    laptop:text-2xl
                    desktop:text-[26px]
                "
        >
          Ganspaket für 4 Personen
        </p>
        <p
          className="
                    mobileSmall:text-[15px]
                    laptop:text-xl
                "
        >
          148,-€{" "}
          <span
            className="
                    mobileSmall:text-[9px]
                    laptop:text-[11px]
                "
          >
            (inkl. Mwst)
          </span>
        </p>
      </div>
      <form
        className="font-Montserrat flex flex-col justify-center items-center gap-5 w-full
                tablet:px-8 tablet:gap-6
                laptop:px-12 laptop:gap-8 laptop:max-w-[800px]
                desktop:px-14 desktop:gap-10 desktop:max-w-[1000px]
                desktopLarge:px-18 desktopLarge:gap-12 desktopLarge:max-w-[1400px]
                "
        onSubmit={handleSubmit}
      >
        {loading && (
          <div className="absolute flex w-full h-full items-center justify-center">
            <div className="loader"></div>
          </div>
        )}
        <div
          className="flex justify-between w-full
                    mobileSmall:flex-col mobileSmall:gap-5 mobileSmall:w-full   
                    tablet:flex-row     
                "
        >
          <div
            className="flex
                        mobileSmall:flex-col mobileSmall:gap-2
                        tablet:w-1/2
                    "
          >
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={formData.user.first_name}
              onChange={handleChange}
              required
              className="placeholder:italic placeholder:text-sm placeholder:text-textColor bg-backGround text-textColor border-2 border-solid border-textColor rounded-lg focus:border-textColor focus:border-4
                            desktop:placeholder:text-xl desktop:text-xl
                            desktopLarge:placeholder:text-3xl desktopLarge:py-4 desktopLarge:text-3xl
                            "
              placeholder="Vorname*"
            />
            {/* {firstNameError && <span className="text-red-600 text-sm">First name is required</span>} */}
          </div>
          <div
            className="flex
                        mobileSmall:flex-col mobileSmall:gap-2
                        tablet:w-1/2
                    "
          >
            <input
              type="text"
              id="last_name"
              name="last_name"
              value={formData.user.last_name}
              onChange={handleChange}
              required
              className="placeholder:italic placeholder:text-sm placeholder:text-textColor bg-backGround text-textColor border-2 border-solid border-textColor rounded-lg focus:border-textColor focus:border-4
                            desktop:placeholder:text-xl desktop:text-xl
                            desktopLarge:placeholder:text-3xl desktopLarge:py-4 desktopLarge:text-3xl
                            "
              placeholder="Nachname*"
            />
            {/* {lastNameError && <span className="text-red-600 text-sm">Last name is required</span>} */}
          </div>
        </div>
        <div
          className="flex
                        mobileSmall:flex-col mobileSmall:gap-2 w-full"
        >
          <input
            type="email"
            id="email"
            name="email"
            value={formData.user.email}
            onChange={handleChange}
            required
            className="placeholder:italic placeholder:text-sm placeholder:text-textColor bg-backGround text-textColor border-2 border-solid border-textColor rounded-md focus:border-textColor focus:border-4
                        desktop:placeholder:text-xl desktop:text-xl
                        desktopLarge:placeholder:text-3xl desktopLarge:py-4 desktopLarge:text-3xl
                        "
            placeholder="E-Mail-Adresse*"
          />
          {/* {emailError && <span className="text-red-600 text-sm">Email is required</span>} */}
        </div>
        <div
          className="flex
                        mobileSmall:flex-col mobileSmall:gap-2 w-full"
        >
          <input
            type="number"
            id="phone"
            name="phone"
            value={formData.user.phone}
            onChange={handleChange}
            required
            className="placeholder:italic placeholder:text-sm placeholder:text-textColor bg-backGround text-textColor border-2 border-solid border-textColor rounded-md focus:border-textColor focus:border-4
                        desktop:placeholder:text-xl desktop:text-xl
                        desktopLarge:placeholder:text-3xl desktopLarge:py-4 desktopLarge:text-3xl
                        "
            placeholder="Telefon*"
          />
          {/* {phoneError && <span className="text-red-600 text-sm">Phone number is required</span>} */}
        </div>
        <div
          className="flex
                    mobileSmall:flex-col mobileSmall:gap-2 w-full
                    tablet:w-full"
        >
          <select
            id="pickupQuantity"
            name="pickupQuantity"
            value={formData.user.pickupQuantity}
            onChange={handleChange}
            required
            className="placeholder:italic placeholder:text-sm placeholder:text-textColor bg-backGround text-textColor border-2 border-solid border-textColor rounded-md focus:border-textColor focus:border-4
                        desktop:placeholder:text-xl desktop:text-xl
                        desktopLarge:placeholder:text-3xl desktopLarge:py-4 desktopLarge:text-3xl
                        "
          >
            <option value="" disabled className="italic text-sm">
              Anzahl der Gänsepakete*
            </option>
            {pickUpQuantity.map((item, index) => (
              <option
                className="text-sm text-textColor block"
                key={index}
                value={item.quantity}
              >
                {item.quantity}
              </option>
            ))}
          </select>
        </div>
        <div
          className="flex
    mobileSmall:flex-col mobileSmall:gap-2 w-full
    tablet:w-1/2"
        >
          {/* Radio buttons cho Chi nhánh A, B, C */}
          <div className="flex flex-col gap-2">
            <label className="text-textColor font-semibold text-lg">
              Lieferoptionen :
            </label>
            <div className="flex flex-wrap gap-2">
              {branches.map((branch, index) => (
                <label
                  key={index}
                  className=" text-textColor flex items-center space-x-2"
                >
                  <input
                    type="radio"
                    name="branch"
                    value={branch.name}
                    checked={formData.user.branch === branch.name}
                    onChange={handleChange}
                    className="form-radio text-blue-500"
                  />
                  <span>{branch.name}</span>
                </label>
              ))}
              {/* Radio cho phép nhập text */}
              {/* <label className="text-textColor flex items-center space-x-2">
                <input
                  type="radio"
                  name="branch"
                  value="other"
                  checked={formData.user.branch === "other"}
                  onChange={handleChange}
                  className="form-radio text-blue-500"
                />
                <span>Lieferung </span>
              </label> */}
            </div>
          </div>

          {/* Hiển thị dropdown nếu chọn một chi nhánh cụ thể */}
          {formData.user.branch == "Abholung"  && (
            <div className="flex flex-col gap-2 w-full mt-4">
              <label className=" text-textColor font-Montserrat text-lg">
              Wählen Sie die Adresse des CôCô :
              </label>
              <select
                id="wählenSieDieAdresseDesAbholung"
                name="wählenSieDieAdresseDesAbholung"
                value={formData.user.wählenSieDieAdresseDesAbholung}
                
                onChange={handleChange}
                required
                className="placeholder:italic placeholder:text-sm placeholder:text-textColor bg-backGround text-textColor border-2 border-solid border-textColor rounded-md focus:border-textColor focus:border-4 desktop:placeholder:text-xl desktop:text-xl desktopLarge:placeholder:text-3xl desktopLarge:py-4 desktopLarge:text-3xl"
              >
                <option value="" disabled className="italic text-sm">
                  {/* Wählen Sie die Adresse des CôCô */}
                </option>
                {branches[0].addresses.map((address, index) => (
                  <option
                    className="text-sm text-textColor block"
                    key={index}
                    value={address}
                  >
                    {address}
                  </option>
                ))}
              </select>
           
              <label className=" text-textColor font-Montserrat text-lg">
              Gewünschter Liefertermin
              </label>
              <select
                id="gewünschterLieferterminAbholung"
                name="gewünschterLieferterminAbholung"
                value={formData.user.gewünschterLieferterminAbholung}
                onChange={handleChange}
                required
                className="placeholder:italic placeholder:text-sm placeholder:text-textColor bg-backGround text-textColor border-2 border-solid border-textColor rounded-md focus:border-textColor focus:border-4 desktop:placeholder:text-xl desktop:text-xl desktopLarge:placeholder:text-3xl desktopLarge:py-4 desktopLarge:text-3xl"
              >
                <option value="" disabled className="italic text-sm">
                  {/* Abholdatum */}
                </option>
                {pickUpDate.map((item, index) => (
                  <option
                    className="text-sm text-textColor block"
                    key={index}
                    value={moment(item.date).format("DD.MM.YYYY")}
                  >
                    {moment(item.date).format("DD.MM.YYYY")} {/* Định dạng ngày theo ý muốn */}
                  </option>
                ))}
              </select>

              <label className=" text-textColor font-Montserrat text-lg">
              Gewünschte Lieferzeit
              </label>
              <select
                id="gewünschteLieferzeitAbholung"
                name="gewünschteLieferzeitAbholung"
                value={formData.user.gewünschteLieferzeitAbholung}
                onChange={handleChange}
                required
                className="placeholder:italic placeholder:text-sm placeholder:text-textColor bg-backGround text-textColor border-2 border-solid border-textColor rounded-md focus:border-textColor focus:border-4 desktop:placeholder:text-xl desktop:text-xl desktopLarge:placeholder:text-3xl desktopLarge:py-4 desktopLarge:text-3xl"
              >
                <option value="" disabled className="italic text-sm">
                {/* Gewünschter Liefertermin */}
                </option>
                {pickUpTimeAbholung.map((item, index) => (
                  <option
                    className="text-sm text-textColor block"
                    key={index}
                    value={item.time}
                  >
                    {item.time}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Hiển thị input nếu chọn "Lieferung" */}
          {formData.user.branch == "Lieferung"  && (
            <div className="flex flex-col gap-2 w-full mt-4">
              <label className=" text-textColor font-Montserrat text-lg">
                Titel (optional) :
              </label>
              <input
                type="text"
                id="titel"
                name="titel"
                value={formData.user.titel}
                onChange={handleChange}
                required
                className="placeholder:italic placeholder:text-sm placeholder:text-textColor bg-backGround text-textColor border-2 border-solid border-textColor rounded-md focus:border-textColor focus:border-4 desktop:placeholder:text-xl desktop:text-xl desktopLarge:placeholder:text-3xl desktopLarge:py-4 desktopLarge:text-3xl"
                placeholder=""
              />
              <label className=" text-textColor font-Montserrat text-lg">
                Vorname :
              </label>
              <input
                type="text"
                id="vornameLieferung"
                name="vornameLieferung"
                value={formData.user.vornameLieferung}
                onChange={handleChange}
                handleChange
                required
                className="placeholder:italic placeholder:text-sm placeholder:text-textColor bg-backGround text-textColor border-2 border-solid border-textColor rounded-md focus:border-textColor focus:border-4 desktop:placeholder:text-xl desktop:text-xl desktopLarge:placeholder:text-3xl desktopLarge:py-4 desktopLarge:text-3xl"
              // placeholder="Geben Sie Ihre Adresse ein"
              />
              <label className=" text-textColor font-Montserrat text-lg">
                Nachname :
              </label>
              <input
                type="text"
                id="nachnameLieferung"
                name="nachnameLieferung"
                value={formData.user.nachnameLieferung}
                onChange={handleChange}
                required
                className="placeholder:italic placeholder:text-sm placeholder:text-textColor bg-backGround text-textColor border-2 border-solid border-textColor rounded-md focus:border-textColor focus:border-4 desktop:placeholder:text-xl desktop:text-xl desktopLarge:placeholder:text-3xl desktopLarge:py-4 desktopLarge:text-3xl"
              // placeholder="Geben Sie Ihre Adresse ein"
              />
              <label className=" text-textColor font-Montserrat text-lg">
                Straße & Hausnr :
              </label>
              <div className="flex items-center gap-5">
                <input
                  type="text"
                  id="startBeLieferung"
                  name="startBeLieferung"
                  value={formData.user.startBeLieferung}
                  onChange={handleChange}
                  required
                  className="w-3/5  placeholder:italic placeholder:text-sm placeholder:text-textColor bg-backGround text-textColor border-2 border-solid border-textColor rounded-md focus:border-textColor focus:border-4 desktop:placeholder:text-xl desktop:text-xl desktopLarge:placeholder:text-3xl desktopLarge:py-4 desktopLarge:text-3xl"
                // placeholder="Geben Sie Ihre Adresse ein"
                />
                <input
                  type="text"
                  id="hausnrLieferung"
                  name="hausnrLieferung"
                  value={formData.user.hausnrLieferung}
                  onChange={handleChange}
                  required
                  className="w-2/5 placeholder:italic placeholder:text-sm placeholder:text-textColor bg-backGround text-textColor border-2 border-solid border-textColor rounded-md focus:border-textColor focus:border-4 desktop:placeholder:text-xl desktop:text-xl desktopLarge:placeholder:text-3xl desktopLarge:py-4 desktopLarge:text-3xl"
                // placeholder="Geben Sie Ihre Adresse ein"
                />
              </div>
              <label className=" text-textColor font-Montserrat text-lg">
                Adresszusatz (optional) :
              </label>

              <input
                type="text"
                id="adresszusatzLieferung"
                name="adresszusatzLieferung"
                value={formData.user.adresszusatzLieferung}
                onChange={handleChange}
                required
                className="placeholder:italic placeholder:text-sm placeholder:text-textColor bg-backGround text-textColor border-2 border-solid border-textColor rounded-md focus:border-textColor focus:border-4 desktop:placeholder:text-xl desktop:text-xl desktopLarge:placeholder:text-3xl desktopLarge:py-4 desktopLarge:text-3xl"
              // placeholder="Geben Sie Ihre Adresse ein"
              />

              <label className=" text-textColor font-Montserrat text-lg">
                Gewünschter Liefertermin
              </label>
              <select
                id="gewünschterLieferterminLieferung"
                name="gewünschterLieferterminLieferung"
                value={formData.user.gewünschterLieferterminLieferung}
                onChange={handleChange}
                required
                className="placeholder:italic placeholder:text-sm placeholder:text-textColor bg-backGround text-textColor border-2 border-solid border-textColor rounded-md focus:border-textColor focus:border-4 desktop:placeholder:text-xl desktop:text-xl desktopLarge:placeholder:text-3xl desktopLarge:py-4 desktopLarge:text-3xl"
              >
                <option value="" disabled className="italic text-sm">
                  {/* Abholdatum  */}
                </option>
                {pickUpDate.map((item, index) => (
                  <option
                    className="text-sm text-textColor block"
                    key={index}
                    value={moment(item.date).format("DD.MM.YYYY")}
                  >
                    {moment(item.date).format("DD.MM.YYYY")} {/* Định dạng ngày theo ý muốn */}
                  </option>
                ))}
              </select>

              <label className=" text-textColor font-Montserrat text-lg">
                Gewünschte Lieferzeit
              </label>
              <select
                id="gewünschteLieferzeitLieferung"
                name="gewünschteLieferzeitLieferung"
                value={formData.user.gewünschteLieferzeitLieferung}
                onChange={handleChange}
                required
                className="placeholder:italic placeholder:text-sm placeholder:text-textColor bg-backGround text-textColor border-2 border-solid border-textColor rounded-md focus:border-textColor focus:border-4 desktop:placeholder:text-xl desktop:text-xl desktopLarge:placeholder:text-3xl desktopLarge:py-4 desktopLarge:text-3xl"
              >
                <option value="" disabled className="italic text-sm">
                  {/* Gewünschte Lieferzeit */}
                </option>
                {pickUpTimeLieferung.map((item, index) => (
                  <option
                    className="text-sm text-textColor block"
                    key={index}
                    value={item.time}
                  >
                    {item.time}
                  </option>
                ))}
              </select>

              <label className=" text-textColor font-Montserrat text-lg">
                PLZ & ORT :
              </label>
              <div className="flex items-center gap-5">
                <input
                  type="text"
                  id="plzLieferung"
                  name="plzLieferung"
                  value={formData.user.plzLieferung}
                  onChange={handleChange}
                  required
                  className="w-2/5  placeholder:italic placeholder:text-sm placeholder:text-textColor bg-backGround text-textColor border-2 border-solid border-textColor rounded-md focus:border-textColor focus:border-4 desktop:placeholder:text-xl desktop:text-xl desktopLarge:placeholder:text-3xl desktopLarge:py-4 desktopLarge:text-3xl"
                // placeholder="Geben Sie Ihre Adresse ein"
                />
                <input
                  type="text"
                  id="ortLieferung"
                  name="ortLieferung"
                  value={formData.user.ortLieferung}
                  onChange={handleChange}
                  required
                  className="w-3/5 placeholder:italic placeholder:text-sm placeholder:text-textColor bg-backGround text-textColor border-2 border-solid border-textColor rounded-md focus:border-textColor focus:border-4 desktop:placeholder:text-xl desktop:text-xl desktopLarge:placeholder:text-3xl desktopLarge:py-4 desktopLarge:text-3xl"
                // placeholder="Geben Sie Ihre Adresse ein"
                />
              </div>

              <label className=" text-textColor font-Montserrat text-lg">
                Land{" "}
              </label>
              <label className=" text-textColor font-Montserrat text-lg">
                Deutschaland{" "}
              </label>
            </div>
          )}

         
        </div>
        <div
          className="flex w-full font-Changa
                        mobileSmall:flex-col mobileSmall:gap-2
                        tablet:w-full
                    "
        >
          <div className="flex flex-col">
            <label
              className="text-textColor
                            mobileSmall:text-xl
                            desktop:text-2xl
                        "
            >
              Gutscheincode Eingeben
            </label>
            {/* <label className="text-textColor italic
                            mobileSmall:text-[12px]
                            desktop:text-[16px]
                        ">(Ihr Vorteil bei dieser Bestellung 128,-€ )</label> */}
          </div>

          <div className="flex flex-row gap-3 w-full h-auto">
            <input
              type="text"
              id="discount"
              name="discount"
              value={formData.user.discount}
              onChange={handleChange}
              // required
              className={`w-[185px] placeholder:italic placeholder:text-sm placeholder:text-textColor bg-backGround text-textColor border-2 border-solid ${discount ? "border-red-500" : "border-textColor"
                } rounded-lg focus:border-textColor focus:border-4
                            desktop:placeholder:text-xl desktop:text-xl
                            desktopLarge:placeholder:text-3xl desktopLarge:py-4 desktopLarge:text-3xl
                        `}
              placeholder="Gutscheincode Eingeben"
            />
            <div
              className="w-[90px] font-Changa flex justify-center py-2 px-3 bg-[#ffbb33] text-[#2d2322] font-extrabold over:border-4 hover:border-white hover:bg-[#ffbb3a] hover:text-white rounded-md cursor-pointer "
              onClick={handleVoucher}
            >
              <button
                className="
                    desktop:text-xl
                    desktopLarge:text-3xl"
                type="button"
              >
                EINLÖSEN
              </button>
            </div>
          </div>

          {formData.user.discount !== "" && (
            <>
              {discountErrorMessage && (
                <div className="text-red-500 font-bold">
                  {discountErrorMessage}
                </div>
              )}

              {discount && (
                <div className="text-yellow-400 font-bold">
                  Ihr Vorteil bei dieser Bestellung{" "}
                
                </div>
              )}
            </>
          )}
        </div>
        <div className="flex justify-start gap-2 w-full">
          <input
            type="checkbox"
            id="agreement"
            name="agreement"
            checked={formData.agreement}
            onChange={handleChange}
            className="desktopLarge:w-10 desktopLarge:h-10 desktopLarge:text-3xl"
            required
          />
          <label
            htmlFor="agreement"
            className="text-textColor font-Montserrat text-sm
                        desktop:placeholder:text-xl desktop:text-xl
                        desktopLarge:placeholder:text-3xl desktopLarge:py-4 desktopLarge:text-3xl
                    "
          >
            Ich bestätige, dass ich die{" "}
            <a
              href="https://coco.lieferbude.de/static/pdf/terms_and_conditions.3f0f42936d6d.pdf"
              className="underline"
              target="_blank"
            >
              Allgemeinen Geschäftsbedingungen
            </a>{" "}
            des Online-Stores einschließlich der
            <a
              href="https://coco.lieferbude.de/static/pdf/privacy_policy.adb8727a38b1.pdf"
              className="underline"
              target="_blank"
            >
              {" "}
              Danteschutzrichtlinien
            </a>{" "}
            gelesen und akzeptiert habe
          </label>
        </div>
        <Modal
          isOpen={boxAdd}
          onRequestClose={() => setBoxAdd(false)}
          overlayClassName="popup-overlay"
          className="popup-content"
        >
          <button
            onClick={() => setBoxAdd(false)}
            className="text-2xl text-white w-7 h-7 ml-auto"
          >
            x
          </button>

          <div className="flex flex-col gap-2 text-white text-base justify-center items-center p-2 desktop:gap-4">
            <img src={CheckIcon} className="w-20 h-20" />
            <span
              className="font-DancingScript text-3xl text-center
                            desktop:text-5xl desktop:mt-10
                        "
            >
              CÔCÔ
            </span>
            <span className="font-bold text-center desktop:text-3xl">
              Vielen Dank für Ihren Einkauf bei
            </span>
            <p className="font-bold text-center desktop:text-3xl">CÔCÔ</p>
            <span className="text-center desktop:text-3xl">
              Ihre Bestellung Nr.{listOrder?.order_number} wird berücksichtigt.
            </span>
            <span className="text-center desktop:text-3xl">
              Wir senden Ihnen eine Bestellbestätigung an:
              {formData.user.email}
            </span>
          </div>
        </Modal>
        <div className="w-full flex justify-center px-3 py-4 bg-[#ffbb33] text-[#2d2322] font-extrabold over:border-4 hover:border-white hover:bg-[#ffbb3a] hover:text-white` rounded-md mb-6 cursor-pointer desktopLarge:px-5 desktopLarge:py-7 ">
          <button
            className="w-full h-full
                    desktop:text-xl
                    desktopLarge:text-3xl"
            type="submit"
          >
            Absenden
          </button>
        </div>
      </form>
    </div>
  );
};

export default CustomerForm;
