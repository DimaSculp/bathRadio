# bathRadio

Умная колонка для душа / туалета: **Алиса** переключает режимы на ESP, статус виден на локальной веб-странице.

**MVP готов:** Алиса ↔ Home Assistant ↔ Feather HUZZAH (режимы радио / блютуз). Звук и реальный Bluetooth — следующий этап.

[![ESP8266](https://img.shields.io/badge/MCU-Feather%20HUZZAH%20ESP8266-blue)](https://www.adafruit.com/product/2821)
[![Home Assistant](https://img.shields.io/badge/Hub-Home%20Assistant-41BDF5)](https://www.home-assistant.io/)
[![ESPHome](https://img.shields.io/badge/Firmware-ESPHome-e74c3c)](https://esphome.io/)

## Что умеет MVP

| Режим | Голосовая команда | Смысл сейчас |
| --- | --- | --- |
| **Радио** | «Алиса, включи туалетное радио» | Статус на плате и в веб UI |
| **Блютуз** | «Алиса, включи туалетное радио с блютузом» | Статус на плате и в веб UI |

Управление также с телефона или ПК: `http://<IP-платы>/`.

Позже: SD + усилитель + динамик, настоящий Bluetooth A2DP (другая плата), корпус на 3D-принтере.

## Архитектура

```text
  Голос                         Ноутбук (Docker)
 ┌─────────┐   облако УДЯ   ┌──────────────────────┐
 │  Алиса  │ ──────────────►│  Home Assistant      │
 └─────────┘                │  + ESPHome Builder   │
                            └──────────┬───────────┘
                                       │ LAN / ESPHome API
                            ┌──────────▼───────────┐
                            │ Feather HUZZAH       │
                            │ Wi‑Fi 2.4 ГГц        │
                            │ веб UI :80           │
                            └──────────────────────┘
```

Подробнее: [docs/architecture.md](docs/architecture.md) · план: [docs/mvp.md](docs/mvp.md)

## Структура репозитория

```text
bathRadio/
├── README.md
├── docker-compose.yml          # HA + ESPHome на ноутбуке
├── docs/                       # архитектура и гайды
├── homeassistant/              # примеры конфига HA
└── esphome/                    # прошивка toilet-radio
    ├── toilet-radio.yaml
    ├── secrets.yaml.example
    └── www/                    # страница «Динамик / радио»
```

## Быстрый старт (Windows + Docker Desktop)

1. Клонируй репозиторий и скопируй секреты:

```bash
git clone https://github.com/DimaSculp/bathRadio.git
cd bathRadio
copy esphome\secrets.yaml.example esphome\secrets.yaml
```

2. Впиши в `esphome/secrets.yaml` пароль Wi‑Fi `TP-Link_0E9A` (файл в git не попадёт).

3. Подними стек:

```bash
docker compose up -d
```

4. Открой Home Assistant: [http://localhost:8123](http://localhost:8123)  
   ESPHome UI: [http://localhost:6052](http://localhost:6052)

5. Подключи Feather HUZZAH к **COM11**, прошей `toilet-radio` из ESPHome (USB), затем добавь устройство в HA.

Пошагово: [docs/setup-windows.md](docs/setup-windows.md)

## Железо MVP

- Adafruit Feather HUZZAH ESP8266 (4 MB flash)
- USB‑UART CP210x → COM11
- Wi‑Fi платы: только **2.4 ГГц** `TP-Link_0E9A`
- Ноутбук может сидеть в `TP-Link_0E9A_5G` — та же локалка

## Вне MVP

- Классический ESP32 + A2DP sink (8266 Bluetooth audio не тянет)
- Регулятор громкости 1–10
- microSD, I2S‑усилитель (MAX98357A и аналоги), водозащищённый динамик
- Корпус под 3D-печать
- Перенос HA с ноутбука: [docs/ha-migration.md](docs/ha-migration.md)

## Лицензия

Личный проект. Используй как основу для своей сборки.
