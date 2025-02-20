
import { Card, CardContent } from "@/components/ui/card";

interface VideoPlayerProps {
  title: string;
  url: string;
}

const VideoPlayer = ({ title, url }: VideoPlayerProps) => {
  return (
    <Card>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <div className="aspect-video rounded-lg overflow-hidden bg-gray-100">
          <video
            controls
            className="w-full h-full"
            src={url}
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoPlayer;
