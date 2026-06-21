export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  technologies: string[];
  images: string[];
  codeSnippets: CodeSnippet[];
  links: {
    github?: string;
    demo?: string;
  };
}

export interface CodeSnippet {
  language: string;
  title: string;
  code: string;
}

export interface Skill {
  name: string;
  level: number;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
}

export const personalInfo = {
  name: 'ROMAN CODE',
  role: 'Software Developer & Computer Science Student',
  tagline: 'Студент 4 курса Крымского федерального университета имени В.И. Вернадского. Изучаю разработку программного обеспечения, backend-разработку, базы данных и современные технологии. Люблю писать код и создавать полезные проекты.',
  email: 'kylikov.zxxz@gmail.com',
  github: 'https://github.com/graph10',
  telegram: 'https://t.me/peekpray',
};

export const aboutText: string[] = [
  `Я студент 4 курса бакалавриата Крымского федерального университета имени В.И. Вернадского по направлению, связанному с информационными технологиями и разработкой программного обеспечения.`,

  `Мне нравится программирование как процесс решения задач. Я постоянно изучаю новые технологии, экспериментирую с различными подходами к разработке и создаю собственные проекты для развития практических навыков.`,

  `Мне интересно несколько направлений разработки, поэтому я активно изучаю разные технологии и стремлюсь получить широкий практический опыт.`,

  `Сейчас я нахожусь в поиске возможности начать профессиональную карьеру в сфере разработки программного обеспечения, получить опыт работы в команде и продолжать расти как инженер.`
];

export const skills: Skill[] = [
  { name: 'Python', level: 85 },
  { name: 'Django', level: 80 },
  { name: 'SQL', level: 83 },
  { name: 'REST API', level: 85 },
  { name: 'Docker', level: 65 },
  { name: 'Git', level: 78 },
  { name: 'html/css', level: 75 },

  { name: 'Java', level: 40 },
  { name: 'TypeScript', level: 65 },
  { name: 'C#', level: 30 },
  { name: 'Prompt Engineering', level: 70 },
];

export const projects: Project[] = [

  {
    id: 'slothy-step-counter',
    title: 'Slothy — фитнес-трекер шагов для Android',
    shortDescription:
      'Android-приложение для подсчета шагов, расчета дистанции и калорий с сохранением статистики и фоновым уведомлением.',

    fullDescription:
      'Мобильное Android-приложение для отслеживания физической активности пользователя. Приложение использует датчики устройства для определения шагов в режиме реального времени, рассчитывает пройденную дистанцию и потраченные калории, сохраняет данные между перезапусками и отображает текущую статистику в постоянном системном уведомлении. Архитектура построена по принципам Clean Architecture с разделением слоев данных, домена и пользовательского интерфейса. Для внедрения зависимостей используется Hilt, а для локального хранения данных — DataStore. Реализована работа с foreground service для отображения статистики даже при свернутом приложении.',

    technologies: [
      'Kotlin',
      'Jetpack Compose',
      'Hilt',
      'DataStore',
      'Coroutines',
      'Flow',
      'Android Sensors',
      'Foreground Service',
      'Clean Architecture',
      'MVVM'
    ],

    images: ['/projects/Slothy.jpg'],

    codeSnippets: [
      {
        language: 'kotlin',
        title: 'Обработка шагов через акселерометр',
        code: `override fun onSensorChanged(
      event: SensorEvent?
  ) {
      event ?: return

      val x = event.values[0]
      val y = event.values[1]
      val z = event.values[2]

      val magnitude = sqrt(
          (x * x + y * y + z * z).toDouble()
      )

      val currentTime =
          System.currentTimeMillis()

      if (
          magnitude > 12.0 &&
          currentTime - lastStepTime > 350
      ) {

          lastStepTime = currentTime
          _steps.value += 1

          scope.launch {
              preferencesDataStore
                  .setCurrentSteps(
                      _steps.value
                  )
          }
      }
  }`
      }
    ],

    links: {
      github: 'https://github.com/graph10/Slothy',
    }
  },

  {
    id: 'productivity-radar',
    title: 'Productivity Radar',
    shortDescription:
      'Веб-приложение для отслеживания привычек, анализа продуктивности и визуализации личной статистики.',

    fullDescription:
      'Полноценный fullstack-проект для управления привычками и анализа продуктивности. Пользователь может создавать привычки, отмечать выполнение задач, оценивать уровень энергии и получать подробную аналитику. Реализованы REST API, интерактивный дашборд, графики статистики, адаптивный интерфейс и контейнеризация приложения с помощью Docker.',

    technologies: [
      'Python',
      'Django',
      'Django REST Framework',
      'SQLite',
      'Tailwind CSS',
      'Alpine.js',
      'HTMX',
      'Chart.js',
      'Docker'
    ],

    images: ['/projects/productivity-radar.jpg'],

    codeSnippets: [
      {
        language: 'python',
        title: 'Расчет недельной статистики',
        code: `for i in range(7):
      d = week_ago + timedelta(days=i)
      day_entries = entries_by_day.get(d.isoformat(), [])

      total = len(day_entries)
      done = sum(
          1 for e in day_entries
          if e.completed
      )

      week_data.append({
          "date": d.isoformat(),
          "total": total,
          "done": done,
          "rate": round(
              done / total * 100, 1
          ) if total else 0
      })`,
      },
    ],

    links: {
      github: 'https://github.com/graph10/productivity-radar',
      demo: 'https://productivity-radar.onrender.com'
    },
  },

];

export const experience: Experience[] = [
  {
    company: 'ООО «САНБ»',
    role: 'Специалист по внедрению ELMA365',
    period: '12.2024 — 09.2025',
    description: '• Внедрение и сопровождение корпоративной BPM/Low-Code платформы ELMA365. \n • Настройка бизнес-процессов, маршрутов согласования и пользовательских интерфейсов. \n • Проектирование структуры данных, ролей и моделей доступа. \n • Анализ требований заказчиков и адаптация решений под бизнес-процессы компаний. \n • Тестирование, поддержка пользователей и подготовка проектной документации.'
    },
  {
    company: 'Миранда-Медиа',
    role: 'Специалист клиентской поддержки',
    period: '10.2025 — 12.2025',
    description: `• Работа с обращениями клиентов и корпоративных заказчиков
• Использование биллинговых систем и внутренних сервисов компании
• Обработка заявок и сопровождение услуг связи
• Взаимодействие с технической поддержкой
• Ведение клиентской документации`
  },
];
