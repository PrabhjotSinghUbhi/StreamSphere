import React from "react";
import { MessageCircle } from "lucide-react"; // you can replace with any icon

function EmptyTweetsComp() {
    return (
        <div className="flex flex-col items-center justify-center py-10 text-center text-gray-500">
            <MessageCircle size={64} className="mb-4 text-gray-400" />
            <h2 className="text-xl font-semibold text-gray-700">
                No Tweets Yet
            </h2>
            <p className="mt-2 text-sm text-gray-500 max-w-md">
                This channel hasn’t posted any tweets. When they do, they’ll
                appear here.
            </p>
        </div>
    );
}

export default EmptyTweetsComp;
