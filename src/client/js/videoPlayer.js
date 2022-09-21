const $volumeRangeVisible = document.getElementById("volume__range-visible");
const $volumeRangeInvisible = document.getElementById(
  "volume__range-invisible"
);
const $timeRangeVisible = document.getElementById("time__range-visible");
const $timeRangeInvisible = document.getElementById("time__range-invisible");
const $mainVideo = document.getElementById("main-video");
const $playBtn = document.getElementById("play-btn");
const $playBtnIcon = $playBtn.querySelector("i");
const $muteBtn = document.getElementById("mute-btn");
const $muteBtnIcon = $muteBtn.querySelector("i");
const $fullscreenBtn = document.getElementById("fullscreen-btn");
const $fullscreenBtnIcon = $fullscreenBtn.querySelector("i");
const $videoContainer = document.getElementById("video__container");
const $currentTime = document.getElementById("current-time");
const $totalTime = document.getElementById("total-time");
const $videoControls = document.getElementById("video__controls");

const formatTime = (seconds) => {
  let start = 11;
  if (seconds < 600) start = 15;
  else if (seconds > 3600) start = 12;
  else start = 14;

  return new Date(seconds * 1000).toISOString().substring(start, 19);
};

// 비디오 컨트롤러
let volumeValue = 0.5;
$mainVideo.volume = volumeValue;

const handlePlayBtn = () => {
  if ($mainVideo.paused) {
    $mainVideo.play();
  } else {
    $mainVideo.pause();
  }
  $playBtnIcon.classList = $mainVideo.paused ? "fas fa-play" : "fas fa-pause";
};

const handleMuteBtn = () => {
  $mainVideo.muted = !$mainVideo.muted;
  $muteBtnIcon.classList = $mainVideo.muted
    ? "fas fa-volume-mute"
    : "fas fa-volume-up";
  $volumeRangeInvisible.value = $volumeRangeVisible.value = $mainVideo.muted
    ? 0
    : volumeValue;
};

$playBtn.addEventListener("click", handlePlayBtn);
$mainVideo.addEventListener("click", handlePlayBtn);
$muteBtn.addEventListener("click", handleMuteBtn);

// 소리조절 바
const handleVolumeChange = (value) => {
  $mainVideo.muted = value === "0" ? true : false;
  $muteBtnIcon.classList = $mainVideo.muted
    ? "fas fa-volume-mute"
    : "fas fa-volume-up";
  volumeValue = value;
  $mainVideo.volume = value;
};

const handleVolumeVisible = (event) => {
  const {
    target: { value },
  } = event;
  $volumeRangeInvisible.value = value;
  handleVolumeChange(value);
};

const handleVolumeInvisible = (event) => {
  const {
    target: { value },
  } = event;
  $volumeRangeVisible.value = value;
  handleVolumeChange(value);
};

$volumeRangeVisible.oninput = handleVolumeVisible;
$volumeRangeInvisible.oninput = handleVolumeInvisible;

// 시간 최신화
const handleLoaded = () => {
  $currentTime.innerText = formatTime(0);
  $totalTime.innerText = formatTime(Math.floor($mainVideo.duration * 10) / 10);
  $timeRangeVisible.max = $timeRangeInvisible.max =
    Math.floor($mainVideo.duration * 10) / 10;
};
const handleTimeupdate = () => {
  $currentTime.innerText = formatTime(
    Math.floor($mainVideo.currentTime * 10) / 10
  );
  $timeRangeVisible.value = $timeRangeInvisible.value =
    Math.floor($mainVideo.currentTime * 10) / 10;
};
const handleTimeVisible = (event) => {
  const {
    target: { value },
  } = event;
  $timeRangeInvisible.value = value;
  $mainVideo.currentTime = value;
};
const handleTimeInvisible = (event) => {
  const {
    target: { value },
  } = event;
  $timeRangeVisible.value = value;
  $mainVideo.currentTime = value;
};

$mainVideo.addEventListener("loadedmetadata", handleLoaded);
$mainVideo.addEventListener("loadedmetadata", handlePlayBtn);
$mainVideo.addEventListener("timeupdate", handleTimeupdate);
$timeRangeVisible.oninput = handleTimeVisible;
$timeRangeInvisible.oninput = handleTimeInvisible;

// 풀스크린
const handleFullscreenBtn = () => {
  if (document.webkitFullscreenElement) {
    document.webkitCancelFullScreen();
    $fullscreenBtnIcon.classList = "fas fa-expand";
  } else {
    $videoContainer.webkitRequestFullScreen();
    $fullscreenBtnIcon.classList = "fas fa-compress";
  }
};
const handleFullscreenChange = () => {
  if (!document.fullscreenElement) {
    $fullscreenBtnIcon.classList = "fas fa-expand";
  }
};
$fullscreenBtn.addEventListener("click", handleFullscreenBtn);
$mainVideo.addEventListener("dblclick", handleFullscreenBtn);
$videoContainer.addEventListener("fullscreenchange", handleFullscreenChange);

// 컨트롤러 사라지게
let controlsTimeout = null;

const handleMouseMove = () => {
  $videoControls.classList.remove("hide");
  if (controlsTimeout) {
    clearTimeout(controlsTimeout);
    controlsTimeout = null;
  }
  controlsTimeout = setTimeout(() => {
    $videoControls.classList.add("hide");
  }, 3000);
};

const handleMouseLeave = () => {
  $videoControls.classList.add("hide");
};

$videoContainer.addEventListener("mousemove", handleMouseMove);
$videoContainer.addEventListener("mouseleave", handleMouseLeave);
