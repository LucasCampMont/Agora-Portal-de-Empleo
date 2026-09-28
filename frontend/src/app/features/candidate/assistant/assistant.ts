import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

type AssistantAction =
  | 'cv'
  | 'jobs'
  | 'compatibility'
  | 'application'
  | 'learning'
  | 'interview';

interface AssistantMessage {
  id: number;
  sender: 'assistant' | 'user';
  text: string;
  time: string;
}

interface QuickAction {
  id: AssistantAction;
  title: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-assistant',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './assistant.html',
})
export class Assistant {
  readonly message = signal('');

  readonly messages = signal<AssistantMessage[]>([
    {
      id: 1,
      sender: 'assistant',
      text:
        'Hola. Soy tu Asistente Ágora. Puedo ayudarte a revisar tu CV, encontrar oportunidades, analizar tu compatibilidad con empleos, preparar postulaciones y desarrollar tus habilidades.',
      time: 'Ahora',
    },
    {
      id: 2,
      sender: 'assistant',
      text:
        'También puedo utilizar la información que tengas configurada en Ágora para darte recomendaciones más relevantes.',
      time: 'Ahora',
    },
  ]);

  readonly quickActions: QuickAction[] = [
    {
      id: 'cv',
      title: 'Revisar mi CV',
      description:
        'Analiza estructura, contenido, palabras clave y compatibilidad ATS.',
      icon: '📄',
    },
    {
      id: 'jobs',
      title: 'Encontrar empleos',
      description:
        'Busca oportunidades que coincidan con tu perfil y preferencias.',
      icon: '🔎',
    },
    {
      id: 'compatibility',
      title: 'Analizar compatibilidad',
      description:
        'Compara tu perfil con una vacante y descubre tus fortalezas y brechas.',
      icon: '🎯',
    },
    {
      id: 'application',
      title: 'Ayudarme a postular',
      description:
        'Prepara respuestas y revisa una postulación antes de enviarla.',
      icon: '✍️',
    },
    {
      id: 'learning',
      title: 'Quiero aprender',
      description:
        'Identifica habilidades que podrían ayudarte a mejorar tu perfil.',
      icon: '🎓',
    },
    {
      id: 'interview',
      title: 'Preparar entrevista',
      description:
        'Practica preguntas y prepara respuestas para una entrevista.',
      icon: '🗣️',
    },
  ];

  readonly contextItems = [
    {
      label: 'Perfil profesional',
      value: 'Configurado',
      icon: '♙',
    },
    {
      label: 'CV activo',
      value: 'CV principal',
      icon: '📄',
    },
    {
      label: 'Preferencias',
      value: 'Configuradas',
      icon: '⚙',
    },
    {
      label: 'Experiencia',
      value: 'Disponible',
      icon: '▣',
    },
  ];

  setMessage(value: string): void {
    this.message.set(value);
  }

  handleEnter(event: Event): void {
    const keyboardEvent = event as KeyboardEvent;

    if (keyboardEvent.shiftKey) {
      return;
    }

    keyboardEvent.preventDefault();
    this.sendMessage();
  }

  sendMessage(): void {
    const text = this.message().trim();

    if (!text) {
      return;
    }

    const timestamp = Date.now();

    this.messages.update((messages) => [
      ...messages,
      {
        id: timestamp,
        sender: 'user',
        text,
        time: 'Ahora',
      },
      {
        id: timestamp + 1,
        sender: 'assistant',
        text:
          'Entendido. Esta función quedará conectada al motor de inteligencia de Ágora para analizar tu solicitud utilizando tu perfil, CV y contexto laboral.',
        time: 'Ahora',
      },
    ]);

    this.message.set('');
  }

  executeAction(action: AssistantAction): void {
    const responses: Record<AssistantAction, string> = {
      cv:
        'Voy a revisar tu CV considerando estructura, experiencia, habilidades, palabras clave y compatibilidad ATS.',

      jobs:
        'Voy a buscar oportunidades considerando tu perfil profesional, preferencias, experiencia y habilidades.',

      compatibility:
        'Puedo analizar qué tan bien encaja tu perfil con una vacante y mostrarte fortalezas, brechas y aspectos a mejorar.',

      application:
        'Puedo ayudarte a preparar una postulación utilizando tu CV y tus respuestas guardadas. Antes de enviar algo, podrás revisarlo.',

      learning:
        'Puedo identificar brechas de habilidades y proponerte una ruta de aprendizaje relacionada con los cargos que te interesan.',

      interview:
        'Puedo ayudarte a practicar entrevistas, preparar respuestas y simular preguntas relacionadas con el cargo.',
    };

    const timestamp = Date.now();

    this.messages.update((messages) => [
      ...messages,
      {
        id: timestamp,
        sender: 'user',
        text: this.getActionTitle(action),
        time: 'Ahora',
      },
      {
        id: timestamp + 1,
        sender: 'assistant',
        text: responses[action],
        time: 'Ahora',
      },
    ]);
  }

  private getActionTitle(action: AssistantAction): string {
    const titles: Record<AssistantAction, string> = {
      cv: 'Quiero revisar mi CV',
      jobs: 'Quiero encontrar empleos',
      compatibility: 'Quiero analizar mi compatibilidad',
      application: 'Quiero ayuda para postular',
      learning: 'Quiero aprender',
      interview: 'Quiero preparar una entrevista',
    };

    return titles[action];
  }
}