import "../scss/styles.scss";

const videoResize = () => {
  const $videoGrid = document.getElementById("video-grid");
  if ($videoGrid) {
    const videoNum = Math.floor(window.innerWidth / 300) + 1;
    $videoGrid.style.gridTemplateColumns = `repeat(${videoNum}, minmax(0, 1fr))`;

    const $videoThumb = document.getElementsByClassName("video-mixin__thumb");
    if ($videoThumb[0]) {
      const width = $videoThumb[0].getBoundingClientRect().width;
      for (let i = 0; i < $videoThumb.length; i++) {
        $videoThumb[i].style.height = `${(width * 10) / 16}px`;
      }
    }
  }
};

// 파일업로드 처리
const $filebox = document.getElementsByClassName("filebox")[0];
if ($filebox) {
  const $fileInput = $filebox.getElementsByClassName("input__filename")[0];
  $filebox.addEventListener("change", (event) => {
    const file = event.target.files[0];
    $fileInput.placeholder = file.name;
  });
}

// 썸네일 반응형 크기조절
videoResize();
window.addEventListener("resize", videoResize);
