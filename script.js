const fileUpload = document.getElementById('fileUpload');
const uploadButton = document.getElementById('uploadButton');
const syncButton = document.getElementById('syncButton');
const audioPlayer = document.getElementById('audioPlayer');
const playlist = document.querySelector('.playlist');

// Функция для чтения файлов и добавления в фонотеку
function handleFileUpload(event) {
  const files = event.target.files;
  for (const file of files) {
    const song = {
      name: file.name,
      url: URL.createObjectURL(file)
    };
    playlist.innerHTML += `<li data-url="${song.url}">${song.name}</li>`;
  }
}

// Обработчик события загрузки файлов
fileUpload.addEventListener('change', handleFileUpload);

// Функция для воспроизведения выбранной песни
function playSong(url) {
  audioPlayer.src = url;
  audioPlayer.play();
}

// Обработчик клика по элементам фонотеки
playlist.addEventListener('click', (event) => {
  if (event.target.tagName === 'LI') {
    const url = event.target.getAttribute('data-url');
    playSong(url);
  }
});

// Функция для синхронизации с GitHub (пример реализации)
function syncWithGitHub() {
  // Здесь должен быть код для синхронизации с GitHub
  // Например, использование GitHub API для загрузки файлов в репозиторий
  console.log('Синхронизация с GitHub...');
  // ...
}

// Обработчик кнопки синхронизации
syncButton.addEventListener('click', syncWithGitHub);

// Авто-сохранение фонотеки в локальную папку и GitHub при загрузке файлов
uploadButton.addEventListener('click', () => {
  const songs = Array.from(playlist.querySelectorAll('li')).map(li => ({
    name: li.textContent,
    url: li.getAttribute('data-url')
  }));
  
  // Сохранение фонотеки в локальную папку
  const jsonData = JSON.stringify(songs, null, 2);
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([jsonData], { type: 'application/json' }));
  a.download = 'fonoteca.json';
  a.click();
  
  // Пример синхронизации с GitHub (использование GitHub API)
  // ...
});