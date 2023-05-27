"use client";
import { Formik, Form, ErrorMessage, Field } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import axios from "axios";
import { SUB_HEADING } from "../utils/font";
import { BASE_URL } from "../utils/constant";

async function fetchCategory() {
  const categories = await fetch(`${BASE_URL}categories`);
  const res = await categories.json();
  // console.log(res)
  return res;
}
export default function FormComponent() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [imageURL, setImageURL] = useState("");
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetchCategory();
        setCategories(res);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategories();
  }, []);

  function DropFileZone({ field, form }) {
    const handleChange = (event) => {
      const file = event.currentTarget.files[0];
      form.setFieldValue(field.name, file);
      setPreviewImage(URL.createObjectURL(file));
    };
    return (
      <>
        <input
          id="dropzone-file"
          type="file"
          name="file"
          onChange={handleChange}
          className="hidden"

        />
        {previewImage && (
          <img src={previewImage} alt="preview" className="rounded-md object-cover h-full w-full" />
        )}
      </>
    );
  }

  const FILE_SIZE = 1024 * 1024 * 10; // 10MB
  const SUPPORTED_FORMATS = [
    "image/jpg",
    "image/jpeg",
    "image/gif",
    "image/png",
  ];

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Required title"),
    price: Yup.number()
      .positive("Price has to be positive")
      .required("Require price"),
    description: Yup.string().min(4, "Must be at least 4 characters long"),
    categoryId: Yup.number().required("Require category"),
    file: Yup.mixed()
      .test("fileSize", "File too large", (value) => {
        console.log("value", value);
        if (!value) {
          return true;
        }
        return value.size <= FILE_SIZE;
      })
      .test("fileFormat", "Unsupported Format", (value) => {
        if (!value) {
          return true;
        }
        return SUPPORTED_FORMATS.includes(value.type);
      })
      .required("Required"),
  });
  const uploadImage = async (values) => {
    try {
      const response = await axios.post(`${BASE_URL}files/upload`, values.file);
      console.log(response);
      setIsLoading(false);
      return response.data.location;
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  };

  const insertProduct = async (data, resetForm) => {
    let { title, price, description, categoryId, images } = data;
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const productData = JSON.stringify({
      title,
      price,
      description,
      categoryId,
      images: [images],
    });

    let requestData = {
      method: "POST",
      headers: myHeaders,
      body: productData,
    };

    console.log("request data", requestData);
    const resp = await fetch(`${BASE_URL}products`, requestData);
    return resp.json();
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

      <div className="px-20 my-20 max-md:my-14 max-md:px-10  max-md:justify-center py-7 shadow-md rounded-2xl bg-gradient-to-r from-indigo-500 to-blue-500 w-2/5 max-md:w-[80%]">
        <h2 className="my-4 max-md:text-2xl">ADD PRODUCT</h2>

        <Formik
          initialValues={{
            title: "",
            price: 0,
            description: "",
            categoryId: 0,
            file: null,
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            const formData = new FormData();

            formData.append("file", values.file);
            const image = await uploadImage({ file: formData });
            console.log(values.file);
            console.log(values);
            values.images = image;

            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              insertProduct(values, resetForm).then((resp) => {
                alert("Insert product successfully");
              });
              setSubmitting(false);
            }, 1000);
          }}
        >
          {({ isSubmitting }) => (
            <Form className={`${SUB_HEADING.className} flex flex-col w-full`}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700">
                  Title
                </label>
                <Field
                  type="text"
                  id="title"
                  name="title"
                  className="border-transparent bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#E73B7B] focus:border-[#E73B7B] block w-full p-2.5"
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="price" className="block  text-gray-700">
                  Price
                </label>
                <Field
                  type="number"
                  id="price"
                  name="price"
                  className="w-full border-transparent bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-[#E73B7B] focus:border-[#E73B7B] block p-2.5"
                />
                <ErrorMessage
                  name="price"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="description" className="block text-gray-700">
                  Description
                </label>
                <Field
                  type="textarea"
                  id="description"
                  name="description"
                  className="bg-gray-50 border-transparent border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#E73B7B] focus:border-[#E73B7B] block w-full p-2.5 "
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="categoryId" className="block text-gray-700">
                  categoryId
                </label>
                <Field
                  as="select"
                  className=" bg-gray-50 border-transparent border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#E73B7B] focus:border-[#E73B7B] block w-full p-2.5 "
                  name="categoryId"
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="categoryId" />
              </div>

              <div className="flex mt-3 items-center justify-center w-full">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50   "
                >
                  <div className={`${previewImage && `hidden`} flex flex-col items-center justify-center`}>
                    <svg
                      aria-hidden="true"
                      className="w-10 h-10 mb-3 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      ></path>
                    </svg>
                    <p className="mb-2 text-sm text-gray-500  ">
                      <span className="font-semibold">Click to upload</span> or drag
                      and drop
                    </p>
                    <p className="text-xs text-gray-500  ">
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                  <Field
                    id="dropzone-file"
                    name="file"
                    type="file"
                    className="hidden"
                    component={DropFileZone}
                  />
                </label>
              </div>
              <ErrorMessage name="file">
                {(msg) => <div className="text-red-600">{msg}</div>}
              </ErrorMessage>
              <div className="flex justify-center">
                <button
                  type="submit"

                  disabled={isSubmitting}
                  className={`text-white flex mt-7 mb-4 w-full text-center lg:flex bg-[#E73B7B] hover:bg-[#BC2D62] focus:ring-4 justify-center focus:outline-none font-light max-md:rounded-2xl md:rounded-3xl md:px-5 md:py-2 py-1 px-4 ${SUB_HEADING.className}`}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>

    </main>
  );
}


