import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger
} from "@radix-ui/react-dialog";
import React, { useState, useRef } from "react";
import { DialogHeader } from "../ui/dialog";
import {
    Upload,
    X,
    FileVideo,
    Image,
    AlertCircle,
    CheckCircle
} from "lucide-react";
import { videoService } from "../../service/video.service";

function UploadVideo() {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [dragActive, setDragActive] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [selectedThumbnail, setSelectedThumbnail] = useState(null);
    const [formData, setFormData] = useState({
        title: "",
        description: ""
    });

    const videoInputRef = useRef(null);
    const thumbnailInputRef = useRef(null);
    const formRef = useRef(null);

    // Validation rules
    const validateForm = () => {
        const newErrors = {};

        if (!selectedVideo) {
            newErrors.videoFile = "Video file is required";
        }

        if (!selectedThumbnail) {
            newErrors.thumbnail = "Thumbnail is required";
        }

        if (!formData.title.trim()) {
            newErrors.title = "Title is required";
        } else if (formData.title.length < 3) {
            newErrors.title = "Title must be at least 3 characters";
        } else if (formData.title.length > 100) {
            newErrors.title = "Title must be less than 100 characters";
        }

        if (!formData.description.trim()) {
            newErrors.description = "Description is required";
        } else if (formData.description.length < 10) {
            newErrors.description =
                "Description must be at least 10 characters";
        } else if (formData.description.length > 1000) {
            newErrors.description =
                "Description must be less than 1000 characters";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submission
    const handlePublishVideo = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);
        const submitFormData = new FormData();
        submitFormData.append("videoFile", selectedVideo);
        submitFormData.append("thumbnail", selectedThumbnail);
        submitFormData.append("title", formData.title.trim());
        submitFormData.append("description", formData.description.trim());

        try {
            const resp = await videoService.publishVideo(submitFormData);
            console.log("Published a Video :: ", resp);

            // Reset form and close dialog
            resetForm();
            setIsOpen(false);
        } catch (error) {
            console.log("Error in publishing Video :: ", error);
            setErrors({ submit: "Failed to upload video. Please try again." });
        } finally {
            setIsLoading(false);
        }
    };

    // Reset form state
    const resetForm = () => {
        setSelectedVideo(null);
        setSelectedThumbnail(null);
        setFormData({ title: "", description: "" });
        setErrors({});
        if (formRef.current) {
            formRef.current.reset();
        }
    };

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    // Handle video file selection
    const handleVideoSelect = (file) => {
        if (file && file.type.startsWith("video/")) {
            setSelectedVideo(file);
            if (errors.videoFile) {
                setErrors((prev) => ({ ...prev, videoFile: "" }));
            }
        } else {
            setErrors((prev) => ({
                ...prev,
                videoFile: "Please select a valid video file"
            }));
        }
    };

    // Handle thumbnail selection
    const handleThumbnailSelect = (file) => {
        if (file && file.type.startsWith("image/")) {
            setSelectedThumbnail(file);
            if (errors.thumbnail) {
                setErrors((prev) => ({ ...prev, thumbnail: "" }));
            }
        } else {
            setErrors((prev) => ({
                ...prev,
                thumbnail: "Please select a valid image file"
            }));
        }
    };

    // Drag and drop handlers
    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        const files = Array.from(e.dataTransfer.files);
        const videoFile = files.find((file) => file.type.startsWith("video/"));
        if (videoFile) {
            handleVideoSelect(videoFile);
        }
    };

    // Format file size
    const formatFileSize = (bytes) => {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const sizes = ["Bytes", "KB", "MB", "GB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    };

    // Error component
    const ErrorMessage = ({ message }) =>
        message ? (
            <div className="flex items-center gap-1 text-red-400 text-sm mt-1">
                <AlertCircle size={14} />
                {message}
            </div>
        ) : null;

    // Success indicator
    const SuccessIndicator = ({ show }) =>
        show ? (
            <div className="flex items-center gap-1 text-green-400 text-sm mt-1">
                <CheckCircle size={14} />
                File selected
            </div>
        ) : null;

    return (
        <Dialog
            open={isOpen}
            onOpenChange={(open) => {
                setIsOpen(open);
                if (!open) {
                    resetForm();
                }
            }}
        >
            <DialogTrigger asChild>
                <button className="bg-[#ae7aff] text-black flex gap-x-2 px-4 py-2 rounded-lg font-bold shadow hover:bg-[#c7aaff] transition-colors">
                    <Upload size={20} />
                    Upload Video
                </button>
            </DialogTrigger>

            <DialogContent
                className="fixed left-1/2 top-1/2 z-[100] max-w-md sm:max-w-lg md:max-w-3xl w-full -translate-x-1/2 -translate-y-1/2 bg-[#121212] text-white max-h-[95vh] overflow-y-auto rounded-lg shadow-lg focus:outline-none border border-gray-700"
                style={{ outline: "none" }}
            >
                <DialogHeader className="sticky top-0 bg-[#121212] z-20 border-b border-gray-700 p-6 flex flex-row items-center justify-between">
                    <div>
                        <DialogTitle className="text-xl sm:text-2xl font-bold">
                            Upload Video
                        </DialogTitle>
                        <DialogDescription className="text-gray-400 mt-1">
                            Share your content with the world
                        </DialogDescription>
                    </div>
                    <DialogClose asChild>
                        <button className="text-gray-400 hover:text-white transition-colors">
                            <X size={24} />
                        </button>
                    </DialogClose>
                </DialogHeader>

                <form
                    ref={formRef}
                    onSubmit={handlePublishVideo}
                    className="p-6 space-y-6"
                >
                    {/* Global error message */}
                    {errors.submit && (
                        <div className="bg-red-900/20 border border-red-500 rounded-lg p-3 text-red-400">
                            {errors.submit}
                        </div>
                    )}

                    {/* Video Upload Section */}
                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-200">
                            Video File <span className="text-red-400">*</span>
                        </label>
                        <div
                            className={`
                                relative border-2 border-dashed rounded-lg p-8 text-center transition-all cursor-pointer
                                ${
                                    dragActive
                                        ? "border-[#ae7aff] bg-[#ae7aff]/10"
                                        : "border-gray-600 hover:border-gray-500"
                                }
                                ${errors.videoFile ? "border-red-500" : ""}
                                ${
                                    selectedVideo
                                        ? "border-green-500 bg-green-500/10"
                                        : ""
                                }
                            `}
                            onDragEnter={handleDrag}
                            onDragLeave={handleDrag}
                            onDragOver={handleDrag}
                            onDrop={handleDrop}
                            onClick={() => videoInputRef.current?.click()}
                        >
                            <input
                                ref={videoInputRef}
                                type="file"
                                accept="video/*"
                                className="hidden"
                                onChange={(e) =>
                                    handleVideoSelect(e.target.files[0])
                                }
                            />

                            <div className="space-y-4">
                                <div className="flex justify-center">
                                    <div className="w-16 h-16 bg-[#ae7aff]/20 rounded-full flex items-center justify-center">
                                        {selectedVideo ? (
                                            <CheckCircle
                                                className="text-green-400"
                                                size={32}
                                            />
                                        ) : (
                                            <FileVideo
                                                className="text-[#ae7aff]"
                                                size={32}
                                            />
                                        )}
                                    </div>
                                </div>

                                {selectedVideo ? (
                                    <div className="space-y-2">
                                        <p className="font-semibold text-green-400">
                                            {selectedVideo.name}
                                        </p>
                                        <p className="text-sm text-gray-400">
                                            {formatFileSize(selectedVideo.size)}
                                        </p>
                                    </div>
                                ) : (
                                    <div className="space-y-2">
                                        <h3 className="font-semibold text-lg">
                                            {dragActive
                                                ? "Drop your video here"
                                                : "Choose video file"}
                                        </h3>
                                        <p className="text-gray-400 text-sm">
                                            Drag and drop or click to browse
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            Supported formats: MP4, MOV, AVI,
                                            WMV
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                        <ErrorMessage message={errors.videoFile} />
                    </div>

                    {/* Thumbnail Upload */}
                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-200">
                            Thumbnail <span className="text-red-400">*</span>
                        </label>
                        <div className="flex items-center gap-4">
                            <div className="flex-1">
                                <input
                                    ref={thumbnailInputRef}
                                    type="file"
                                    accept="image/*"
                                    className="w-full border border-gray-600 rounded-lg p-3 file:mr-4 file:border-none file:bg-[#ae7aff] file:px-4 file:py-2 file:rounded file:text-black file:font-medium bg-transparent hover:border-gray-500 transition-colors"
                                    onChange={(e) =>
                                        handleThumbnailSelect(e.target.files[0])
                                    }
                                />
                            </div>
                            {selectedThumbnail && (
                                <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center">
                                    <Image
                                        className="text-green-400"
                                        size={24}
                                    />
                                </div>
                            )}
                        </div>
                        <ErrorMessage message={errors.thumbnail} />
                        <SuccessIndicator
                            show={selectedThumbnail && !errors.thumbnail}
                        />
                    </div>

                    {/* Title Input */}
                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-200">
                            Title <span className="text-red-400">*</span>
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            placeholder="Enter an engaging title for your video"
                            className={`
                                w-full border rounded-lg px-4 py-3 bg-transparent outline-none transition-colors
                                ${
                                    errors.title
                                        ? "border-red-500"
                                        : "border-gray-600 focus:border-[#ae7aff]"
                                }
                            `}
                            maxLength={100}
                        />
                        <div className="flex justify-between items-center">
                            <ErrorMessage message={errors.title} />
                            <span className="text-xs text-gray-500">
                                {formData.title.length}/100
                            </span>
                        </div>
                    </div>

                    {/* Description Textarea */}
                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-200">
                            Description <span className="text-red-400">*</span>
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            placeholder="Describe your video content..."
                            rows={4}
                            className={`
                                w-full border rounded-lg px-4 py-3 bg-transparent outline-none resize-none transition-colors
                                ${
                                    errors.description
                                        ? "border-red-500"
                                        : "border-gray-600 focus:border-[#ae7aff]"
                                }
                            `}
                            maxLength={1000}
                        />
                        <div className="flex justify-between items-center">
                            <ErrorMessage message={errors.description} />
                            <span className="text-xs text-gray-500">
                                {formData.description.length}/1000
                            </span>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-4 pt-4 border-t border-gray-700">
                        <DialogClose asChild>
                            <button
                                type="button"
                                disabled={isLoading}
                                className="px-6 py-2 border border-gray-600 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
                            >
                                Cancel
                            </button>
                        </DialogClose>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="px-6 py-2 bg-[#ae7aff] text-black rounded-lg font-semibold hover:bg-[#c7aaff] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                                    Publishing...
                                </>
                            ) : (
                                <>
                                    <Upload size={16} />
                                    Publish Video
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default UploadVideo;
