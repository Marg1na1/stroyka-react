# Быстрый чек-лист для исправления путей в STM32CubeIDE

## 🚀 Немедленные действия (5 минут)

### 1. Добавить основные пути включения
**Правый клик на проект** → **Properties** → **C/C++ Build** → **Settings** → **MCU GCC Compiler** → **Include paths**

Добавить эти пути (нажать кнопку **+**):
```
../Core/Inc
../Drivers/STM32F4xx_HAL_Driver/Inc
../Drivers/STM32F4xx_HAL_Driver/Inc/Legacy
../Drivers/CMSIS/Device/ST/STM32F4xx/Include
../Drivers/CMSIS/Include
```

### 2. Добавить макросы препроцессора
В том же окне: **MCU GCC Compiler** → **Preprocessor** → **Defined symbols**

Добавить:
```
STM32F427xx
USE_HAL_DRIVER
DEBUG
```

### 3. Очистить и пересобрать
- **Project** → **Clean** → выбрать проект → **Clean**
- **Project** → **Build Project**

---

## 🔍 Если проблема остается

### Проверить структуру папок:
```
YourProject/
├── Core/Inc/          ← Должны быть ваши .h файлы
├── Drivers/
│   ├── STM32F4xx_HAL_Driver/Inc/  ← HAL заголовки
│   └── CMSIS/Include/             ← CMSIS заголовки
```

### Проверить файл stm32f4xx_hal_conf.h:
- Должен быть в `Core/Inc/`
- Должен содержать `#define STM32F427xx`

---

## 📝 Быстрая диагностика

### В консоли сборки ищите ошибки:
- `fatal error: 'stm32f4xx_hal.h' file not found` → добавить HAL путь
- `fatal error: 'arm_math.h' file not found` → добавить CMSIS путь
- `fatal error: 'main.h' file not found` → добавить Core/Inc путь

---

## ⚡ Экстренное решение

Если ничего не помогает:
1. Создать новый проект в CubeMX с той же конфигурацией
2. Скопировать ваш код в новый проект
3. Сравнить настройки путей между проектами