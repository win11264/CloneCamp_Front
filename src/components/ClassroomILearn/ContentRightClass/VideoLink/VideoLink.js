function VideoLink({ vdoLink }) {
  return (
    <div className="VideoClassroomController">
      <iframe
        className="iframeClassroomVideo"
        // src="https://www.youtube.com/embed/0hfeNPM7piw"
        src={vdoLink}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
}

export default VideoLink;
