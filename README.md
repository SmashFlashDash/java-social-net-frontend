### Собрать имадж на основе Dockerfile

Выполнить из корневой папки проекта, в которой находится файл 'Dockerfile':

```bash
docker build -t frontend .
```

### Проверить, что имадж frontend создан
```
docker images
```

### Запустить контейнер на основе созданного имаджа
```
docker run -d -p 8099:80 --name frontend frontend
```

после запуска нового контейнера пройдите в терминале контейнера по адресу: **/etc/nginx/conf.d** и откройте **default.conf** редактором или просто внесите (**cat > default.conf**) (эта команда перепишет) следующее содержимое:
```
server {
listen 80;
server_name frontend;

location / {
root /usr/share/nginx/html;
try_files $uri /index.html;
}

location /api/v1/ {
proxy_pass http://host.docker.internal:8080;
}
}
```

Если работали командой cat, выйти - ctrl+z.


#### Проверить, что контейнер запущен
```
docker ps
```

#### Остановить контейнер
```
docker stop frontend
```

#### Повторно запустить контейнер
```
docker start frontend
```

#### Удалить контейнер
```
docker rm frontend
```

#### Удалить имадж
```
docker rmi frontend
```