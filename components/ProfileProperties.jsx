"use client";

import deleteProperty from "@/app/actions/deleteProperty";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";

const ProfileProperties = ({ properties: initialProperties }) => {
  const [properties, setProperties] = useState(initialProperties);
  const [deletingId, setDeletingId] = useState(null);

  const handleDeleteProperty = async (propertyId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this property?"
    );

    if (!confirmed) return;

    try {
      setDeletingId(propertyId);

      await deleteProperty(propertyId);

      setProperties((prev) =>
        prev.filter((property) => property._id !== propertyId)
      );

      toast.success("Property deleted successfully");
    } catch (error) {
      toast.error("Failed to delete property");
    } finally {
      setDeletingId(null);
    }
  };

  return properties.map((property) => {
    const isDeleting = deletingId === property._id;

    return (
      <div className="mb-10" key={property._id}>
        <Link href={`/properties/${property._id}`}>
          <img
            className="h-32 w-full rounded-md object-cover"
            src={property.images[0]}
            alt={property.name}
            width={1000}
            height={200}
          />
        </Link>

        <div className="mt-2">
          <p className="text-lg font-semibold">{property.name}</p>
          <p className="text-gray-600">
            Address: {property.location.street} {property.location.city}{" "}
            {property.location.state}
          </p>
        </div>

        <div className="mt-2 flex gap-2 items-center">
          {/* EDIT BUTTON */}
          <Link
            href={`/properties/${property._id}/edit`}
            aria-disabled={isDeleting}
            className={`px-3 py-3 rounded-md text-white transition
              ${
                isDeleting
                  ? "bg-blue-400 pointer-events-none opacity-60 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
          >
            Edit
          </Link>

          {/* DELETE BUTTON */}
          <button
            type="button"
            disabled={isDeleting}
            onClick={() => handleDeleteProperty(property._id)}
            className={`flex items-center gap-2 px-3 py-2 rounded-md text-white transition
              ${
                isDeleting
                  ? "bg-red-400 cursor-not-allowed opacity-70"
                  : "bg-red-500 hover:bg-red-600"
              }`}
          >
            {isDeleting && (
              <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            )}
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    );
  });
};

export default ProfileProperties;
