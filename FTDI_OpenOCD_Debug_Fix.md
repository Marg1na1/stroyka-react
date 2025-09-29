# Решение проблемы с FTDI отладчиком в OpenOCD

## 🔍 Анализ ошибки

```
Error: libusb_open() failed with LIBUSB_ERROR_NOT_FOUND
Error: no device found
Error: unable to open ftdi device with vid 0403, pid 6010
```

Это означает, что OpenOCD не может найти ваш FTDI отладчик с VID:PID 0403:6010.

## 🚨 Возможные причины:

1. **Отладчик не подключен** к компьютеру
2. **Неправильные драйверы** FTDI
3. **Устройство занято** другим процессом
4. **Проблемы с USB портом**
5. **Неправильная конфигурация** OpenOCD

## 🛠 Пошаговое решение:

### Шаг 1: Проверить физическое подключение
- ✅ Убедитесь, что отладчик подключен к USB порту
- ✅ Проверьте, что все кабели надежно соединены
- ✅ Попробуйте другой USB порт

### Шаг 2: Проверить наличие устройства в системе

#### Windows:
```cmd
# Откройте Device Manager (Диспетчер устройств)
# Найдите устройство с VID 0403 PID 6010
# Или выполните в командной строке:
wmic path Win32_PnPEntity where "DeviceID like '%VID_0403&PID_6010%'" get Name,DeviceID
```

#### Linux:
```bash
lsusb | grep 0403:6010
# Или более подробно:
lsusb -v -d 0403:6010
```

### Шаг 3: Исправить конфигурацию OpenOCD

Обновите ваш файл `SDK11M_FT.cfg`:

```tcl
# Исправленная версия SDK11M_FT.cfg
adapter driver ftdi
ftdi vid_pid 0x0403 0x6010
ftdi layout_init 0x0408 0x0ffb
ftdi layout_signal nSRST -oe 0x0800

# Дополнительные настройки для стабильности
adapter speed 2000
ftdi channel 0
```

Обновите `FTDBG.cfg`:
```tcl
# Исправленная версия FTDBG.cfg
source [find SDK11M_FT.cfg]
set WORKAREASIZE 0x8000
transport select jtag
set CHIPNAME STM32F427VITx
set BOARDNAME SDK1_1_M
reset_config srst_only
set CONNECT_UNDER_RESET 1

# Дополнительные настройки
adapter speed 2000
reset_config srst_only srst_pulls_trst

source [find target/stm32f4x.cfg]
```

### Шаг 4: Проблемы с драйверами

#### Windows - Установка правильных драйверов:

1. **Скачайте Zadig** с https://zadig.akeo.ie/
2. **Подключите отладчик**
3. **Запустите Zadig как администратор**
4. **Options** → **List All Devices**
5. **Выберите ваше FTDI устройство**
6. **Установите драйвер WinUSB** или **libusbK**

#### Linux - Настройка udev правил:

Создайте файл `/etc/udev/rules.d/99-ftdi.rules`:
```bash
# FTDI devices
SUBSYSTEM=="usb", ATTRS{idVendor}=="0403", ATTRS{idProduct}=="6010", MODE="0664", GROUP="plugdev"

# Перезагрузите правила:
sudo udevadm control --reload-rules
sudo udevadm trigger
```

Добавьте пользователя в группу:
```bash
sudo usermod -a -G plugdev $USER
# Перелогиньтесь после этого
```

### Шаг 5: Проверка конфликтов

#### Закройте конфликтующие программы:
- **STM32CubeProgrammer**
- **ST-Link Utility**
- **Другие экземпляры OpenOCD**
- **Putty/TeraTerm** (если подключены к COM портам FTDI)

#### Проверьте процессы:
```bash
# Linux/macOS:
ps aux | grep openocd
pkill openocd

# Windows:
tasklist | findstr openocd
taskkill /f /im openocd.exe
```

### Шаг 6: Альтернативные конфигурации

Попробуйте упрощенную конфигурацию:

```tcl
# Минимальная рабочая конфигурация
adapter driver ftdi
ftdi vid_pid 0x0403 0x6010
ftdi layout_init 0x0008 0x000b
adapter speed 1000

transport select jtag
set CHIPNAME STM32F427VITx
source [find target/stm32f4x.cfg]

init
reset halt
```

## 🔧 Диагностические команды:

### Проверить доступность OpenOCD:
```bash
openocd --version
```

### Запустить с отладочной информацией:
```bash
openocd -f FTDBG.cfg -d3
```

### Список поддерживаемых адаптеров:
```bash
openocd -c "adapter list" -c "exit"
```

## ⚡ Быстрые решения:

### Решение 1: Попробуйте ST-Link вместо FTDI
Если у вас есть ST-Link отладчик:
```tcl
source [find interface/stlink.cfg]
transport select hla_swd
set CHIPNAME STM32F427VITx
source [find target/stm32f4x.cfg]
```

### Решение 2: Проверьте другие PID для FTDI
Некоторые FTDI устройства могут иметь другой PID:
```tcl
# Попробуйте эти варианты:
ftdi vid_pid 0x0403 0x6010  # FT2232H
ftdi vid_pid 0x0403 0x6011  # FT4232H
ftdi vid_pid 0x0403 0x6014  # FT232H
```

### Решение 3: Использование встроенных конфигураций OpenOCD
```bash
# Поиск готовых конфигураций:
find /usr/share/openocd/scripts -name "*ftdi*" -o -name "*ft2232*"

# Попробуйте готовую конфигурацию:
openocd -f interface/ftdi/minimodule.cfg -f target/stm32f4x.cfg
```

## 📋 Чек-лист проверки:

- [ ] Отладчик физически подключен
- [ ] Устройство видно в системе (Device Manager/lsusb)
- [ ] Правильные драйверы установлены
- [ ] Нет конфликтующих программ
- [ ] Конфигурация OpenOCD обновлена
- [ ] Попробованы разные USB порты
- [ ] Проверены права доступа (Linux)

После выполнения этих шагов попробуйте снова запустить отладку в STM32CubeIDE.