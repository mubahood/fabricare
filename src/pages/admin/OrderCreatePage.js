import React, { useState, useCallback } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDropzone } from "react-dropzone";
// import { v4 as uuidv4 } from "uuid";

import { createOrder } from "../../features/orderSlice";
// Suppose these are your HTTP helpers for your Laravel endpoints
import { http_post } from "../../services/api";
import { useNavigate } from "react-router-dom";

// Generate a 50-character local_id for the order
function generateLocalId() {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < 50; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function OrderCreatePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // 1) local_id for this new order
  const [local_id] = useState(() => generateLocalId());

  // 2) Photos array: each photo has {file, previewUrl, uploading, serverUrl, error}
  const [photos, setPhotos] = useState([]);
  const [photoError, setPhotoError] = useState("");

  // 3) React Dropzone setup
  const onDrop = useCallback((acceptedFiles) => {
    const newPhotos = acceptedFiles.map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
      uploading: false,
      serverUrl: null,
      error: null,
    }));
    setPhotos((prev) => [...prev, ...newPhotos]);
    setPhotoError(""); // Clear photo error when a photo is added
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif"],
    },
    multiple: true,
  });

  // 4) Formik & Yup
  const formik = useFormik({
    initialValues: {
      pickup_address: "",
      house_unit_number: "",
      pickup_datetime: "",
      special_instructions: "",
    },
    validationSchema: Yup.object({
      pickup_address: Yup.string().required("Pickup address is required"),
      house_unit_number: Yup.string().required("House/Unit # is required"),
      pickup_datetime: Yup.string().required("Pickup date/time is required"),
      special_instructions: Yup.string().max(300, "Max 300 characters"),
    }),
    onSubmit: async (values) => {
      if (photos.length === 0) {
        setPhotoError("At least one photo is required");
        return;
      }

      try {
        // Step A: Upload all photos sequentially
        const uploaded_photos = await uploadAllPhotosSequentially(photos);

        // Step B: If all photos are uploaded (or there are none), create the order
        const orderData = {
          local_id,
          pickup_address: values.pickup_address,
          house_unit_number: values.house_unit_number,
          pickup_datetime: values.pickup_datetime,
          special_instructions: values.special_instructions,
          // You could store final photo URLs here
          photos: uploaded_photos,
        };

        await dispatch(createOrder(orderData)).unwrap();
        toast.success("Order created successfully!");

        // Reset form & photos
        formik.resetForm();
        setPhotos([]);
        // navigate to orders list or wherever
        navigate("/admin/dashboard"); // Redirect
      } catch (error) {
        console.error("Order creation error:", error);
        toast.error(error?.message || "Failed to create order");
      }
    },
  });

  // 5) Upload Photos One-by-One (Sequentially)
  async function uploadAllPhotosSequentially(photoArray) {
    const uploadedUrls = [];
    for (let i = 0; i < photoArray.length; i++) {
      const updatedPhoto = await uploadSinglePhoto(photoArray[i], i);
      if (updatedPhoto.serverUrl) {
        uploadedUrls.push(updatedPhoto.serverUrl);
      } else if (updatedPhoto.error) {
        // If any photo fails, we could choose to stop or continue
        // For example, let's just continue, but you might want to throw an error
        // throw new Error("A photo failed to upload.");
      }
    }
    return uploadedUrls;
  }

  // 6) Upload Single Photo to "post-media-upload"
  //    This mimics your Flutter and Laravel approach
  async function uploadSinglePhoto(photo, index) {
    if (photo.serverUrl || photo.uploading) {
      // Already uploaded or in progress
      return photo;
    }

    // Mark as uploading
    updatePhotoState(index, { uploading: true, error: null });

    try {
      // Build form data as Laravel expects
      // from your snippet, fields: parent_id, parent_endpoint, type, file, ...
      // We'll adapt them:
      const formData = new FormData();
      formData.append("parent_id", local_id);
      formData.append("parent_endpoint", "laundry-orders"); // adjust as needed
      formData.append("type", "CUSTOMER_PLACE_ORDER_PHOTOS");
      formData.append("note", "Photo uploaded from React form");
      formData.append("file", photo.file, photo.file.name);

      let response = null;
      try {
        response = await http_post("post-media-upload", formData);
      } catch (error) {
        console.error(error);
        throw new Error("Failed: " + error.message);
      }
      const serverUrl = response?.data_url || "no-url-from-server";
      // Mark as uploaded
      updatePhotoState(index, {
        uploading: false,
        serverUrl,
      });
      return { ...photo, uploading: false, serverUrl };
    } catch (error) {
      console.error("uploadSinglePhoto error 1:", error);
      updatePhotoState(index, {
        uploading: false,
        error: error.message || "Upload error",
      });
      return { ...photo, uploading: false, error: error.message };
    }
  }

  // Helper to update photo state by index
  function updatePhotoState(index, changes) {
    setPhotos((prev) =>
      prev.map((p, i) => (i === index ? { ...p, ...changes } : p))
    );
  }

  // Remove a photo from the list
  function removePhoto(index) {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  }

  // Button Disabled if any photo is uploading
  const anyPhotoUploading = photos.some((p) => p.uploading);

  return (
    <div className="container my-5">
      <ToastContainer />
      <h2>Create New Laundry Order</h2>
      {/* <p className="text-muted">Local ID: {local_id}</p> */}

      <form onSubmit={formik.handleSubmit}>
        {/* Pickup Address */}
        <div className="mb-3">
          <label className="form-label">Pickup Address</label>
          <input
            type="text"
            className={`form-control ${
              formik.touched.pickup_address && formik.errors.pickup_address
                ? "is-invalid"
                : ""
            }`}
            name="pickup_address"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.pickup_address}
          />
          {formik.touched.pickup_address && formik.errors.pickup_address && (
            <div className="invalid-feedback">
              {formik.errors.pickup_address}
            </div>
          )}
        </div>

        {/* House/Unit Number */}
        <div className="mb-3">
          <label className="form-label">House / Unit Number</label>
          <input
            type="text"
            className={`form-control ${
              formik.touched.house_unit_number &&
              formik.errors.house_unit_number
                ? "is-invalid"
                : ""
            }`}
            name="house_unit_number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.house_unit_number}
          />
          {formik.touched.house_unit_number &&
            formik.errors.house_unit_number && (
              <div className="invalid-feedback">
                {formik.errors.house_unit_number}
              </div>
            )}
        </div>

        {/* Pickup Date & Time */}
        <div className="mb-3">
          <label className="form-label">Pickup Date & Time</label>
          <input
            type="datetime-local"
            className={`form-control ${
              formik.touched.pickup_datetime && formik.errors.pickup_datetime
                ? "is-invalid"
                : ""
            }`}
            name="pickup_datetime"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.pickup_datetime}
          />
          {formik.touched.pickup_datetime && formik.errors.pickup_datetime && (
            <div className="invalid-feedback">
              {formik.errors.pickup_datetime}
            </div>
          )}
        </div>

        {/* Special Instructions */}
        <div className="mb-3">
          <label className="form-label">Special Instructions</label>
          <textarea
            className={`form-control ${
              formik.touched.special_instructions &&
              formik.errors.special_instructions
                ? "is-invalid"
                : ""
            }`}
            name="special_instructions"
            rows="3"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.special_instructions}
          />
          {formik.touched.special_instructions &&
            formik.errors.special_instructions && (
              <div className="invalid-feedback">
                {formik.errors.special_instructions}
              </div>
            )}
        </div>

        {/* Photo Uploader */}
        <div className="mb-3">
          <label className="form-label">
            Photos (drag & drop or click to select)
          </label>
          <div
            {...getRootProps()}
            className={`border border-secondary p-3 text-center ${
              isDragActive ? "bg-light" : ""
            }`}
            style={{ cursor: "pointer" }}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the files here...</p>
            ) : (
              <p>Drag 'n' drop files here, or click to select</p>
            )}
          </div>
          {photoError && <div className="text-danger mt-2">{photoError}</div>}

          {/* Preview */}
          <div className="mt-3 d-flex flex-wrap gap-3">
            {photos.map((photo, index) => (
              <div
                key={index}
                style={{
                  width: 120,
                  position: "relative",
                  border: "1px solid #ccc",
                  borderRadius: 5,
                  overflow: "hidden",
                }}
              >
                {photo.previewUrl && (
                  <img
                    src={photo.previewUrl}
                    alt={`upload-${index}`}
                    style={{ width: "100%", height: "auto" }}
                  />
                )}

                {/* Uploading overlay */}
                {photo.uploading && (
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      backgroundColor: "rgba(0, 0, 0, 0.5)",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "bold",
                    }}
                  >
                    Uploading...
                  </div>
                )}
                {/* Error overlay */}
                {photo.error && (
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      backgroundColor: "rgba(255, 0, 0, 0.5)",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "center",
                      padding: 4,
                    }}
                  >
                    {photo.error}
                  </div>
                )}
                {/* Remove Button */}
                <button
                  type="button"
                  className="btn btn-sm btn-danger"
                  style={{ position: "absolute", top: 5, right: 5 }}
                  onClick={() => removePhoto(index)}
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn btn-primary mt-3"
          disabled={formik.isSubmitting || anyPhotoUploading}
        >
          {formik.isSubmitting ? "Submitting..." : "Create Order"}
        </button>
      </form>
    </div>
  );
}

export default OrderCreatePage;
