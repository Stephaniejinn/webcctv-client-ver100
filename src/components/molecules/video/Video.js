/* eslint-disable jsx-a11y/media-has-caption */
import React, { useRef, useEffect } from "react";
import Hls from "hls.js";
import { isMobile } from "react-device-detect";

import "./style.less";

const Video = (props) => {
	const { source, showControls, setVideoSource } = props;
	const videoRef = useRef();
	const handleClick = (e) => {
		e.preventDefault();
		e.target.requestFullscreen();
	};

	useEffect(() => {
		if (videoRef) {
			if (Hls.isSupported()) {
				const hls = new Hls();
				hls.attachMedia(videoRef.current);
				hls.on(Hls.Events.MEDIA_ATTACHED, () => {
					hls.loadSource(source);
					hls.on(Hls.Events.MANIFEST_PARSED, () => {
						videoRef.current.play();
					});
					hls.on(Hls.Events.ERROR, (_, data) => {
						if (data.response) {
							if (data.response.code === 404) {
								setVideoSource(false);
							}
						}
					});
				});
			} else if (
				videoRef.current.canPlayType("application/vnd.apple.mpegurl")
			) {
				videoRef.current.src = source;
				videoRef.addEventListener("loadedmetadata", () => {
					videoRef.current.play();
				});
			} else {
				alert("Unsupported Browser");
			}
		}
	}, [source]);

	return (
		<video
			ref={videoRef}
			src={source}
			onClick={handleClick}
			muted
			// autoPlay
			controls={isMobile || showControls}
			// controls={true}
			preload="auto"
		/>
	);
};

export default Video;
