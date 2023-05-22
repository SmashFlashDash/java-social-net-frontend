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

### Проверить, что контейнер запущен
```
docker ps
```

### Остановить контейнер
```
docker stop frontend
```

### Повторно запустить контейнер
```
docker start frontend
```

### Удалить контейнер
```
docker rm frontend
```

### Удалить имадж
```
docker rmi frontend
```