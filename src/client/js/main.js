import "../scss/styles.scss";

// 파일업로드 처리
const filebox = document.querySelector(".filebox");
if (filebox) {
  const fileInput = filebox.getElementsByClassName("input__filename");
  filebox.addEventListener("change", (e) => {
    const file = e.target.files[0];
    fileInput[0].placeholder = file.name;
  });
}
