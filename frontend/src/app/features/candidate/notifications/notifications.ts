import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { Router } from '@angular/router';

type NotificationType =
  | 'application'
  | 'evaluation'
  | 'flash'
  | 'message'
  | 'job'
  | 'profile';

type NotificationFilter = 'all' | 'unread';

interface CandidateNotification {
  id: number;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  unread: boolean;
  route?: string;
  actionLabel?: string;
}

@Component({
  selector: 'app-notifications',
  imports: [CommonModule],
  templateUrl: './notifications.html',
})
export class Notifications {
  readonly activeFilter = signal<NotificationFilter>('all');

  readonly notifications = signal<CandidateNotification[]>([
    {
      id: 1,
      type: 'application',
      title: 'Tu postulación avanzó',
      message:
        'Tu postulación a Analista de Datos pasó a la etapa de evaluación.',
      time: 'Hace 15 min',
      unread: true,
      route: '/candidate/applications',
      actionLabel: 'Ver postulación',
    },
    {
      id: 2,
      type: 'evaluation',
      title: 'Tienes una evaluación pendiente',
      message:
        'La empresa solicitó completar una evaluación técnica de SQL.',
      time: 'Hace 1 hora',
      unread: true,
      route: '/candidate/evaluations',
      actionLabel: 'Ver evaluación',
    },
    {
      id: 3,
      type: 'flash',
      title: 'Nueva Solicitud Flash',
      message:
        'Una empresa quiere conocer tu disponibilidad para un proceso de selección.',
      time: 'Hace 3 horas',
      unread: true,
      actionLabel: 'Revisar solicitud',
    },
    {
      id: 4,
      type: 'message',
      title: 'Nuevo mensaje de reclutador',
      message:
        'Tienes una nueva comunicación relacionada con una de tus postulaciones.',
      time: 'Ayer',
      unread: true,
      route: '/candidate/applications',
      actionLabel: 'Ver proceso',
    },
    {
      id: 5,
      type: 'job',
      title: 'Encontramos empleos para ti',
      message:
        'Hay 8 nuevas oportunidades que coinciden con tu perfil profesional.',
      time: 'Ayer',
      unread: false,
      route: '/candidate/recommended',
      actionLabel: 'Ver recomendaciones',
    },
    {
      id: 6,
      type: 'profile',
      title: 'Completa tu perfil',
      message:
        'Agregar tus habilidades e idiomas puede mejorar la precisión de tus recomendaciones.',
      time: 'Hace 2 días',
      unread: false,
      route: '/candidate',
      actionLabel: 'Completar perfil',
    },
    {
      id: 7,
      type: 'application',
      title: 'Postulación recibida',
      message:
        'Tu postulación a Ingeniero de Procesos fue enviada correctamente.',
      time: 'Hace 3 días',
      unread: false,
      route: '/candidate/applications',
      actionLabel: 'Ver postulación',
    },
    {
      id: 8,
      type: 'evaluation',
      title: 'Evaluación completada',
      message:
        'Tu evaluación de personalidad ya está disponible para consulta.',
      time: 'Hace 4 días',
      unread: false,
      route: '/candidate/evaluations',
      actionLabel: 'Ver resultado',
    },
  ]);

  readonly filteredNotifications = computed(() => {
    if (this.activeFilter() === 'unread') {
      return this.notifications().filter(
        (notification) => notification.unread,
      );
    }

    return this.notifications();
  });

  readonly unreadCount = computed(
    () =>
      this.notifications().filter(
        (notification) => notification.unread,
      ).length,
  );

  readonly totalCount = computed(() => this.notifications().length);

  setFilter(filter: NotificationFilter): void {
    this.activeFilter.set(filter);
  }

  markAsRead(notification: CandidateNotification): void {
    if (!notification.unread) {
      return;
    }

    this.notifications.update((items) =>
      items.map((item) =>
        item.id === notification.id
          ? { ...item, unread: false }
          : item,
      ),
    );
  }

  markAllAsRead(): void {
    this.notifications.update((items) =>
      items.map((item) => ({
        ...item,
        unread: false,
      })),
    );
  }

  openNotification(notification: CandidateNotification): void {
    this.markAsRead(notification);

    if (notification.route) {
      this.router.navigateByUrl(notification.route);
    }
  }

  getTypeLabel(type: NotificationType): string {
    switch (type) {
      case 'application':
        return 'Postulación';

      case 'evaluation':
        return 'Evaluación';

      case 'flash':
        return 'Solicitud Flash';

      case 'message':
        return 'Mensaje';

      case 'job':
        return 'Empleo';

      case 'profile':
        return 'Perfil';

      default:
        return 'Notificación';
    }
  }

  getTypeIcon(type: NotificationType): string {
    switch (type) {
      case 'application':
        return '▣';

      case 'evaluation':
        return '◉';

      case 'flash':
        return '⚡';

      case 'message':
        return '◌';

      case 'job':
        return '⌕';

      case 'profile':
        return '♙';

      default:
        return '•';
    }
  }

  getTypeClasses(type: NotificationType): string {
    switch (type) {
      case 'application':
        return 'bg-teal-50 text-teal-700 border-teal-100';

      case 'evaluation':
        return 'bg-violet-50 text-violet-700 border-violet-100';

      case 'flash':
        return 'bg-amber-50 text-amber-700 border-amber-100';

      case 'message':
        return 'bg-sky-50 text-sky-700 border-sky-100';

      case 'job':
        return 'bg-emerald-50 text-emerald-700 border-emerald-100';

      case 'profile':
        return 'bg-slate-100 text-slate-700 border-slate-200';

      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  }

  constructor(private readonly router: Router) {}
}