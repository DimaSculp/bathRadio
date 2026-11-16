# Установка на Windows (Docker Desktop)

## Требования

- Docker Desktop запущен
- Git
- Плата на COM11 (Silicon Labs CP210x)
- Пароль Wi‑Fi 2.4 ГГц под рукой (только в `secrets.yaml`)

## 1. Секреты

```powershell
cd path\to\bathRadio
Copy-Item esphome\secrets.yaml.example esphome\secrets.yaml
notepad esphome\secrets.yaml
```

Заполни `wifi_password`. Остальные ключи сгенерируй (см. комментарии в файле).

## 2. Запуск контейнеров

```powershell
docker compose up -d
docker compose ps
```

- Home Assistant: http://localhost:8123  
- ESPHome: http://localhost:6052  

При первом входе в HA создай аккаунт и дом.

## 3. Прошивка платы

1. Открой ESPHome Dashboard → устройство `toilet-radio`
2. Install → Plug into the computer → выбери COM11
3. Если Docker Desktop не видит COM-порт: установи [ESPHome](https://esphome.io/guides/installing_esphome/) локально и выполни:

```powershell
cd esphome
esphome run toilet-radio.yaml --device COM11
```

## 4. Добавление в HA

Настройки → Устройства и службы → Добавить интеграцию → ESPHome → IP платы или `toilet-radio.local`.

## 5. Алиса

1. Поставь в HA интеграцию [Yandex Smart Home](https://github.com/dmitry-k/yandex_smart_home) (HACS или вручную)
2. Отметь сущности «Туалетное радио» и «Туалетное радио с блютузом»
3. Обнови список устройств в приложении Дом с Алисой
4. Проверь фразы голосом

## Остановка

```powershell
docker compose down
```

Данные HA остаются в `homeassistant/config/`.
