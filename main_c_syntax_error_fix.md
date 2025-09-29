# Исправление ошибки "expected declaration or statement at end of input" в main.c

## 🔍 Анализ ошибки

Ошибка `../Core/Src/main.c:190:1: error: expected declaration or statement at end of input` указывает на **неполный или поврежденный файл main.c**.

## 🚨 Возможные причины:

### 1. **Отсутствует закрывающая фигурная скобка функции main()**
Ваша функция `Error_Handler` выглядит правильно, но скорее всего проблема в том, что где-то выше не закрыта функция `main()` или другая функция.

### 2. **Файл обрезан/поврежден**
Файл `main.c` может быть неполным или поврежденным.

## 🛠 Решения:

### Решение 1: Проверить закрывающие скобки в main()
Убедитесь, что функция `main()` правильно закрыта:

```c
int main(void)
{
  /* USER CODE BEGIN 1 */

  /* USER CODE END 1 */

  /* MCU Configuration--------------------------------------------------------*/

  /* Reset of all peripherals, Initializes the Flash interface and the Systick. */
  HAL_Init();

  /* USER CODE BEGIN Init */

  /* USER CODE END Init */

  /* Configure the system clock */
  SystemClock_Config();

  /* USER CODE BEGIN SysInit */

  /* USER CODE END SysInit */

  /* Initialize all configured peripherals */
  MX_GPIO_Init();
  
  /* USER CODE BEGIN 2 */

  /* USER CODE END 2 */

  /* Infinite loop */
  /* USER CODE BEGIN WHILE */
  while (1)
  {
    /* USER CODE END WHILE */

    /* USER CODE BEGIN 3 */
  }
  /* USER CODE END 3 */
} // ← Эта скобка должна быть обязательно!

/**
  * @brief System Clock Configuration
  * @retval None
  */
void SystemClock_Config(void)
{
  // ... код конфигурации ...
} // ← И эта скобка тоже!

void Error_Handler(void)
{
  /* USER CODE BEGIN Error_Handler_Debug */
  /* User can add his own implementation to report the HAL error return state */
  __disable_irq();
  while (1)
  {
  }
  /* USER CODE END Error_Handler_Debug */
}
```

### Решение 2: Добавить недостающие элементы в конец файла

Добавьте в самый конец файла `main.c` (после `Error_Handler`):

```c
void Error_Handler(void)
{
  /* USER CODE BEGIN Error_Handler_Debug */
  /* User can add his own implementation to report the HAL error return state */
  __disable_irq();
  while (1)
  {
  }
  /* USER CODE END Error_Handler_Debug */
}

#ifdef  USE_FULL_ASSERT
/**
  * @brief  Reports the name and source line number where the assert_param error has occurred.
  * @param  file: pointer to the source file name
  * @param  line: assert_param error line source number
  * @retval None
  */
void assert_failed(uint8_t *file, uint32_t line)
{
  /* USER CODE BEGIN 6 */
  /* User can add his own implementation to report the file name and line number,
     ex: printf("Wrong parameters value: file %s on line %d\r\n", file, line) */
  /* USER CODE END 6 */
}
#endif /* USE_FULL_ASSERT */
```

### Решение 3: Перегенерировать код через CubeMX

1. Откройте файл `.ioc` в STM32CubeMX
2. Нажмите **Project Manager** → **Generate Code**
3. Это создаст новый правильный `main.c`
4. Скопируйте ваш пользовательский код из старого файла в соответствующие секции `/* USER CODE BEGIN */ ... /* USER CODE END */`

## 🔧 Пошаговая диагностика:

### Шаг 1: Проверить весь файл main.c
1. Откройте `Core/Src/main.c`
2. Нажмите **Ctrl+A** (выделить все)
3. Нажмите **Ctrl+Shift+F** (автоформатирование)
4. IDE покажет, где именно проблема со скобками

### Шаг 2: Проверить количество скобок
В любом текстовом редакторе:
- Найти все `{` в файле
- Найти все `}` в файле  
- Количество должно быть одинаковым

### Шаг 3: Использовать функцию поиска парных скобок
1. Поставьте курсор на любую `{`
2. Нажмите **Ctrl+Shift+P** (в некоторых IDE это покажет парную скобку)

## ⚡ Экстренное решение:

Если ничего не помогает, создайте новый проект в CubeMX с теми же настройками и скопируйте только ваш пользовательский код в секции `USER CODE`.

## 🎯 Быстрая проверка:

Посчитайте скобки в вашем коде:
- Каждой открывающей `{` должна соответствовать закрывающая `}`
- Проверьте функции `main()`, `SystemClock_Config()`, `Error_Handler()` и другие

**Наиболее вероятно: пропущена закрывающая скобка `}` в функции `main()` или `SystemClock_Config()`.**