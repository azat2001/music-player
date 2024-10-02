const audioElement = document.querySelector('audio');
const playlistElement = document.getElementById('playlist');
const audioSource = document.getElementById('audioSource');

// Загрузка списка музыкальных файлов из папки на GitHub
fetch('https://raw.githubusercontent.com/ваш_пользователь/ваш_репозиторий/main/папка_с_музыкой/список_файлов.txt')
  .then(response => response.text())
  .then(data => {
    const файлы = data.split('\n');
    файлы.forEach(файл => {
      if (файл) {
        const li = document.createElement('li');
        li.textContent = файл;
        li.addEventListener('click', () => {
          audioSource.src = `https://raw.githubusercontent.com/ваш_пользователь/ваш_репозиторий/main/папка_с_музыкой/${encodeURIComponent(файл)}`;
          audioElement.load();
          audioElement.play();
        });
        playlistElement.appendChild(li);
      }
    });
  });