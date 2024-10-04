// Import necessary modules and hooks (useState, useEffect)

// Initialize state variables:
// - 'category' ('natural' by default)
// - 'dates' (array of available dates)
// - 'selectedDate' (currently selected date)
// - 'images' (array of images for the selected date)
// - Loading states ('loadingDates', 'loadingImages')
// - Error handling ('error')

// useEffect to fetch available dates when 'category' changes:
// - Make API call to your server-side API route:
//   - '/api/epic?category={category}&endpoint=all'
// - Update 'dates' state with the fetched dates
// - Set 'selectedDate' to the latest date available
// - Handle loading and error states appropriately

// useEffect to fetch images when 'selectedDate' or 'category' changes:
// - Ensure 'selectedDate' is valid before making the call
// - Make API call to your server-side API route:
//   - '/api/epic?category={category}&endpoint=date&date={YYYY-MM-DD}'
// - Update 'images' state with the fetched image data
// - Handle loading and error states appropriately

// Render the page:
// - Display a heading for the EPIC Daily Imagery

// Render category selection:
// - Create a dropdown/select element for 'category'
//   - Options: 'natural', 'enhanced'
// - On change:
//   - Update 'category' state
//   - Reset 'images' and 'dates' states as necessary
//   - Trigger re-fetching of dates

// Render date selection:
// - If 'loadingDates' is true, show a loading indicator
// - Else, if 'dates' are available:
//   - Create a dropdown/select element populated with 'dates'
//   - On change, update 'selectedDate' state
// - Handle case where no dates are available

// Display error messages if any API call fails:
// - Check 'error' state and render error messages accordingly

// Render images:
// - If 'loadingImages' is true, show a loading indicator
// - Else, if 'images' are available:
//   - Display images in a grid or flex layout
//   - For each image:
//     - Construct the image URL using:
//       - 'category', 'selectedDate', and 'image' data from the image object
//     - Create an <img> element with:
//       - 'src' set to the constructed image URL
//       - 'alt' and 'title' attributes set to the image's 'caption'
//   - Apply styling for layout and responsiveness
// - Handle case where no images are available for the selected date

// Add loading indicators for better user experience during API calls:
// - Show appropriate messages or spinners while data is being fetched

// Handle edge cases:
// - No dates available for the selected category
// - No images available for the selected date
// - API errors or network issues (e.g., display error messages)

// Optional enhancements:
// - Implement caching or memoization to avoid redundant API calls
//   - Use React's useMemo or custom hooks as needed
// - Add CSS styling for responsiveness and better visuals
//   - Utilize CSS modules or styled-components
// - Include accessibility features:
//   - Proper labels for form controls
//   - 'alt' attributes for images
//   - Keyboard navigation support
// - Provide options for image types (e.g., 'jpg', 'png', 'thumbs')
//   - Allow users to select image quality or size
// - Implement image lazy loading for performance optimization
// - Add error boundaries to catch and handle rendering errors

// Clean up resources if necessary:
// - Use AbortController to cancel fetch requests if component unmounts
// - Clear timeouts or intervals if used

// Test the component thoroughly:
// - Ensure all functionalities work as expected
// - Test different categories and dates
// - Verify error handling and edge case management
// - Check for performance issues and optimize as needed

// Future TODO: When done, add a explanation piece to this page that explains
// how i was able to fetch and display all the data.

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface EpicData {
  identifier: string;
  caption: string;
  imageUrl: string;
  date: string;
  centroid_coordinates: {
    lat: number;
    lon: number;
  };
}

export default function EpicPage() {
  const [epicData, setEpicData] = useState<EpicData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchEpicData();
  }, []);

  const fetchEpicData = async () => {
    try {
      const response = await fetch("/api/epic");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setEpicData(data);
    } catch (err) {
      setError("Error fetching EPIC data");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center p-8">Loading...</div>;
  if (error) return <div className="text-center p-8 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">EPIC Earth Images</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {epicData.map((item) => (
          <div
            key={item.identifier}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <Image
              src={item.imageUrl}
              alt={item.caption}
              width={600}
              height={600}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">
                {new Date(item.date).toLocaleString()}
              </h2>
              <p className="text-gray-600 mb-2">{item.caption}</p>
              <p className="text-sm text-gray-500">
                Lat: {item.centroid_coordinates.lat.toFixed(2)}, Lon:{" "}
                {item.centroid_coordinates.lon.toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
