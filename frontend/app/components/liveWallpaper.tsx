export default function LiveWallpaper() {
  return (
    <>
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-full  object-cover w-screen z-10 absolute top-0  -z-10"
      >
        <source type="video/mp4" src="/liveWallpaperPainting.mp4" />
      </video>  
    </>
  );
}