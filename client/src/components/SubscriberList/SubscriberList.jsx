import React, { useEffect } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubscribers } from "../../slice/subscriberListSlice";
import { useNavigate } from "react-router";

function SubscriberList() {
    const { loading, subscriberList } = useSelector(
        (state) => state.subscriberList
    );
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.loginUser.login_user);

    useEffect(() => {
        dispatch(fetchSubscribers(user._id));
    }, [dispatch, user._id]);

    const navigator = useNavigate();

    return (
        <div className="flex justify-center w-full min-h-[calc(100vh-64px)] px-2 md:px-8 py-8 bg-[#0f0f0f]">
            <div className="w-full max-w-6xl">
                {/* Header */}
                <div className="pb-4 border-b border-[#232323]">
                    <h2 className="text-2xl md:text-3xl font-semibold text-white">
                        Subscribers
                    </h2>
                    <p className="text-sm text-gray-400">
                        People who follow your channel
                    </p>
                </div>

                {/* List */}
                <ul className="divide-y divide-[#232323]">
                    {loading
                        ? Array.from({ length: 6 }).map((_, idx) => (
                              <li
                                  key={idx}
                                  className="flex items-center py-4 animate-pulse"
                              >
                                  <Skeleton className="w-12 h-12 md:w-14 md:h-14 rounded-full mr-4 bg-[#232323]" />
                                  <div className="flex-1">
                                      <Skeleton className="h-5 w-32 mb-2 rounded bg-[#232323]" />
                                      <Skeleton className="h-4 w-20 rounded bg-[#232323]" />
                                  </div>
                                  <Skeleton className="w-24 h-8 rounded-full bg-[#232323]" />
                              </li>
                          ))
                        : subscriberList.map((subscription) => (
                              <li
                                  key={subscription.subscriber._id}
                                  className="flex items-center py-4 hover:bg-[#1a1a1a] transition-colors px-2 rounded-lg"
                              >
                                  {/* Avatar */}
                                  <Avatar className="mr-4 w-12 h-12 md:w-14 md:h-14">
                                      <AvatarImage
                                          src={
                                              subscription.subscriber?.avatar
                                                  ?.url
                                          }
                                          alt={
                                              subscription.subscriber?.username
                                          }
                                          className="object-cover"
                                      />
                                      <AvatarFallback className="bg-gray-700 text-gray-300 font-bold">
                                          {subscription.subscriber?.username
                                              ?.charAt(0)
                                              ?.toUpperCase()}
                                      </AvatarFallback>
                                  </Avatar>

                                  {/* Info */}
                                  <div className="flex-1 min-w-0">
                                      <span className="block font-medium text-white truncate">
                                          {subscription?.subscriber?.fullName}
                                      </span>
                                      <span className="block text-sm text-gray-400 truncate">
                                          @
                                          {subscription?.subscriber?.username
                                              .toLowerCase()
                                              .replace(/\s/g, "_")}
                                      </span>
                                  </div>

                                  {/* Button */}
                                  <Button
                                      variant="outline"
                                      className="px-4 py-1 md:px-6 md:py-2 rounded-full text-sm md:text-base font-medium border border-gray-500 text-white hover:bg-gray-800"
                                      onClick={() => {
                                          navigator(
                                              "/channel/" +
                                                  subscription?.subscriber
                                                      ?.username +
                                                  "/videos"
                                          );
                                      }}
                                  >
                                      View Channel
                                  </Button>
                              </li>
                          ))}
                </ul>
            </div>
        </div>
    );
}

export default SubscriberList;
