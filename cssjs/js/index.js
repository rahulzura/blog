window.onload = () => {
  loadDp();
};

// Load dp
const loadDp = () => {
  const introDpDiv = document.querySelector(".intro__dp");

  const img = document.createElement("img");
  img.setAttribute("src", "images/dp.jpg");
  img.setAttribute("alt", "My display picture");
  introDpDiv.appendChild(img);
};

// Project List
const projectList = [
  {
    thumbnail: "face-detector.jpg",
    title: "Face Detector",
    des:
      "This app detects any faces in an image, built using React for UI and Node.js with Express.js for backend. It uses Clarifai Face Detection API to detect faces in the images. It is deployed on Heroku.",
    github: "https://github.com/rahulzura/face-detector",
    live: "https://face-square.herokuapp.com/"
  },
  {
    thumbnail: "code-n-share.jpg",
    title: "Code N Share",
    des:
      "Online HTML and CSS editor. Gives a link of the page build with provided HTML and CSS which can be shared, the link is valid for an hour.",
    github: "https://github.com/rahulzura/code-n-share",
    live: "https://github.com/rahulzura/code-n-share-backend"
  }
];

// Load Project List
const loadProjectList = projectList => {
  const projectListDiv = document.querySelector(".project-list");

  const projectElements = projectList.map(project => {
    const divProject = document.createElement("div");
    divProject.setAttribute("class", "project");

    // 3. to append to divProject
    const divThubmnail = document.createElement("div");
    divThubmnail.setAttribute("class", "thumbnail");

    // 1. to append to divThumbnail
    const img = document.createElement("img");
    img.setAttribute("src", project.thumbnail);
    img.setAttribute("alt", project.title);

    // 4. to append to divProject
    const divDes = document.createElement("div");
    divDes.setAttribute("class", "des");

    // 2. to append to divDes
    const text = document.createTextNode(project.des);

    // 5. to append to divProject
    const divClear = document.createElement("div");
    divClear.setAttribute("class", "clear");

    const divGithub = document.createElement("div");
    divGithub.setPointerCapture("class", "project__link");

    const divLaunch = document.createElement("div");
    divLaunch.setAttribute("class", "project-link");

    // append in the above order
    divThubmnail.appendChild(img);
    divDes.appendChild(text);
    divProject.appendChild(divThubmnail);
    divProject.appendChild(divDes);
    divProject.appendChild(divClear);

    // return divProject
    return divProject;
  });

  // append projectElements to projectListDiv
  projectElements.forEach(projectElement =>
    projectListDiv.appendChild(projectElement)
  );
};

{
  /* <div class="intro">
    <div class="intro__dp">
      <img src="images/dp.jpg" alt="My display picture">
    </div>
    <div class="intro__text">
        <p><strong>Hey, I'm Rahul</strong>. I'm a full stack web developer, based in India. Below are some projects and articles by me.</p>
    </div>
    <div class="clear"></div>
</div> */
}
