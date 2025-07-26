import {
  Box,
  Button,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import {
  FaMusic,
  FaPause,
  FaPlay,
  FaStepBackward,
  FaStepForward,
} from "react-icons/fa";
import { useGetMusicQuery } from "../services/music";

export const Disco = () => {
  const { data: songs } = useGetMusicQuery();

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const nextSong = () => {
    const nextIndex = (currentSongIndex + 1) % songs.length;
    setCurrentSongIndex(nextIndex);
    if (audioRef.current) {
      audioRef.current.src = songs[nextIndex].url;
      audioRef.current.play();
    }
    setIsPlaying(true);
  };

  const prevSong = () => {
    const prevIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    setCurrentSongIndex(prevIndex);
    if (audioRef.current) {
      audioRef.current.src = songs[prevIndex].url;
      audioRef.current.play();
    }
    setIsPlaying(true);
  };

  return (
    <>
      <Popover>
        <PopoverTrigger>
          <Button
            colorScheme="blue"
            borderRadius="50%"
            boxShadow="lg"
            w="50px"
            h="50px"
            fontSize="40px"
            transition="transform 0.3s ease-in-out"
            _hover={{ transform: "scale(1.1)" }}
            animation={isPlaying ? "spin 2s linear infinite" : "none"}
            sx={{
              "@keyframes spin": {
                "0%": { transform: "rotate(0deg)" },
                "100%": { transform: "rotate(360deg)" },
              },
            }}
          >
            <FaMusic />
          </Button>
        </PopoverTrigger>
        <PopoverContent bg="white" p={4} borderRadius="lg" boxShadow="lg">
          <PopoverArrow />
          <PopoverBody textAlign="center">
            <Text fontWeight="bold">
              {songs ? songs[currentSongIndex]?.name : ""}
            </Text>
            <Box mt={2} display="flex" justifyContent="center" gap={3}>
              <IconButton
                aria-label="Previous Song"
                icon={<FaStepBackward />}
                onClick={prevSong}
              />
              {isPlaying ? (
                <IconButton
                  aria-label="Pause"
                  icon={<FaPause />}
                  onClick={togglePlay}
                />
              ) : (
                <IconButton
                  aria-label="Play"
                  icon={<FaPlay />}
                  onClick={togglePlay}
                />
              )}
              <IconButton
                aria-label="Next Song"
                icon={<FaStepForward />}
                onClick={nextSong}
              />
            </Box>
          </PopoverBody>
        </PopoverContent>
      </Popover>

      <audio
        ref={audioRef}
        src="/ThemeSong.mp4"
        autoPlay={true}
        onEnded={nextSong}
      />
    </>
  );
};

export default Disco;
