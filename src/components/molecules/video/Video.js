/* eslint-disable jsx-a11y/media-has-caption */
import React, { useRef, useEffect } from "react";
import Hls from "hls.js";
import { isMobile } from "react-device-detect";

import "./style.less";

const Video = ({ source }) => {
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
			autoPlay
			controls={isMobile}
			preload="auto"
		/>
	);
};

export default Video;
