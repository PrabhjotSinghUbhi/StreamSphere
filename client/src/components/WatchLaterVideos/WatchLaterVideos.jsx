import React, { useEffect } from "react";
import { useFormatDuration } from "../../hooks/useFormatDuration.hook";
import { useDispatch, useSelector } from "react-redux";
import { fetchWatchLaterVideos } from "../../slice/watchLaterSlice";
import { Skeleton } from "../ui/skeleton";
import { Card, CardContent, CardTitle } from "../ui/card";
import { Link } from "react-router";
import EmptyWatchLater from "../EmptyWatchLater/EmptyWatchLater";

function WatchLaterVideos() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchWatchLaterVideos());
    }, [dispatch]);

    const { loading, watchLaterVideos } = useSelector(
        (state) => state.watchLaterVideos
    );
    const { formatTime, formatViews, formatDuration } = useFormatDuration();

    return (
        <div className="w-full max-w-6xl mx-auto px-4 py-6">
            <h1 className="text-2xl md:text-3xl font-bold mb-6">
                Watch Later Videos
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
                    : watchLaterVideos?.map((watchLaterVideo) => (
                          <Link
                              key={watchLaterVideo?._id}
                              to={`/video/${watchLaterVideo?._id}`}
                              className="group cursor-pointer"
                          >
                              <Card className="flex flex-col sm:flex-row gap-4 p-0 border-none bg-transparent">
                                  {/* Thumbnail */}
                                  <div className="relative w-full sm:w-64 aspect-video overflow-hidden rounded-lg">
                                      <img
                                          src={watchLaterVideo?.thumbnail?.url}
                                          alt={watchLaterVideo?.title}
                                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                      />
                                      {watchLaterVideo?.duration && (
                                          <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded">
                                              {formatDuration(
                                                  watchLaterVideo?.duration
                                              )}
                                          </span>
                                      )}
                                  </div>

                                  {/* Video Info */}
                                  <CardContent className="flex-1 p-0 flex flex-col justify-between min-w-0">
                                      <div>
                                          <CardTitle className="text-base md:text-lg font-medium mb-1 line-clamp-2">
                                              {watchLaterVideo?.title}
                                          </CardTitle>
                                          <div className="flex items-center text-xs md:text-sm text-muted-foreground mb-2 flex-wrap gap-1">
                                              <span>
                                                  {formatViews(
                                                      watchLaterVideo?.view
                                                  )}{" "}
                                                  views
                                              </span>
                                              <span className="mx-1">•</span>
                                              <span>
                                                  {formatTime(
                                                      watchLaterVideo?.createdAt
                                                  )}
                                              </span>
                                          </div>
                                          {/* Description snippet */}
                                          <p className="text-sm text-muted-foreground line-clamp-2">
                                              {watchLaterVideo?.description ||
                                                  "No description available."}
                                          </p>
                                      </div>
                                  </CardContent>
                              </Card>
                          </Link>
                      ))}
            </div>

            {!loading && watchLaterVideos.length === 0 && <EmptyWatchLater />}
        </div>
    );
}

export default WatchLaterVideos;
