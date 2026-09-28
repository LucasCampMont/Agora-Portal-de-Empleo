import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';

type AnswerCategory =
  | 'Todas'
  | 'Perfil'
  | 'Experiencia'
  | 'Disponibilidad'
  | 'Expectativas'
  | 'Motivación';

interface SavedAnswer {
  id: number;
  question: string;
  answer: string;
  category: Exclude<AnswerCategory, 'Todas'>;
  usageCount: number;
  updatedAt: string;
  favorite: boolean;
}

@Component({
  selector: 'app-application-answers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './application-answers.html',
})
export class ApplicationAnswers {
  readonly activeCategory = signal<AnswerCategory>('Todas');
  readonly searchTerm = signal('');
  readonly selectedAnswer = signal<SavedAnswer | null>(null);
  readonly showAnswerModal = signal(false);

  readonly answers = signal<SavedAnswer[]>([
    {
      id: 1,
      question: 'Cuéntanos sobre tu experiencia profesional.',
      answer:
        'Soy Ingeniero Civil Industrial con experiencia en análisis de datos, automatización de procesos y gestión de información. He trabajado utilizando herramientas como Python, SQL, Power BI, Excel y Power Automate para apoyar la generación de reportes, análisis y mejora de procesos.',
      category: 'Experiencia',
      usageCount: 8,
      updatedAt: 'Actualizada hace 3 días',
      favorite: true,
    },
    {
      id: 2,
      question: '¿Por qué te interesa este cargo?',
      answer:
        'Me interesa este cargo porque combina análisis, tecnología y resolución de problemas. Busco seguir desarrollándome profesionalmente en un entorno donde pueda aportar con mis conocimientos y, al mismo tiempo, continuar aprendiendo nuevas herramientas y metodologías.',
      category: 'Motivación',
      usageCount: 6,
      updatedAt: 'Actualizada hace 1 semana',
      favorite: true,
    },
    {
      id: 3,
      question: '¿Cuál es tu pretensión de renta?',
      answer: '$1.300.000 líquidos, conversable según las características y responsabilidades del cargo.',
      category: 'Expectativas',
      usageCount: 5,
      updatedAt: 'Actualizada hace 2 semanas',
      favorite: false,
    },
    {
      id: 4,
      question: '¿Qué modalidad de trabajo prefieres?',
      answer:
        'Mi preferencia es una modalidad híbrida, aunque también tengo disponibilidad para evaluar oportunidades remotas o presenciales dependiendo del cargo y sus condiciones.',
      category: 'Disponibilidad',
      usageCount: 4,
      updatedAt: 'Actualizada hace 2 semanas',
      favorite: false,
    },
    {
      id: 5,
      question: '¿Cuándo podrías comenzar?',
      answer:
        'Tengo disponibilidad para coordinar mi incorporación de acuerdo con las necesidades del proceso y la fecha requerida por la empresa.',
      category: 'Disponibilidad',
      usageCount: 3,
      updatedAt: 'Actualizada hace 1 mes',
      favorite: false,
    },
    {
      id: 6,
      question: '¿Cuáles son tus principales fortalezas?',
      answer:
        'Destaco por mi capacidad de análisis, aprendizaje autónomo y resolución de problemas. También tengo facilidad para combinar conocimientos de negocio y tecnología para encontrar soluciones prácticas.',
      category: 'Perfil',
      usageCount: 7,
      updatedAt: 'Actualizada hace 1 mes',
      favorite: true,
    },
  ]);

  readonly filteredAnswers = computed(() => {
    const category = this.activeCategory();
    const search = this.searchTerm().trim().toLowerCase();

    return this.answers().filter((answer) => {
      const matchesCategory =
        category === 'Todas' || answer.category === category;

      const matchesSearch =
        !search ||
        answer.question.toLowerCase().includes(search) ||
        answer.answer.toLowerCase().includes(search);

      return matchesCategory && matchesSearch;
    });
  });

  readonly totalAnswers = computed(() => this.answers().length);

  readonly favoriteAnswers = computed(
    () => this.answers().filter((answer) => answer.favorite).length,
  );

  readonly totalUses = computed(
    () => this.answers().reduce((total, answer) => total + answer.usageCount, 0),
  );

  setCategory(category: AnswerCategory): void {
    this.activeCategory.set(category);
  }

  setSearchTerm(value: string): void {
    this.searchTerm.set(value);
  }

  openAnswer(answer: SavedAnswer): void {
    this.selectedAnswer.set(answer);
    this.showAnswerModal.set(true);
  }

  closeAnswer(): void {
    this.showAnswerModal.set(false);
    this.selectedAnswer.set(null);
  }

  toggleFavorite(answer: SavedAnswer): void {
    this.answers.update((answers) =>
      answers.map((item) =>
        item.id === answer.id
          ? {
              ...item,
              favorite: !item.favorite,
            }
          : item,
      ),
    );
  }

  useAnswer(answer: SavedAnswer): void {
    this.answers.update((answers) =>
      answers.map((item) =>
        item.id === answer.id
          ? {
              ...item,
              usageCount: item.usageCount + 1,
            }
          : item,
      ),
    );

    console.log('Usar respuesta:', answer.question);
  }

  createAnswer(): void {
    console.log('Crear nueva respuesta');
  }

  editAnswer(answer: SavedAnswer): void {
    console.log('Editar respuesta:', answer.question);
  }
}