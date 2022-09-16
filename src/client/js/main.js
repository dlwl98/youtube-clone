import "../scss/styles.scss";

const videoResize = () => {
  const videoGrid = document.querySelector(".video-grid");
  if (videoGrid) {
    const videoNum = Math.floor(window.innerWidth / 300) + 1;
    videoGrid.style.gridTemplateColumns = `repeat(${videoNum}, minmax(0, 1fr))`;

    const videoThumb = document.querySelectorAll(".video-mixin__thumb");
    if (videoThumb[0]) {
      const width = videoThumb[0].getBoundingClientRect().width;
      for (let i = 0; i < videoThumb.length; i++) {
        videoThumb[i].style.height = `${(width * 10) / 16}px`;
      }
    }
  }
};

// 파일업로드 처리
const filebox = document.querySelector(".filebox");
if (filebox) {
  const fileInput = filebox.getElementsByClassName("input__filename");
  filebox.addEventListener("change", (e) => {
    const file = e.target.files[0];
    fileInput[0].placeholder = file.name;
  });
}

// 썸네일 반응형 크기조절
videoResize();
window.addEventListener("resize", videoResize);
