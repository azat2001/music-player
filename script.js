document.addEventListener('DOMContentLoaded', function() {
    const uploadButton = document.getElementById('uploadButton');
    const fileUpload = document.getElementById('fileUpload');
    const musicLibrary = document.getElementById('musicLibrary');
    const audioPlayer = document.getElementById('audioPlayer');

    // Функция для чтения файлов из папки на компьютере
    function readFiles(files) {
        if (files.length) {
            const formData = new FormData();
            for (let i = 0; i < files.length; i++) {
                formData.append('files', files[i]);
            }

            fetch('https://api.github.com/repos/azat2001/music-player/contents/music', {
                method: 'POST',
                headers: {
                    'Authorization': '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'
                },
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                console.log('Файлы успешно загружены:', data);
                displayMusicLibrary();
            })
            .catch(error => console.error('Ошибка загрузки файлов:', error));
        }
    }

    // Функция для отображения фонотеки
    function displayMusicLibrary() {
        fetch('https://api.github.com/repos/azat2001/music-player/contents/music')
            .then(response => response.json())
            .then(data => {
                musicLibrary.innerHTML = '';
                data.forEach(item => {
                    if (item.type === 'file' && item.name.endsWith('.mp3')) {
                        const trackName = item.name.replace(/\.mp3$/, '');
                        const audioElement = document.createElement('audio');
                        audioElement.src = item.download_url;
                        audioElement.controls = true;
                        audioElement.addEventListener('click', function() {
                            audioPlayer.src = this.src;
                        });
                        musicLibrary.appendChild(audioElement);
                        musicLibrary.appendChild(document.createTextNode(trackName));
                        musicLibrary.appendChild(document.createElement('br'));
                    }
                });
            })
            .catch(error => console.error('Ошибка получения фонотеки:', error));
    }

    uploadButton.addEventListener('click', function() {
        readFiles(fileUpload.files);
        fileUpload.value = '';
    });

    // Отображаем фонотеку при загрузке страницы
    displayMusicLibrary();
});