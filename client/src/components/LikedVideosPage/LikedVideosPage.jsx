import React, { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import { fetchLikedVideos } from "../../slice/likeVideosSlice";
import { useFormatDuration } from "../../hooks/useFormatDuration.hook";
import { Link } from "react-router-dom";

function LikedVideosPage() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        dispatch(fetchLikedVideos());
        setTimeout(() => setLoading(false), 1200); // Simulate loading
    }, [dispatch]);

    const { likedVideos } = useSelector((state) => state.likedVideos);
    const { formatTime, formatViews, formatDuration } = useFormatDuration();

    return (
        <div className="w-full max-w-6xl mx-auto px-4 py-6 mb-20">
            <h1 className="text-2xl md:text-3xl font-bold mb-6">
                Liked Videos
            </h1>

            <div className="flex flex-col gap-6">
                {loading
                    ? Array.from({ length: 4 }).map((_, idx) => (
                          <div
                              key={idx}
                              className="flex flex-col sm:flex-row gap-4"
                          >
                              <Skeleton className="w-full sm:w-64 aspect-video rounded-lg" />
                              <div className="flex-1 space-y-3">
                                  <Skeleton className="h-5 w-3/4" />
                                  <Skeleton className="h-4 w-1/2" />
                                  <Skeleton className="h-4 w-2/3" />
                              </div>
                          </div>
                      ))
                    : likedVideos.map((likedVideo) => (
                          <Link
                              key={likedVideo?.video?._id}
                              to={`/video/${likedVideo?.video?._id}`}
                              className="group cursor-pointer"
                          >
                              <Card className="flex flex-col sm:flex-row gap-4 p-0 border-none bg-transparent">
                                  {/* Thumbnail */}
                                  <div className="relative w-full sm:w-64 aspect-video overflow-hidden rounded-lg">
                                      <img
                                          src={
                                              likedVideo?.video?.thumbnail?.url
                                          }
                                          alt={likedVideo?.video?.title}
                                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                      />
                                      {likedVideo?.video?.duration && (
                                          <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded">
                                              {formatDuration(
                                                  likedVideo?.video?.duration
                                              )}
                                          </span>
                                      )}
                                  </div>

                                  {/* Video Info */}
                                  <CardContent className="flex-1 p-0 flex flex-col justify-between min-w-0">
                                      <div>
                                          <CardTitle className="text-base md:text-lg font-medium mb-1 line-clamp-2">
                                              {likedVideo?.video?.title}
                                          </CardTitle>
                                          <div className="flex items-center text-xs md:text-sm text-muted-foreground mb-2 flex-wrap gap-1">
                                              <span>
                                                  {formatViews(
                                                      likedVideo?.video?.view
                                                  )}{" "}
                                                  views
                                              </span>
                                              <span className="mx-1">•</span>
                                              <span>
                                                  {formatTime(
                                                      likedVideo?.video
                                                          ?.createdAt
                                                  )}
                                              </span>
                                          </div>
                                          {/* Description snippet */}
                                          <p className="text-sm text-muted-foreground line-clamp-2">
                                              {likedVideo?.video?.description ||
                                                  "No description available."}
                                          </p>
                                      </div>
                                  </CardContent>
                              </Card>
                          </Link>
                      ))}
            </div>

            {!loading && likedVideos.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-lg md:text-xl text-gray-400">
                        No liked videos yet.
                    </p>
                    <p className="text-gray-500 mt-2">
                        Start liking videos to see them here!
                    </p>
                </div>
            )}
        </div>
    );
}

export default LikedVideosPage;
