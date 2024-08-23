
    const tracks = [
      {
        title: "About You",
        artist: "1975",
        src: "https://basenaijang.com.ng/file-download/the-1975-about-you/",
        img: "/src/images/aboutalbum.jpeg",
        duration: "2:14",
      },
      {
        title: "Birds of Feather",
        artist: "Billie Eilish",
        src: "https://basenaijang.com.ng/file-download/billie-eilish-birds-of-a-feather/",
        img: "/src/images/birdsalbum.jpeg",
        duration: "2:14",
      },
      {
        title: "Love",
        artist: "Wave to Earth",
        src: "https://hjksdhhgajhdsiueiqwe.uyeshare.cc/mp3/128/SJbQyPluVaBvQZll3npAfQvzYDbJ7v0Q",
        img: "/src/images/lovealbum.jpeg",
        duration: "2:14",
      },
    
    ];
    let currentTrackIndex = 0;
    const audio = new Audio();
    const trackTableBodyElem = document.querySelector("#trackTable tbody");
    const trackImageElem = document.getElementById("trackImage");
    const trackTitleElem = document.getElementById("trackTitle");
    const trackArtistElem = document.getElementById("trackArtist");
    const playPauseBtn = document.getElementById("playPauseBtn");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const seekSlider = document.getElementById("seekSlider");
    const volumeSlider = document.getElementById("volumeSlider");

    // Populate track table
    tracks.forEach((track, index) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><img src="${track.img}" alt="${track.title}"></td>
        <td>${track.title}</td>
        <td>${track.artist}</td>
        <td>${track.duration}</td>
      `;
      tr.addEventListener("click", () => loadTrack(index));
      trackTableBodyElem.appendChild(tr);
    });

    function loadTrack(index) {
      currentTrackIndex = index;
      const track = tracks[index];
      audio.src = track.src;
      trackImageElem.src = track.img;
      trackTitleElem.textContent = track.title;
      trackArtistElem.textContent = track.artist;
      audio.play();
      playPauseBtn.textContent = "⏸";
    }

    playPauseBtn.addEventListener("click", () => {
      if (audio.paused) {
        audio.play();
        playPauseBtn.textContent = "⏸";
      } else {
        audio.pause();
        playPauseBtn.textContent = "▶️";
      }
    });

    prevBtn.addEventListener("click", () => {
      currentTrackIndex = currentTrackIndex > 0 ? currentTrackIndex - 1 : tracks.length - 1;
      loadTrack(currentTrackIndex);
    });

    nextBtn.addEventListener("click", () => {
      currentTrackIndex = currentTrackIndex < tracks.length - 1 ? currentTrackIndex + 1 : 0;
      loadTrack(currentTrackIndex);
    });

    audio.addEventListener("timeupdate", () => {
      const progress = (audio.currentTime / audio.duration) * 100;
      seekSlider.value = progress;
    });

    seekSlider.addEventListener("input", () => {
      const seekTo = audio.duration * (seekSlider.value / 100);
      audio.currentTime = seekTo;
    });

    volumeSlider.addEventListener("input", () => {
      audio.volume = volumeSlider.value / 100;
    });

    loadTrack(currentTrackIndex);