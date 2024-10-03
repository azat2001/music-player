const uploadInput = document.getElementById('uploadInput');
const uploadButton = document.getElementById('uploadButton');
const syncButton = document.getElementById('syncButton');
const audioPlayer = document.getElementById('audioPlayer');
const playlist = document.getElementById('playlist');

// Функция для загрузки файлов на GitHub
uploadButton.addEventListener('click', () => {
    uploadInput.click();
});

uploadInput.addEventListener('change', () => {
    const files = uploadInput.files;
    // Здесь необходимо реализовать загрузку файлов на GitHub, например, с помощью GitHub API
});

// Функция для синхронизации с GitHub
syncButton.addEventListener('click', () => {
    // Получаем список файлов с GitHub и обновляем плейлист
    // Пример: использование Fetch API для получения данных с GitHub
    fetch('https://api.github.com/repos/azat2001/music-player/contents/music_folder')
        .then(response => response.json())
        .then(data => {
            playlist.innerHTML = '';
            data.forEach(file => {
                const listItem = document.createElement('li');
                listItem.textContent = file.name;
                listItem.addEventListener('click', () => {
                    audioPlayer.src = `https://raw.githubusercontent.com/azat2001/music-player/main/music_folder/${file.name}`;
                    audioPlayer.play();
                });
                playlist.appendChild(listItem);
            });
        });
});