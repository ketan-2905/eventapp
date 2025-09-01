// "use client";
// import React from 'react';
// import { Calendar, Clock, MapPin, Users, Plus, X, Upload, DollarSign } from 'lucide-react';
// import { useForm, useFieldArray, Controller } from 'react-hook-form';

// // TypeScript interfaces
// interface Club {
//   id: string;
//   name: string;
// }

// interface TimelineItem {
//   title: string;
//   details: string;
//   startTime: string;
//   endTime: string;
//   order: number;
// }

// interface QnAItem {
//   question: string;
//   answer: string;
// }

// interface EventFormData {
//   title: string;
//   description: string;
//   category: 'TECHNICAL' | 'CULTURAL' | 'SPORTS' | 'ACADEMIC' | 'SOCIAL';
//   clubId: string;
//   venue: string;
//   startAt: string;
//   endAt: string;
//   capacity: number;
//   registrationOpensAt: string;
//   registrationClosesAt: string;
//   isPaid: boolean;
//   price: number;
//   eventWebUrl: string;
//   timeLines: TimelineItem[];
//   qnas: QnAItem[];
//   termsAndConditions: string;
// }

// // Mock clubs data
// const mockClubs: Club[] = [
//   { id: 'club-tech', name: 'Technology Club' },
//   { id: 'club-cultural', name: 'Cultural Society' },
//   { id: 'club-sports', name: 'Sports Club' },
//   { id: 'club-academic', name: 'Academic Association' },
//   { id: 'club-social', name: 'Social Impact Club' },
// ];

// const EventCreationForm: React.FC = () => {
//   const {
//     register,
//     handleSubmit,
//     control,
//     watch,
//     setValue,
//     formState: { errors, isSubmitting }
//   } = useForm<EventFormData>({
//     defaultValues: {
//       category: 'TECHNICAL',
//       clubId: '',
//       isPaid: false,
//       price: 0,
//       capacity: 50,
//       timeLines: [{ title: '', details: '', startTime: '', endTime: '', order: 1 }],
//       qnas: [{ question: '', answer: '' }],
//       termsAndConditions: '',
//     }
//   });

//   const { fields: timelineFields, append: appendTimeline, remove: removeTimeline } = useFieldArray({
//     control,
//     name: "timeLines"
//   });

//   const { fields: qnaFields, append: appendQna, remove: removeQna } = useFieldArray({
//     control,
//     name: "qnas"
//   });

//   const isPaid = watch('isPaid');

//   const onSubmit = async (data: EventFormData) => {
//     try {
//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 2000));

//       console.log('Event created successfully:', data);
//       alert('Event created successfully!');

//       // Display the form data in the console
//       console.log('Form Data:', JSON.stringify(data, null, 2));

//     } catch (error) {
//       alert('Error creating event. Please try again.');
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto text-gray-600 bg-white shadow-xl rounded-lg overflow-hidden">
//       <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-6">
//         <h1 className="text-3xl font-bold text-gray-700">Create New Event</h1>
//         <p className="text-purple-100 mt-2">Fill in the details to create your campus event</p>
//       </div>

//       <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-8">
//         {/* Basic Information */}
//         <section>
//           <h2 className="text-xl font-semibold text-gray-900 mb-4">Basic Information</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Event Title *
//               </label>
//               <input
//                 {...register('title', { required: 'Title is required', minLength: { value: 3, message: 'Title must be at least 3 characters' } })}
//                 className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 text-gray-500 focus:border-transparent ${
//                   errors.title ? 'border-red-500' : 'border-gray-300'
//                 }`}
//                 placeholder="Enter event title"
//               />
//               {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Category *
//               </label>
//               <select
//                 {...register('category')}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-gray-500 focus:border-transparent"
//               >
//                 <option value="TECHNICAL">Technical</option>
//                 <option value="CULTURAL">Cultural</option>
//                 <option value="SPORTS">Sports</option>
//                 <option value="ACADEMIC">Academic</option>
//                 <option value="SOCIAL">Social</option>
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Organizing Club *
//               </label>
//               <select
//                 {...register('clubId', { required: 'Club selection is required' })}
//                 className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 text-gray-500 focus:border-transparent ${
//                   errors.clubId ? 'border-red-500' : 'border-gray-300'
//                 }`}
//               >
//                 <option value="">Select a club</option>
//                 {mockClubs.map(club => (
//                   <option key={club.id} value={club.id}>{club.name}</option>
//                 ))}
//               </select>
//               {errors.clubId && <p className="text-red-500 text-sm mt-1">{errors.clubId.message}</p>}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Venue *
//               </label>
//               <div className="relative">
//                 <MapPin className="absolute top-1/2 left-3 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                 <input
//                   {...register('venue', { required: 'Venue is required', minLength: { value: 2, message: 'Venue must be at least 2 characters' } })}
//                   className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 text-gray-500 focus:border-transparent ${
//                     errors.venue ? 'border-red-500' : 'border-gray-300'
//                   }`}
//                   placeholder="Event venue"
//                 />
//               </div>
//               {errors.venue && <p className="text-red-500 text-sm mt-1">{errors.venue.message}</p>}
//             </div>
//           </div>

//           <div className="mt-6">
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Event Description *
//             </label>
//             <textarea
//               {...register('description', { required: 'Description is required', minLength: { value: 10, message: 'Description must be at least 10 characters' } })}
//               rows={4}
//               className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 text-gray-500 focus:border-transparent ${
//                 errors.description ? 'border-red-500' : 'border-gray-300'
//               }`}
//               placeholder="Describe your event..."
//             />
//             {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
//           </div>
//         </section>

//         {/* Date & Time */}
//         <section>
//           <h2 className="text-xl font-semibold text-gray-900 mb-4">Date & Time</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Start Date & Time *
//               </label>
//               <div className="relative">
//                 <Calendar className="absolute top-1/2 left-3 transform -translate-y-1/2  w-5 h-5 text-gray-400" />
//                 <input
//                   type="datetime-local"
//                   {...register('startAt', { required: 'Start time is required' })}
//                   className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 text-gray-500 focus:border-transparent ${
//                     errors.startAt ? 'border-red-500' : 'border-gray-300'
//                   }`}
//                 />
//               </div>
//               {errors.startAt && <p className="text-red-500 text-sm mt-1">{errors.startAt.message}</p>}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 End Date & Time *
//               </label>
//               <div className="relative">
//                 <Clock className="absolute top-1/2 left-3 transform -translate-y-1/2  w-5 h-5 text-gray-400" />
//                 <input
//                   type="datetime-local"
//                   {...register('endAt', {
//                     required: 'End time is required',
//                     validate: (value, formValues) =>
//                       new Date(value) > new Date(formValues.startAt) || 'End time must be after start time'
//                   })}
//                   className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 text-gray-500 focus:border-transparent ${
//                     errors.endAt ? 'border-red-500' : 'border-gray-300'
//                   }`}
//                 />
//               </div>
//               {errors.endAt && <p className="text-red-500 text-sm mt-1">{errors.endAt.message}</p>}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Registration Opens *
//               </label>
//               <input
//                 type="datetime-local"
//                 {...register('registrationOpensAt', { required: 'Registration open time is required' })}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-gray-500 focus:border-transparent"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Registration Closes *
//               </label>
//               <input
//                 type="datetime-local"
//                 {...register('registrationClosesAt', {
//                   required: 'Registration close time is required',
//                   validate: (value, formValues) =>
//                     new Date(value) > new Date(formValues.registrationOpensAt) || 'Registration close must be after registration open'
//                 })}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-gray-500 focus:border-transparent"
//               />
//             </div>
//           </div>
//         </section>

//         {/* Capacity & Pricing */}
//         <section>
//           <h2 className="text-xl font-semibold text-gray-900 mb-4">Capacity & Pricing</h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Capacity *
//               </label>
//               <div className="relative">
//                 <Users className="absolute top-1/2 left-3 transform -translate-y-1/2  w-5 h-5 text-gray-400" />
//                 <input
//                   type="number"
//                   min="1"
//                   {...register('capacity', {
//                     required: 'Capacity is required',
//                     min: { value: 1, message: 'Capacity must be at least 1' },
//                     valueAsNumber: true
//                   })}
//                   className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
//                     errors.capacity ? 'border-red-500' : 'border-gray-300'
//                   }`}
//                   placeholder="Max attendees"
//                 />
//               </div>
//               {errors.capacity && <p className="text-red-500 text-sm mt-1">{errors.capacity.message}</p>}
//             </div>

//             <div>
//               <label className="flex items-center space-x-2 mb-2">
//                 <input
//                   type="checkbox"
//                   {...register('isPaid')}
//                   className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
//                 />
//                 <span className="text-sm font-medium text-gray-700">Paid Event</span>
//               </label>
//             </div>

//             {isPaid && (
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Price (₹) *
//                 </label>
//                 <div className="relative">
//                   <DollarSign className="absolute top-1/2 left-3 transform -translate-y-1/2  w-5 h-5 text-gray-400" />
//                   <input
//                     type="number"
//                     min="1"
//                     {...register('price', {
//                       required: isPaid ? 'Price is required for paid events' : false,
//                       min: { value: 1, message: 'Price must be at least 1' },
//                       valueAsNumber: true
//                     })}
//                     className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
//                       errors.price ? 'border-red-500' : 'border-gray-300'
//                     }`}
//                     placeholder="Event price"
//                   />
//                 </div>
//                 {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
//               </div>
//             )}
//           </div>
//         </section>

//         {/* Event Website */}
//         <section>
//           <h2 className="text-xl font-semibold text-gray-900 mb-4">Additional Information</h2>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Event Website URL
//             </label>
//             <input
//               type="url"
//               {...register('eventWebUrl')}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//               placeholder="https://example.com/event"
//             />
//           </div>
//         </section>

//         {/* Timeline */}
//         <section>
//           <div className="flex items-center justify-between mb-4">
//             <h2 className="text-xl font-semibold text-gray-900">Event Timeline</h2>
//             <button
//               type="button"
//               onClick={() => appendTimeline({ title: '', details: '', startTime: '', endTime: '', order: timelineFields.length + 1 })}
//               className="flex items-center px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
//             >
//               <Plus className="w-4 h-4 mr-1" />
//               Add Timeline Item
//             </button>
//           </div>

//           <div className="space-y-4">
//             {timelineFields.map((field, index) => (
//               <div key={field.id} className="border border-gray-200 rounded-lg p-4">
//                 <div className="flex justify-between items-start mb-3">
//                   <h3 className="font-medium text-gray-900">Timeline Item {index + 1}</h3>
//                   {timelineFields.length > 1 && (
//                     <button
//                       type="button"
//                       onClick={() => removeTimeline(index)}
//                       className="text-red-500 hover:text-red-700"
//                     >
//                       <X className="w-4 h-4" />
//                     </button>
//                   )}
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Title
//                     </label>
//                     <input
//                       {...register(`timeLines.${index}.title`)}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                       placeholder="Session title"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Start Time
//                     </label>
//                     <input
//                       type="time"
//                       {...register(`timeLines.${index}.startTime`)}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       End Time
//                     </label>
//                     <input
//                       type="time"
//                       {...register(`timeLines.${index}.endTime`)}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                     />
//                   </div>

//                   <div className="md:col-span-1">
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Details
//                     </label>
//                     <input
//                       {...register(`timeLines.${index}.details`)}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                       placeholder="Session details"
//                     />
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* Q&A Section */}
//         <section>
//           <div className="flex items-center justify-between mb-4">
//             <h2 className="text-xl font-semibold text-gray-900">Q&A Section</h2>
//             <button
//               type="button"
//               onClick={() => appendQna({ question: '', answer: '' })}
//               className="flex items-center px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
//             >
//               <Plus className="w-4 h-4 mr-1" />
//               Add Q&A
//             </button>
//           </div>

//           <div className="space-y-4">
//             {qnaFields.map((field, index) => (
//               <div key={field.id} className="border border-gray-200 rounded-lg p-4">
//                 <div className="flex justify-between items-start mb-3">
//                   <h3 className="font-medium text-gray-900">Q&A {index + 1}</h3>
//                   {qnaFields.length > 1 && (
//                     <button
//                       type="button"
//                       onClick={() => removeQna(index)}
//                       className="text-red-500 hover:text-red-700"
//                     >
//                       <X className="w-4 h-4" />
//                     </button>
//                   )}
//                 </div>

//                 <div className="space-y-3">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Question
//                     </label>
//                     <input
//                       {...register(`qnas.${index}.question`)}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                       placeholder="Frequently asked question"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Answer
//                     </label>
//                     <textarea
//                       {...register(`qnas.${index}.answer`)}
//                       rows={2}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                       placeholder="Answer to the question"
//                     />
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* Terms and Conditions */}
//         <section>
//           <h2 className="text-xl font-semibold text-gray-900 mb-4">Terms & Conditions</h2>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Terms & Conditions *
//             </label>
//             <textarea
//               {...register('termsAndConditions', { required: 'Terms and conditions are required' })}
//               rows={6}
//               className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
//                 errors.termsAndConditions ? 'border-red-500' : 'border-gray-300'
//               }`}
//               placeholder="Enter event terms and conditions, refund policy, etc."
//             />
//             {errors.termsAndConditions && <p className="text-red-500 text-sm mt-1">{errors.termsAndConditions.message}</p>}
//           </div>
//         </section>

//         {/* Submit Button */}
//         <div className="flex justify-end space-x-4 pt-6 border-t">
//           <button
//             type="button"
//             className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
//           >
//             Save as Draft
//           </button>
//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className={`px-8 py-3 rounded-lg font-semibold transition-colors ${
//               isSubmitting
//                 ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
//                 : 'bg-purple-600 text-white hover:bg-purple-700'
//             }`}
//           >
//             {isSubmitting ? 'Creating Event...' : 'Create Event'}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default EventCreationForm;

"use client";
import React from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Plus,
  X,
  Upload,
  DollarSign,
  Image,
  Video,
  FileText,
} from "lucide-react";
import { useForm, useFieldArray, Controller } from "react-hook-form";

// TypeScript interfaces
interface Club {
  id: string;
  name: string;
}

interface TimelineItem {
  title: string;
  details: string;
  startTime: string;
  endTime: string;
  order: number;
}

interface QnAItem {
  question: string;
  answer: string;
}

interface AttachmentItem {
  id?: string;
  url: string;
  type: "BANNER" | "IMAGE" | "VIDEO" | "BROCHURE";
  file?: File;
}

interface EventFormData {
  title: string;
  description: string;
  category: "TECHNICAL" | "CULTURAL" | "SPORTS" | "ACADEMIC" | "SOCIAL";
  clubId: string;
  venue: string;
  startAt: string;
  endAt: string;
  capacity: number;
  registrationOpensAt: string;
  registrationClosesAt: string;
  isPaid: boolean;
  price: number;
  eventWebUrl: string;
  timeLines: TimelineItem[];
  qnas: QnAItem[];
  termsAndConditions: string;
  attachments: AttachmentItem[];
}

// Mock clubs data
const mockClubs: Club[] = [
  { id: "club-tech", name: "Technology Club" },
  { id: "club-cultural", name: "Cultural Society" },
  { id: "club-sports", name: "Sports Club" },
  { id: "club-academic", name: "Academic Association" },
  { id: "club-social", name: "Social Impact Club" },
];

const EventCreationForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<EventFormData>({
    defaultValues: {
      category: "TECHNICAL",
      clubId: "",
      isPaid: false,
      price: 0,
      capacity: 50,
      timeLines: [
        { title: "", details: "", startTime: "", endTime: "", order: 1 },
      ],
      qnas: [{ question: "", answer: "" }],
      termsAndConditions: "",
      attachments: [],
    },
  });

  const {
    fields: timelineFields,
    append: appendTimeline,
    remove: removeTimeline,
  } = useFieldArray({
    control,
    name: "timeLines",
  });

  const {
    fields: qnaFields,
    append: appendQna,
    remove: removeQna,
  } = useFieldArray({
    control,
    name: "qnas",
  });

  const {
    fields: attachmentFields,
    append: appendAttachment,
    remove: removeAttachment,
  } = useFieldArray({
    control,
    name: "attachments",
  });

  const isPaid = watch("isPaid");

  const handleFileUpload = (
    index: number,
    file: File,
    type: AttachmentItem["type"]
  ) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const url = e.target?.result as string;
      setValue(`attachments.${index}`, {
        url,
        type,
        file,
      });
    };
    reader.readAsDataURL(file);
  };

  const validateFile = (
    file: File,
    type: AttachmentItem["type"]
  ): string | null => {
    if (type === "BANNER" || type === "IMAGE") {
      if (!file.type.startsWith("image/")) {
        return "Please upload an image file";
      }
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        return "File size should be less than 5MB";
      }
    } else if (type === "VIDEO") {
      if (!file.type.startsWith("video/")) {
        return "Please upload a video file";
      }
      if (file.size > 50 * 1024 * 1024) {
        // 50MB limit
        return "File size should be less than 50MB";
      }
    } else if (type === "BROCHURE") {
      const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
      if (!allowedTypes.includes(file.type)) {
        return "Please upload a PDF or image file";
      }
      if (file.size > 10 * 1024 * 1024) {
        // 10MB limit
        return "File size should be less than 10MB";
      }
    }
    return null;
  };

  const onSubmit = async (data: EventFormData) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Event created successfully:", data);
      alert("Event created successfully!");

      // Display the form data in the console
      console.log("Form Data:", JSON.stringify(data, null, 2));
    } catch (error) {
      alert("Error creating event. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto text-gray-600 bg-white shadow-xl rounded-lg overflow-hidden">
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-6">
        <h1 className="text-3xl font-bold text-gray-700">Create New Event</h1>
        <p className="text-purple-100 mt-2">
          Fill in the details to create your campus event
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-8">
        {/* Basic Information */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Basic Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Event Title *
              </label>
              <input
                {...register("title", {
                  required: "Title is required",
                  minLength: {
                    value: 3,
                    message: "Title must be at least 3 characters",
                  },
                })}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 text-gray-500 focus:border-transparent ${
                  errors.title ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter event title"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                {...register("category")}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-gray-500 focus:border-transparent"
              >
                <option value="TECHNICAL">Technical</option>
                <option value="CULTURAL">Cultural</option>
                <option value="SPORTS">Sports</option>
                <option value="ACADEMIC">Academic</option>
                <option value="SOCIAL">Social</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Organizing Club *
              </label>
              <select
                {...register("clubId", {
                  required: "Club selection is required",
                })}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 text-gray-500 focus:border-transparent ${
                  errors.clubId ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select a club</option>
                {mockClubs.map((club) => (
                  <option key={club.id} value={club.id}>
                    {club.name}
                  </option>
                ))}
              </select>
              {errors.clubId && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.clubId.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Venue *
              </label>
              <div className="relative">
                <MapPin className="absolute top-1/2 left-3 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  {...register("venue", {
                    required: "Venue is required",
                    minLength: {
                      value: 2,
                      message: "Venue must be at least 2 characters",
                    },
                  })}
                  className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 text-gray-500 focus:border-transparent ${
                    errors.venue ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Event venue"
                />
              </div>
              {errors.venue && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.venue.message}
                </p>
              )}
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Event Description *
            </label>
            <textarea
              {...register("description", {
                required: "Description is required",
                minLength: {
                  value: 10,
                  message: "Description must be at least 10 characters",
                },
              })}
              rows={4}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 text-gray-500 focus:border-transparent ${
                errors.description ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Describe your event..."
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>
        </section>

        {/* Date & Time */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Date & Time
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Date & Time *
              </label>
              <div className="relative">
                <Calendar className="absolute top-1/2 left-3 transform -translate-y-1/2  w-5 h-5 text-gray-400" />
                <input
                  type="datetime-local"
                  {...register("startAt", {
                    required: "Start time is required",
                  })}
                  className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 text-gray-500 focus:border-transparent ${
                    errors.startAt ? "border-red-500" : "border-gray-300"
                  }`}
                />
              </div>
              {errors.startAt && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.startAt.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End Date & Time *
              </label>
              <div className="relative">
                <Clock className="absolute top-1/2 left-3 transform -translate-y-1/2  w-5 h-5 text-gray-400" />
                <input
                  type="datetime-local"
                  {...register("endAt", {
                    required: "End time is required",
                    validate: (value, formValues) =>
                      new Date(value) > new Date(formValues.startAt) ||
                      "End time must be after start time",
                  })}
                  className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 text-gray-500 focus:border-transparent ${
                    errors.endAt ? "border-red-500" : "border-gray-300"
                  }`}
                />
              </div>
              {errors.endAt && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.endAt.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Registration Opens *
              </label>
              <input
                type="datetime-local"
                {...register("registrationOpensAt", {
                  required: "Registration open time is required",
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-gray-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Registration Closes *
              </label>
              <input
                type="datetime-local"
                {...register("registrationClosesAt", {
                  required: "Registration close time is required",
                  validate: (value, formValues) =>
                    new Date(value) >
                      new Date(formValues.registrationOpensAt) ||
                    "Registration close must be after registration open",
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-gray-500 focus:border-transparent"
              />
            </div>
          </div>
        </section>

        {/* Capacity & Pricing */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Capacity & Pricing
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Capacity *
              </label>
              <div className="relative">
                <Users className="absolute top-1/2 left-3 transform -translate-y-1/2  w-5 h-5 text-gray-400" />
                <input
                  type="number"
                  min="1"
                  {...register("capacity", {
                    required: "Capacity is required",
                    min: { value: 1, message: "Capacity must be at least 1" },
                    valueAsNumber: true,
                  })}
                  className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                    errors.capacity ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Max attendees"
                />
              </div>
              {errors.capacity && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.capacity.message}
                </p>
              )}
            </div>

            <div>
              <label className="flex items-center space-x-2 mb-2">
                <input
                  type="checkbox"
                  {...register("isPaid")}
                  className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <span className="text-sm font-medium text-gray-700">
                  Paid Event
                </span>
              </label>
            </div>

            {isPaid && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price (₹) *
                </label>
                <div className="relative">
                  <DollarSign className="absolute top-1/2 left-3 transform -translate-y-1/2  w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    min="1"
                    {...register("price", {
                      required: isPaid
                        ? "Price is required for paid events"
                        : false,
                      min: { value: 1, message: "Price must be at least 1" },
                      valueAsNumber: true,
                    })}
                    className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                      errors.price ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Event price"
                  />
                </div>
                {errors.price && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.price.message}
                  </p>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Event Website */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Additional Information
          </h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Event Website URL
            </label>
            <input
              type="url"
              {...register("eventWebUrl")}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="https://example.com/event"
            />
          </div>
        </section>

        {/* Attachments Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Event Attachments
            </h2>
            <button
              type="button"
              onClick={() => appendAttachment({ url: "", type: "IMAGE" })}
              className="flex items-center px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Attachment
            </button>
          </div>

          <div className="space-y-4">
            {attachmentFields.map((field, index) => (
              <div
                key={field.id}
                className="border border-gray-200 rounded-lg p-4"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-medium text-gray-900">
                    Attachment {index + 1}
                  </h3>
                  <button
                    type="button"
                    onClick={() => removeAttachment(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Type *
                    </label>
                    <select
                      {...register(`attachments.${index}.type` as const, {
                        required: "Attachment type is required",
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="BANNER">Banner Image</option>
                      <option value="IMAGE">Image</option>
                      <option value="VIDEO">Video</option>
                      <option value="BROCHURE">Brochure (PDF/Image)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      File *
                    </label>
                    <Controller
                      name={`attachments.${index}.file`}
                      control={control}
                      rules={{
                        validate: (file) => {
                          if (!file) return "File is required";
                          const type = watch(`attachments.${index}.type`);
                          const error = validateFile(file, type);
                          return error || true; // Return true instead of null
                        },
                      }}
                      render={({ field: { onChange, value, ...field } }) => (
                        <div className="flex items-center space-x-2">
                          <label className="flex-1 cursor-pointer">
                            <input
                              type="file"
                              {...field}
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  const type = watch(
                                    `attachments.${index}.type`
                                  );
                                  const error = validateFile(file, type);
                                  if (error) {
                                    alert(error);
                                    return;
                                  }
                                  onChange(file);
                                  handleFileUpload(index, file, type);
                                }
                              }}
                              className="hidden"
                              accept={
                                watch(`attachments.${index}.type`) === "BANNER"
                                  ? "image/*"
                                  : watch(`attachments.${index}.type`) ===
                                    "IMAGE"
                                  ? "image/*"
                                  : watch(`attachments.${index}.type`) ===
                                    "VIDEO"
                                  ? "video/*"
                                  : "image/*,application/pdf"
                              }
                            />
                            <div className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent flex items-center justify-between">
                              <span className="truncate">
                                {value?.name || "Choose file..."}
                              </span>
                              <Upload className="w-4 h-4 text-gray-400" />
                            </div>
                          </label>
                        </div>
                      )}
                    />
                    {errors.attachments?.[index]?.file && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.attachments[index]?.file?.message}
                      </p>
                    )}
                  </div>
                </div>

                {watch(`attachments.${index}.url`) && (
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Preview
                    </label>
                    <div className="mt-1">
                      {watch(`attachments.${index}.type`) === "VIDEO" ? (
                        <video
                          src={watch(`attachments.${index}.url`)}
                          className="max-w-full h-40 object-cover rounded-lg"
                          controls
                        />
                      ) : (
                        <img
                          src={watch(`attachments.${index}.url`)}
                          alt="Preview"
                          className="max-w-full h-40 object-cover rounded-lg"
                        />
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Timeline */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Event Timeline
            </h2>
            <button
              type="button"
              onClick={() =>
                appendTimeline({
                  title: "",
                  details: "",
                  startTime: "",
                  endTime: "",
                  order: timelineFields.length + 1,
                })
              }
              className="flex items-center px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Timeline Item
            </button>
          </div>

          <div className="space-y-4">
            {timelineFields.map((field, index) => (
              <div
                key={field.id}
                className="border border-gray-200 rounded-lg p-4"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-medium text-gray-900">
                    Timeline Item {index + 1}
                  </h3>
                  {timelineFields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeTimeline(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title
                    </label>
                    <input
                      {...register(`timeLines.${index}.title`)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Session title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Start Time
                    </label>
                    <input
                      type="time"
                      {...register(`timeLines.${index}.startTime`)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      End Time
                    </label>
                    <input
                      type="time"
                      {...register(`timeLines.${index}.endTime`)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>

                  <div className="md:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Details
                    </label>
                    <input
                      {...register(`timeLines.${index}.details`)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Session details"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Q&A Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Q&A Section</h2>
            <button
              type="button"
              onClick={() => appendQna({ question: "", answer: "" })}
              className="flex items-center px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Q&A
            </button>
          </div>

          <div className="space-y-4">
            {qnaFields.map((field, index) => (
              <div
                key={field.id}
                className="border border-gray-200 rounded-lg p-4"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-medium text-gray-900">Q&A {index + 1}</h3>
                  {qnaFields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeQna(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Question
                    </label>
                    <input
                      {...register(`qnas.${index}.question`)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Frequently asked question"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Answer
                    </label>
                    <textarea
                      {...register(`qnas.${index}.answer`)}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Answer to the question"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Terms and Conditions */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Terms & Conditions
          </h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Terms & Conditions *
            </label>
            <textarea
              {...register("termsAndConditions", {
                required: "Terms and conditions are required",
              })}
              rows={6}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                errors.termsAndConditions ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter event terms and conditions, refund policy, etc."
            />
            {errors.termsAndConditions && (
              <p className="text-red-500 text-sm mt-1">
                {errors.termsAndConditions.message}
              </p>
            )}
          </div>
        </section>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4 pt-6 border-t">
          <button
            type="button"
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Save as Draft
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-8 py-3 rounded-lg font-semibold transition-colors ${
              isSubmitting
                ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                : "bg-purple-600 text-white hover:bg-purple-700"
            }`}
          >
            {isSubmitting ? "Creating Event..." : "Create Event"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventCreationForm;
